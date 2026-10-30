import { tester } from './tester.js';
const roman_to_integer = (str) => {

    const decriptionData = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000,
    };
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        let currentSymbolValue = decriptionData[str[i]];
        
        if (i < str.length - 1) {
            const nextSymbolIndex = i + 1;
            const nextSymbol = str[nextSymbolIndex];
            const nextSymbolValue = decriptionData[nextSymbol];

            if (currentSymbolValue < nextSymbolValue) {
                currentSymbolValue *= -1;
            };
        };
        result += currentSymbolValue;
    }
    return result;
};
const testCases = [
    { case_number: 1, input: "III", expect: 3 },
    { case_number: 2, input: "IV", expect: 4 },
    { case_number: 3, input: "IX", expect: 9 },
    { case_number: 4, input: "LVIII", expect: 58 },
    { case_number: 5, input: "MCMXCIV", expect: 1994 },
    { case_number: 6, input: "I", expect: 1 },
    { case_number: 7, input: "V", expect: 5 },
    { case_number: 8, input: "X", expect: 10 },
    { case_number: 9, input: "XL", expect: 40 },
    { case_number: 10, input: "XC", expect: 90 },
    { case_number: 11, input: "CD", expect: 400 },
    { case_number: 12, input: "CM", expect: 900 },
    { case_number: 13, input: "MMXXIV", expect: 2024 },
    { case_number: 14, input: "MMMDCCCLXXXVIII", expect: 3888 },
    { case_number: 15, input: "MMMCMXCIX", expect: 3999 },
    { case_number: 16, input: "DCCCXC", expect: 890 },
    { case_number: 17, input: "CDXLIV", expect: 444 },
    { case_number: 18, input: "CMXCIX", expect: 999 },
    { case_number: 19, input: "MMCDLXXXVI", expect: 2486 },
    { case_number: 20, input: "MDCLXVI", expect: 1666 }
];
tester(testCases, roman_to_integer);