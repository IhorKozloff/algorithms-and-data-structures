// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

function addTwoNumbersBrutalForce(l1, l2) {
  //Топорный подход, но если длинна массива больше чем Number.MAX_SAFE_INTEGER // 9007199254740991, будут проблемы. 
  const toNumber = (array) => {
    let result = '';

    for (let i = array.length - 1; i >= 0; i--) {
      result += array[i]
    };
    return Number(result);
  };
  const toList = (number) => {
    const inputDatastring = `${number}`;
    const result = [];

    for (let i = inputDatastring.length - 1; i >= 0; i--) {
      result.push(Number(inputDatastring[i]));
    };

    return result;
  };

  const num1 = toNumber(l1);
  const num2 = toNumber(l2);
  const sum = num1 + num2;

  const sumReverseArray = toList(sum)
  return sumReverseArray;
};
//сложение в столбик
function addTwoNumbers(l1, l2) {

  let i = 0;
  let k = 0;
  let cash = 0;
  const result = [];

  const sumFn = (first = 0, second = 0) => {
    const sum = first + second + cash;
    cash = 0;

    if (sum > 9) {
      cash = 1;
      result.push(sum % 10)
    } else {
      result.push(sum)
    }
  }

  while (i < l1.length || k < l2.length || cash > 0) {
    sumFn(l1[i], l2[k]);
    i++
    k++
  };

  return result
};
//Сложность по времени O(max(n,m)) и по памяти O(max(n,m))
console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));

//Для leetcode, там не  массивы а связанные списки, тип обьекта ниже
//  * class ListNode {
//  *     val: number
//  *     next: ListNode | null
//  *     constructor(val?: number, next?: ListNode | null) {
//  *         this.val = (val===undefined ? 0 : val)
//  *         this.next = (next===undefined ? null : next)
//  *     }
//  * }

