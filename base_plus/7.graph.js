//////////////////////////////////////// DSF /////////////////////////////////////////
//Важный принцип: вершину отмечаем посещённой в момент, когда решаем её посетить, а не после того, как закончили обход её соседей.
const dfs = (graph, start) => {
  const visited = new Set();
  visited.add(start);
  const result = [start];

  const walk = (neigthborsArray) => {
    for (const neighborKey of neigthborsArray) {
      if (visited.has(neighborKey)) {
        continue; //// RETURN завершит весь цикл
      };

      visited.add(neighborKey);
      result.push(neighborKey);
      console.log(`Going to ${neighborKey}`);
      walk(graph[neighborKey]);
    }

  };


  walk(graph[start]);

  for (const key in graph) {
    if (!visited.has(key)) {
      walk(graph[key]);
    };
  };


  return result;
};
const test_graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A'],
  D: ['B'],
};

//   Временная сложность O(V+ E)}
// - Вершин (V = 4): A, B, C, D.
// - Рёбер (E = 3): A—B, A—C, B—D.
//console.log(dfs(test_graph, 'A'))

//////////////////////////////////////// BSF /////////////////////////////////////////
const bfs = (graph, startKey) => {
  const queue = [startKey];
  const result = [startKey];
  const visited = new Set();
  visited.add(startKey);

  while (queue.length !== 0) {
    const currentItemKey = queue.shift();
    const currentItemNeighborsArray = graph[currentItemKey];

    for (const item of currentItemNeighborsArray) {
      if (!visited.has(item)) {
        queue.push(item);
        visited.add(item);
        result.push(item);
      };
    }
  }
  return result;
};
const test_graph2 = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B'],
  F: ['C'],
};
//console.log(bfs(test_graph2, 'A'))


/// ---- Поиск кратчаейшего пути в невзвешенном графе -------------------
// Ищем кратчайший путь от А до G
//первый найденный путь уже кратчайший для невзвешенного графа.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



const shortest_way = (graph, startKey, endPointKey) => {
  const queue = [startKey];

  const visited = new Map();  // храним пары, где ключ врешина: родитель(значение)
  visited.set(startKey, null);

  let found = startKey === endPointKey; /// Флаг для логики - Если нашли точку, то прервать и не обходить остальные вершины. И заодно на случай если старт равен финишу

  while (queue.length !== 0 && found === false) {
    const currentItemKey = queue.shift();
    const currentItemNeighborsArray = graph[currentItemKey];

    for (const item of currentItemNeighborsArray) {
      if (!visited.has(item)) {
        queue.push(item);
        visited.set(item, currentItemKey);
        if (item === endPointKey) {
          found = true;
          break
        }
      };
    }
  }

  const createPath = () => {
    const result = [];
    if (!visited.has(endPointKey)) return;

    let current = endPointKey;

    while (current !== null) {
      result.push(current);
      const nextParrent = visited.get(current);
      current = nextParrent;
    };

    return result.reverse(); 
  }
  const path = createPath();
  return path;
};
const test_graph3 = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B', 'G'],
  E: ['B', 'G'],
  F: ['C', 'G'],
  G: ['D', 'E', 'F'],
};
// while (queue.length !== 0 && found === false) { Тут мы не знаем сколько итераци будет, по етому обсудим худгий случай, а это столько сколько вершин O(n)
//const currentItemKey = queue.shift(); тут я не хочу захламлять логикой с плавающим индексом, но как бкд то она есть, по етому O(1);
//for (const item of currentItemNeighborsArray) { Этот цикл к-во ребер * 2 итераций максимум.
//createPath в худшем случае O(n);
//Итого временная сложность O(n + K)! именно +
console.log(bfs(test_graph3, 'A'))