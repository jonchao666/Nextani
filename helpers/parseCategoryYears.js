export function parseYears(y) {
  let years = [];

  if (isNaN(y)) {
    if (y.includes("-")) {
      const [startYear, endYear] = y.split("-").map(Number);
      for (let year = startYear; year >= endYear; year--) {
        years.push(year);
      }
    } else if (y.endsWith("s")) {
      const decade = Number(y.substring(0, 4));
      for (let year = decade; year < decade + 10; year++) {
        years.push(year);
      }
    } else if (y === "Earlier") {
      for (let year = 1979; year >= 1950; year--) {
        years.push(year);
      }
    }
  } else {
    return y;
  }

  return years;
}
