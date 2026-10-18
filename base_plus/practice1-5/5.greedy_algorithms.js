// Ты фрилансер и планируешь рабочий день. У тебя есть задачи, у каждой указано время начала и окончания. За день ты можешь выполнить несколько задач, но они не должны пересекаться по времени.
// Например, если ты выполняешь Task A с 9:00 до 11:00, ты не можешь взять Task B, потому что она начинается в 10:00. Но Task C, которая начинается в 11:00, уже подходит.
// Твоя цель: выбрать максимальное количество задач, которые не пересекаются по времени.

const tasks = [
  { name: "Task A", start: 9, end: 11 },
  { name: "Task B", start: 10, end: 12 },
  { name: "Task C", start: 11, end: 13 },
  { name: "Task D", start: 12, end: 14 },
  { name: "Task E", start: 13, end: 15 },
  { name: "Task F", start: 14, end: 16 },
  { name: "Task G", start: 15, end: 17 },
  { name: "Task H", start: 16, end: 18 },
];
const practice_greedy_algorithms = (arr) => {
  const sortedArr = [...arr].sort((a, b) => a.end - b.end);
  const result = [sortedArr[0]];

  let lastElEnd = result[0].end;

  for (let i = 1; i < sortedArr.length; i++) {

    if (sortedArr[i].start >= lastElEnd) {
      result.push(sortedArr[i])
      lastElEnd = sortedArr[i].end;
    }
  }

  return result;
};

console.log('result', practice_greedy_algorithms(tasks));