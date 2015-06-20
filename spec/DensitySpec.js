describe("density", function() {
  var measure = require('../src/measure').measure;
  it("should default to 1 g/ml (water)", function() {
    expect(measure().density()).toEqual(1);
  });
  it("should accept other densities", function() {
    expect(measure({d: 2}).density()).toEqual(2);
  });
  it("should use density to convert from volume to mass", function() {
    expect(measure('1000ml').toMass().grams()).toEqual(1000);
  });
  it("should use density to convert from mass to volume", function() {
    expect(measure('1000g').toVolume().milliliters()).toEqual(1000);
  });

});
