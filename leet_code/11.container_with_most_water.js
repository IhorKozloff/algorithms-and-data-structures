import { tester } from './tester.js';
const container_with_most_water = (height) => {

  let maxV = 0;

  let leftIndex = 0;
  let righIndex = height.length - 1;

  while (leftIndex !== righIndex) {
    const width = righIndex - leftIndex;
    const maxH = Math.min(height[leftIndex], height[righIndex]);
    const currentV = width * maxH;

    if (currentV > maxV) {
      maxV = currentV;
    };

    height[leftIndex] - height[righIndex] > 0 ? righIndex-- : leftIndex++;
  }
  return maxV;
};
const testCases = [
  { case_number: 1, input: [1, 1], expect: 1 },
  { case_number: 2, input: [1, 2], expect: 1 },
  { case_number: 3, input: [2, 1], expect: 1 },
  { case_number: 4, input: [1, 2, 1], expect: 2 },
  { case_number: 5, input: [1, 3, 2, 5, 25, 24, 5], expect: 24 },
  { case_number: 6, input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expect: 49 },
  { case_number: 7, input: [4, 3, 2, 1, 4], expect: 16 },
  { case_number: 8, input: [1, 2, 3, 4, 5], expect: 6 },
  { case_number: 9, input: [5, 4, 3, 2, 1], expect: 6 },
  { case_number: 10, input: [5, 5, 5, 5, 5], expect: 20 },
  { case_number: 11, input: [1, 100, 1, 1, 100, 1], expect: 400 },
  { case_number: 12, input: [9, 1, 2, 3, 4, 5, 6, 7, 8], expect: 40 },
  { case_number: 13, input: [2, 3, 4, 5, 18, 17, 6], expect: 17 },
  { case_number: 14, input: [3, 3, 3], expect: 6 },
  { case_number: 15, input: [1, 1000, 1000, 1], expect: 3 },
];
tester(testCases, container_with_most_water);