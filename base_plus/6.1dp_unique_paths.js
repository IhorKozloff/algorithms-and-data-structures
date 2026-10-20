//dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
//Твоя задача — написать функцию, которая возвращает количество возможных маршрутов от верхней левой клетки до нижней правой, 
// если двигаться можно только вправо и вниз.

const createRouteMap = (rows, cols) => {
  const createRow = (num, content) => new Array(num).fill(content);

  const routeMap = [];

  for (let i = 0; i < rows; i++) {
    let newRow;

    if (i === 0) {
      newRow = createRow(cols, 1);
    } else {
      newRow = createRow(cols, 0);
      newRow[0] = 1
    }

    routeMap.push(newRow);
  };
  return routeMap;
};

const dp_unique_paths = (rows, cols) => {
  const routeMap = createRouteMap(rows, cols);

  for (let i = 1; i < routeMap.length; i++) { // перебираем строки, тоесть елементы массива routeMap

    // на каждой итерации нужно перебрать массив
    for (let k = 1; k < cols; k++) {
      const currentItemValue = routeMap[i][k - 1] + routeMap[i - 1][k];
      routeMap[i][k] = currentItemValue;
    }
  }

  return routeMap[rows - 1][cols - 1];
};
// Сложность:
// - Время — \(O(rows \times cols)\), потому что заполняем каждую клетку таблицы.
// - Память — \(O(rows \times cols)\), потому что храним всю таблицу.
console.log('dp_unique_paths', dp_unique_paths(3, 3));