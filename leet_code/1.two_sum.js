import { tester } from './tester.js';
// You are given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.



// Example 1:


const two_sum = ({ nums: arr, target: targetNum }) => {

  const value = 0;
  const index = 1;
  const sortedArray = arr.map((item, index) => [item, index]).sort((a, b) => a[value] - b[value]);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex < rightIndex) {
    const sum = sortedArray[leftIndex][value] + sortedArray[rightIndex][value];
    if (sum === targetNum) {
      return [sortedArray[leftIndex][index], sortedArray[rightIndex][index]];
    } else {
      sum > targetNum ? rightIndex -= 1 : leftIndex += 1;
    }
  }
  return [];
};

//arr.map((item, index) => [item, index]) - O(n);
//sort((a, b) => a[value] - b[value]) - O(nlogn); <------------------- результат по времени
// поиск двумя указателями O(n)

// Дополнительная память: O(n) — в худшем случае храним почти все элементы.
const two_sum2 = ({ nums: arr, target: targetNum }) => {

  const history = new Map();

  for (let i = 0; i < arr.length; i++) {
    //console.log(i)
    const rest = targetNum - arr[i];

    if (history.has(rest)) {
      const restValue = history.get(rest);
      return [restValue, i]
    } else {
      history.set(arr[i], i)
    }
  }
};
// Время: O(n) — один проход по массиву, операции с Map в среднем занимают O(1).

// Дополнительная память: O(n) — в худшем случае храним почти все элементы.
const testData = [
  {
    case_number: 1,
    input: { nums: [2, 14, 11, 7, 15, 71, 24], target: 9 },
    expect: [0, 3]
  },

  {
    case_number: 2,
    input: { nums: [3, 2, 4], target: 6 },
    expect: [1, 2]
  },
  {
    case_number: 2,
    input: { nums: [3, 3], target: 6 },
    expect: [0, 1]
  }
]
//tester(testData, two_sum)
tester(testData, two_sum2)