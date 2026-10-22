const longest_palindromic_substring = (s) => {
  const findPalindrome = (string, startIndex) => {
    const middleSymbol = string[startIndex];

    if (startIndex < 0) {
      return '';
    };

    if (startIndex === 0) {
      return middleSymbol
    };

    let middleCase = 'solo';

    const nextAfterMiddleSymbol = string[startIndex + 1];
    if (middleSymbol === nextAfterMiddleSymbol) {
      middleCase = 'double';
    };

    let spredWindowSize = 1;
    let result = middleCase === 'solo' ? middleSymbol : middleSymbol+nextAfterMiddleSymbol;

    while (startIndex - spredWindowSize >= 0 && middleCase === 'solo' ? startIndex + spredWindowSize < string.length : startIndex + 1 + spredWindowSize < string.length) {

      const currentLeftIndex = startIndex - spredWindowSize;
      let currentRightIndex = startIndex + spredWindowSize;

      if (middleCase === 'double') {
        currentRightIndex += 1;
      };

      if (string[currentLeftIndex] === string[currentRightIndex]) {
        result = string.slice(currentLeftIndex, currentRightIndex + 1);
        spredWindowSize += 1;
      } else {
        break;
      };
    }

    return result;
  };

  let result = '';
  for (let i = 0; i < s.length; i++) {
    const palindrome = findPalindrome(s, i);

    if (palindrome.length > result.length) {
      result = palindrome;
    };
  }

  return result;
};
const testCases = [
  { input: 'babad', output: 3 },
  { input: 'cbbd', output: 2 },
  { input: 'a', output: 1 },
  { input: 'ac', output: 1 },
  { input: 'racecar', output: 7 },
  { input: 'abba', output: 4 },
  { input: 'abcde', output: 1 },
  { input: 'aaaa', output: 4 },
  { input: 'abacdfgdcaba', output: 3 },
  { input: 'abbaxyzyx', output: 5 },
];
testCases.forEach((element, index) => {
  const length = longest_palindromic_substring(element.input)
  console.log({
    case: index + 1,
    expect: element.output,
    result: length,
    conclusion: `Test ${element.output === length ? 'Passed.' : 'Failed :('}`
  });
});
