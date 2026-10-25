import {tester} from './tester.js';

const zigzag_conversion = ({s, numRows}) => {
  if (numRows <= 1) return s;

  const newRow = new Array(s.length).fill(null); // По времени O(n), по памяти O(n)
  const matrix = [];
  for (let i = 0; i < numRows; i++) { // По времени O(k) где k numRows 
    matrix.push([...newRow]);// По времени O(n) за спред массива, по памяти создаем массив который O(n) k раз,
  };
  //k итераций, и на каждой спред массива длинной n = O(n*k), по памяти тоже n = O(n*k)
//------------------------------------------------
  let stringIndex = 0;

  let widthIndex = 0;
  let hightIndex = 0;

  let direction = 1;

  while (stringIndex < s.length) { // O(n)
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
    console.log('--------------------')
    console.log(`matrix[${[hightIndex]}][${widthIndex}]`, matrix[hightIndex][widthIndex], 'Запишем сюда', 'currentSymbol', currentSymbol)
    console.log('--------------------')
    matrix[hightIndex][widthIndex] = currentSymbol;

    setUpIndexesForNextSymbol();
    stringIndex += 1;
  }



  let result = ''; //По памяти O(n)
  for (let i = 0; i < matrix.length; i++) {// Тут перебрать всю матрицу, значит тоже O(n*k)
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
    case_number: 1,
    input: {s: 'PAYPALISHIRING', numRows: 3},
    expect: 'PAHNAPLSIIGYIR',
  },
  {
    case_number: 2,
    input: {s: 'PAYPALISHIRING', numRows: 4},
    expect: 'PINALSIGYAHRPI',
  },
  {
    case_number: 3,
    input: {s: 'A', numRows: 1},
    expect: 'A',
  },
  {
    case_number: 4,
    input: {s: 'ABCDE', numRows: 4},
    expect: 'ABCED',
  },
  {
    case_number: 5,
    input: {s: 'ABCDE', numRows: 2},
    expect: 'ACEBD',
  },
  {
    case_number: 6,
    input: {s: 'AB', numRows: 1},
    expect: 'AB',
  },
];

tester(testCases, zigzag_conversion)

// ПО времени O(n*k) где n-длинна строки, k-кво
// По памяти тоже O(n*k)