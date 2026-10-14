const buildPrefixSum = (arr) => {
  const psArray = new Array(arr.length).fill(0);
  psArray[0] = arr[0];

  for (let i = 1; i < psArray.length; i++) {
    psArray[i] = arr[i] + psArray[i - 1];
  };

  return psArray;
  //Сложность по времени O(n), пространственная тоже O(n)
};
const testData = [120, 80, 150, 50, 100, 200, 70];
const pi = buildPrefixSum(testData);
console.log(pi)

// Считаем сумму за период, за сложность всего O(n)
const rangeSum = (prefix, left, right) => {
  if (left === 0) {
    return prefix[right];
  };

  return prefix[right] - prefix[left - 1];
  //Временная сложность O(1)
};

const result = rangeSum(pi, 3, 5);
console.log(result)