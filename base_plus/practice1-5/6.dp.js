//Робот движется по складу только вправо или вниз
//dp[i][j] - это колличество маршрутов
// A_
//   |__
//      |___B  - это маршрут, dp[i][j] хранит к-во таких комбинаций, с помощью которых можно попасть из А в Б.
const dp_1 = (rows, cols) => {

  //Заполняем первую строку
  //В первой строке в каждую ячейку только один маршрут вправо->вправо->вправо->вправо->вправо->вправо->
  //0й индекс тоже 1, считается чьл 1 маршрут попасть в место где мы стартуем.

  const firstRow = new Array(cols).fill(1);

  const dp = [
    firstRow,
  ];
  //Формируем матрицу с посчитаной первой колонкой, там тоже все 1, вниз->вниз->вниз->вниз->вниз->вниз->вниз-> - до любой ячейки маршрут один
  for (let i = 1; i < rows; i++) {


    const newRow = new Array(cols).fill(0);
    newRow[0] = 1;

    dp.push(newRow);
  };
  console.log(dp)
  //КОгда все готово - заполняем матрицу
  for (let i = 1; i < dp.length; i++) {

    const currentString = dp[i];
    const prevString = dp[i - 1];

    for (let j = 1; j < currentString.length; j++) {

      //Вычисляем значение ячейки, суммировав те что слева на 1 и сверху на 1 ну и + 1 конечно же
      currentString[j] = currentString[j - 1] + prevString[j];
    };
  };

  const result = dp[rows - 1][cols - 1];
  return result;
}

const warehouseRows = 4;
const warehouseCols = 5;
//console.log(dp_1(warehouseRows, warehouseCols));


const dp_2 = (grid) => {

  const createRow = (numberOfRow) => {
    return new Array(grid[numberOfRow].length).fill(0);
  };

  const createFirstRow = () => {
    const priceForFisrtRow = grid[0];
    const firstRow = new Array(grid[0].length).fill(0);
    let isBlocked = false;

    for (let i = 0; i < firstRow.length; i++) {
      if (isBlocked === true || priceForFisrtRow[i] === 1) {
        isBlocked = true;
        firstRow[i] = 0;
      } else {
        firstRow[i] = 1;
      };
    };
    return firstRow;
  };

  const createMap = () => {

    const firstRow = createFirstRow();
    const dp = [
      firstRow,
    ];

    for (let i = 1; i < grid.length; i++) {
      const newRow = createRow(i);
      const prevRow = dp[i - 1];

      if (prevRow[0] !== 0 && grid[i][0] !== 1) {
        newRow[0] = 1;
      };

      dp.push(newRow);
    }
    return dp;
  };

  const dp = createMap();

  for (let i = 1; i < grid.length; i++) {
    const currentRow = dp[i];
    const priceListForCurrentRow = grid[i];

    const prevRow = dp[i - 1];

    for (let k = 1; k < currentRow.length; k++) {

      if (priceListForCurrentRow[k] === 1) {
        dp[i][k] = 0;
        continue;
      };

      const topSum = prevRow[k];
      const leftSum = currentRow[k - 1];

      dp[i][k] = topSum + leftSum;
    }
  }
  console.log(dp)
  const lastRow = dp[grid.length - 1];
  const lastEl = lastRow[lastRow.length - 1];

  return lastEl;
};
const warehouse = [
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
];
//console.log(dp_2(warehouse));



const dp_3 = (grid) => {
  //First Row
  const firstRow = new Array(grid[0].length).fill(0);
  const priceForFirstRow = grid[0];

  firstRow[0] = priceForFirstRow[0];

  for (let i = 1; i < firstRow.length; i++) {
    firstRow[i] = firstRow[i - 1] + priceForFirstRow[i];
  };
  //---------------------
  const dp = [
    firstRow,
  ];
  //-----------Create matrix + first column
  for (let i = 1; i < grid.length; i++) {
    const newRow = new Array(grid[i].length).fill(0);
    const priceForCurrentRow = grid[i];
    const prevRow = dp[i - 1];

    newRow[0] = prevRow[0] + priceForCurrentRow[0];
    dp.push(newRow);
  };


  //---- Main logic
  for (let i = 1; i < dp.length; i++) {
    // console.log('Row iteration')
    // console.log('i', i)
    // console.log('dp.length', dp.length)
    const currentRow = dp[i];
    const priceForCUrrentRow = grid[i];

    const prevRow = dp[i - 1];

    for (let k = 1; k < currentRow.length; k++) {

      const currentCost = priceForCUrrentRow[k];
      const sumFromTop = prevRow[k];
      const sumForLeft = currentRow[k - 1];

      currentRow[k] = currentCost + Math.min(sumFromTop, sumForLeft);
    };
  };

  const lastRow = dp[dp.length - 1];
  const lasRowEl = lastRow[lastRow.length - 1];

  const createPath = () => {


  }


  return {
    cost: lasRowEl,
    dp
  };
}
const serverCosts = [
  [4, 2, 8, 3],
  [5, 1, 2, 7],
  [9, 3, 1, 2],
  [6, 4, 2, 1],
];
const { dp: matrix, cost } = dp_3(serverCosts);
console.log(cost);
matrix.forEach(i => console.log(i));


const dp_staircase = (totalSteps, possibleJumps) => {
  const dp = new Array(totalSteps + 1).fill(0);
  dp[0] = 1; //Потому что существует один способ оказаться на нулевой ступеньке — не делать ни одного шага.
  dp[1] = 1;

  for (let i = 2; i < dp.length; i++) {
    let sumForCurrentDPI = 0;
    for (const step of possibleJumps) {
      if (i - step >= 0) {
        sumForCurrentDPI += dp[i - step];
      }
    }
    dp[i] = sumForCurrentDPI;
  }

  return dp
};
const totalSteps = 7;
const possibleJumps = [1, 2, 3, 4, 5];

console.log(dp_staircase(totalSteps, possibleJumps))