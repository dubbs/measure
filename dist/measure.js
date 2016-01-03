(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (typeof module === "object" && typeof module.exports === "object") module.exports = Lexer;

Lexer.defunct = function (chr) {
    throw new Error("Unexpected character at index " + (this.index - 1) + ": " + chr);
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
        tokens.length = 0;
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

},{}],2:[function(require,module,exports){
window.measure = require('./measure').measure;
window.Measure = require('./measure').Measure;

},{"./measure":3}],3:[function(require,module,exports){
var USMass = require('./measureUSMass');
var USVolume = require('./measureUSVolume');
var ImperialMass = require('./measureImperialMass');
var ImperialVolume = require('./measureImperialVolume');
var Lexer = require('../node_modules/lex/lexer');

// MEASURE
function Measure(options) {
  this.ml = options && options.ml || 0;
  this.g = options && options.g || 0;
  this.d = options && options.d || 1;
}

// density
Measure.prototype.density = function () {
  return this.d;
};

// helpers
Measure.prototype.toVolume = function () {
  if (this.g) {
    this.ml = this.g / this.d;
    this.g = 0;
  }
  return this;
};
Measure.prototype.toMass = function () {
  if (this.ml) {
    this.g = this.d * this.ml;
    this.ml = 0;
  }
  return this;
};

// volume
Measure.prototype.milliliters = function () {
  return this.ml;
};
Measure.prototype.centiliters = function () {
  return this.ml / 10;
};
Measure.prototype.deciliters = function () {
  return this.ml / 100;
};
Measure.prototype.liters = function () {
  return this.ml / 1000;
};
Measure.prototype.decaliters = function () {
  return this.ml / 10000;
};
Measure.prototype.hectoliters = function () {
  return this.ml / 100000;
};
Measure.prototype.kiloliters = function () {
  return this.ml / 1000000;
};
Measure.prototype.drops = function () {
  return this.totalByUnit('drops');
};
Measure.prototype.teaspoons = function () {
  return this.totalByUnit('teaspoons');
};
Measure.prototype.tablespoons = function () {
  return this.totalByUnit('tablespoons');
};
Measure.prototype.fluidounces = function () {
  return this.totalByUnit('fluidounces');
};
Measure.prototype.jiggers = function () {
  return this.totalByUnit('jiggers');
};
Measure.prototype.gills = function () {
  return this.totalByUnit('gills');
};
Measure.prototype.cups = function () {
  return this.totalByUnit('cups');
};
Measure.prototype.pints = function () {
  return this.totalByUnit('pints');
};
Measure.prototype.fifths = function () {
  return this.totalByUnit('fifths');
};
Measure.prototype.quarts = function () {
  return this.totalByUnit('quarts');
};
Measure.prototype.gallons = function () {
  return this.totalByUnit('gallons');
};

      // mass
Measure.prototype.grams = function () {
  return this.g;
};
Measure.prototype.kilograms = function () {
  return this.g / 1000;
};
Measure.prototype.drams = function () {
  return this.totalMassByUnit('drams');
};
Measure.prototype.ounces = function () {
  return this.totalMassByUnit('ounces');
};
Measure.prototype.pounds = function () {
  return this.totalMassByUnit('pounds');
};
Measure.prototype.quarters = function () {
  return this.totalMassByUnit('quarters');
};

      // count
Measure.prototype.units = function () {
  return this.totalByUnit('units');
};

      // operations
Measure.prototype.add = function (input) {
  var options = Measure.parseOptionsFromString(input);
  if (options.ml) {
    this.ml += options.ml;
  }
  if (options.g) {
    this.g += options.g;
  }
  return this;
};
Measure.prototype.subtract = function (input) {
  var options = Measure.parseOptionsFromString(input);
  if (options.ml) {
    this.ml -= options.ml;
  }
  if (options.g) {
    this.g -= options.g;
  }
  return this;
};
Measure.prototype.multiply = function (input) {
  this.ml *= input;
  this.g *= input;
  return this;
};
Measure.prototype.divide = function (input) {
  this.ml /= input;
  this.g /= input;
  return this;
};

// totals
Measure.prototype.totalByUnit = function (unit) {
  var ratio = this.ml / Measure.volume[unit];
  return Math.round((ratio + 0.00001) * 100) / 100;
};
Measure.prototype.totalMassByUnit = function (unit) {
  var ratio = this.g / Measure.mass[unit];
  return Math.round((ratio + 0.00001) * 100) / 100;
};

      // lexer
Measure.parseOptionsFromString = function (input) {

  var lexer = new Lexer();

  var num = 0;
  var obj = {ml: 0, g: 0};

  var volume = this.volume;
  var mass = this.mass;

  lexer.addRule(/[0-9.\/ -]+/g, function (lexeme) {
    // add mixed numbers
    lexeme = lexeme.trim().replace('-', ' ').split(' ').join('+');
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
  lexer.addRule(/(teaspoons?|tsp\.?|t\.)/g, function () {
    obj.ml += num * volume.teaspoons;
  });
  lexer.addRule(/(tablespoons?|tbsp\.?|T\.)/g, function () {
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
  lexer.addRule(/(cups?|cup$|C)/g, function () {
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

// options
Measure.setUnitSystem = function (unitSystem) {
  switch (unitSystem) {
  case 'Imperial':
    Measure.volume = ImperialVolume;
    Measure.mass = ImperialMass;
    break;
  default: // US
    Measure.volume = USVolume;
    Measure.mass = USMass;
    break;
  }
};

// create
Measure.createFromString = function (options) {
  options = Measure.parseOptionsFromString(options);
  return new Measure(options);
};
Measure.createFromObject = function (options) {
  return new Measure(options);
};

var measure = function (options, unitSystem) {
  if (unitSystem) {
    Measure.setUnitSystem(unitSystem);
  } else {
    Measure.setUnitSystem('US');
  }
  if (typeof options === 'string') {
    return Measure.createFromString(options);
  }
  if (typeof options === 'object') {
    return Measure.createFromObject(options);
  }
  return new Measure();
};

// exports
module.exports = {
  measure: measure,
  Measure: Measure
};

},{"../node_modules/lex/lexer":1,"./measureImperialMass":4,"./measureImperialVolume":5,"./measureUSMass":6,"./measureUSVolume":7}],4:[function(require,module,exports){
function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// Imperial 

var gPerPound = 453.592;

var mass = {
  drams: roundUnits(gPerPound / 256),
  ounces: roundUnits(gPerPound / 16),
  pounds: roundUnits(gPerPound),
  stones: roundUnits(gPerPound * 14),
  quarters: roundUnits(gPerPound * 28),
  hundredweights: roundUnits(gPerPound * 112),
  ton: roundUnits(gPerPound * 2240)
};

module.exports = mass;

},{}],5:[function(require,module,exports){
function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// Imperial Avoirdupois 

var mlPerOunce = 28.4131;
var mlPerGallon = 4546.09; // 10 pounds of water in the year 1824

var volume = {
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

module.exports = volume;

},{}],6:[function(require,module,exports){
function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// US Avoirdupois

var gPerPound = 453.592;

var mass = {
  grains: roundUnits(gPerPound / 7000),
  drams: roundUnits(gPerPound / 256),
  ounces: roundUnits(gPerPound / 16),
  pounds: roundUnits(gPerPound),
  quarters: roundUnits(gPerPound * 25),
  hundredweights: roundUnits(gPerPound * 100),
  ton: roundUnits(gPerPound * 2000)
};

module.exports = mass;

},{}],7:[function(require,module,exports){
function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// US Customary

var mlPerOunce = 29.5735;
var mlPerGallon = 3785.41;

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

module.exports = volume;

},{}]},{},[2]);
