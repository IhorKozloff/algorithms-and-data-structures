// Здесь три множества:
// - {A, B, C} — представитель A.
// - {D, E, F} — представитель D.
// - {G} — представитель G.
const data = new Map([
  ['A', { parent: 'A', color: 'blue' }],
  ['B', { parent: 'A', color: 'blue' }],
  ['C', { parent: 'B', color: 'blue' }],
  ['D', { parent: 'D', color: 'red' }],
  ['E', { parent: 'D', color: 'red' }],
  ['F', { parent: 'E', color: 'red' }],
  ['G', { parent: 'G', color: 'green' }],
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
  const firstHeadKey = findUnityHead(firstKey, data);
  const secondHeadKey = findUnityHead(secondKey, data);

  if (!firstHeadKey || !secondHeadKey) {
    return false;
  };

  if (firstHeadKey === secondHeadKey) {
    return false;
  };
  const secondHeadElData = data.get(secondHeadKey);
  data.set(secondHeadKey, { ...secondHeadElData, parent: firstHeadKey });

  return true;
};

combine('E', 'C', data)
console.log(data)