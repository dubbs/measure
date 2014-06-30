describe("mass", function() {
  beforeEach(function() {});
  it("should add for customary units", function() {
    expect(measure('1 dram').add('1 dram').drams()).toEqual(2);
    expect(measure('1 ounce').add('1 ounce').ounces()).toEqual(2);
    expect(measure('1 pound').add('1 pound').pounds()).toEqual(2);
    expect(measure('1 quarter').add('1 quarter').quarters()).toEqual(2);
  });
  it("should subtract for customary units", function() {
    expect(measure('1 2/3 drams').subtract('1/3 dram').drams()).toEqual(1.33);
    expect(measure('1 2/3 ounces').subtract('1/3 ounce').ounces()).toEqual(1.33);
    expect(measure('1 2/3 pounds').subtract('1/3 pound').pounds()).toEqual(1.33);
    expect(measure('1 2/3 quarters').subtract('1/3 quarter').quarters()).toEqual(1.33);
  });
  it("should multiply for each unit", function() {
    expect(measure('2 drams').multiply(1.5).drams()).toEqual(3);
    expect(measure('2 ounces').multiply(1.5).ounces()).toEqual(3);
    expect(measure('2 pounds').multiply(1.5).pounds()).toEqual(3);
    expect(measure('2 quarters').multiply(1.5).quarters()).toEqual(3);
  });
  it("should divide for each unit", function() {
    expect(measure('2 drams').divide(4).drams()).toEqual(0.5);
    expect(measure('2 ounces').divide(4).ounces()).toEqual(0.5);
    expect(measure('2 pounds').divide(4).pounds()).toEqual(0.5);
    expect(measure('2 quarters').divide(4).quarters()).toEqual(0.5);
  });
});