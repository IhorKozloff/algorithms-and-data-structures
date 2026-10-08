export const graph = (initialData = []) => {
  const graphData = new Map(initialData);

  const addVertex = (newVertexKey) => {

    const isVertexExist = graphData.has(newVertexKey);
    if (isVertexExist) {
      return;
    } else {
      graphData.set(newVertexKey, []);
    };
  }
  const addEdge = (a, b) => {

    const isVertexesExist = graphData.has(a) && graphData.has(b);

    if (isVertexesExist) {
      graphData.get(a).push(b);
      graphData.get(b).push(a);
    } else {
      return;
    }
  };

  const removeEdge = (firstKey, secondKey) => {
    const firstVertex = graphData.get(firstKey);
    const secondVertex = graphData.get(secondKey);
    console.log('First Key', firstKey);
    console.log('Second Key', secondKey);
    const removeFn = (v, removeKey) => {
      const removeIndex = v.indexOf(removeKey);
      if (removeIndex >= 0) {
        v.splice(removeIndex, 1)
      };
    };

    firstVertex && removeFn(firstVertex, secondKey);
    secondVertex && removeFn(secondVertex, firstKey);
  };

  const removeVertex = (vKey) => {
    const removedVertex = graphData.get(vKey);
    if (!removedVertex) {
      return;
    };

    const track = [...removedVertex];

    for (let i = 0; i < track.length; i++) {
      removeEdge(vKey, track[i]);
    };
    graphData.delete(vKey);
  }

  const walk_dfs_v1 = (entryPointKey) => {
    const visited = new Set();
    const visitedOrder = [];

    const walk = (key) => {
      visited.add(key);
      visitedOrder.push(key);

      const vertexData = graphData.get(key);

      for (let i = 0; i < vertexData.length; i++) {
        if (!visited.has(vertexData[i])) {
          walk(vertexData[i]);
        } else {
          continue;
        };
      };
    }

    walk(entryPointKey);
    console.log(visited)
  }
  const walk_dfs_v2 = (entryPointKey) => {
    const visited = new Set();
    const visitedOrder = [];

    const stack = [entryPointKey];

    while (stack.length > 0) {
      const currentVertexKey = stack.pop();
      if (visited.has(currentVertexKey)) {
        continue;
      };

      visited.add(currentVertexKey);
      visitedOrder.push(currentVertexKey);

      const vertexData = graphData.get(currentVertexKey);

      for (let i = vertexData.length - 1; i >= 0; i--) {
        const isVertexVisited = visited.has(vertexData[i]);
        if (!isVertexVisited) {
          stack.push(vertexData[i]);
        }
      };
    }
  };

  const walk_bfs_v2 = (entryPointKey) => {
    const visited = new Set();
    const visitedOrder = [];
    let firstElIndex = 0;
    const queue = [entryPointKey];

    while (firstElIndex < queue.length) {
      const currentVertexKey = queue[firstElIndex];
      firstElIndex += 1;

      if (visited.has(currentVertexKey)) {
        continue;
      };

      visited.add(currentVertexKey);
      visitedOrder.push(currentVertexKey);

      const vertexData = graphData.get(currentVertexKey);

      for (let i = 0; i < vertexData.length; i++) {
        const isVertexVisited = visited.has(vertexData[i]);
        if (!isVertexVisited) {
          queue.push(vertexData[i]);
        }
      };

    }
    return visited;
  }

  const shortest_way = (startKey, finishKey) => { //Работает только если все ребра одинаковые, т.е в невзвешенном графе
    const visited = new Set(); // ВНИМАНИЕ. Это теперь вершины которые обнаружены и поставлены в очередь.
    const parent = new Map();

    let firstElIndex = 0;
    const queue = [startKey];
    visited.add(startKey);


    while (firstElIndex < queue.length) {
      const currentVertexKey = queue[firstElIndex];

      if (currentVertexKey === finishKey) {
        console.log(`Point ${finishKey} has been found!`)
        break;
      }

      const vertexData = graphData.get(currentVertexKey);

      for (let i = 0; i < vertexData.length; i++) {
        const child = vertexData[i];
        const isVertexVisited = visited.has(child);
        const from = currentVertexKey;

        if (!isVertexVisited) {
          visited.add(child);
          queue.push(child);
          parent.set(child, from);
        }
      };
      firstElIndex += 1;
    };
    const resultWay = [];
    let current = finishKey;

    while (current) {
      resultWay.push(current);
      const parentVertex = parent.get(current);
      current = parentVertex;
    };
    console.log('result', resultWay)
  }

  const isConnected = (entryPointKey) => {
    const visitedVertexes = walk_bfs_v2(entryPointKey);
    return graphData.size === visitedVertexes.size;
  }

  const getGraphData = () => graphData;

  return {
    addVertex,
    getGraphData,
    addEdge,
    removeEdge,
    removeVertex,
    walk_dfs_v1,
    walk_dfs_v2,
    walk_bfs_v2,
    shortest_way,
    isConnected
  };
};
const initData = [
  ['A', ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']],
  ['G', ['1', '2', '3', '4', '5', 'A', '6', '7', 'I', 'J', 'K']],
  ['B', ['F', 'G', 'A', 'I']],
  ['C', ['3', '4', '5', 'A', '6', '7', 'I']],
  ['D', ['B', 'A', 'D', 'E', 'F', 'G']]
]
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

const { addVertex, getGraphData, addEdge, removeEdge, removeVertex, walk_dfs_v1, walk_dfs_v2, walk_bfs_v2, shortest_way, isConnected } = graph(initDataForDfs);
// addVertex('A');
// addVertex('B');
// addEdge('A', 'B');


//remove test
//removeEdge('A', 'G')
//removeVertex('A')

//DFS
// walk_dfs_v1('A')
// walk_dfs_v2('A')
//walk_bfs_v2('A')
console.log(isConnected('A'))
//shortest_way('A', 'G')
//console.log(getGraphData());