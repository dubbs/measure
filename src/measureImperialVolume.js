function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// Imperial Avoirdupois 

var mlPerOunce = 28.4131;
var mlPerGallon = 4546.09; // 10 pounds of water in the year 1824

var volume = {
  teaspoons: roundUnits(mlPerOunce / 6),
  tablespoons: roundUnits(mlPerOunce / 2),
  fluidounces: roundUnits(mlPerOunce),
  shots: roundUnits(mlPerOunce * 1.5),
  gills: roundUnits(mlPerGallon / 32),
  cups: roundUnits(mlPerGallon / 16),
  pints: roundUnits(mlPerGallon / 8),
  fifths: roundUnits(mlPerGallon / 5),
  quarts: roundUnits(mlPerGallon / 4),
  gallons: roundUnits(mlPerGallon)
};

module.exports = volume;
