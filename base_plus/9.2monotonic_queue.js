//Monotonic Queue обычно реализуют с помощью Deque.
//Когда элементы удаляются и с конца и с начала - такая структура называется Deque (Double-Ended Queue) — двусторонняя очередь.

//Нужно найти максимальный элемент в каждом окне длины 3.

// Эта задача называется Sliding Window Maximum.
// Можно написать два цикла:
// - Первый перемещает окно.
// - Второй ищет максимальное значение внутри окна.
// Но тогда сложность будет:

// O(n × k).

// Если массив содержит миллион элементов, а окно имеет размер 100 000, такой подход может оказаться слишком медленным.

// С помощью Monotonic Queue мы можем решить задачу за O(n).

const maxSlidingWindow = (nums, size) => {
    const result = [];
    const deque = [];
    let head = 0;

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const left = i - size + 1;

        while (head < deque.length && deque[head] < left) {
            head ++;
        }

        while (head < deque.length && nums[deque[deque.length - 1]] <= currentNum) {
            deque.pop();
        };
        deque.push(i);

        if (size - 1 <= i) {
            result.push(nums[deque[head]]);
        }
    }
};
const numbers = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(maxSlidingWindow(numbers, k))