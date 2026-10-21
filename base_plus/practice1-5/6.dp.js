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
    
    for(let j = 1; j < currentString.length; j++) {
      
      //Вычисляем значение ячейки, суммировав те что слева на 1 и сверху на 1 ну и + 1 конечно же
      currentString[j] = currentString[j - 1] + prevString[j];
    };
  };

  const result = dp[rows - 1][cols - 1];
  return result;
}

const warehouseRows = 4;
const warehouseCols = 5;
console.log(dp_1(warehouseRows, warehouseCols));