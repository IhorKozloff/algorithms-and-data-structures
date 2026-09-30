export const siftDown = (array, index, heapSize) => {
  console.log('New iteration');
  const left = 2 * index + 1;
  const isLeftValid = left < heapSize;

  if (!isLeftValid) {
    console.log(`Element by index ${index} is leaf!`);
    return array;
  };

  const right = 2 * index + 2;
  const isRightValid = right < heapSize;

  let greatestChildIndex = left;
  let isChildGreaterThenCurrent = false;

  if (isRightValid) {
    //выяснить есть ли из детей кто то больше чем индекс
    greatestChildIndex = array[left] > array[right] ? left : right;
  }
  isChildGreaterThenCurrent = array[greatestChildIndex] > array[index];

  if (!isChildGreaterThenCurrent) {
    console.log('Оба ребенка меньше чем родитель');
    return array;
  };
  const currentTmpValue = array[index];
  array[index] = array[greatestChildIndex];
  array[greatestChildIndex] = currentTmpValue;

  return siftDown(array, greatestChildIndex, heapSize);
}

const array = [4, 10, 8, 3, 5, 7];
console.log(siftDown(array, 0, 6))

const siftDownCycle = (array, index, heapSize) => {
  let currentIndex = index;

  while (true) {
    console.log('New iteration');
    const left = 2 * currentIndex + 1;

    if (left >= heapSize) {
      console.log(`Element by index ${currentIndex} is leaf!`);
      break;
    }

    const right = 2 * currentIndex + 2;

    let greatestChildIndex = left;
    let isChildGreaterThenCurrent = false;

    if (right < heapSize) {
      //выяснить есть ли из детей кто то больше чем индекс
      greatestChildIndex = array[left] > array[right] ? left : right;
    }
    isChildGreaterThenCurrent = array[greatestChildIndex] > array[currentIndex];

    if (!isChildGreaterThenCurrent) {
      console.log('Оба ребенка меньше чем родитель');
      break
    };

    const currentTmpValue = array[currentIndex];
    array[currentIndex] = array[greatestChildIndex];
    array[greatestChildIndex] = currentTmpValue;

    currentIndex = greatestChildIndex;
  }

  return;
}

const array2 = [4, 10, 8, 3, 5, 7];
//console.log(siftDownCycle(array2, 0, 6))

const arr3 = [
  17, 4, 29, 8, 1, 23, 12,
  30, 6, 19, 3, 27, 14, 9, 25,
  2, 31, 11, 20, 5, 16, 28, 7,
  22, 10, 26, 13, 18, 24, 15, 21
];

const buildMaxHeap = (array) => {
  const lastParentIndex = Math.floor(array.length / 2) - 1;
  let currentIndex = lastParentIndex;

  while (currentIndex >= 0) {
    siftDownCycle(array, currentIndex, array.length);

    currentIndex -= 1;
  }
  return array;
}

//console.log(buildMaxHeap(arr3));

const heapSort = (array) => {
  const heapMax = buildMaxHeap(array); // тоже самое что просто buildMaxHeap(array) и обращаться по ссылkе array;
  let heapSize = heapMax.length;

  while (heapSize > 1) {
    const firstTmp = heapMax[0];
    const last = heapMax[heapSize - 1];
    heapMax[0] = last;
    heapMax[heapSize - 1] = firstTmp;

    heapSize -= 1;
    siftDownCycle(heapMax, 0, heapSize);
  }
};

heapSort(arr3);
console.log(arr3)

//По сложности:

// buildMaxHeap → O(n)
// извлечение каждого элемента + siftDown → O(n log n)
// весь Heap Sort → O(n log n)
// дополнительная память → O(1) в твоей итеративной реализации.