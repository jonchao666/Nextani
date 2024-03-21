//get last Pseudo-element need when use flex-evenly
function calculatePlaceholdersForLastRow(
  containerWidth,
  itemWidth,
  itemsCount
) {
  let itemsPerRow = Math.floor(containerWidth / itemWidth);

  if (itemsCount % itemsPerRow === 0) {
    return 0;
  }

  let placeholdersNeeded = itemsPerRow - (itemsCount % itemsPerRow);

  return placeholdersNeeded;
}

export { calculatePlaceholdersForLastRow };
