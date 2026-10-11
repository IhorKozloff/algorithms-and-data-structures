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
console.log(insertion_sort(documents));
// O(n*n)