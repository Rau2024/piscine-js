const orbitalPeriods = {
  earth: 1.0,
  mercury: 0.2408467,
  venus: 0.61519726,
  mars: 1.8808158,
  jupiter: 11.862615,
  saturn: 29.447498,
  uranus: 84.016846,
  neptune: 164.79132,
};

const dogYears = (planet, seconds) => {
  const earthYears = seconds / 31557600;
  const planetYears = earthYears / orbitalPeriods[planet.toLowerCase()];
  const dogYears = planetYears * 7;
  return parseFloat(dogYears.toFixed(2));
};
