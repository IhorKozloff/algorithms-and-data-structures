import { tester } from './tester.js';

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
  { input: 'babad', expected_length: 3, case_number: 1, expect: 'bab' },
  { input: 'cbbd', expected_length: 2, case_number: 2, expect: 'bb' },
  { input: 'a', expected_length: 1, case_number: 3, expect: 'a' },
  { input: 'ac', expected_length: 1, case_number: 4, expect: 'a' },
  { input: 'racecar', expected_length: 7, case_number: 5, expect: 'racecar' },
  { input: 'abba', expected_length: 4, case_number: 6, expect: 'abba' },
  { input: 'abcde', expected_length: 1, case_number: 7, expect: 'a' },
  { input: 'aaaa', expected_length: 4, case_number: 8, expect: 'aaaa' },
  { input: 'abacdfgdcaba', expected_length: 3, case_number: 9, expect: 'aba' },
  { input: 'abbaxyzyx', expected_length: 5, case_number: 10, expect: 'xyzyx' },
  { input: '"aaca"', expected_length: 3, case_number: 11, expect: 'aca' },
  { input: 'abcdfgdcaba', expected_length: 3, case_number: 12, expect: 'aba' }
];

tester(testCases, longest_palindromic_substring, {
  additional_fields: ['expected_length']
});

//Несмотря на то что внутренние циклы за одну итерацию обрабатывают 2 элемента O(n/2)=O(n), это считается O(n)
//Так же один while + 2й while это O(n + n) = O(2n) = O(n)
//Снаружи у нас for O(n), внутри O(n). Общая сложность по времени О(n*n)
//По памяти O(n). Мы создаем строки, и если длинна строки увеличится в 10 раз, то в худшем случае и длинна переменных увеличится в 10 раз

