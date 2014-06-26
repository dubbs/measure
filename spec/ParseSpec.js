describe("parseOptionsFromString", function() {
  beforeEach(function() {});
  describe("volume", function() {
    it("should parse long inputs", function() {
      // metric
      expect(Measure.prototype.parseOptionsFromString('1 millilitre')).toEqual({ml: 1});
      expect(Measure.prototype.parseOptionsFromString('1 litre')).toEqual({ml: 1000});
      // customary
      expect(Measure.prototype.parseOptionsFromString('1 teaspoon')).toEqual({ml: 5});
      expect(Measure.prototype.parseOptionsFromString('1 tablespoon')).toEqual({ml: 15});
      expect(Measure.prototype.parseOptionsFromString('1 fluidounce')).toEqual({ml: 30});
      expect(Measure.prototype.parseOptionsFromString('1 shot')).toEqual({ml: 44});
      expect(Measure.prototype.parseOptionsFromString('1 gill')).toEqual({ml: 118});
      expect(Measure.prototype.parseOptionsFromString('1 cup')).toEqual({ml: 237});
      expect(Measure.prototype.parseOptionsFromString('1 pint')).toEqual({ml: 473});
      expect(Measure.prototype.parseOptionsFromString('1 quart')).toEqual({ml: 946});
      expect(Measure.prototype.parseOptionsFromString('1 gallon')).toEqual({ml: 3785});
    });
    it("should parse abbreviated inputs", function() {
      // customary
      expect(Measure.prototype.parseOptionsFromString('1 tsp.')).toEqual({ml: 5});
      expect(Measure.prototype.parseOptionsFromString('1 t.')).toEqual({ml: 5});
      expect(Measure.prototype.parseOptionsFromString('1 tbsp.')).toEqual({ml: 15});
      expect(Measure.prototype.parseOptionsFromString('1 T.')).toEqual({ml: 15});
      expect(Measure.prototype.parseOptionsFromString('1 fl.oz.')).toEqual({ml: 30});
      expect(Measure.prototype.parseOptionsFromString('1 gi.')).toEqual({ml: 118});
      // expect(Measure.prototype.parseOptionsFromString('1 C')).toEqual({cups: 1});
      expect(Measure.prototype.parseOptionsFromString('1 pt.')).toEqual({ml: 473});
      expect(Measure.prototype.parseOptionsFromString('1 qt.')).toEqual({ml: 946});
      expect(Measure.prototype.parseOptionsFromString('1 gal.')).toEqual({ml: 3785});
    });
    it("should parse mixed numbers", function() {
      // customary
      expect(Measure.prototype.parseOptionsFromString('1 1/2 tsp.')).toEqual({ml: 7.5});
      expect(Measure.prototype.parseOptionsFromString('1-3/4 tsp.')).toEqual({ml: 8.75});
      expect(Measure.prototype.parseOptionsFromString('2 1/4 tsp.')).toEqual({ml: 11.25});
    });
    it("should parse multiple inputs", function() {
      // customary
      expect(Measure.prototype.parseOptionsFromString('3 tablespoons and 1-3/4 teaspoons')).toEqual({ml: 53.75});
    });
  });
  describe("mass", function() {
    it("should parse long inputs", function() {
      // metric
      expect(Measure.prototype.parseOptionsFromString('1 gram')).toEqual({g: 1});
      expect(Measure.prototype.parseOptionsFromString('1 kilogram')).toEqual({g: 1000});
      // customary
      expect(Measure.prototype.parseOptionsFromString('1 ounce')).toEqual({g: 28});
      expect(Measure.prototype.parseOptionsFromString('1 pound')).toEqual({g: 454});
    });
    it("should parse abbreviated inputs", function() {
      // metric
      expect(Measure.prototype.parseOptionsFromString('1 g')).toEqual({g: 1});
      expect(Measure.prototype.parseOptionsFromString('1 g.')).toEqual({g: 1});
      expect(Measure.prototype.parseOptionsFromString('1 kg')).toEqual({g: 1000});
      expect(Measure.prototype.parseOptionsFromString('1 kg.')).toEqual({g: 1000});
      // customary
      expect(Measure.prototype.parseOptionsFromString('1 oz.')).toEqual({g: 28});
      expect(Measure.prototype.parseOptionsFromString('1 lbs')).toEqual({g: 454});
      expect(Measure.prototype.parseOptionsFromString('1 lbs.')).toEqual({g: 454});
    });
    it("should parse mixed numbers", function() {
    });
    it("should parse multiple inputs", function() {
    });
  });
  describe("count", function() {
    it("should parse long inputs", function() {
      expect(Measure.prototype.parseOptionsFromString('1 tomato')).toEqual({units: 1});
    });
    it("should parse abbreviated inputs", function() {
    });
    it("should parse mixed numbers", function() {
    });
    it("should parse multiple inputs", function() {
    });
  });
});