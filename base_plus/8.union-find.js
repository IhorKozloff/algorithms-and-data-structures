// Здесь три множества:
// - {A, B, C} — представитель A.
// - {D, E, F} — представитель D.
// - {G} — представитель G.


///Union by Size
const data = new Map([
  ['A', { parent: 'A', color: 'blue', size: 3 }],
  ['B', { parent: 'A', color: 'blue', size: 1 }],
  ['C', { parent: 'B', color: 'blue', size: 1 }],
  ['D', { parent: 'D', color: 'red', size: 3 }],
  ['E', { parent: 'D', color: 'red', size: 1 }],
  ['F', { parent: 'E', color: 'red', size: 1 }],
  ['G', { parent: 'G', color: 'green', size: 1 }],
]);

///Union by Rank
const data2 = new Map([
  ['A', { parent: 'A', color: 'blue', rank: 2 }],
  ['B', { parent: 'A', color: 'blue', rank: 0 }],
  ['C', { parent: 'B', color: 'blue', rank: 0 }],
  ['D', { parent: 'D', color: 'red', rank: 2 }],
  ['E', { parent: 'D', color: 'red', rank: 0 }],
  ['F', { parent: 'E', color: 'red', rank: 0 }],
  ['G', { parent: 'G', color: 'green', rank: 0 }],
]);

const findUnityHead = (findingKey, data) => {
  const visitedVertexKeys = [];
  let rootKey;
  let currentKey = findingKey;

  while (true) {
    const currentElementData = data.get(currentKey);

    if (!currentElementData) return;
    visitedVertexKeys.push(currentKey);

    if (currentKey === currentElementData.parent) {
      rootKey = currentKey;
      break;
    };

    currentKey = currentElementData.parent;
  };

  const path_compression = () => {
    visitedVertexKeys.forEach(key => {
      const currentElData = data.get(key);
      data.set(key, { ...currentElData, parent: rootKey });
    });
  }
  console.log(visitedVertexKeys)
  path_compression();

  return rootKey;
};

const combine = (firstKey, secondKey, data) => {
  const createDataset = () => {

    const dataset = {
      first: {
        key: findUnityHead(firstKey, data),
      },

      second: {
        key: findUnityHead(secondKey, data),
      },
    };
    dataset.first.body = data.get(dataset.first.key);
    dataset.second.body = data.get(dataset.second.key);
    return dataset;
  };
  const headsDataset = createDataset();

  if (!headsDataset.first.key || !headsDataset.second.key) {
    return false;
  };

  if (headsDataset.first.key === headsDataset.second.key) {
    return false;
  };

  ///Union by Size
  // let greater = 'first';
  // let lower = 'first';

  // if (headsDataset.first.body.size > headsDataset.second.body.size) {
  //   lower = 'second';
  // } else {
  //   greater = 'second';
  // }

  // data.set(headsDataset[lower].key, { ...headsDataset[lower].body, parent: headsDataset[greater].key });
  // data.set(headsDataset[greater].key, { ...headsDataset[greater].body, size: headsDataset[greater].body.size + headsDataset[lower].body.size });

  //Union by Rank
  if (headsDataset.first.body.rank === headsDataset.second.body.rank) {
    // Если ранги одинаковые — ранг выбранного корня увеличивается на 1.
    data.set(headsDataset.first.key, { ...headsDataset.first.body, rank: headsDataset.first.body.rank + 1 });
    data.set(headsDataset.second.key, { ...headsDataset.second.body, parent: headsDataset.first.key });

  } else {
    // Если ранги различаются — ранг большего остаётся прежним.
    let greater = 'first';
    let lower = 'first';

    if (headsDataset.first.body.rank > headsDataset.second.body.rank) {
      lower = 'second';
    } else {
      greater = 'second';
    }

    data.set(headsDataset[lower].key, { ...headsDataset[lower].body, parent: headsDataset[greater].key });
  }

  return true;
};

// combine('E', 'C', data)
// console.log(data)
combine('E', 'C', data2)
console.log(data2)

// find без оптимизаций	\(O(n)\) в худшем случае
// union без оптимизаций	\(O(n)\) в худшем случае, включая поиск корней
// find с Rank + Path Compression	\(O(\alpha(n))\) амортизированно
// union с Rank + Path Compression	\(O(\alpha(n))\) амортизированно