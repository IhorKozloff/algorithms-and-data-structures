import { nonSortedNumbersArray } from './data.js';


export const insertion_sort = (array) => {
  
  let i = 1; // не 0, потому что идея в том что б считать 0й элемент уже отсортированным

  while (i < array.length) {

    const currentValue = array[i];
    let j = i;
    for (j; j > 0 && currentValue < array[j - 1]; j--) {
      array[j] = array[j - 1];
    }
    array[j] = currentValue;


    i++
  }
  return array
}
console.log(insertion_sort(nonSortedNumbersArray))

// Сложность

// Time:  Best O(n), Worst O(n²)
// Space: O(1)