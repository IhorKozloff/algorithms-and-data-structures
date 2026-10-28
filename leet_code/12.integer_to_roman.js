import { tester } from './tester.js';
const integer_to_roman = (num) => {
  const symbols = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ]
  const symbolSet = new Map(symbols);
  const parsedNumData = [];

  for (const item of symbols) {
    const nominalsValue = item[0];
    let currentCount = 0;

    while (num >= nominalsValue) {
      num -= nominalsValue;
      currentCount += 1;
    };
    
    parsedNumData.push({ nominalsValue, quantity: currentCount });
  };

  let result = '';
  for (const item of parsedNumData) {
    if (item.quantity !== 0) {
      for (let i = item.quantity; i > 0; i--) {
        result += symbolSet.get(item.nominalsValue)
      };
    };
  };

  return result;
};
const testCases = [
  { case_number: 29, input: [1666], expect: "MDCLXVI" },
  { case_number: 1, input: [1], expect: "I" },
  { case_number: 2, input: [3], expect: "III" },
  { case_number: 3, input: [4], expect: "IV" },
  { case_number: 4, input: [5], expect: "V" },
  { case_number: 5, input: [8], expect: "VIII" },
  { case_number: 6, input: [9], expect: "IX" },
  { case_number: 7, input: [10], expect: "X" },
  { case_number: 8, input: [14], expect: "XIV" },
  { case_number: 9, input: [19], expect: "XIX" },
  { case_number: 10, input: [40], expect: "XL" },
  { case_number: 11, input: [44], expect: "XLIV" },
  { case_number: 12, input: [49], expect: "XLIX" },
  { case_number: 13, input: [50], expect: "L" },
  { case_number: 14, input: [58], expect: "LVIII" },
  { case_number: 15, input: [90], expect: "XC" },
  { case_number: 16, input: [99], expect: "XCIX" },
  { case_number: 17, input: [100], expect: "C" },
  { case_number: 18, input: [400], expect: "CD" },
  { case_number: 19, input: [444], expect: "CDXLIV" },
  { case_number: 20, input: [500], expect: "D" },
  { case_number: 21, input: [900], expect: "CM" },
  { case_number: 22, input: [944], expect: "CMXLIV" },
  { case_number: 23, input: [1000], expect: "M" },
  { case_number: 24, input: [1984], expect: "MCMLXXXIV" },
  { case_number: 25, input: [2023], expect: "MMXXIII" },
  { case_number: 26, input: [2421], expect: "MMCDXXI" },
  { case_number: 27, input: [3749], expect: "MMMDCCXLIX" },
  { case_number: 28, input: [3999], expect: "MMMCMXCIX" },
  { case_number: 30, input: [3888], expect: "MMMDCCCLXXXVIII" }
];
tester(testCases, integer_to_roman);