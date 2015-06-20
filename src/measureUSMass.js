function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// US Avoirdupois

var gPerPound = 453.592;

var mass = {
  grains: roundUnits(gPerPound / 7000),
  drams: roundUnits(gPerPound / 256),
  ounces: roundUnits(gPerPound / 16),
  pounds: roundUnits(gPerPound),
  quarters: roundUnits(gPerPound * 25),
  hundredweights: roundUnits(gPerPound * 100),
  ton: roundUnits(gPerPound * 2000)
};

module.exports = mass;
