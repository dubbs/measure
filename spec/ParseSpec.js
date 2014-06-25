describe("parseOptionsFromString", function() {
  beforeEach(function() {});
  it("should parse long inputs", function() {
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
  it("should parse abbreviated inputs", function() {
    expect(Measure.prototype.parseOptionsFromString('1 tsp.')).toEqual({teaspoons: 1});
    expect(Measure.prototype.parseOptionsFromString('1 t.')).toEqual({teaspoons: 1});
    expect(Measure.prototype.parseOptionsFromString('1 tbsp.')).toEqual({tablespoons: 1});
    expect(Measure.prototype.parseOptionsFromString('1 T.')).toEqual({tablespoons: 1});
    expect(Measure.prototype.parseOptionsFromString('1 fl.oz.')).toEqual({fluidounces: 1});
    expect(Measure.prototype.parseOptionsFromString('1 oz.')).toEqual({fluidounces: 1});
    expect(Measure.prototype.parseOptionsFromString('1 gi.')).toEqual({gills: 1});
    expect(Measure.prototype.parseOptionsFromString('1 C')).toEqual({cups: 1});
    expect(Measure.prototype.parseOptionsFromString('1 pt.')).toEqual({pints: 1});
    expect(Measure.prototype.parseOptionsFromString('1 qt.')).toEqual({quarts: 1});
    expect(Measure.prototype.parseOptionsFromString('1 gal.')).toEqual({gallons: 1});
  });
  it("should parse mixed numbers", function() {
    expect(Measure.prototype.parseOptionsFromString('1 1/2 tsp.')).toEqual({teaspoons: 1.5});
    expect(Measure.prototype.parseOptionsFromString('1-3/4 tsp.')).toEqual({teaspoons: 1.75});
    expect(Measure.prototype.parseOptionsFromString('2 1/4 tsp.')).toEqual({teaspoons: 2.25});
  });
  it("should parse multiple inputs", function() {
    expect(Measure.prototype.parseOptionsFromString('3 tablespoons and 1-3/4 teaspoons')).toEqual({tablespoons: 3, teaspoons: 1.75});
  });

});