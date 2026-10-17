function lengthOfLongestSubstring(s) {
  if (s.length < 2) {
    return s.length
  };

  let longestLength = 0;
  let rootIndex = 0;

  while (rootIndex < s.length && s.length - rootIndex > longestLength) {

    let currentSubStr = new Set();
    let i = rootIndex;

    for (i; i < s.length; i++) {
      if (currentSubStr.has(s[i])) {
        break;
      };
      currentSubStr.add(s[i]);
    };

    if (currentSubStr.size > longestLength) {
      longestLength = currentSubStr.size;
    };

    if (i === s.length) {
      return longestLength;
    }
    rootIndex += 1;
  }

  return longestLength;
};
//Временная сложность O(n*n) в худшем случае. Есть вариант побыстрее

const getWorldPArt = (str, left, right) => {
  let result = '';
  for (let i = left; i <= right; i++) {
    result += str[i];
  };
  return result;
}
//Sliding WIndow
function lengthOfLongestSubstringOn(s) {
  if (s.length < 2) {
    return s.length
  };
  let longestLength = 0;
  let left = 0;
  let right = 0;
  const uniqueTrack = new Map();

  while (right < s.length) {
    //s.length - right > longestLength
    // console.log('right', right, 'left', left, 'current symbol: ', s[right])
    // console.log(uniqueTrack);
    if (!uniqueTrack.has(s[right])) {
      uniqueTrack.set(s[right], right);
      const currentLength = right - left + 1;
      // console.log('Сохранили макс длинну', currentLength)
      if (currentLength > longestLength) {
        longestLength = currentLength;
      };

    } else {

      const deletingIndex = uniqueTrack.get(s[right]);
      // console.log('Символ уже существует', s[right], deletingIndex)
      left = deletingIndex + 1;
      uniqueTrack.clear();

      for (let i = left; i <= right; i++) {
        // console.log('deleting', s[i], i)
        uniqueTrack.set(s[i], i);
      };
    };

    right += 1;
  }

  return longestLength;
};
const testCases = [
  {
    Input: "abcabcbb",
    Output: 3
  },
  {
    Input: "bbbbb",
    Output: 1
  },
  {
    Input: "pwwkew",
    Output: 3
  },
  {
    Input: "mq",
    Output: 2
  },
  {
    Input: "mjvhmi",
    Output: 5
  }
];

// testCases.forEach((item, index) => {
//   console.log(`Test Case №${index + 1}: Result - ${lengthOfLongestSubstring(item.Input)}, Expected ${item.Output}`)
// });
testCases.forEach((item, index) => {
  console.log(`Test Case №${index + 1}: Result - ${lengthOfLongestSubstringOn(item.Input)}, Expected ${item.Output}`)
});
