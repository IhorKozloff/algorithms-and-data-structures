
const greedyCoins = (amount, coins) => {
  const coinsCombinationResult = [];
  let sum = amount;

  for (const coin of coins) {
    if (coin > sum) {
      continue;
    } else {
      coinsCombinationResult.push(coin);
      sum -= coin;
    }
  }
  return coinsCombinationResult
}
const coins = [25, 10, 5, 1];
const amount = 36;
//console.log(greedyCoins(amount, coins))

//Задача, посетить как можно больше не пересекающихся событий

const greedy_events = (eventsArray) => {
  const sortedEventsArray = [...eventsArray].sort((a, b) => a.end - b.end);

  if (sortedEventsArray.length === 0) {
    return [];
  };

  const result = [sortedEventsArray[0]];
  let lastEventEndedTime = sortedEventsArray[0].end;

  for (let i = 1; i < sortedEventsArray.length; i++) {

    if (sortedEventsArray[i].start >= lastEventEndedTime) {
      result.push(sortedEventsArray[i]);
      lastEventEndedTime = sortedEventsArray[i].end
    }
  }

  return result;
}
//Временная сложность когда итерируем циклом фор O(n - 1), но самый затратный это метод сорт O(n log n), по етому O(n log n)
//Пространственная сложность O(n) потому что наибольшая операция по доп памяти это - создаем сортированный массив такой же длинны.
const events = [
  { name: 'A', start: 9, end: 10 },
  { name: 'B', start: 9.5, end: 11 },
  { name: 'C', start: 10, end: 11 },
  { name: 'D', start: 11, end: 12 },
  { name: 'E', start: 10.5, end: 12 },
];
//console.log(greedy_events(events));


const greedy_files = (files, capacity) => {
  const result = [];
  if (files.length === 0) {
    return result;
  };

  let remainingDiskSpace = capacity;
  const sortedFiles = [...files].sort((a, b) => a.size - b.size);

  for (const file of sortedFiles) {
    if (file.size <= remainingDiskSpace) {
      result.push(file);
      remainingDiskSpace -= file.size;
    }
  }

  return result;
}
const testFiles = [
  { name: 'config.json', size: 8 },
  { name: 'users.db', size: 35 },
  { name: 'avatar.png', size: 12 },
  { name: 'backup.zip', size: 48 },
  { name: 'report.pdf', size: 17 },
  { name: 'cache.bin', size: 6 },
  { name: 'video.mp4', size: 55 },
  { name: 'logs.txt', size: 9 },
  { name: 'bundle.js', size: 22 },
  { name: 'icon.svg', size: 4 },
];

const testCapacity = 100;
console.log(greedy_files(testFiles, testCapacity));