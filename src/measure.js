(function (window) {

	// US Customary

	function roundUnits(ratio) {
		return Math.round((ratio + 0.00001) * 100) / 100;
	}

	var mlPerGallon = 3785.41;
	var mlPerOunce = 29.5735;

	var volume = {
		teaspoons: roundUnits(mlPerOunce / 6),
		tablespoons: roundUnits(mlPerOunce / 2),
		fluidounces: roundUnits(mlPerOunce),
		shots: roundUnits(mlPerOunce * 1.5),
		gills: roundUnits(mlPerOunce * 4),
		cups: roundUnits(mlPerGallon / 16),
		pints: roundUnits(mlPerGallon / 8),
		fifths: roundUnits(mlPerGallon / 5),
		quarts: roundUnits(mlPerGallon / 4),
		gallons: roundUnits(mlPerGallon)
	};

	// US Avoirdupois 

	var gPerPound = 453.592;

	var mass = {
		drams: roundUnits(gPerPound / 256),
		ounces: roundUnits(gPerPound / 16),
		pounds: roundUnits(gPerPound),
		quarters: roundUnits(gPerPound * 25)
	};

	window.MeasureVolumeUSCustomary = volume;
	window.MeasureMassUSCustomary = mass;

}(this));


(function (window) {

	// Imperial

	function roundUnits(ratio) {
		return Math.round((ratio + 0.00001) * 100) / 100;
	}

	var mlPerGallon = 4546.09; // 10 pounds of water in 1824
	var mlPerOunce = 28.4131;

	var volumes = {
		teaspoons: roundUnits(mlPerOunce / 6),
		tablespoons: roundUnits(mlPerOunce / 2),
		fluidounces: roundUnits(mlPerOunce),
		shots: roundUnits(mlPerOunce * 1.5),
		gills: roundUnits(mlPerGallon / 32),
		cups: roundUnits(mlPerGallon / 16),
		pints: roundUnits(mlPerGallon / 8),
		fifths: roundUnits(mlPerGallon / 5),
		quarts: roundUnits(mlPerGallon / 4),
		gallons: roundUnits(mlPerGallon)
	};

	window.MeasureVolumeImperial = volumes;

}(this));

(function (window) {

	function Measure(options) {
		this.ml = options && options.ml || 0;
		this.g = options && options.g || 0;
	}

	// volume
	Measure.prototype.milliliters = function() {
		return this.ml;
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

	// mass
	Measure.prototype.g = function() {
		return this.g;
	};
	Measure.prototype.drams = function() {
		return this.totalMassByUnit('drams');
	};
	Measure.prototype.ounces = function() {
		return this.totalMassByUnit('ounces');
	};
	Measure.prototype.pounds = function() {
		return this.totalMassByUnit('pounds');
	};
	Measure.prototype.quarters = function() {
		return this.totalMassByUnit('quarters');
	};

	// count
	Measure.prototype.units = function() {
		return this.totalByUnit('units');
	};	

	// operations
	Measure.prototype.add = function(input) {
		var options = Measure.parseOptionsFromString(input);
		if (options.ml) {
			this.ml += options.ml;
		}
		if (options.g) {
			this.g += options.g;
		}
		return this;
	};
	Measure.prototype.subtract = function(input) {
		var options = Measure.parseOptionsFromString(input);
		if (options.ml) {
			this.ml -= options.ml;
		}
		if (options.g) {
			this.g -= options.g;
		}
		return this;
	};
	Measure.prototype.multiply = function(input) {
		this.ml *= input;
		this.g *= input;
		return this;
	};
	Measure.prototype.divide = function(input) {
		this.ml /= input;
		this.g /= input;
		return this;
	};

	// totals
	Measure.prototype.totalByUnit = function(unit) {
		var ratio = this.ml/Measure.volume[unit];
		return Math.round((ratio + 0.00001) * 100) / 100;
	};
	Measure.prototype.totalMassByUnit = function(unit) {
		var ratio = this.g/Measure.mass[unit];
		return Math.round((ratio + 0.00001) * 100) / 100;
	};

	// lexer
	Measure.parseOptionsFromString = function(input) {


		var lexer = new Lexer();

		var num = 0;
		var obj = {ml: 0, g: 0};

		var volume = this.volume;
		var mass = this.mass;

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
			obj.ml += num * volume.teaspoons;
		});
		lexer.addRule(/(tablespoons?|tbsp\.|T\.)/g, function () {
			obj.ml += num * volume.tablespoons;
		});
		lexer.addRule(/(fluidounces?|fl\.oz\.)/g, function () {
			obj.ml += num * volume.fluidounces;
		});
		lexer.addRule(/(shots?)/g, function () {
			obj.ml += num * volume.shots;
		});
		lexer.addRule(/(gills?|gi\.)/g, function () {
			obj.ml += num * volume.gills;
		});
		lexer.addRule(/(cups?|C)/g, function () {
			obj.ml += num * volume.cups;
		});
		lexer.addRule(/(pints?|pt\.)/g, function () {
			obj.ml += num * volume.pints;
		});
		lexer.addRule(/(fifths?)/g, function () {
			obj.ml += num * volume.fifths;
		});
		lexer.addRule(/(quarts?\s|quart$|qt\.)/g, function () {
			obj.ml += num * volume.quarts;
		});
		lexer.addRule(/(gallons?|gal\.)/g, function () {
			obj.ml += num * volume.gallons;
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
			obj.g += num * mass.drams;
		});
		lexer.addRule(/(ounces?|oz\.)/g, function () {
			obj.g += num * mass.ounces;
		});
		lexer.addRule(/(pounds?|lbs\.?)/g, function () {
			obj.g += num * mass.pounds;
		});
		lexer.addRule(/(quarters?|qr)/g, function () {
			obj.g += num * mass.quarters;
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

	// set volume units, in future will allow pluggable units
	Measure.volume = window.MeasureVolumeUSCustomary;
	Measure.mass = window.MeasureMassUSCustomary;

	window.measure = measure;

	window.Measure = Measure;

}(this));