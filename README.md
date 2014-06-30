# measure [![Build Status](https://travis-ci.org/dubbs/measure.png)](https://travis-ci.org/dubbs/measure)

Library for converting between measurements.

## Usage

```js
measure('1 teaspoon').add('1 teaspoon').teaspoons();
// 2

measure('3 1/4 teaspoon').subtract('2 3/4 teaspoon').teaspoons();
// 0.5

measure('1 1/2 teaspoon').multiply(3).teaspoons();
// 4.5

measure('6 1/2 teaspoon').divide(2).teaspoons();
// 3.25
```

## Install

Install dependencies

```
npm install && bower install
```


## Tests

```
grunt test
```
