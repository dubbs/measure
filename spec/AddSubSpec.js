describe("operations", function() {
  beforeEach(function() {});
  it("should add for each unit", function() {
    expect(measure({drops: 1}).add({drops: 1}).drops()).toEqual(2);
    expect(measure({teaspoons: 1}).add({teaspoons: 1}).teaspoons()).toEqual(2);
    expect(measure({tablespoons: 1}).add({tablespoons: 1}).tablespoons()).toEqual(2);
    expect(measure({fluidounces: 1}).add({fluidounces: 1}).fluidounces()).toEqual(2);
    expect(measure({jiggers: 1}).add({jiggers: 1}).jiggers()).toEqual(2);
    expect(measure({gills: 1}).add({gills: 1}).gills()).toEqual(2);
    expect(measure({cups: 1}).add({cups: 1}).cups()).toEqual(2);
    expect(measure({pints: 1}).add({pints: 1}).pints()).toEqual(2);
    expect(measure({fifths: 1}).add({fifths: 1}).fifths()).toEqual(2);
    expect(measure({quarts: 1}).add({quarts: 1}).quarts()).toEqual(2);
    expect(measure({gallons: 1}).add({gallons: 1}).gallons()).toEqual(2);
  });
  it("should subtract for each unit", function() {
    expect(measure({drops: 3.25}).subtract({drops: 2.75}).drops()).toEqual(0.5);
    expect(measure({teaspoons: 3.25}).subtract({teaspoons: 2.75}).teaspoons()).toEqual(0.5);
    expect(measure({tablespoons: 3.25}).subtract({tablespoons: 2.75}).tablespoons()).toEqual(0.5);
    expect(measure({fluidounces: 3.25}).subtract({fluidounces: 2.75}).fluidounces()).toEqual(0.5);
    expect(measure({jiggers: 3.25}).subtract({jiggers: 2.75}).jiggers()).toEqual(0.5);
    expect(measure({gills: 3.25}).subtract({gills: 2.75}).gills()).toEqual(0.5);
    expect(measure({cups: 3.25}).subtract({cups: 2.75}).cups()).toEqual(0.5);
    expect(measure({pints: 3.25}).subtract({pints: 2.75}).pints()).toEqual(0.5);
    expect(measure({fifths: 3.25}).subtract({fifths: 2.75}).fifths()).toEqual(0.5);
    expect(measure({quarts: 3.25}).subtract({quarts: 2.75}).quarts()).toEqual(0.5);
    expect(measure({gallons: 3.25}).subtract({gallons: 2.75}).gallons()).toEqual(0.5);
  });
  it("should multiply for each unit", function() {
    expect(measure({drops: 1.5}).multiply({drops: 3}).drops()).toEqual(4.5);
    expect(measure({teaspoons: 1.5}).multiply({teaspoons: 3}).teaspoons()).toEqual(4.5);
    expect(measure({tablespoons: 1.5}).multiply({tablespoons: 3}).tablespoons()).toEqual(4.5);
    expect(measure({fluidounces: 1.5}).multiply({fluidounces: 3}).fluidounces()).toEqual(4.5);
    expect(measure({jiggers: 1.5}).multiply({jiggers: 3}).jiggers()).toEqual(4.5);
    expect(measure({gills: 1.5}).multiply({gills: 3}).gills()).toEqual(4.5);
    expect(measure({cups: 1.5}).multiply({cups: 3}).cups()).toEqual(4.5);
    expect(measure({pints: 1.5}).multiply({pints: 3}).pints()).toEqual(4.5);
    expect(measure({fifths: 1.5}).multiply({fifths: 3}).fifths()).toEqual(4.5);
    expect(measure({quarts: 1.5}).multiply({quarts: 3}).quarts()).toEqual(4.5);
    expect(measure({gallons: 1.5}).multiply({gallons: 3}).gallons()).toEqual(4.5);
  });
  it("should divide for each unit", function() {
    expect(measure({drops: 6.5}).divide({drops: 2}).drops()).toEqual(3.25);
    expect(measure({teaspoons: 6.5}).divide({teaspoons: 2}).teaspoons()).toEqual(3.25);
    expect(measure({tablespoons: 6.5}).divide({tablespoons: 2}).tablespoons()).toEqual(3.25);
    expect(measure({fluidounces: 6.5}).divide({fluidounces: 2}).fluidounces()).toEqual(3.25);
    expect(measure({jiggers: 6.5}).divide({jiggers: 2}).jiggers()).toEqual(3.25);
    expect(measure({gills: 6.5}).divide({gills: 2}).gills()).toEqual(3.25);
    expect(measure({cups: 6.5}).divide({cups: 2}).cups()).toEqual(3.25);
    expect(measure({pints: 6.5}).divide({pints: 2}).pints()).toEqual(3.25);
    expect(measure({fifths: 6.5}).divide({fifths: 2}).fifths()).toEqual(3.25);
    expect(measure({quarts: 6.5}).divide({quarts: 2}).quarts()).toEqual(3.25);
    expect(measure({gallons: 6.5}).divide({gallons: 2}).gallons()).toEqual(3.25);
  });
});