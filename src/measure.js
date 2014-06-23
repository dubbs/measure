(function (window) {

	function Measure(config) {
		config = config || {};

		this._system = 'US';
		this._data = {};
		this._units = [
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

		this.initProps(this._units);
		// console.log(this);
	}

	Measure.prototype.initProps = function(units) {
		
		for (var prop in units) {
			// init data
			if (units.hasOwnProperty(prop)) {
				this._data[units[prop]] = 0;


				if (typeof Measure.prototype[units[prop]] === 'undefined') {
					// init accessor
					Measure.prototype[units[prop]] = (function(element){
						return function () {
							var totalMl = this.totalForProp('ml');
							var baseMl = this.measurements[element][this._system].ml;
							return totalMl/baseMl;
						};
					}(units[prop]));
		
				}				
			}

		}

	};



	Measure.prototype.add = function(input) {
		for (var prop in input) {
			if (input.hasOwnProperty(prop) && typeof this._data[prop] !== undefined) {
				this._data[prop] += input[prop];
			}
		}
		return this;
	};


	Measure.prototype.ml = function() {
		return this.totalForProp('ml');
	};

	Measure.prototype.floz = function() {
		return this.totalForProp('oz');
	};


	Measure.prototype.totalForProp = function(prop) {
		var total = 0;

		this._units.forEach(function (element) {

			
			// find measurement as mls
			var propTotal;
			try {
				propTotal = this.measurements[element][this._system][prop];
			} catch (e) {
				propTotal = this.measurements[element]['*'][prop];
			}

			// add to total
			total += (this._data[element] * propTotal);

		}, this);

		return total;		
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

	var measure = function () {
		return new Measure();
	};

	window.measure = measure;

}(this));