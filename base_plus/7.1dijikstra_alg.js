class PriorityQueue {
  queueMinHeap = [] //{ key: 'A', priority: 0 } где priority вес ребра до ключа

  isEmpty() {
    return this.queueMinHeap.length === 0
  };

  enqueue(key, priority) {
    this.queueMinHeap.push({ key, priority });
    this.siftUp(this.queueMinHeap.length - 1);
  }
  siftUp(elIndex) {

    const walk = (currentIndex) => {
      if (currentIndex === 0) {
        return;
      };

      const parentIndex = Math.floor((currentIndex - 1) / 2); //Math.floor((i - 1) / 2)
      const parentItem = this.queueMinHeap[parentIndex];
      const currentItem = this.queueMinHeap[currentIndex];

      if (parentItem.priority <= currentItem.priority) {
        return;
      };

      const currentTmp = this.queueMinHeap[currentIndex];
      this.queueMinHeap[currentIndex] = this.queueMinHeap[parentIndex];
      this.queueMinHeap[parentIndex] = currentTmp;
      walk(parentIndex);
    };
    walk(elIndex);
  }

  siftDown(elIndex) {

    const walk = (currentIndex) => {
      const currentItem = this.queueMinHeap[currentIndex];
      const leftChildIndex = currentIndex * 2 + 1;
      const leftChildItem = this.queueMinHeap[leftChildIndex];

      if (!leftChildItem) {
        return;
      };

      let smallerChildren = leftChildItem;
      let smallerChildrenIndex = leftChildIndex;

      const rightChildIndex = currentIndex * 2 + 2;
      const rightChildItem = this.queueMinHeap[rightChildIndex];

      if (rightChildItem && rightChildItem.priority < smallerChildren.priority) {
        smallerChildren = rightChildItem;
        smallerChildrenIndex = rightChildIndex;
      }

      if (currentItem.priority <= smallerChildren.priority) {
        return;
      };

      const currentTmp = this.queueMinHeap[currentIndex];
      this.queueMinHeap[currentIndex] = this.queueMinHeap[smallerChildrenIndex];
      this.queueMinHeap[smallerChildrenIndex] = currentTmp;

      walk(smallerChildrenIndex);
    };
    walk(elIndex);

  }

  dequeue() {
    if (this.queueMinHeap.length === 0) return;
    if (this.queueMinHeap.length === 1) {
      return this.queueMinHeap.pop();
    };

    const firstItem = this.queueMinHeap[0];

    this.queueMinHeap[0] = this.queueMinHeap[this.queueMinHeap.length - 1];
    this.queueMinHeap.pop();

    this.siftDown(0);
    return firstItem;
  }
}
const initializeDistancesState = (data, startKey) => {
  const distances = new Map();// { G: {value: 17, parent: C}, B: {value: 9, parent: A} } 
  for (const key in data) {
    distances.set(key, Infinity);
  };
  distances.set(startKey, 0);
  return distances;
};

const shortest_way_dijkstra = (graph, entryPointKey) => {
  const visited = new Set(); //вершина считается визитед если мы в нее пришли и обработали ее соседей
  const distances = initializeDistancesState(graph, entryPointKey);

  console.log(distances)
  let result;
  return result;
};

const graph = {
  A: [
    { vertex: 'B', weight: 4 },
    { vertex: 'H', weight: 8 },
  ],
  B: [
    { vertex: 'A', weight: 4 },
    { vertex: 'C', weight: 8 },
    { vertex: 'H', weight: 11 },
  ],
  C: [
    { vertex: 'B', weight: 8 },
    { vertex: 'D', weight: 7 },
    { vertex: 'F', weight: 4 },
    { vertex: 'I', weight: 2 },
  ],
  D: [
    { vertex: 'C', weight: 7 },
    { vertex: 'E', weight: 9 },
    { vertex: 'F', weight: 14 },
  ],
  E: [
    { vertex: 'D', weight: 9 },
    { vertex: 'F', weight: 10 },
  ],
  F: [
    { vertex: 'C', weight: 4 },
    { vertex: 'D', weight: 14 },
    { vertex: 'E', weight: 10 },
    { vertex: 'G', weight: 2 },
  ],
  G: [
    { vertex: 'F', weight: 2 },
    { vertex: 'H', weight: 1 },
    { vertex: 'I', weight: 6 },
  ],
  H: [
    { vertex: 'A', weight: 8 },
    { vertex: 'B', weight: 11 },
    { vertex: 'G', weight: 1 },
    { vertex: 'I', weight: 7 },
  ],
  I: [
    { vertex: 'C', weight: 2 },
    { vertex: 'G', weight: 6 },
    { vertex: 'H', weight: 7 },
  ],
};
console.log(shortest_way_dijkstra(graph, 'A'));




///-------------PriorityQueue tests -----------------
const pq = new PriorityQueue();

// 1. Проверяем начальное состояние
console.log('Initially empty:', pq.isEmpty()); // true

// 2. Добавляем элементы с разными приоритетами
pq.enqueue('A', 8);
pq.enqueue('B', 3);
pq.enqueue('C', 10);
pq.enqueue('D', 1);
pq.enqueue('E', 6);

// 3. Проверяем, что очередь не пустая
console.log('After enqueue:', pq.isEmpty()); // false

// 4. Извлекаем все элементы
const results = [];

while (!pq.isEmpty()) {
    results.push(pq.dequeue());
}

console.log('Extracted:', results);

// Ожидаемый порядок:
// D (1), B (3), E (6), A (8), C (10)

// 5. Проверяем, что очередь снова пуста
console.log('After dequeue:', pq.isEmpty()); // true

// 6. Проверяем извлечение из пустой очереди
console.log('Empty dequeue:', pq.dequeue()); // undefined

// 7. Проверяем очередь с одним элементом
pq.enqueue('X', 5);

console.log('Single element:', pq.dequeue());
// { key: 'X', priority: 5 }

console.log('After single dequeue:', pq.isEmpty()); // true