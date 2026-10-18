//У нас есть массив из 12 дней, и нужно найти максимальную сумму продаж за 4 последовательных дня.
const dailySales = [
  120, 180, 150, 90, 210, 240, 170,
  130, 200, 260, 190, 220
];
const dailyQuantity = 4;
const practice_slidingWindow = (array, size) => {
  let left = 0;
  let right = 0;
  let result = 0;

  let windowSum = 0;

  for (right; right < array.length; right++) {
    if (right < size) {
      result += array[right];
      windowSum += array[right];
      continue;
    }

    windowSum = windowSum + array[right] - array[left];
    if (windowSum > result) {
      result = windowSum;
    };
    left++

  };

  console.log('right', right, 'sum', result)
  return result
};
console.log(practice_slidingWindow(dailySales, dailyQuantity));