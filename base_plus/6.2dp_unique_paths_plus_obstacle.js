//Ищем пути учитывая что можно двигаться только вправо и вниз

const obstacleGrid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

const createRouteMap = (obstacleMap) => {
  //obstacleMap - таблица с клетками которые нельзя посещать.
  //   const obstacleGrid = [
  //     [0, 0, 0],
  //     [0, 1, 0],
  //     [0, 0, 0],
  // ];
  const createCleanRow = (size) => {
    const newRow = new Array(size).fill(0);
    return newRow;
  };

  const createFirstRow = (obstacleRow) => {
    const size = obstacleRow.length;
    const newRow = createCleanRow(size);

    if (obstacleMap[0][0] !== 1) {
      newRow[0] = 1;
    };

    for (let i = 1; i < size; i++) {
      if (obstacleRow[i] === 1) {
        newRow[i] = 0;
      } else {
        if (newRow[i - 1] === 1) {
          newRow[i] = 1;
        }
      }
    }
    return newRow;
  };

  const routeMap = [
    createFirstRow(obstacleMap[0]),
  ];


  for (let i = 1; i < obstacleMap.length; i++) {
    const newRow = createCleanRow(obstacleMap[i].length);

    if (obstacleMap[i][0] !== 1) {
      if (i > 0 && routeMap[i - 1][0] !== 0) {
        newRow[0] = 1;
      }
    }
    routeMap.push(newRow);
  };


  return routeMap;
};
//console.log('createRouteMap', createRouteMap(obstacleGrid))

const dp_unique_paths = (obstacleMap) => {
  const routeMap = createRouteMap(obstacleMap);

  for (let i = 1; i < routeMap.length; i++) { // перебираем строки, тоесть елементы массива routeMap

    // на каждой итерации нужно перебрать массив
    for (let k = 1; k < routeMap[i].length; k++) {
      const currentItemValue = routeMap[i][k - 1] + routeMap[i - 1][k];
      if (obstacleMap[i][k] === 1) {
        routeMap[i][k] = 0;
      } else {
        routeMap[i][k] = currentItemValue;
      }
    }
  }

  return routeMap[routeMap.length - 1][routeMap[0].length - 1];
};

console.log('dp_unique_paths', dp_unique_paths(obstacleGrid));