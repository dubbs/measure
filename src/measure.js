(function (window) {

	function Measure(options) {
		this.ml = options.ml;
	}

	Measure.prototype.volumes = {
		teaspoons: 5,
		tablespoons: 15,
		fluidounces: 30,
		shots: 44,
		gills: 118,
		cups: 237,
		pints: 473,
		fifth: 750,
		quarts: 946,
		gallons: 3785
	};

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
		var options = Measure.parseOptionsFromString(input);
		this.ml += options.ml;
		return this;
	};
	Measure.prototype.subtract = function(input) {
		var options = Measure.parseOptionsFromString(input);
		this.ml -= options.ml;
		return this;
	};
	Measure.prototype.multiply = function(input) {
		this.ml *= input;
		return this;
	};
	Measure.prototype.divide = function(input) {
		this.ml /= input;
		return this;
	};

	// totals
	Measure.prototype.totalByUnit = function(unit) {
		var ratio = this.ml/this.volumes[unit];
		return Math.round((ratio + 0.00001) * 100) / 100;
	};

	// lexer
	Measure.parseOptionsFromString = function(input) {
		
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
		lexer.addRule(/millilit(re|er)s?|ml/g, function () {
			obj.ml += num;
		});
		lexer.addRule(/centilit(re|er)s?|cl/g, function () {
			obj.ml += num * 10;
		});
		lexer.addRule(/decilit(re|er)s?|dl/g, function () {
			obj.ml += num * 100;
		});
		lexer.addRule(/lit(re|er)s?|l\s|l$/g, function () {
			obj.ml += num * 1000;
		});
		lexer.addRule(/decalit(re|er)s?|dal/g, function () {
			obj.ml += num * 10000;
		});
		lexer.addRule(/hectolit(re|er)s?|hl/g, function () {
			obj.ml += num * 100000;
		});
		lexer.addRule(/kilolit(re|er)s?|kl/g, function () {
			obj.ml += num * 1000000;
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
			obj.ml += num * 44;
		});
		lexer.addRule(/(gills?|gi\.)/g, function () {
			obj.ml += num * 118;
		});
		lexer.addRule(/(cups?|C)/g, function () {
			obj.ml += num * 237;
		});
		lexer.addRule(/(pints?|pt\.)/g, function () {
			obj.ml += num * 473;
		});
		lexer.addRule(/(fifths?)/g, function () {
			obj.ml += num * 750;
		});
		lexer.addRule(/(quarts?\s|quart$|qt\.)/g, function () {
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
		lexer.addRule(/(drams?|dr)/g, function () {
			obj.g += num * 2;
		});
		lexer.addRule(/(ounces?|oz\.)/g, function () {
			obj.g += num * 28;
		});
		lexer.addRule(/(pounds?|lbs\.?)/g, function () {
			obj.g += num * 454;
		});
		lexer.addRule(/(quarters?|qr)/g, function () {
			obj.g += num * 11340;
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

	// create
	Measure.createFromString = function(options) {
		options = Measure.parseOptionsFromString(options);
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