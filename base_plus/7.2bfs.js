const bfs = (graph, entryPointKey, finishPointKey) => {
  const queue = [entryPointKey];
  const visited = new Map();
  visited.set(entryPointKey, null);
  let firstElementInQueue = 0;


  while (firstElementInQueue < queue.length) {
    const currentKey = queue[firstElementInQueue];

    const currentVertexNeighboursList = graph[currentKey];

    for (const neighbourKey of currentVertexNeighboursList) {
      if (!visited.has(neighbourKey)) {
        visited.set(neighbourKey, currentKey);
        queue.push(neighbourKey);
      };
    };

    firstElementInQueue += 1;
  }

  const path = [];

  if (finishPointKey) {
    if (visited.has(finishPointKey)) {

      let currentKey = finishPointKey;
      while (currentKey !== null) {
        path.push(currentKey);
        const currentItemValue = visited.get(currentKey); // value - it is a parent!
        currentKey = currentItemValue;
      };
    }
  }


  return path.length === 0 ? null : path.reverse();
};
//Временная сложно сть O(n + k), или O(n) - за while, и O(2k) за фор оф, где к ето у-во ребер: O(n) + O(2k) = O(n + k)
const graph = {
  A: ['B', 'C'],
  B: ['A', 'C', 'D', 'E'],
  C: ['A', 'B', 'F', 'G'],
  D: ['B', 'H'],
  E: ['B', 'F'],
  F: ['C', 'E'],
  G: ['C'],
  H: ['D'],
};
console.log(bfs(graph, 'A', 'G'));