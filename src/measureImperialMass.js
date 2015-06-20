function roundUnits(ratio) {
  return Math.round((ratio + 0.00001) * 100) / 100;
}

// Imperial 

var gPerPound = 453.592;

var mass = {
  drams: roundUnits(gPerPound / 256),
  ounces: roundUnits(gPerPound / 16),
  pounds: roundUnits(gPerPound),
  stones: roundUnits(gPerPound * 14),
  quarters: roundUnits(gPerPound * 28),
  hundredweights: roundUnits(gPerPound * 112),
  ton: roundUnits(gPerPound * 2240)
};

module.exports = mass;
