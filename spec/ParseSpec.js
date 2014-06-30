describe("parseOptionsFromString", function() {
  beforeEach(function() {});
  describe("volume", function() {
    it("should parse long inputs", function() {
      // metric
      expect(Measure.parseOptionsFromString('1 millilitre')).toEqual({ml: 1});
      expect(Measure.parseOptionsFromString('1 centilitre')).toEqual({ml: 10});
      expect(Measure.parseOptionsFromString('1 decilitre')).toEqual({ml: 100});
      expect(Measure.parseOptionsFromString('1 litre')).toEqual({ml: 1000});
      expect(Measure.parseOptionsFromString('1 decalitre')).toEqual({ml: 10000});
      expect(Measure.parseOptionsFromString('1 hectolitre')).toEqual({ml: 100000});
      expect(Measure.parseOptionsFromString('1 kilolitre')).toEqual({ml: 1000000});
      // customary
      expect(Measure.parseOptionsFromString('1 teaspoon')).toEqual({ml: Measure.volume.teaspoons});
      expect(Measure.parseOptionsFromString('1 tablespoon')).toEqual({ml: Measure.volume.tablespoons});
      expect(Measure.parseOptionsFromString('1 fluidounce')).toEqual({ml: Measure.volume.fluidounces});
      expect(Measure.parseOptionsFromString('1 shot')).toEqual({ml: Measure.volume.shots});
      expect(Measure.parseOptionsFromString('1 gill')).toEqual({ml: Measure.volume.gills});
      expect(Measure.parseOptionsFromString('1 cup')).toEqual({ml: Measure.volume.cups});
      expect(Measure.parseOptionsFromString('1 pint')).toEqual({ml: Measure.volume.pints});
      expect(Measure.parseOptionsFromString('1 fifth')).toEqual({ml: Measure.volume.fifths});
      expect(Measure.parseOptionsFromString('1 quart')).toEqual({ml: Measure.volume.quarts});
      expect(Measure.parseOptionsFromString('1 gallon')).toEqual({ml: Measure.volume.gallons});
    });
    it("should parse abbreviated inputs", function() {
      // metric
      expect(Measure.parseOptionsFromString('1 ml')).toEqual({ml: 1});
      expect(Measure.parseOptionsFromString('1 cl')).toEqual({ml: 10});
      expect(Measure.parseOptionsFromString('1 dl')).toEqual({ml: 100});
      expect(Measure.parseOptionsFromString('1 l')).toEqual({ml: 1000});
      expect(Measure.parseOptionsFromString('1 dal')).toEqual({ml: 10000});
      expect(Measure.parseOptionsFromString('1 hl')).toEqual({ml: 100000});
      expect(Measure.parseOptionsFromString('1 kl')).toEqual({ml: 1000000});
      // customary
      expect(Measure.parseOptionsFromString('1 tsp.')).toEqual({ml: Measure.volume.teaspoons});
      expect(Measure.parseOptionsFromString('1 t.')).toEqual({ml: Measure.volume.teaspoons});
      expect(Measure.parseOptionsFromString('1 tbsp.')).toEqual({ml: Measure.volume.tablespoons});
      expect(Measure.parseOptionsFromString('1 T.')).toEqual({ml: Measure.volume.tablespoons});
      expect(Measure.parseOptionsFromString('1 fl.oz.')).toEqual({ml: Measure.volume.fluidounces});
      expect(Measure.parseOptionsFromString('1 gi.')).toEqual({ml: Measure.volume.gills});
      expect(Measure.parseOptionsFromString('1 pt.')).toEqual({ml: Measure.volume.pints});
      expect(Measure.parseOptionsFromString('1 qt.')).toEqual({ml: Measure.volume.quarts});
      expect(Measure.parseOptionsFromString('1 gal.')).toEqual({ml: Measure.volume.gallons});
    });

  });
  describe("mass", function() {
    it("should parse long inputs", function() {
      // metric
      expect(Measure.parseOptionsFromString('1 gram')).toEqual({g: 1});
      expect(Measure.parseOptionsFromString('1 kilogram')).toEqual({g: 1000});
      // customary
      expect(Measure.parseOptionsFromString('1 dram')).toEqual({g: 2});
      expect(Measure.parseOptionsFromString('1 ounce')).toEqual({g: 28});
      expect(Measure.parseOptionsFromString('1 pound')).toEqual({g: 454});
      expect(Measure.parseOptionsFromString('1 quarter')).toEqual({g: 11340});
    });
    it("should parse abbreviated inputs", function() {
      // metric
      expect(Measure.parseOptionsFromString('1 g')).toEqual({g: 1});
      expect(Measure.parseOptionsFromString('1 g.')).toEqual({g: 1});
      expect(Measure.parseOptionsFromString('1 kg')).toEqual({g: 1000});
      expect(Measure.parseOptionsFromString('1 kg.')).toEqual({g: 1000});
      // customary
      expect(Measure.parseOptionsFromString('1 dr')).toEqual({g: 2});
      expect(Measure.parseOptionsFromString('1 oz.')).toEqual({g: 28});
      expect(Measure.parseOptionsFromString('1 lbs')).toEqual({g: 454});
      expect(Measure.parseOptionsFromString('1 lbs.')).toEqual({g: 454});
      expect(Measure.parseOptionsFromString('1 qr')).toEqual({g: 11340});
    });
  });
  describe("count", function() {
    it("should parse long inputs", function() {
      expect(Measure.parseOptionsFromString('1 tomato')).toEqual({units: 1});
    });
  });
  describe("all", function() {
    it("should parse mixed numbers", function() {
      // customary
      expect(Measure.parseOptionsFromString('1 1/2 tsp.')).toEqual({ml: Measure.volume.teaspoons * 1.5});
      expect(Measure.parseOptionsFromString('1-3/4 tsp.')).toEqual({ml: Measure.volume.teaspoons * 1.75});
      expect(Measure.parseOptionsFromString('2 1/4 tsp.')).toEqual({ml: Measure.volume.teaspoons * 2.25});
    });
    it("should parse multiple inputs", function() {
      // customary
      expect(Measure.parseOptionsFromString('3 tablespoons and 1-3/4 teaspoons')).toEqual({ml: (Measure.volume.tablespoons * 3 + Measure.volume.teaspoons * 1.75)});
    });
  });
});