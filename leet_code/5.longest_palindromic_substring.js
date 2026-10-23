const longest_palindromic_substring = (s) => {
  const findPalindrome = (string, startIndex) => {
    if (startIndex < 0) {
      return '';
    };

    const middleSymbol = string[startIndex];
    const nextAfterMiddleSymbol = string[startIndex + 1];

    let singleMiddleIndexPalindrome = middleSymbol;
    let duoMiddleIndexPalindrome = '';

    if (nextAfterMiddleSymbol && nextAfterMiddleSymbol === middleSymbol) {
      duoMiddleIndexPalindrome = middleSymbol + nextAfterMiddleSymbol;
    };

    //На случай если центр палиндрома 2 одинаковые буквы
    if (startIndex !== 0) {
      let spredWindowSize = 1;
      while (startIndex - spredWindowSize >= 0) {
        const currentLeftIndex = startIndex - spredWindowSize;
        let currentRightIndex = startIndex + spredWindowSize;

        if (string[currentLeftIndex] === string[currentRightIndex]) {
          singleMiddleIndexPalindrome = string.slice(currentLeftIndex, currentRightIndex + 1);
          spredWindowSize += 1;
        } else {
          break;
        };
      };

      if (duoMiddleIndexPalindrome.length !== 0) {
        let spredWindowSizeForDuo = 1;
        while (startIndex - spredWindowSizeForDuo >= 0) {
          const currentLeftIndex = startIndex - spredWindowSizeForDuo;
          let currentRightIndex = startIndex + 1 + spredWindowSizeForDuo;

          if (string[currentLeftIndex] === string[currentRightIndex]) {
            duoMiddleIndexPalindrome = string.slice(currentLeftIndex, currentRightIndex + 1);
            spredWindowSizeForDuo += 1;
          } else {
            break;
          };
        };
      }

    }

    if (singleMiddleIndexPalindrome.length === duoMiddleIndexPalindrome.length) {
      return singleMiddleIndexPalindrome;
    } else {
      return singleMiddleIndexPalindrome.length > duoMiddleIndexPalindrome.length ? singleMiddleIndexPalindrome : duoMiddleIndexPalindrome;
    }
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
  { input: '"aaca"', output: 3 },
];
testCases.forEach((element, index) => {
  const palindrome = longest_palindromic_substring(element.input)
  console.log({
    case: index + 1,
    expect: element.output,
    result: palindrome,
    conclusion: `Test ${element.output === palindrome.length ? 'Passed.' : 'Failed :('}`
  });
});
