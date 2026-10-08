export const graph = (initialData = []) => {
  const graphData = new Map(initialData);
  const queue = [];

  const siftUpCycle = (array, entryPointIndex) => {
    let currentChild = entryPointIndex;

    while (true) {
      const parentIndex = Math.floor((currentChild - 1) / 2);
      if (parentIndex < 0) {
        break;
      };

      const isChildPriorityHightes = array[currentChild].priority < array[parentIndex].priority;
      if (isChildPriorityHightes) {
        //Меняем меставми, опускаем родителя вниз
        const parentTmp = array[parentIndex];
        array[parentIndex] = array[currentChild];
        array[currentChild] = parentTmp;
        currentChild = parentIndex;
      } else {
        break;
      };
    }
  }

  const siftDownCycle = () => {
    
  }

  const enqueue = (data) => {

    queue.push({
      value: data.value,
      priority: data.priority
    });

    siftUpCycle(queue, queue.length - 1);
  };

  const dequeue = () => {
    const removedEl = queue[0];
    const leftChildIndex = 1;
    const rightChildIndex = 2;

    const hightesPriorityChildIndex = queue[1].priority < queue[2].priority ? leftChildIndex : rightChildIndex; 
  };

  const peek = () => {
    return
  }



  return {

  }
}
const initDataForDfs = [
  ['A', ['B', 'C']],
  ['B', ['A', 'D', 'E']],
  ['C', ['A', 'D', 'G']],
  ['D', ['B', 'C', 'F']],
  ['E', ['B', 'F', 'H']],
  ['F', ['D', 'E', 'G']],
  ['G', ['C', 'F', 'H']],
  ['H', ['E', 'G']],
]
const { } = graph(initDataForDfs);