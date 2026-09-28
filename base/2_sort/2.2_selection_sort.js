import { nonSortedNumbersArray } from './data.js'

const getMinIndex = (startIndex, array) => {
  let minIndex = startIndex;
  for (let j = startIndex; j < array.length; j++) {
    if (array[j] < array[minIndex]) {
      minIndex = j;
    }
  }
  return minIndex
};

export const selection_sort = (array) => {

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = getMinIndex(i, array);

    if (i !== minIndex) { // или if  array[minIndex] < array[i]
      const currentTmp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = currentTmp;
    }
  }

  return array
};

console.log(selection_sort(nonSortedNumbersArray));

// Сложность

// Time:  O(n²)
// Space: O(1)