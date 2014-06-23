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

		var total = 0;

		this._props.forEach(function (element) {
			
			// find measurement as mls
			var asMls = this._data[element][this._country] || this._data[element]['*'];

			// add to total
			total += (this[element] * asMls);


		}, this);
		return total;
	};

	Measure.prototype._data = {

		_drop: {
			"*": 0.05
		},
		_teaspoon: {
			"*": 4.93
		},
		_tablespoon: {
			"*": 14.79
		},
		_fluidounce: {
			"*": 29.57
		},
		_jigger: {
			"*": 44.36
		},
		_gill: {
			"*": 118.29
		},
		_cups: {
			"*": 236.59
		},
		_pint: {
			"*": 473.18
		},
		_fifth: {
			"*": 750
		},
		_quart: {
			"*": 946.35
		},
		_gallon: {
			"*": 3785.41
		}

	};

	var measure = function () {
		return new Measure();
	};

	window.measure = measure;

}(this));