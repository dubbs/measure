(function (window) {

	function Measure(options) {
		this.amount = {};
		this.amount.drops       = options.drops       || 0;
		this.amount.teaspoons   = options.teaspoons   || 0;
		this.amount.tablespoons = options.tablespoons || 0;
		this.amount.fluidounces = options.fluidounces || 0;
		this.amount.jiggers     = options.jiggers     || 0;
		this.amount.gills       = options.gills       || 0;
		this.amount.cups        = options.cups        || 0;
		this.amount.pints       = options.pints       || 0;
		this.amount.fifths      = options.fifths      || 0;
		this.amount.quarts      = options.quarts      || 0;
		this.amount.gallons     = options.gallons     || 0;

		this.system = 'US';
	}

	Measure.prototype._units = [
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
			if (input.hasOwnProperty(prop) && typeof this.amount[prop] !== undefined) {
				this.amount[prop] += input[prop];
			}
		}
		return this;
	};
	Measure.prototype.subtract = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.amount[prop] !== undefined) {
				this.amount[prop] -= input[prop];
			}
		}
		return this;
	};
	Measure.prototype.multiply = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.amount[prop] !== undefined) {
				this.amount[prop] *= input[prop];
			}
		}
		return this;
	};
	Measure.prototype.divide = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this.amount[prop] !== undefined) {
				this.amount[prop] /= input[prop];
			}
		}
		return this;
	};


	// totals

	Measure.prototype.totalByUnit = function(element) {
		var totalMl = this.totalByType('ml');
		var baseMl = this.measurements[element][this.system].ml;
		return Math.round(totalMl/baseMl * 100) / 100;
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
			total += (this.amount[element] * propTotal);

		}, this);

		return total;		
	};

	// other

	Measure.prototype.initProps = function(units) {
		
		for (var prop in units) {
			// init data
			if (units.hasOwnProperty(prop)) {
				this.amount[units[prop]] = 0;


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






	Measure.prototype.ml = function() {
		return this.totalByType('ml');
	};

	Measure.prototype.floz = function() {
		return this.totalByType('oz');
	};




	Measure.prototype.measurements = {

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
	Measure.createFromString = function() {
		return new Measure();
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

}(this));