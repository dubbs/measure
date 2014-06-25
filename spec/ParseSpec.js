describe("parseOptionsFromString", function() {
  beforeEach(function() {});
  it("should parse simple inputs", function() {
    expect(Measure.prototype.parseOptionsFromString('1 drop')).toEqual({drops: 1});
    expect(Measure.prototype.parseOptionsFromString('1 teaspoon')).toEqual({teaspoons: 1});
    expect(Measure.prototype.parseOptionsFromString('1 tablespoon')).toEqual({tablespoons: 1});
    expect(Measure.prototype.parseOptionsFromString('1 fluidounce')).toEqual({fluidounces: 1});
    expect(Measure.prototype.parseOptionsFromString('1 jigger')).toEqual({jiggers: 1});
    expect(Measure.prototype.parseOptionsFromString('1 gill')).toEqual({gills: 1});
    expect(Measure.prototype.parseOptionsFromString('1 cup')).toEqual({cups: 1});
    expect(Measure.prototype.parseOptionsFromString('1 pint')).toEqual({pints: 1});
    expect(Measure.prototype.parseOptionsFromString('1 fifth')).toEqual({fifths: 1});
    expect(Measure.prototype.parseOptionsFromString('1 quart')).toEqual({quarts: 1});
    expect(Measure.prototype.parseOptionsFromString('1 gallon')).toEqual({gallons: 1});
  });
});