// Нужно написать функцию, которая вернёт все возможные наборы товаров — от пустого набора до набора со всеми четырьмя товарами.
// Например, результаты должны включать:
// []
// ["Keyboard"]
// ["Mouse", "Monitor"]
// ["Keyboard", "Mouse", "Monitor", "Headphones"]

const products = [
  "Keyboard",
  "Mouse",
  "Monitor",
  "Headphones"
];

const backtracking = (array) => {
  const result = [];

  const walk = (path, startIndex) => {
    if (startIndex === array.length - 1) {
      result.push([...path]);
      return;
    };

    result.push([...path]);

    for (let i = startIndex; i < array.length; i++) {
      const item = array[i];

      path.push(item);

      walk(path, i + 1);
      path.pop()
    }
  }
  walk([], 0)
  return result;
};
console.log('result', backtracking(products));