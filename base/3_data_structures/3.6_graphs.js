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

  const walk_v1 = (entryPointKey) => {
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

  const getGraphData = () => graphData;

  return {
    addVertex,
    getGraphData,
    addEdge,
    removeEdge,
    removeVertex,
    walk_v1
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

const { addVertex, getGraphData, addEdge, removeEdge, removeVertex, walk_v1 } = graph(initDataForDfs);
// addVertex('A');
// addVertex('B');
// addEdge('A', 'B');


//remove test
//removeEdge('A', 'G')
//removeVertex('A')

//DFS
walk_v1('A')
//console.log(getGraphData());