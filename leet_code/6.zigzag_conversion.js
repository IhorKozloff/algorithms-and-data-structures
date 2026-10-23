const zigzag_conversion = (s, numRows) => {
  const createNewRow = () => new Array(s.length).fill(null);
  const matrix = new Array(numRows).fill(createNewRow());
  let stringIndex = 0;

  let widthIndex = 0;
  let hightIndex = 0;

  let direction = 1;

  while (stringIndex < s.length) {
    const findValidPlace = () => {
      if (widthIndex === 0 && hightIndex === 0) {
        hightIndex = 1;
        return;
      };

      const isLastOrFirst = hightIndex === 0 || hightIndex === numRows - 1;
      if (isLastOrFirst) {
        //change direction
        direction *= -1;

        if (hightIndex === numRows - 1 && direction < 0) {
          widthIndex += 1;
        }
      };
      hightIndex += direction;
      widthIndex += 1;
    };

    const currentSymbol = s[stringIndex];
    console.log(`matrix[${[hightIndex]}][${widthIndex}]`, matrix[hightIndex][widthIndex])
    console.log('currentSymbol', currentSymbol)
    matrix[hightIndex][widthIndex] = currentSymbol;
    findValidPlace();
    stringIndex += 1;
  }




  matrix.forEach(i => console.log(...i));
  let result;
  return result;

};

const testCases = [
  // {
  //   input: 'PAYPALISHIRING',
  //   numRows: 3,
  //   expected: 'PAHNAPLSIIGYIR',
  // },
  {
    input: 'PAYPALISHIRING',
    numRows: 4,
    expected: 'PINALSIGYAHRPI',
  },
  // {
  //   input: 'A',
  //   numRows: 1,
  //   expected: 'A',
  // },
  // {
  //   input: 'ABCDE',
  //   numRows: 4,
  //   expected: 'ABCED',
  // },
  // {
  //   input: 'ABCDE',
  //   numRows: 2,
  //   expected: 'ACEBD',
  // },
];
testCases.forEach((element, index) => {
  const result = zigzag_conversion(element.input, element.numRows);
  // console.log({
  //   case: index + 1,
  //   expect: element.output,
  //   result: palindrome,
  //   conclusion: `Test ${element.output === palindrome.length ? 'Passed.' : 'Failed :('}`
  // });
});