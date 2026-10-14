
//Найти наибольшую сумму нескольких последовательных элкментов
const max_sum_window = (sales, windowSize) => {
  const calculateSum = (array, start, length) => {
    let result = 0;
    const lastIndex = start + length;

    for (let i = start; i < lastIndex; i++) {
      result += array[i];
    };
    return result;
  };

  let greatesSum = 0;

  for (let i = 0; i <= sales.length - windowSize; i++) {
    const currentSum = calculateSum(sales, i, windowSize);
    if (currentSum > greatesSum) {
      greatesSum = currentSum;
    };
  };
  return greatesSum;
}
//Функция итерирует n єлементов циклом for и k єлементов calculateSum. Сложность О(n * k); Смотри ниже другой вариант.

const max_sum_window2 = (sales, windowSize) => {
  let greatesSum = 0;
  let currentSumm = 0;

  for (let i = 0; i < windowSize; i++) {
    greatesSum += sales[i];
  };
  currentSumm = greatesSum;

  for (let i = 1; i <= sales.length - windowSize; i++) {
    const lastElIndex = i + windowSize - 1;
    currentSumm = currentSumm - sales[i - 1] + sales[lastElIndex];
    if (currentSumm > greatesSum) {
      greatesSum = currentSumm;
    }
  }
  return greatesSum;
}
//По времени O(n), по памяти O(1)
const sales = [120, 80, 150, 90, 200, 110, 170];
const windowSize = 3;
console.log(max_sum_window2(sales, windowSize))