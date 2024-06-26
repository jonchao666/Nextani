const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const season = ["winter", "spring", "summer", "fall"];
const currentMonth = currentDate.getMonth() + 1;
const currentSeasonIndex = Math.floor((currentMonth - 1) / 3);

function getLastTwoSeasonAndYears() {
  let lastTwoSeasonAndYears = [];
  const seasons = ["winter", "spring", "summer", "fall"];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentSeasonIndex = Math.floor((currentMonth - 1) / 3);

  if (currentSeasonIndex === 0) {
    lastTwoSeasonAndYears.push({ season: "fall", year: currentYear - 1 });
    lastTwoSeasonAndYears.push({ season: "summer", year: currentYear - 1 });
  } else if (currentSeasonIndex === 1) {
    lastTwoSeasonAndYears.push({ season: "winter", year: currentYear });
    lastTwoSeasonAndYears.push({ season: "fall", year: currentYear - 1 });
  } else {
    lastTwoSeasonAndYears.push({
      season: seasons[currentSeasonIndex - 1],
      year: currentYear,
    });
    lastTwoSeasonAndYears.push({
      season: seasons[currentSeasonIndex - 2],
      year: currentYear,
    });
  }

  return lastTwoSeasonAndYears;
}

function getLastSeasonAndYear() {
  let lastSeasonAndYear = [];
  if (currentSeasonIndex === 0) {
    lastSeasonAndYear.push({ season: "winter", year: currentYear });
  } else {
    lastSeasonAndYear.push({
      season: season[currentSeasonIndex],
      year: currentYear,
    });
  }
  return lastSeasonAndYear;
}

function getNextSeasonAndYear() {
  let nextSeasonAndYear = [];
  if (currentSeasonIndex === 3) {
    nextSeasonAndYear.push({ season: "winter", year: currentYear + 1 });
  } else {
    nextSeasonAndYear.push({
      season: season[currentSeasonIndex + 1],
      year: currentYear,
    });
  }
  return nextSeasonAndYear;
}

export { getLastTwoSeasonAndYears, getLastSeasonAndYear, getNextSeasonAndYear };
