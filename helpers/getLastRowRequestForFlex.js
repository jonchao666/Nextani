//get last Pseudo-element need when use flex-evenly
function calculatePlaceholdersForLastRow(
  containerWidth,
  itemWidth,
  itemsCount
) {
  // 计算每行可以容纳的网格项数量
  let itemsPerRow = Math.floor(containerWidth / itemWidth);

  // 如果网格项正好填满最后一行，不需要添加伪元素
  if (itemsCount % itemsPerRow === 0) {
    return 0;
  }

  // 计算为了让最后一行左对齐所需添加的伪元素数量
  let placeholdersNeeded = itemsPerRow - (itemsCount % itemsPerRow);

  return placeholdersNeeded;
}

export { calculatePlaceholdersForLastRow };
