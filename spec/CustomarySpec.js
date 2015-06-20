describe("US Customary", function() {
  var measure = require('../src/measure').measure;
  var Measure = require('../src/measure').Measure;
  beforeEach(function () {
    Measure.setUnitSystem('US');
  });
  describe("input", function() {
    it("should parse long volume inputs", function() {
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
    it("should parse abbreviated volume inputs", function() {
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
    it("should parse long mass inputs", function() {
      expect(Measure.parseOptionsFromString('1 dram')).toEqual({g: Measure.mass.drams});
      expect(Measure.parseOptionsFromString('1 ounce')).toEqual({g: Measure.mass.ounces});
      expect(Measure.parseOptionsFromString('1 pound')).toEqual({g: Measure.mass.pounds});
      expect(Measure.parseOptionsFromString('1 quarter')).toEqual({g: Measure.mass.quarters});
    });
    it("should parse abbreviated mass inputs", function() {
      expect(Measure.parseOptionsFromString('1 dr')).toEqual({g: Measure.mass.drams});
      expect(Measure.parseOptionsFromString('1 oz.')).toEqual({g: Measure.mass.ounces});
      expect(Measure.parseOptionsFromString('1 lbs')).toEqual({g: Measure.mass.pounds});
      expect(Measure.parseOptionsFromString('1 lbs.')).toEqual({g: Measure.mass.pounds});
      expect(Measure.parseOptionsFromString('1 qr')).toEqual({g: Measure.mass.quarters});
    });
  });
  describe("output", function() {
    it("should provide output for volume units", function() {
      expect(measure('1 teaspoon').teaspoons()).toEqual(1);
      expect(measure('1 tablespoon').tablespoons()).toEqual(1);
      expect(measure('1 fluidounce').fluidounces()).toEqual(1);
      expect(measure('1 gill').gills()).toEqual(1);
      expect(measure('1 cup').cups()).toEqual(1);
      expect(measure('1 pint').pints()).toEqual(1);
      expect(measure('1 quart').quarts()).toEqual(1);
      expect(measure('1 gallon').gallons()).toEqual(1);
    });
    it("should provide output for mass units", function() {
      expect(measure('1 dram').drams()).toEqual(1);
      expect(measure('1 ounce').ounces()).toEqual(1);
      expect(measure('1 pound').pounds()).toEqual(1);
      expect(measure('1 quarter').quarters()).toEqual(1);
    });
  });
});
