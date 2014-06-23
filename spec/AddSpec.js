describe("US units", function() {
  beforeEach(function() {});
  it("add to ml", function() {
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
  it("add to fl oz", function() {
    expect(measure().add({drop: 1}).floz()).toEqual(1/576);
    expect(measure().add({teaspoon: 1}).floz()).toEqual(1/6);
    expect(measure().add({tablespoon: 1}).floz()).toEqual(1/2);
    expect(measure().add({fluidounce: 1}).floz()).toEqual(1);
    expect(measure().add({jigger: 1}).floz()).toEqual(1.5);
    expect(measure().add({gill: 1}).floz()).toEqual(4);
    expect(measure().add({cups: 1}).floz()).toEqual(8);
    expect(measure().add({pint: 1}).floz()).toEqual(16);
    expect(measure().add({fifth: 1}).floz()).toEqual(25.36);
    expect(measure().add({quart: 1}).floz()).toEqual(32);
    expect(measure().add({gallon: 1}).floz()).toEqual(128);
  });
});