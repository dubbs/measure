describe("Metric", function() {
  describe("input", function() {
    it("should parse long volume inputs", function() {
      expect(Measure.parseOptionsFromString('1 millilitre')).toEqual({ml: 1});
      expect(Measure.parseOptionsFromString('1 centilitre')).toEqual({ml: 10});
      expect(Measure.parseOptionsFromString('1 decilitre')).toEqual({ml: 100});
      expect(Measure.parseOptionsFromString('1 litre')).toEqual({ml: 1000});
      expect(Measure.parseOptionsFromString('1 decalitre')).toEqual({ml: 10000});
      expect(Measure.parseOptionsFromString('1 hectolitre')).toEqual({ml: 100000});
      expect(Measure.parseOptionsFromString('1 kilolitre')).toEqual({ml: 1000000});
    });
    it("should parse abbreviated volume inputs", function() {
      expect(Measure.parseOptionsFromString('1 ml')).toEqual({ml: 1});
      expect(Measure.parseOptionsFromString('1 cl')).toEqual({ml: 10});
      expect(Measure.parseOptionsFromString('1 dl')).toEqual({ml: 100});
      expect(Measure.parseOptionsFromString('1 l')).toEqual({ml: 1000});
      expect(Measure.parseOptionsFromString('1 dal')).toEqual({ml: 10000});
      expect(Measure.parseOptionsFromString('1 hl')).toEqual({ml: 100000});
      expect(Measure.parseOptionsFromString('1 kl')).toEqual({ml: 1000000});
    });
    it("should parse long mass inputs", function() {
      expect(Measure.parseOptionsFromString('1 gram')).toEqual({g: 1});
      expect(Measure.parseOptionsFromString('1 kilogram')).toEqual({g: 1000});
    });
    it("should parse abbreviated mass inputs", function() {
      expect(Measure.parseOptionsFromString('1 g')).toEqual({g: 1});
      expect(Measure.parseOptionsFromString('1 g.')).toEqual({g: 1});
      expect(Measure.parseOptionsFromString('1 kg')).toEqual({g: 1000});
      expect(Measure.parseOptionsFromString('1 kg.')).toEqual({g: 1000});
    });
  });
  describe("output", function() {
    it("should provide output for volume units", function() {
      expect(measure('1 milliliter').milliliters()).toEqual(1);
      expect(measure('1 centiliter').centiliters()).toEqual(1);
      expect(measure('1 deciliter').deciliters()).toEqual(1);
      expect(measure('1 liter').liters()).toEqual(1);
      expect(measure('1 decaliter').decaliters()).toEqual(1);
      expect(measure('1 hectoliter').hectoliters()).toEqual(1);
      expect(measure('1 kiloliter').kiloliters()).toEqual(1);
    });
    it("should provide output for mass units", function() {
      expect(measure('1 gram').grams()).toEqual(1);
      // expect(measure('1 kilogram').kilograms()).toEqual(1);
    });
  });
});