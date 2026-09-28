import { nonSortedNumbersArray } from './data.js'

export const bubblesort_v1 = (array) => {
  let isChangesWas = true;

  while (isChangesWas) {
    isChangesWas = false;
    for (let i = 0; i < array.length - 1; i++) { //array.length - 1 потому что не должно быть итерации на последнем елементе
      if (array[i] > array[i + 1]) {
        isChangesWas = true
        const tmpForCurrent = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmpForCurrent;
      }
    }
  }

  return array;
}

// Worst case: O(n²)
// Best case: O(n) — если массив уже отсортирован, будет всего один проход.
// Space: O(1) — ты сортируешь непосредственно исходный массив и не создаёшь дополнительный массив.
console.log(bubblesort_v1(nonSortedNumbersArray))