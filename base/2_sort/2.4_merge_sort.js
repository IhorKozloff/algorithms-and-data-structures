import { nonSortedNumbersArray } from './data.js';

const merge = (arrA, arrB) => {

  const result = [];
  let indexA = 0;
  let indexB = 0;

  const pushA = () => {
    result.push(arrA[indexA]);
    indexA += 1;
  };

  const pushB = () => {
    result.push(arrB[indexB]);
    indexB += 1;
  }

  while (indexA < arrA.length && indexB < arrB.length) {
    if (arrA[indexA] < arrB[indexB]) {
      pushA();
    } else {
      pushB();
    }
  };

  while (indexA < arrA.length) {
    pushA();
  }

  while (indexB < arrB.length) {
    pushB();
  };

  return result
}
//console.log(merge([2, 5, 8], [1, 3, 7]))

export const merge_sort = (array) => {

  if (array.length <= 1) {
    return array;
  };

  const rightFirstIndex = Math.floor(array.length / 2);
  const leftArr = [];
  const rightArr = [];

  for (let i = 0; i < rightFirstIndex; i++) {
    leftArr.push(array[i]);
  };

  for (let i = rightFirstIndex; i < array.length; i++) {
    rightArr.push(array[i]);
  };

  // const leftArr = array.slice(0, middle); тоже самое по симптотике O(n)
  // const rightArr = array.slice(middle);

  const result1 = merge_sort(leftArr);
  const result2 = merge_sort(rightArr);

  const result = merge(result1, result2);

  return result;
};

console.log(merge_sort(nonSortedNumbersArray));

// Время:   O(n log n)
// Память:  O(n)

// Что занимает память	Сложность
// Стек рекурсии	O(log n)
// Временные массивы	O(n)
// Итоговая дополнительная память	O(n) - т.к самая быстрорастущая

