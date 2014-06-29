if (typeof module === "object" && typeof module.exports === "object") module.exports = Lexer;

Lexer.defunct = function (char) {
    throw new Error("Unexpected character at index " + (this.index - 1) + ": " + char);
};

function Lexer(defunct) {
    if (typeof defunct !== "function") defunct = Lexer.defunct;

    var tokens = [];
    var rules = [];
    var remove = 0;
    this.state = 0;
    this.index = 0;
    this.input = "";

    this.addRule = function (pattern, action, start) {
        var global = pattern.global;

        if (!global) {
            var flags = "g";
            if (pattern.multiline) flags += "m";
            if (pattern.ignoreCase) flags += "i";
            pattern = new RegExp(pattern.source, flags);
        }

        if (Object.prototype.toString.call(start) !== "[object Array]") start = [0];

        rules.push({
            pattern: pattern,
            global: global,
            action: action,
            start: start
        });

        return this;
    };

    this.setInput = function (input) {
        remove = 0;
        this.state = 0;
        this.index = 0;
        this.input = input;
        return this;
    };

    this.lex = function () {
        if (tokens.length) return tokens.shift();

        this.reject = true;

        while (this.index <= this.input.length) {
            var matches = scan.call(this).splice(remove);
            var index = this.index;

            while (matches.length) {
                if (this.reject) {
                    var match = matches.shift();
                    var result = match.result;
                    var length = match.length;
                    this.index += length;
                    this.reject = false;
                    remove++;

                    var token = match.action.apply(this, result);
                    if (this.reject) this.index = result.index;
                    else if (typeof token !== "undefined") {
                        switch (Object.prototype.toString.call(token)) {
                        case "[object Array]":
                            tokens = token.slice(1);
                            token = token[0];
                        default:
                            if (length) remove = 0;
                            return token;
                        }
                    }
                } else break;
            }

            var input = this.input;

            if (index < input.length) {
                if (this.reject) {
                    remove = 0;
                    var token = defunct.call(this, input.charAt(this.index++));
                    if (typeof token !== "undefined") {
                        if (Object.prototype.toString.call(token) === "[object Array]") {
                            tokens = token.slice(1);
                            return token[0];
                        } else return token;
                    }
                } else {
                    if (this.index !== index) remove = 0;
                    this.reject = true;
                }
            } else if (matches.length)
                this.reject = true;
            else break;
        }
    };

    function scan() {
        var matches = [];
        var index = 0;

        var state = this.state;
        var lastIndex = this.index;
        var input = this.input;

        for (var i = 0, length = rules.length; i < length; i++) {
            var rule = rules[i];
            var start = rule.start;
            var states = start.length;

            if ((!states || start.indexOf(state) >= 0) ||
                (state % 2 && states === 1 && !start[0])) {
                var pattern = rule.pattern;
                pattern.lastIndex = lastIndex;
                var result = pattern.exec(input);

                if (result && result.index === lastIndex) {
                    var j = matches.push({
                        result: result,
                        action: rule.action,
                        length: result[0].length
                    });

                    if (rule.global) index = j;

                    while (--j > index) {
                        var k = j - 1;

                        if (matches[j].length > matches[k].length) {
                            var temple = matches[j];
                            matches[j] = matches[k];
                            matches[k] = temple;
                        }
                    }
                }
            }
        }

        return matches;
    }
}
;(function (window) {

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