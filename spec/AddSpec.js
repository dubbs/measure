describe("add", function() {
  beforeEach(function() {});
  it("US units to ml", function() {
    expect(measure().add({drop: 1}).ml()).toEqual(0.05);
    expect(measure().add({teaspoon: 1}).ml()).toEqual(4.93);
    expect(measure().add({tablespoon: 1}).ml()).toEqual(14.79);
    expect(measure().add({fluidounce: 1}).ml()).toEqual(29.57);
    expect(measure().add({jigger: 1}).ml()).toEqual(44.36);
    expect(measure().add({gill: 1}).ml()).toEqual(118.29);
    expect(measure().add({cups: 1}).ml()).toEqual(236.59);
    expect(measure().add({pint: 1}).ml()).toEqual(473.18);
    expect(measure().add({fifth: 1}).ml()).toEqual(750);
    expect(measure().add({quart: 1}).ml()).toEqual(946.35);
    expect(measure().add({gallon: 1}).ml()).toEqual(3785.41);
  });
});