// Лабораторная № 1. Задание 1 — сортировка документов
// Система учёта документов

// Контекст

// Ты разрабатываешь внутреннюю систему для компании. 
// В ней хранятся документы сотрудников, лицензии и разрешения. 
// Администратору нужно видеть документы в порядке приближения срока действия, чтобы вовремя их продлевать.

// Техническое задание

// Напиши функцию sortDocuments(documents), которая возвращает документы, отсортированные по expiresAt — от ближайшего срока истечения к самому дальнему.

// Дополнительные условия:

// исходный массив не должен изменяться;

// документы с одинаковой датой должны сохранять исходный взаимный порядок;

// документы с истёкшим сроком тоже должны оставаться в списке;

// возвращать нужно полные объекты документов, а не только даты.

// Критерии проверки

// Все документы отсортированы правильно.

// Исходный массив остался неизменным.

// Даты одинаковых документов не нарушают стабильность сортировки.

// Ты можешь объяснить временную и пространственную сложность решения.

// Твоя задача: самостоятельно написать sortDocuments(documents). 
// Выбери один из изученных нами алгоритмов сортировки и объясни, почему выбрал именно его. 
// Готовое решение пока не показываю — сначала хочу увидеть твой вариант.

const documents = [
  {
    id: 101,
    employee: 'Anna',
    type: 'Work Permit',
    expiresAt: '2027-04-12',
  },
  {
    id: 102,
    employee: 'Mark',
    type: 'Driver License',
    expiresAt: '2026-11-03',
  },
  {
    id: 103,
    employee: 'Olga',
    type: 'Security Certificate',
    expiresAt: '2026-10-15',
  },
  {
    id: 104,
    employee: 'John',
    type: 'Work Permit',
    expiresAt: '2026-11-03',
  },
  {
    id: 105,
    employee: 'Maria',
    type: 'Residence Permit',
    expiresAt: '2025-12-20',
  },
  {
    id: 106,
    employee: 'Peter',
    type: 'Driver License',
    expiresAt: '2027-01-08',
  },
];

const bubbleSort = (array) => {
  const result = [...array];
  let count = array.length - 1;
  while (count > 0) {

    for (let i = 0; i < count; i++) {
      if (array[i].expiresAt > array[i + 1].expiresAt) {
        const currentTMP = array[i];
        array[i] = array[i + 1];
        array[i + 1] = currentTMP;
      };
    }

    count -= 1;
  }
  return result;
}
//По времени O(n*n) так как цикл while проходится по всем елементам - это O(n) , и
// на каждой итерации цикла while, проходимся по всем елементам циклом for Это тоже O(n). Пространственная сложность O(n), т.к создаем массив такой же длинны.
//console.log(bubbleSort(documents));

const selectionSort = (array) => {
  const newArray = [...array];

  let lastIndex = newArray.length - 1;

  while (lastIndex > 0) {
    let maxValueIndex = 0;
    for (let i = 0; i <= lastIndex; i++) {
      if (newArray[i].expiresAt > newArray[maxValueIndex].expiresAt) {
        maxValueIndex = i;
      };
    }
    const maxValueTmp = newArray[maxValueIndex];
    newArray[maxValueIndex] = newArray[lastIndex];
    newArray[lastIndex] = maxValueTmp;

    lastIndex -= 1;
  }

  const result = newArray;
  return result;
};
//console.log(selectionSort(documents));
//Цикл не стабилен - может нарушать порядок при одиннаковых елементах
//По времени O(n*n) так как цикл while проходится по всем елементам - это O(n) , и
//на каждой итерации цикла while, проходимся по всем елементам циклом for Это тоже O(n). Пространственная сложность O(n), т.к создаем массив такой же длинны.

const insertion_sort = (array) => {
  const newArray = [...array];

  let cuurentIndex = 1;

  while (cuurentIndex < newArray.length) {
    const currentValue = newArray[cuurentIndex]
    let i = cuurentIndex;

    for (i; i > 0 && newArray[i - 1].expiresAt > currentValue.expiresAt; i--) {
      newArray[i] = newArray[i - 1];
    };

    newArray[i] = currentValue;
    cuurentIndex += 1;
  }


  const result = newArray;
  return result;
};
//console.log(insertion_sort(documents));
// O(n*n)

const merge_sort = (array) => {

  const LEFT_SIDE_KEY = 'left';
  const RIGHT_SIDE_KEY = 'right';

  const walk = (part) => {

    if (part.length <= 1) {
      return part;
    };

    const middleIndex = Math.floor(part.length / 2);
    const dataForLeftPart = part.slice(0, middleIndex);
    const dataForRightPart = part.slice(middleIndex);

    const processData = {
      [LEFT_SIDE_KEY]: {
        array: walk(dataForLeftPart),
        index: 0
      },
      [RIGHT_SIDE_KEY]: {
        array: walk(dataForRightPart),
        index: 0
      }
    };

    const result = [];



    while (true) {
      const leftSideNotEnded = processData[LEFT_SIDE_KEY].index < processData[LEFT_SIDE_KEY].array.length;
      const rightSideNotEnded = processData[RIGHT_SIDE_KEY].index < processData[RIGHT_SIDE_KEY].array.length;

      if (!leftSideNotEnded && !rightSideNotEnded) {
        break;
      };

      if (leftSideNotEnded && rightSideNotEnded) {
        const leftObject = processData[LEFT_SIDE_KEY].array[processData[LEFT_SIDE_KEY].index];
        const rightObject = processData[RIGHT_SIDE_KEY].array[processData[RIGHT_SIDE_KEY].index];

        //Правило для Merge Sort: при равных значениях выбирай элемент из левой половины.
        const minValueSideKey =
          leftObject.expiresAt <= rightObject.expiresAt
            ? LEFT_SIDE_KEY
            : RIGHT_SIDE_KEY;

        result.push(processData[minValueSideKey].array[processData[minValueSideKey].index]);
        processData[minValueSideKey].index += 1;

      } else {
        const notEndedSideKey = leftSideNotEnded ? LEFT_SIDE_KEY : RIGHT_SIDE_KEY;
        result.push(processData[notEndedSideKey].array[processData[notEndedSideKey].index]);
        processData[notEndedSideKey].index += 1;
      }

    }
    return result;
  }

  const result = walk(array);
  return result;

}
//Правило для Merge Sort: при равных значениях выбирай элемент из левой половины.
//Сложность по операциям O(log n), по памяти O(n) - из за создаваемого массива на каждом елементе, и O(log n) для стека из за рекурсии, итого берем большее O(n)
//console.log(merge_sort(documents));

const quick_sort = (array) => {

  const walk = (partArray) => {
    if (partArray.length <= 1) {
      return partArray;
    };

    const pivotArray = [partArray[0]];
    const leftSideData = [];
    const rightSideData = [];

    for (let i = 1; i < partArray.length; i++) {
      const currentItem = partArray[i];
      let targetArray = pivotArray;

      if (currentItem.expiresAt !== pivotArray[0].expiresAt) {
        targetArray = currentItem.expiresAt < pivotArray[0].expiresAt ? leftSideData : rightSideData;
      };

      targetArray.push(currentItem);
    };

    const leftSideResult = walk(leftSideData);
    const rightSideResult = walk(rightSideData);
    const result = [...leftSideResult, ...pivotArray, ...rightSideResult];
    return result;
  }

  const result = walk(array);
  return result;
};
//console.log(quick_sort(documents));
//По операциям(времени) O(log n), или O(n квадрат) - худший случай где все отсортировано п о возрастанию, и я вібираю пивот - первій елемент. ПО памяти O(n) потому что создаем массив для каждого елемента, ну еще O(log n) стек рекурсии, но то такое


const heap_sort = (array) => {

  const sift_down = (heap, rootIndex, heapSize) => {
    let currentIndex = rootIndex;

    while (true) {
      const leftChildIndex = (currentIndex * 2) + 1;
      if (leftChildIndex >= heapSize) {
        break;
      };

      const rightChildIndex = (currentIndex * 2) + 2;

      let greatestChildIndex = leftChildIndex;
      if (rightChildIndex < heapSize && heap[rightChildIndex].expireAt > heap[leftChildIndex].expireAt) {
        greatestChildIndex = rightChildIndex;
      };

      const isChildGreaterThenRoot = heap[greatestChildIndex].expireAt > heap[currentIndex].expireAt;

      if (isChildGreaterThenRoot) {
        const rootTmp = heap[currentIndex];
        heap[currentIndex] = heap[greatestChildIndex];
        heap[greatestChildIndex] = rootTmp;
        currentIndex = greatestChildIndex;
      } else {
        break;
      };
    }
  };

  const build_heap = (array) => {
    const newArray = [...array];
    let lastParentIndex = Math.floor(array.length / 2) - 1;

    while (lastParentIndex >= 0) {
      sift_down(newArray, lastParentIndex, newArray.length)
      lastParentIndex -= 1;
    }
    return newArray;
  };

  const sort = (heap) => {
    let heapSize = heap.length;

    while (heapSize > 1) {
      const firstElTMP = heap[0];
      heap[0] = heap[heapSize - 1];
      heap[heapSize - 1] = firstElTMP;

      heapSize -= 1;

      sift_down(heap, 0, heapSize);
    }
  };

  const heap = build_heap(array);
  sort(heap);
  return heap;
}
// Часть

	

// Сложность




// sift_down

	

// O(log n)




// build_heap

	

// O(n)




// Весь Heap Sort

	

// O(n log n)




// Дополнительная память

	

// O(n) из-за копирования массива
console.log(heap_sort(documents));