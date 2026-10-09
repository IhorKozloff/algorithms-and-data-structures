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

  const siftDownCycle = (array, startIndex = 0) => {
    const size = array.length;
    let currentIndex = startIndex;

    while (currentIndex !== null) {
      const left = 2 * currentIndex + 1;
      if (left >= size) {
        currentIndex = null;
        continue;
      };

      let lowestChildIndex = left;

      const right = left + 1;
      if (right < size && array[right].priority < array[left].priority) {
        lowestChildIndex = right;
      };
      // console.log('left', left)
      // console.log('right', right)
      // console.log('lowest', lowestChildIndex)
      // console.log('-------------------------')
      if (array[lowestChildIndex].priority < array[currentIndex].priority) {
        const currentTmp = array[currentIndex];
        array[currentIndex] = array[lowestChildIndex];
        array[lowestChildIndex] = currentTmp;

        currentIndex = lowestChildIndex;
      } else {
        currentIndex = null;
        continue;
      };
    }
  }

  const enqueue = (data) => {

    queue.push({
      value: data.value,
      priority: data.priority
    });

    siftUpCycle(queue, queue.length - 1);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      return;
    };
    const removedEl = queue[0];
    queue[0] = queue[queue.length - 1];
    queue.pop();

    siftDownCycle(queue);

    return removedEl;
  };

  const peek = () => {
    return queue.length > 0 ? queue[0] : undefined;
  }

  const main = (startPoint, finishPoint) => {
    const distances = new Map([[startPoint, { from: null, taxSumm: 0 }]]);
    enqueue({ value: startPoint, priority: 0 });

    while (queue.length > 0) {
      const { value: currentElKey, priority: currentElPriority } = dequeue();

      const currentElOnDistancesList = distances.get(currentElKey);

      if (currentElPriority > currentElOnDistancesList.taxSumm) {
        continue;
      };

      const currentChildrenArray = graphData.get(currentElKey) ?? [];

      currentChildrenArray.forEach(item => {
        const { node: nodeKey, cost } = item;
        console.log(nodeKey, cost)
        const summTaxForChild = currentElOnDistancesList.taxSumm + cost;
        const existingDistanceRecord = distances.get(nodeKey);

        if (!existingDistanceRecord) {
          distances.set(nodeKey, { from: currentElKey, taxSumm: summTaxForChild });
          enqueue({ value: nodeKey, priority: summTaxForChild });
        } else {
          const isCurrentWayBetter = summTaxForChild < existingDistanceRecord.taxSumm;

          if (isCurrentWayBetter) {
            distances.set(nodeKey, { from: currentElKey, taxSumm: summTaxForChild });
            enqueue({ value: nodeKey, priority: summTaxForChild });
          }
        }
      });
    }

    const restorePath = (distancesList, startPointKey, finishPointKey) => {
      const path = [];
      let current = finishPointKey;

      while (true) {
        if (!current) {
          break;
        };

        if (current === startPointKey) {
          const currentData = distancesList.get(current);
          path.push(current);
          break;
        };

        const currentData = distancesList.get(current);
        path.push(current);
        current = currentData.from;
      };
      return path.reverse();
    };

    return restorePath(distances, startPoint, finishPoint);
  }

  return {
    siftDownCycle,
    main
  }
}

const arr2 = [
  ['A', [{ node: 'B', cost: 4 }, { node: 'C', cost: 2 }]],
  ['B', [{ node: 'A', cost: 4 }, { node: 'D', cost: 5 }, { node: 'E', cost: 3 }]],
  ['C', [{ node: 'A', cost: 2 }, { node: 'D', cost: 8 }, { node: 'G', cost: 10 }]],
  ['D', [{ node: 'B', cost: 5 }, { node: 'C', cost: 8 }, { node: 'F', cost: 6 }]],
  ['E', [{ node: 'B', cost: 3 }, { node: 'F', cost: 7 }, { node: 'H', cost: 9 }]],
  ['F', [{ node: 'D', cost: 6 }, { node: 'E', cost: 7 }, { node: 'G', cost: 1 }]],
  ['G', [{ node: 'C', cost: 10 }, { node: 'F', cost: 1 }, { node: 'H', cost: 2 }]],
  ['H', [{ node: 'E', cost: 9 }, { node: 'G', cost: 2 }]],
];
const arr1 = [200, 103, 194, 55, 5, 7, 9, 34, 5, 23, 65, 76, 35, 53]
const { siftDownCycle, main } = graph(arr2);
console.log(main('A', 'G'))
// siftDownCycle(arr1)
// console.log(arr1)


