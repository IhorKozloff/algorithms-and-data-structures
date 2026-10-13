 const availableSymbols = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']);
export const validate_palindrome = (str) => {

  let leftIndex = 0;
  let rightIndex = str.length - 1;
 
  while (leftIndex < rightIndex) {

    const leftSymbol = str[leftIndex].toLowerCase();
    if (!availableSymbols.has(leftSymbol)) {
      leftIndex += 1
      continue;
    };

    const rightSymbol = str[rightIndex].toLowerCase();
    if (!availableSymbols.has(rightSymbol)) {
      rightIndex -= 1
      continue;
    };

    if (leftSymbol !== rightSymbol) {
      console.log('symbol are not matching!')
      return false;
    }

    leftIndex += 1
    rightIndex -= 1
  }

  return true;
}
const testCases = [
  { input: "A man, a plan, a canal: Panama", expected: true },
  { input: "race a car", expected: false },
  { input: " ", expected: true },
  { input: "0P", expected: false },
  { input: "Was it a car or a cat I saw?", expected: true },
];
testCases.forEach((i) => {
  console.log(validate_palindrome(i.input))
});