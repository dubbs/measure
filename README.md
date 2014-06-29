# measure [![Build Status](https://travis-ci.org/dubbs/measure.png)](https://travis-ci.org/dubbs/measure)

Library for converting between measurements.

## Install

Install dependencies

```
npm install -g grunt-cli
npm install grunt grunt-contrib-jshint grunt-contrib-jasmine --save-dev
bower install
```

## Examples

```js
measure('1 teaspoon').add('1 teaspoon').teaspoons();
// returns 2

measure('3 1/4 teaspoon').subtract('2 3/4 teaspoon').teaspoons();
// returns 0.5

measure('1 1/2 teaspoon').multiply(3).teaspoons();
// returns 4.5

measure('6 1/2 teaspoon').divide(2).teaspoons();
// returns 3.25
```

## Tests

```
grunt test
```
