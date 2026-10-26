import { tester } from './tester.js';


const string_to_integer = (s) => {
  const MAX_INT = 2147483647;
  const MIN_INT = -2147483648;
  const availableSymbolsMap = new Map([['0', 0], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9]]);

  const trimLeft = (str) => {
    const polaritySymbols = new Set(['-', '+']);
    let polarity = 1;
    let hasPolarrityBeenChanged = false;
    let index = 0;

    while (index < str.length && str[index] === ' ') {
      index += 1;
    };

    while (index < str.length && polaritySymbols.has(str[index])) {
      if (hasPolarrityBeenChanged) {
        return { trimedLeftString: '', polarity };
      };
      if (str[index] === '-') {
        polarity *= -1;
      };

      hasPolarrityBeenChanged = true;
      index += 1;
    };

    return {
      trimedLeftString: str.slice(index),
      polarity
    }
  };
  const convertToNumber = (str, polarity) => {
    let result = 0;
    let stringIndex = 0;

    while (stringIndex < str.length && availableSymbolsMap.has(str[stringIndex])) {
      const currentValue = availableSymbolsMap.get(str[stringIndex]);
      result = result * 10 + currentValue;

      if (result * polarity >= MAX_INT) {
        return MAX_INT;
      };
      if (result * polarity <= MIN_INT) {
        return MIN_INT;
      };
      stringIndex += 1;
    };

    return result * polarity;
  };
  const { trimedLeftString, polarity } = trimLeft(s);

  if (trimedLeftString.length === 0) {
    return 0;
  };

  if (!availableSymbolsMap.has(trimedLeftString[0])) {
    return 0;
  };

  const number = convertToNumber(trimedLeftString, polarity);
  return number;
};

const testCases = [
  { case_number: 1, input: '123', expect: 123 },
  { case_number: 2, input: '-123', expect: -123 },
  { case_number: 3, input: '+123', expect: 123 },
  { case_number: 4, input: '0', expect: 0 },
  { case_number: 5, input: '   42', expect: 42 },
  { case_number: 6, input: '   -42', expect: -42 },
  { case_number: 7, input: '   +42', expect: 42 },
  { case_number: 8, input: '0042', expect: 42 },
  { case_number: 9, input: '-0042', expect: -42 },
  { case_number: 10, input: '42abc', expect: 42 },
  { case_number: 11, input: '   -42abc', expect: -42 },
  { case_number: 12, input: 'abc42', expect: 0 },
  { case_number: 13, input: '', expect: 0 },
  { case_number: 14, input: '   ', expect: 0 },
  { case_number: 15, input: '+', expect: 0 },
  { case_number: 16, input: '--42', expect: 0 },
  { case_number: 17, input: '2147483647', expect: 2147483647 },
  { case_number: 18, input: '2147483648', expect: 2147483647 },
  { case_number: 19, input: '-2147483648', expect: -2147483648 },
  { case_number: 20, input: '-2147483649', expect: -2147483648 },
  { case_number: 21, input: '0-1', expect: 0 },
];
tester(testCases, string_to_integer);