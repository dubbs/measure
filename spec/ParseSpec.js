describe("parseOptionsFromString", function() {
  describe("count", function() {
    it("should parse long inputs", function() {
      expect(Measure.parseOptionsFromString('1 tomato')).toEqual({units: 1});
    });
  });
  describe("any", function() {
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
