// A — Подготовить экипировку. Надеть подходящие броню и оружие.
// B — Выучить необходимые способности. Подготовить умения для боя.
// C — Приготовить расходники. Запастись зельями и едой.
// D — Заточить оружие. Улучшить оружие после подготовки экипировки.
// E — Проверить боевую готовность. Убедиться, что экипировка улучшена, а способности изучены.
// F — Прибыть к входу в рейд. Добраться до места сбора.
// G — Собраться с группой. Встретиться с остальными игроками.
// H — Начать рейд. Войти в подземелье и начать бой.
// I — Забрать добычу. Получить награду после победы над боссом.

// A → D: сначала нужно подготовить экипировку, затем заточить оружие.
// D → E: после заточки можно проверить боевую готовность.
// B → E: способности должны быть изучены до проверки готовности.
// C → H: расходники должны быть подготовлены до начала рейда.
// E → H: персонаж должен пройти проверку готовности до начала рейда.
// F → G: сначала прибыть к месту сбора, затем собраться с группой.
// G → H: начать рейд можно после сбора группы.
// H → I: добычу можно забрать после победы над боссом.

const graph = {
  A: ['D'],
  B: ['E'],
  C: ['H'],
  D: ['E'],
  E: ['H'],
  F: ['G'],
  G: ['H'],
  H: ['I'],
  I: [],
}
const createDependencyList = (graph) => {
  const dependencyList = new Map();

  for (const key in graph) {
    if (!dependencyList.has(key)) {
      dependencyList.set(key, 0);
    };

    const dependencies = graph[key];

    dependencies.forEach(dependencyKey => {
      let value = 1;

      if (dependencyList.has(dependencyKey)) {
        const existingDependencyValue = dependencyList.get(dependencyKey);
        value = existingDependencyValue + 1;
      };

      dependencyList.set(dependencyKey, value);
    });
  }
  return dependencyList;
};
const initializeQueue = (listMap) => {
  const queue = [];
  let firstQueueIndex = 0;

  for (const [key, value] of listMap) {
    if (value === 0) queue.push(key);
  };

  const dequeue = () => {
    const currentEl = queue[firstQueueIndex];
    firstQueueIndex += 1;
    return currentEl;
  };

  const inqueue = (key) => {
    queue.push(key);
  };

  const isEmpty = () => firstQueueIndex === queue.length;
  const getQueue = () => queue.slice(firstQueueIndex);

  return { queue, dequeue, inqueue, isEmpty, getQueue };
}
const topological_sort = (graph) => {
  const result = [];

  const dependencyList = createDependencyList(graph);
  const { dequeue, inqueue, isEmpty, getQueue } = initializeQueue(dependencyList);

  while (!isEmpty()) {
    const currentDequeuedKey = dequeue();
    result.push(currentDequeuedKey);

    const currentVertexNeighboursList = graph[currentDequeuedKey];
    console.log('queue in while cycle', getQueue());

    for (const neighbourKey of currentVertexNeighboursList) {
      console.log('currentDequeuedKey', currentDequeuedKey, 'neighbourKey', neighbourKey)
      const isNeigbourExist = dependencyList.has(neighbourKey);
      if (isNeigbourExist) {
        const value = dependencyList.get(neighbourKey);

        if (value > 0) {
          const newValue = value - 1;
          if (newValue === 0) {
            inqueue(neighbourKey);
          };
          dependencyList.set(neighbourKey, newValue);
        }
      }
    }

  }
  return result;
};
console.log(topological_sort(graph));