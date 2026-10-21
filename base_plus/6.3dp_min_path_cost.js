//Нужно добраться из левого верхнего угла в правый нижний, двигаясь только вправо и вниз, и заплатить как можно меньше.
// dp[row][col] =
//     grid[row][col] +
//     Math.min(dp[row - 1][col], dp[row][col - 1]);
const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];

const createStartMap = (priceData) => {

  const createCleanRow = (size) => {
    const newRow = new Array(size).fill(0);
    return newRow;
  };

  // 1. Формируем первую строку
  //---------------------------------------------------------------------
  const firstPriceRow = priceData[0];
  const firstResultRow = createCleanRow(firstPriceRow.length);
  firstResultRow[0] = firstPriceRow[0];

  for (let i = 1; i < firstPriceRow.length; i++) {
    firstResultRow[i] = firstPriceRow[i] + firstResultRow[i - 1];
  };
  //----------------------------------------------------------------------
  const result = [
    firstResultRow,
  ];

  //2. Формируем остальные строки пустые, но с заполненным 0-вым элементом
  //----------------------------------------------------------------------

  for (let i = 1; i < priceData.length; i++) {
    const priceRow = priceData[i];
    const newRow = createCleanRow(priceRow.length);

    newRow[0] = priceRow[0] + result[i - 1][0];
    result.push(newRow);
  }
  return result;
}
const dp_min_path_cost = (priceList) => {
  const dp = createStartMap(priceList);

  for (let i = 1; i < dp.length; i++) { //цикл по строкам, первая заполнена так что скипаем ее

    const dp_currentRow = dp[i];
    const dp_prevRow = dp[i - 1];

    const price_currentRow = priceList[i];

    for (let k = 1; k < price_currentRow.length; k++) {//цикл по єлементам конкретной строки, первая клетка заполнена так что скипаем ее

      const costFromTop = price_currentRow[k] + dp_prevRow[k];
      const costFromLeft = price_currentRow[k] + dp_currentRow[k - 1];
      const minCost = Math.min(costFromTop, costFromLeft);

      dp_currentRow[k] = minCost;
    };

  };

  return dp;
};

// Временная сложность: O(rows * cols), потому что каждая клетка обрабатывается один раз.

// Пространственная сложность: O(rows * cols), потому что ты создаёшь DP-таблицу.
console.log('dp_min_path_cost', dp_min_path_cost(grid));