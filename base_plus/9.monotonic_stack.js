const monotonic_stack = (data) => {
    const stack = [];

    for (const item of data) {

        while (stack[stack.length - 1] >= item) { //одинаковые не храним
            stack.pop();
        };

        stack.push(item);
    }
    return stack;
};
// Ключевая идея: каждый элемент массива может быть:
// 1. Добавлен в стек только один раз.
// 2. Удалён из стека не более одного раза.
// По этому сложность O(n)
const numbers = [6, 3, 8, 2, 7, 4, 9, 5, 10];
//console.log(monotonic_stack(numbers));

///Monotonic Stack — Next Greater Element
// Найти ближайший больший элемент справа
const nextGreaterElement = (numbers) => {
    const result = new Array(numbers.length).fill(-1);
    const stack = [];

    for (let i = numbers.length - 1; i >= 0; i--) {
        while (stack[stack.length - 1] <= numbers[i]) {
            stack.pop();
        };
        if (stack.length !== 0) {
            result[i] = stack[stack.length - 1];
        };
        stack.push(numbers[i]);
    }
    return result;
};
const numbers2 = [3, 8, 4, 6, 2, 9, 5, 7];
//console.log(nextGreaterElement(numbers2));

//Daily Temperatures
//НАйти расстояние через которое температура станет строго больше


const dailyTemperatures = (temperatures) => {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];

    for (let i = temperatures.length - 1; i >= 0; i--) {

        //console.log('stack', stack, 'i', i, 'temperatures[i]', temperatures[i])
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
            //console.log('temperatures[stack[stack.length - 1]]', temperatures[stack[stack.length - 1]], 'temperatures[i]', temperatures[i])
            stack.pop();
        };
        if (stack.length !== 0) {
            result[i] = stack[stack.length - 1] - i;
        };
        stack.push(i);
    }
    return {
        temperatures: JSON.stringify(temperatures),
        result: JSON.stringify(result),
        stack: JSON.stringify(stack)
    }
};
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73];
console.log(dailyTemperatures(temperatures));   