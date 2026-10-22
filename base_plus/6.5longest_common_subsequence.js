// Правила у нас уже есть:
// - Фрукты совпали: берём значение по диагонали и прибавляем 1.
// - Фрукты не совпали: берём большее значение сверху или слева.



// Алгоритм восстановления
// Находимся в клетке dp[i][j]:
// 1. Если фрукты совпадают — добавляем фрукт в результат и идём по диагонали (i--, j--).
// 2. Если фрукты не совпадают:
//    - если сверху больше или равно значению слева — идём вверх (i--);
//    - иначе — идём влево (j--).
// 3. Останавливаемся, когда i === 0 или j === 0.
// 4. Переворачиваем результат, потому что собирали его с конца.

const getLCS = (firstArr, secondArr) => {
  //Нужно построить такую dp матрицу для начала
  //   fruitsA \ fruitsB		  x     banana	apple	kiwi	mango	grape
  //                  x   	  0	      0	      0	    0	    0	   0
  //            apple	        0					
  //            banana	      0					
  //            orange	      0					
  //            kiwi	        0					
  //            grape   	    0
  const createRow = (size) => [0, ...new Array(size).fill(0)];
  const dp = [];
  for (let i = 0; i < firstArr.length + 1; i++) { //что б нулевая строка с нулями была
    dp.push(createRow(secondArr.length));
  };

  //Заполняем матрицу
  for (let i = 1; i < dp.length; i++) { // итерируем по строками
    const currentRow = dp[i];
    const currentItemInRow = firstArr[i - 1];// !!! в єтом массиве нет специальносозданного єлемента с нулем

    const prevRow = dp[i - 1];

    for (let k = 1; k < currentRow.length; k++) {
      const currentItemInColumn = secondArr[k - 1];// !!! в єтом массиве нет специальносозданного єлемента с нулем

      if (currentItemInRow === currentItemInColumn) {
        // - Фрукты совпали: берём значение по диагонали и прибавляем 1.
        const diagonalValue = prevRow[k - 1];
        dp[i][k] = diagonalValue + 1;

      } else {
        // - Фрукты не совпали: берём большее значение сверху или слева.
        const valueOnTop = prevRow[k];
        const valueOnLeft = currentRow[k - 1];
        dp[i][k] = Math.max(valueOnTop, valueOnLeft);
      }
    }
  }

  const recoveryPath = () => {
    const result = [];
    const lastRowIndex = dp.length - 1;
    const lastElIndex = dp[lastRowIndex].length - 1;

    let i = lastRowIndex;
    let k = lastElIndex;

    while (i > 0 && k > 0) {
      const itemX = secondArr[k - 1];
      const itemY = firstArr[i - 1];

      if (itemX === itemY) {
        result.push(itemX);
        i--;
        k--;
      } else {
        const currentRow = dp[i];
        const prevRow = dp[i - 1];

        const valueOnTop = prevRow[k];
        const valueOnLeft = currentRow[k - 1];

        if (valueOnTop >= valueOnLeft) {
          i--
        } else {
          k--
        };
      }
    }

    const reversedResult = result.reverse();
    return reversedResult;
  }
  const path = recoveryPath();
  const result = dp;
  return {
    result,
    path
  };
};
const fruitsA = ['apple', 'banana', 'orange', 'kiwi', 'grape'];
const fruitsB = ['banana', 'apple', 'kiwi', 'mango', 'grape'];
console.log(getLCS(fruitsA, fruitsB));