const testData = [3, 8, 12, 17, 24, 25, 26, 27, 28, 29, 31, 32, 42, 43, 56, 57, 73, 74, 75, 76, 77, 78, 79, 80, 81, 84, 85, 86, 87, 88, 89, 95, 96, 97, 98, 99];

export const binary_search = (array, searchedNumber) => {

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((left + right) / 2);
    if (searchedNumber === array[middleIndex]) {
      return middleIndex
    };

    if (array[middleIndex] < searchedNumber) {
      left = middleIndex + 1;
    } else {
      right = middleIndex - 1;
    }
  }
  return -1;
}


console.log(binary_search(testData, 73)); // найден в середине/где-то внутри
console.log(binary_search(testData, 3));  // первый элемент
console.log(binary_search(testData, 99)); // последний элемент
console.log(binary_search(testData, 35)); // элемента нет

// Сложность:

// время: O(log n)
// дополнительная память: O(1)

//Рекурсивный вариант
export const binary_search_rec = (array, searchedNumber, leftArg = undefined, rightArg = undefined) => {
  let left = leftArg ?? 0
  let right = rightArg ?? array.length - 1;

  if (left > right) {
    return -1;
  };

  const middleIndex = Math.floor((left + right) / 2);

  if (array[middleIndex] === searchedNumber) {
    return middleIndex;
  }

  if (array[middleIndex] < searchedNumber) {
    left = middleIndex + 1;
  } else {
    right = middleIndex - 1;
  }
  return binary_search_rec(array, searchedNumber, left, right)
};
console.log('-------Рекурсивный вариант--------------');
console.log(binary_search_rec(testData, 73)); // найден в середине/где-то внутри
console.log(binary_search_rec(testData, 3));  // первый элемент
console.log(binary_search_rec(testData, 99)); // последний элемент
console.log(binary_search_rec(testData, 35)); // элемента нет

// Сложность:

// время: O(log n)
// дополнительная память: O(log n) - потому что каждый вызов функции это место в стеке вызовов

