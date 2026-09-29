// [3, 4, 6, 2, 1 | 7, 9]

export const shiftDown = (array, index, heapSize) => {
  const left = 2 * index + 1;
  const right = 2 * index + 2;


  while (left >=heapSize || right >= heapSize) {
    const greaterChild = array[left] >= array[right] ? array[left] : array[right];

    const isCurrentGreaterThanChild = array[index] > greaterChild; 
    
  }


}