import { nonSortedNumbersArray } from './data.js';

export const quick_sort = (array) => {

  if (array.length <= 1) {
    return array;
  };

  const pivot = array[0];

  const pivotPart = [pivot];
  const lessThenPivotPart = [];
  const greaterThenPivotPart = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i] === pivot) {
      pivotPart.push(array[i]);
    } else {
      array[i] > pivot ? greaterThenPivotPart.push(array[i]) : lessThenPivotPart.push(array[i]);
    };
  }

  const sortedLeftResult = quick_sort(lessThenPivotPart);
  const sortedRightResult = quick_sort(greaterThenPivotPart);

  const result = [...sortedLeftResult, ...pivotPart, ...sortedRightResult];
  return result
}

// Сложность по памяти - в среднем O(n log n), в худшем O(n²)
// Сложность по Времени
// Хорошее/сбалансированное разбиение	O(n log n)
// Очень плохой pivot	O(n²)

console.log(quick_sort(nonSortedNumbersArray));