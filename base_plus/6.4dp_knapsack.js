//Задача  о рюкзаке
// \[
// dp[i][w] = \max\left(
// dp[i-1][w],\
// value_i + dp[i-1][w-weight_i]
// \right)
// \]

const createMatrix = (strings, stringsLength) => {
  const result = [];
  for (let i = 0; i < strings; i++) {
    const newString = new Array(stringsLength).fill(0);
    result.push(newString);
  };
  return result;
}
const dp_knapsack = (data, capacity) => {
  const dp = createMatrix(data.length + 1, capacity + 1);

  for (let i = 1; i < dp.length; i++) { // идем по строкам, каждый итем это строки - предметы
    const currentString = dp[i];
    const prevString = dp[i - 1];

    const { weight: itemWeight, value: itemValue } = data[i - 1];

    for (let k = 1; k < currentString.length; k++) { // итерируем конкретную строку, каждый индекс, тоесть К - это вес, а значение currstr[k] - єто уже накопленная выгода

      const prev_sring_at_current_weight_BestValue = prevString[k];

      //Изначально предполагаем что не берем предмет, а если не берем, то записываем значение из предидущей строки для етого веса
      let currentValue = prev_sring_at_current_weight_BestValue;


      //Если предмет берем, то нужно расчитать накопленную сумму, но сначала проверить, влазит ли предмет k - текущая вместимость рукзака
      if (itemWeight <= k) {

        //Вычисляем накопительне значение для текущей клетки в 3 этапа

        //1. Остаточная вместиммость
        const residualCapacity = k - itemWeight;

        //2.Ищем в предидущей строке, для остаточного веса значение
        const residualValue = prevString[residualCapacity];

        //3.Расчитываем накопительне значение для текущей клетки
        const sumForCurrentValue = residualValue + itemValue;

        //Вычисляем что выгоднее, взять предмет и записать в него новое значение, или оставить какесть - как буд-то предмет не берем
        if (sumForCurrentValue > currentValue) {
          currentValue = sumForCurrentValue
        };
      }

      currentString[k] = currentValue;
    }

  }


  const itemsList = (dp_matrix) => {

    let i = dp_matrix.length - 1;
    let k = dp_matrix[0].length - 1;

    let result = [];

    while (i > 0) {
      if (dp_matrix[i][k] === dp_matrix[i - 1][k]) {
        i -= 1;
      } else {
        const item = data[i - 1];
        result.push(item.name);

        i -= 1;
        k -= item.weight
      }
    }
    return result;
  }

  const items = itemsList(dp);
  // const console_log = () => {
  //   dp.forEach(item => console.log(...item));
  // };
  // console_log();
  return {
    best_result: dp[data.length][capacity],
    items,
  }
};
const data = [
  { name: 'GPU', weight: 4, value: 7 },
  { name: 'CPU', weight: 3, value: 5 },
  { name: 'RAM', weight: 2, value: 4 },
  { name: 'SSD', weight: 1, value: 2 },
];
const capacity = 7;
console.log('dp_knapsack', dp_knapsack(data, capacity));
// Временная: \(O(n \times W) \), где n — число предметов, а W — вместимость.
//  Пространственная: \(O(n \times W) \), поскольку храним всю DP - таблицу.