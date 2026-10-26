import { tester } from './tester.js';
const testCases = [
  { case_number: 1, input: '121', expect: true },
  { case_number: 2, input: '-121', expect: false },
  { case_number: 3, input: '10', expect: false },
  { case_number: 4, input: '0', expect: true },
  { case_number: 5, input: '1221', expect: true },
  { case_number: 6, input: '12321', expect: true },
  { case_number: 7, input: '12345', expect: false },
  { case_number: 8, input: '1', expect: true },
  { case_number: 9, input: '11', expect: true },
  { case_number: 10, input: '100', expect: false },
  { case_number: 11, input: '1001', expect: true },
  { case_number: 12, input: '123321', expect: true },
  { case_number: 13, input: '1234321', expect: true },
  { case_number: 14, input: '1234432', expect: false },
  { case_number: 15, input: '-1', expect: false },
  { case_number: 16, input: '-1221', expect: false },
  { case_number: 17, input: '2147447412', expect: true },
  { case_number: 18, input: '2147483647', expect: false },
  { case_number: 19, input: '1000000001', expect: true },
  { case_number: 20, input: '2147483648', expect: false },
];
const palindrome_number_METHOD_TWO_POINTS = (x) => {

  if (x < 0) {
    return false;
  };

  if (x === 0) {
    return true;
  };

  const str = `${x}`;
  const lastIndex = str.length - 1;

  if (str[lastIndex] === '0') {
    return false;
  };

  let i = 0;
  let k = lastIndex;

  while (i < k) {
    if (str[i] !== str[k]) {
      return false;
    };
    i++;
    k--;
  }

  return true;
};
//tester(testCases, palindrome_number);
const palindrome_number_REVERSE_HALF = (x) => {
  if (x < 0) {
    return false;
  };

  if (x === 0) {
    return true;
  };

  if (x % 10 === 0) {
    return false;
  }

  let reversed = 0;
  while (reversed < x) {
    const tail = x % 10;
    reversed = reversed * 10 + tail;
    x = Math.floor(x / 10);
  }

  if (x === reversed) {
    return true;
  };
  const reversedWithOutLastNumber = Math.floor(reversed / 10);

  if (x === reversedWithOutLastNumber) {
    return true;
  };
  return false;
};
//Временная сложность O(log n), по памяти O(1)
tester(testCases, palindrome_number_REVERSE_HALF);