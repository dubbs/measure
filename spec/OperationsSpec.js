describe("basic operations", function() {
  it("should add", function() {
    expect(measure('1 teaspoon').add('1 teaspoon').teaspoons()).toEqual(2);
  });
  it("should subtract", function() {
    expect(measure('2 teaspoon').subtract('1 teaspoon').teaspoons()).toEqual(1);
  });
  it("should multiply", function() {
    expect(measure('1 teaspoon').multiply(2).teaspoons()).toEqual(2);
  });
  it("should divide", function() {
    expect(measure('2 teaspoon').divide(2).teaspoons()).toEqual(1);
  });
});