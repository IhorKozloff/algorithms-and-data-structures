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
console.log(bfs(test_graph2, 'A'))


///