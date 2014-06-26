(function (window) {

	function Measure(options) {
		this.volume = {};
		this.volume.units       = options.units       || 0;
		this.volume.drops       = options.drops       || 0;
		this.volume.teaspoons   = options.teaspoons   || 0;
		this.volume.tablespoons = options.tablespoons || 0;
		this.volume.fluidounces = options.fluidounces || 0;
		this.volume.jiggers     = options.jiggers     || 0;
		this.volume.gills       = options.gills       || 0;
		this.volume.cups        = options.cups        || 0;
		this.volume.pints       = options.pints       || 0;
		this.volume.fifths      = options.fifths      || 0;
		this.volume.quarts      = options.quarts      || 0;
		this.volume.gallons     = options.gallons     || 0;

		this.system = 'US';
	}

	Measure.prototype._units = [
		'units',
		'drops',
		'teaspoons',
		'tablespoons',
		'fluidounces',
		'jiggers',
		'gills',
		'cups',
		'pints',
		'fifths',
		'quarts',
		'gallons'
	];

	Measure.prototype.units = function() {
		return this.totalByUnit('units');
	};
	Measure.prototype.drops = function() {
		return this.totalByUnit('drops');
	};
	Measure.prototype.teaspoons = function() {
		return this.totalByUnit('teaspoons');
	};
	Measure.prototype.tablespoons = function() {
		return this.totalByUnit('tablespoons');
	};
	Measure.prototype.fluidounces = function() {
		return this.totalByUnit('fluidounces');
	};
	Measure.prototype.jiggers = function() {
		return this.totalByUnit('jiggers');
	};
	Measure.prototype.gills = function() {
		return this.totalByUnit('gills');
	};
	Measure.prototype.cups = function() {
		return this.totalByUnit('cups');
	};
	Measure.prototype.pints = function() {
		return this.totalByUnit('pints');
	};
	Measure.prototype.fifths = function() {
		return this.totalByUnit('fifths');
	};
	Measure.prototype.quarts = function() {
		return this.totalByUnit('quarts');
	};
	Measure.prototype.gallons = function() {
		return this.totalByUnit('gallons');
	};

	// operations
	Measure.prototype.add = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.volume[prop] !== undefined) {
				this.volume[prop] += input[prop];
			}
		}
		return this;
	};
	Measure.prototype.subtract = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.volume[prop] !== undefined) {
				this.volume[prop] -= input[prop];
			}
		}
		return this;
	};
	Measure.prototype.multiply = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.volume[prop] !== undefined) {
				this.volume[prop] *= input[prop];
			}
		}
		return this;
	};
	Measure.prototype.divide = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.volume[prop] !== undefined) {
				this.volume[prop] /= input[prop];
			}
		}
		return this;
	};


	// totals

	Measure.prototype.totalByUnit = function(element) {
		var totalMl = this.totalByType('ml');
		var baseMl = this.measurements[element][this.system].ml;
		return Math.round((totalMl/baseMl + 0.00001) * 100) / 100;
	};

	Measure.prototype.totalByType = function(prop) {
		var total = 0;

		this._units.forEach(function (element) {

			// find measurement as mls
			var propTotal;
			try {
				propTotal = this.measurements[element][this.system][prop];
			} catch (e) {
				propTotal = this.measurements[element]['*'][prop];
			}

			// add to total
			total += (this.volume[element] * propTotal);

		}, this);

		return total;		
	};

	// other

	Measure.prototype.initProps = function(units) {
		
		for (var prop in units) {
			// init data
			if (units.hasOwnProperty(prop)) {
				this.volume[units[prop]] = 0;


				if (typeof Measure.prototype[units[prop]] === 'undefined') {
					// init accessor
					Measure.prototype[units[prop]] = (function(element){
						return function () {
							var totalMl = this.totalByType('ml');
							var baseMl = this.measurements[element][this.system].ml;
							return totalMl/baseMl;
						};
					}(units[prop]));
		
				}				
			}

		}

	};

	// lexer
	Measure.prototype.parseOptionsFromString = function(input) {
		
		var lexer = new Lexer();

		var num = 0;
		var obj = {ml: 0, g: 0};

		lexer.addRule(/[0-9.\/ -]+/g, function (lexeme) {
			// add mixed numbers
			lexeme = lexeme.trim().replace('-',' ').split(' ').join('+');
			num = eval(lexeme);
		});
		// volume
		// - metric
		lexer.addRule(/(millilitre?)/g, function () {
			obj.ml += num;
		});
		lexer.addRule(/(litre?)/g, function () {
			obj.ml += num * 1000;
		});
		// - customary
		lexer.addRule(/(teaspoons?|tsp\.|t\.)/g, function () {
			obj.ml += num * 5;
		});
		lexer.addRule(/(tablespoons?|tbsp\.|T\.)/g, function () {
			obj.ml += num * 15;
		});
		lexer.addRule(/(fluidounces?|fl\.oz\.)/g, function () {
			obj.ml += num * 30;
		});
		lexer.addRule(/(shots?)/g, function () {
			obj.ml += 44;
		});
		lexer.addRule(/(gills?|gi\.)/g, function () {
			obj.ml += 118;
		});
		lexer.addRule(/(cups?|C)/g, function () {
			obj.ml += 237;
		});
		lexer.addRule(/(pints?|pt\.)/g, function () {
			obj.ml += 473;
		});
		// lexer.addRule(/(fifths?)/g, function () {
		// 	obj.fifths = num;
		// });
		lexer.addRule(/(quarts?|qt\.)/g, function () {
			obj.ml += num * 946;
		});
		lexer.addRule(/(gallons?|gal\.)/g, function () {
			obj.ml += num * 3785;
		});
		// mass
		// - metric
		lexer.addRule(/(kilograms?|kg\.?)/g, function () {
			obj.g += num * 1000;
		});
		lexer.addRule(/(grams?|g\.?)/g, function () {
			obj.g += num;
		});
		// - customary
		lexer.addRule(/(ounces?|oz\.)/g, function () {
			obj.g += num * 28;
		});
		lexer.addRule(/(pounds?|lbs\.?)/g, function () {
			obj.g += num * 454;
		});

		lexer.addRule(/[^0-9]+/g, function () {
			// if haven't set another value yet, assume its an arbitrary unit
			if (obj.ml === 0 && obj.g === 0) {
				obj.units = num;
			}
		});
		lexer.addRule(/\s/g, function () {});

		lexer.setInput(input);

		lexer.lex();

		// cleanup
		if (obj.ml === 0) {
			delete obj.ml;
		}
		if (obj.g === 0) {
			delete obj.g;
		}

		return obj;

	};

	Measure.prototype.ml = function() {
		return this.totalByType('ml');
	};

	Measure.prototype.floz = function() {
		return this.totalByType('oz');
	};




	Measure.prototype.measurements = {
		units: {
			"US": {
				ml: 0,
				oz: 0
			}
		},
		drops: {
			"US": {
				ml: 0.05,
				oz: 1/576
			}
		},
		teaspoons: {
			"US": {
				ml: 4.93,
				oz: 1/6
			}
		},
		tablespoons: {
			"US": {
				ml: 14.79,
				oz: 1/2
			}
		},
		fluidounces: {
			"US": {
				ml: 29.57,
				oz: 1
			}
		},
		jiggers: {
			"US": {
				ml: 44.36,
				oz: 1.5
			}
		},
		gills: {
			"US": {
				ml: 118.29,
				oz: 4
			}
		},
		cups: {
			"US": {
				ml: 236.59,
				oz: 8
			}
		},
		pints: {
			"US": {
				ml: 473.18,
				oz: 16
			}
		},
		fifths: {
			"US": {
				ml: 750,
				oz: 25.36
			}
		},
		quarts: {
			"US": {
				ml: 946.35,
				oz: 32
			}
		},
		gallons: {
			"US": {
				ml: 3785.41,
				oz: 128
			}
		}

	};

	// create
	Measure.createFromString = function(options) {
		options = this.parseOptionsFromString(options);
		return new Measure(options);
	};
	Measure.createFromObject = function(options) {
		return new Measure(options);
	};


	var measure = function (options) {

		if (typeof(options) === 'string') {
			return Measure.createFromString(options);
		}
		if (typeof(options) === 'object') {
			return Measure.createFromObject(options);
		}
		return new Measure();
	};

	window.measure = measure;

	window.Measure = Measure;

}(this));