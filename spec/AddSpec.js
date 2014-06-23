describe("", function() {
  beforeEach(function() {});
  it("add", function() {
    expect(measure().add({drops: 1}).drops()).toEqual(1);
    expect(measure().add({teaspoons: 2}).teaspoons()).toEqual(2);
    expect(measure().add({tablespoons: 3}).tablespoons()).toEqual(3);
    expect(measure().add({fluidounces: 4}).fluidounces()).toEqual(4);
    expect(measure().add({jiggers: 5}).jiggers()).toEqual(5);
    expect(measure().add({gills: 6}).gills()).toEqual(6);
    expect(measure().add({cups: 7}).cups()).toEqual(7);
    expect(measure().add({pints: 8}).pints()).toEqual(8);
    expect(measure().add({fifths: 9}).fifths()).toEqual(9);
    expect(measure().add({quarts: 10}).quarts()).toEqual(10);
    expect(measure().add({gallons: 10}).gallons()).toEqual(10);
  });
});