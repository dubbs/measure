(function (window) {

	function Measure() {
		this._country = 'US';
		this._props = ['_drop', '_teaspoon', '_tablespoon', '_fluidounce', '_jigger', '_gill', '_cups', '_pint', '_fifth', '_quart', '_gallon'];
		
		this._drop = 0;
		this._teaspoon = 0;
		this._tablespoon = 0;
		this._fluidounce = 0;
		this._jigger = 0;
		this._gill = 0;
		this._cups = 0;
		this._pint = 0;
		this._fifth = 0;
		this._quart = 0;
		this._gallon = 0;

	}

	Measure.prototype.add = function(input) {

		for (var prop in input) {
			if (input.hasOwnProperty(prop) && this._props.indexOf('_'+prop) !== -1) {
				this['_'+prop] += input[prop];
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

		this._props.forEach(function (element) {
			
			// find measurement as mls
			var propTotal;
			try {
				propTotal = this._data[element][this._country][prop];
			} catch (e) {
				propTotal = this._data[element]['*'][prop];
			}

			// add to total
			total += (this[element] * propTotal);

		}, this);

		return total;		
	};

	Measure.prototype._data = {

		_drop: {
			"*": {
				ml: 0.05,
				oz: 1/576
			}
		},
		_teaspoon: {
			"*": {
				ml: 4.93,
				oz: 1/6
			}
		},
		_tablespoon: {
			"*": {
				ml: 14.79,
				oz: 1/2
			}
		},
		_fluidounce: {
			"*": {
				ml: 29.57,
				oz: 1
			}
		},
		_jigger: {
			"*": {
				ml: 44.36,
				oz: 1.5
			}
		},
		_gill: {
			"*": {
				ml: 118.29,
				oz: 4
			}
		},
		_cups: {
			"*": {
				ml: 236.59,
				oz: 8
			}
		},
		_pint: {
			"*": {
				ml: 473.18,
				oz: 16
			}
		},
		_fifth: {
			"*": {
				ml: 750,
				oz: 25.36
			}
		},
		_quart: {
			"*": {
				ml: 946.35,
				oz: 32
			}
		},
		_gallon: {
			"*": {
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