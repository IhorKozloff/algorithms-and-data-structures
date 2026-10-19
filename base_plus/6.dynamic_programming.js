//Посчитать колличество способов подняться на n ступенек

const dpFn = (number) => {
  const steps = [1, 2]
  const dp = new Array(number + 1).fill(0);
  dp[0] = 1;
  //dp[1] = 1;
  //dp[n] = dp[n - 1] + dp[n - 2] // при условии  что steps = [1, 2]
  //dp[n] = dp[n - 1] + dp[n - 2] + dp[n - 3] + n[n - 4// при условии  что steps = [1, 2, 3, 4]


  for (let i = 2; i < dp.length; i++) {
    //dp[i] = dp[i - 1] + dp[i - 2];
    let sum = 0;

    for (const step of steps) {
      if (i - step >= 0) {
        sum += dp[i - step];
      }

    }
    dp[i] = sum;
  }
}
//console.log(dpFn(5))

//ЧИла фибоначи, каждое следующее число равно сумме двух предидущих
const fibFn = (numbersArray) => {

};
const numbers = [5, 10, 20, 30];
console.log(fibFn(numbers))

const sequenceMemo = (fibNumIndex, firstNumValue, secondNumValue, memo = {}) => {
  //fibNum - например 5е число фибоначи, в линейке где первое это first, а второе second
  if (fibNumIndex === 0) {
    return firstNumValue;
  };

  if (fibNumIndex === 1) {
    return secondNumValue;
  };

  if (memo[fibNumIndex] !== undefined) {
    return memo[fibNumIndex];
  };

  const sum = sequenceMemo(fibNumIndex - 1, firstNumValue, secondNumValue, memo) + sequenceMemo(fibNumIndex - 2, firstNumValue, secondNumValue, memo);
  memo[fibNumIndex] = sum;
  return sum;
};

//console.log(sequenceMemo(4, 5, 10, {}));


//ЗАдача с ограблением домов
// Есть пять домов, в каждом хранится определённая сумма денег:
// Правило: нельзя грабить два соседних дома, иначе сработает сигнализация.
// Нужно найти максимальную сумму денег, которую можно получить

const houses_dpFn = (houses) => {
  //Будем бежать по массиву houses, и В каждой ячейке массива dp такой же длиннЫ будем хранить наивыгоднейший результат от нуля до текущего елемента i.
  //dp[i] = MAX(dp[i] + dp[i - 2],  dp[i -1])
  const dp = new Array(houses.length).fill(0);
  dp[0] = houses[0];
  dp[1] = Math.max(houses[0], houses[1]);

  for (let i = 2; i < houses.length; i++) {

    dp[i] = Math.max(houses[i] + dp[i - 2], dp[i - 1]);

  }
  //Последний элемент хранит максимальную сумму
  return dp[houses.length - 1];
};
const houses = [2, 7, 9, 3, 1];
//console.log(houses_dpFn(houses));


//Задача: Coin Change
//Есть монеты разных номиналов. Нужно найти минимальное количество монет, чтобы набрать заданную сумму.

const coin_dp = (coins_data, amount_data) => {
  const dp = new Array(amount_data + 1).fill(Infinity);

  dp[0] = 0;
  //dp[i] = dp[i - coin] + 1;

  //єтим циклом идем по суммам 1,2,3,4 .... 35,36,37 индексы
  for (let i = 1; i < dp.length; i++) {

    //на каждой итерации перебираем монеты
    for (const coin of coins_data) {
      if (coin > i) {
        continue;
      };

      //на первой монете dp[i] будет Infinity, но после первой же итерации там будет значение.
      dp[i] = Math.min(dp[i], dp[i - coin] + 1) // тут чтото типа монета 3, сумма 37 = 33 + 3 + 1
    }
  }

  //Проверка на Infinity нужна, чтобы вернуть -1, если сумму невозможно набрать доступными номиналами.
  return dp[amount_data] === Infinity
    ? -1
    : dp[amount_data];
};
// Сложность алгоритма:
// - Время: \(O(A \cdot C)\), где \(A\) — сумма, а \(C\) — количество номиналов.
// - Память: \(O(A)\) для массива dp.


const coins = [1, 3, 4, 7, 10, 15, 20, 25];
const amount = 37;
console.log('coin_dp', coin_dp(coins, amount));