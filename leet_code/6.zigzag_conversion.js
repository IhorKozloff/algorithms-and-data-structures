const zigzag_conversion = (s, numRows) => {
  const newRow = new Array(s.length).fill(null);
  const matrix = [];
  for (let i = 0; i < numRows; i++) {
    matrix.push([...newRow]);
  };

  let stringIndex = 0;

  let widthIndex = 0;
  let hightIndex = 0;

  let direction = 1;

  while (stringIndex < s.length) {
    const setUpIndexesForNextSymbol = () => {
      if (widthIndex === 0 && hightIndex === 0) {
        hightIndex = 1;
        return;
      };

      const isFirstY = hightIndex === 0;
      const isLastY = hightIndex === numRows - 1;

      if (isFirstY) {
        direction = 1
      }

      if (isLastY) {
        direction = -1;
      };

      hightIndex += direction;
      if (direction < 0) {
        widthIndex += 1;
      }
    };

    const currentSymbol = s[stringIndex];
    // console.log('--------------------')
    // console.log(`matrix[${[hightIndex]}][${widthIndex}]`, matrix[hightIndex][widthIndex], 'Запишем сюда', 'currentSymbol', currentSymbol)
    // console.log('--------------------')
    matrix[hightIndex][widthIndex] = currentSymbol;

    setUpIndexesForNextSymbol();
    stringIndex += 1;
  }



  let result = '';
  for (let i = 0; i < matrix.length; i++) {
    for (let k = 0; k < matrix[0].length; k++) {
      if (matrix[i][k]) {
        result += matrix[i][k]
      }
    }
  }

  return result;
};

const testCases = [
  {
    input: 'PAYPALISHIRING',
    numRows: 3,
    expected: 'PAHNAPLSIIGYIR',
  },
  {
    input: 'PAYPALISHIRING',
    numRows: 4,
    expected: 'PINALSIGYAHRPI',
  },
  {
    input: 'A',
    numRows: 1,
    expected: 'A',
  },
  {
    input: 'ABCDE',
    numRows: 4,
    expected: 'ABCED',
  },
  {
    input: 'ABCDE',
    numRows: 2,
    expected: 'ACEBD',
  },
];
testCases.forEach((element, index) => {
  const result = zigzag_conversion(element.input, element.numRows);

  console.log({
    case: index + 1,
    expect: element.expected,
    result,
    conclusion: `Test ${element.expected === result ? 'Passed.' : 'Failed :('}`
  });
});