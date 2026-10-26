import {tester} from './tester.js';
// Given a signed 32-bit integer x, return x with its digits reversed. 
// If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.


const reverse_integer = (x) => {
  const MAX_INT = 2147483647;
  const MIN_INT = -2147483648;

  const polarity = x < 0 ? -1 : 1;
  const absNum = Math.abs(x);
  const stringifyNum = absNum.toString();

  let resultString = '';
  for (let i = stringifyNum.length - 1; i >= 0; i--) {
    resultString += stringifyNum[i];
  };

  const resultNum = Number(resultString) * polarity;
  if (resultNum < MIN_INT || resultNum > MAX_INT) {
    return 0;
  };

  return resultNum; 
};

const testCases = [
  { case_number: 1, input: '123', expect: 123 },
  { case_number: 2, input: -123, expect: -321 },
  { case_number: 3, input: 120, expect: 21 },

  { case_number: 4, input: 0, expect: 0 },
  { case_number: 5, input: 1, expect: 1 },
  { case_number: 6, input: -1, expect: -1 },
  { case_number: 7, input: 100, expect: 1 },
  { case_number: 8, input: -120, expect: -21 },
  { case_number: 9, input: 12345, expect: 54321 },
  { case_number: 10, input: -4567, expect: -7654 },
  { case_number: 11, input: 1534236469, expect: 0 },
  { case_number: 12, input: 1463847412, expect: 2147483641 },
  { case_number: 13, input: -2147483648, expect: 0 },
];
tester(testCases, reverse_integer);

// testCases.forEach((element, index) => {
//   const result = reverse_integer(element.input, element.numRows);

//   console.log({
//     case: element.case_number,
//     expect: element.expect,
//     result,
//     conclusion: `Test ${element.expect === result ? 'Passed.' : 'Failed :('}`
//   });
// });