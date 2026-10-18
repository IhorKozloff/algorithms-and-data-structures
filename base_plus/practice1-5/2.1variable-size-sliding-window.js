//Приложение отслеживает расходы пользователя за каждый день:
//Нужно найти минимальный непрерывный период, за который расходы составляют не менее 100.
//Верни длину этого периода. Если такого периода нет, верни 0.
const expenses = [40, 15, 25, 10, 35, 20, 30, 15, 45, 10, 25, 20];
const minimum = 100;

const practice_variable_size_sliding_window = (array, minimum) => {
  let left = 0;
  let right = 0;
  let sum = 0;
  let minPeriodLength = Infinity;

  for (right; right < array.length; right++) {
    sum += array[right];
    console.log('------------New iteration-------------');
    console.log('Start Sum', sum);


    if (sum >= minimum) {
      while (sum >= minimum) {

        const windowLength = right - left + 1;
        if (windowLength < minPeriodLength) {
          minPeriodLength = windowLength;
        }

        sum -= array[left];
        left++
      };

    }

    console.log('End Sum', sum);
  }
  return minPeriodLength === Infinity ? 0 : minPeriodLength;
};
console.log('result', practice_variable_size_sliding_window(expenses, 100));