describe("parseOptionsFromString", function() {
  beforeEach(function() {});
  it("should parse simple inputs", function() {
    expect(Measure.prototype.parseOptionsFromString('1 teaspoon')).toEqual({teaspoons: 1});
  });
});