const numbers = [41, 8, 92, 17, 73, 5, 34, 61, 29];

export const line_search = (array, searchedNumber) => {
  let result = -1;
  for (let i=0; i < array.length; i++) {
    if (array[i] === searchedNumber) {
      result = i;
      break;
    }
  }
  return result
}

console.log(line_search(numbers, 73)); // 4
console.log(line_search(numbers, 100)); // -1
//Сложность временная О(n)
//Сложность пространственная О(1)