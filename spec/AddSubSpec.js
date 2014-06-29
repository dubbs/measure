describe("operations", function() {
  beforeEach(function() {});
  it("should add for each unit", function() {
    expect(measure('1 teaspoon').add('1 teaspoon').teaspoons()).toEqual(2);
    expect(measure('1 tablespoon').add('1 tablespoon').tablespoons()).toEqual(2);
    expect(measure('1 fluidounce').add('1 fluidounce').fluidounces()).toEqual(2);
    expect(measure('1 gill').add('1 gill').gills()).toEqual(2);
    expect(measure('1 cup').add('1 cup').cups()).toEqual(2);
    expect(measure('1 pint').add('1 pint').pints()).toEqual(2);
    expect(measure('1 quart').add('1 quart').quarts()).toEqual(2);
    expect(measure('1 gallon').add('1 gallon').gallons()).toEqual(2);
  });
  it("should subtract for each unit", function() {
    expect(measure('3 1/4 teaspoon').subtract('2 3/4 teaspoon').teaspoons()).toEqual(0.5);
    expect(measure('3 1/4 tablespoon').subtract('2 3/4 tablespoon').tablespoons()).toEqual(0.5);
    expect(measure('3 1/4 fluidounce').subtract('2 3/4 fluidounce').fluidounces()).toEqual(0.5);
    expect(measure('3 1/4 gill').subtract('2 3/4 gill').gills()).toEqual(0.5);
    expect(measure('3 1/4 cup').subtract('2 3/4 cup').cups()).toEqual(0.5);
    expect(measure('3 1/4 pint').subtract('2 3/4 pint').pints()).toEqual(0.5);
    expect(measure('3 1/4 quart').subtract('2 3/4 quart').quarts()).toEqual(0.5);
    expect(measure('3 1/4 gallon').subtract('2 3/4 gallon').gallons()).toEqual(0.5);
  });
  it("should multiply for each unit", function() {
    expect(measure('1 1/2 teaspoon').multiply(3).teaspoons()).toEqual(4.5);
    expect(measure('1 1/2 tablespoon').multiply(3).tablespoons()).toEqual(4.5);
    expect(measure('1 1/2 fluidounce').multiply(3).fluidounces()).toEqual(4.5);
    expect(measure('1 1/2 gill').multiply(3).gills()).toEqual(4.5);
    expect(measure('1 1/2 cup').multiply(3).cups()).toEqual(4.5);
    expect(measure('1 1/2 pint').multiply(3).pints()).toEqual(4.5);
    expect(measure('1 1/2 quart').multiply(3).quarts()).toEqual(4.5);
    expect(measure('1 1/2 gallon').multiply(3).gallons()).toEqual(4.5);
  });
  it("should divide for each unit", function() {
    expect(measure('6 1/2 teaspoon').divide(2).teaspoons()).toEqual(3.25);
    expect(measure('6 1/2 tablespoon').divide(2).tablespoons()).toEqual(3.25);
    expect(measure('6 1/2 fluidounce').divide(2).fluidounces()).toEqual(3.25);
    expect(measure('6 1/2 gill').divide(2).gills()).toEqual(3.25);
    expect(measure('6 1/2 cup').divide(2).cups()).toEqual(3.25);
    expect(measure('6 1/2 pint').divide(2).pints()).toEqual(3.25);
    expect(measure('6 1/2 quart').divide(2).quarts()).toEqual(3.25);
    expect(measure('6 1/2 gallon').divide(2).gallons()).toEqual(3.25);
  });
});