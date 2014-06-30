# measure [![Build Status](https://travis-ci.org/dubbs/measure.png)](https://travis-ci.org/dubbs/measure)

Library for converting between measurements.

## Volume

### US Customary

```js
// long inputs
measure('1 teaspoon').teaspoons() // 1
measure('1 tablespoon').teaspoons() // 3

// abbrev. inputs
measure('1 1/2 tsp.').teaspoons() // 1.5
measure('1 tbsp.').teaspoons() // 3

// multiple inputs
measure('2 cups and 1 pint').quarts() // 1

```

### Metric

```js
// long inputs
measure('1 milliliter').milliliters() // 1
measure('1 liter').milliliters() // 1000

// abbrev. inputs
measure('1.5 ml').milliliters() // 1.5
measure('1 l').milliliters() // 1000

// multiple inputs
measure('1 liter and 1 centiliter').milliliters() // 1010

```

### Operations

```js
measure('1 teaspoon').add('1 teaspoon').teaspoons(); // 2
measure('3 1/4 teaspoon').subtract('2 3/4 teaspoon').teaspoons(); // .5
measure('1 1/2 teaspoon').multiply(3).teaspoons(); // 4.5
measure('6 1/2 teaspoon').divide(2).teaspoons(); // 3.25
```

## Contributing

### Install Dependencies

```
npm install && bower install
```

### Run Tests

```
grunt test
```
