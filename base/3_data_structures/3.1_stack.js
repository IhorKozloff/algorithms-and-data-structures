const createStack = () => {
  const stack = [];

  const pushFn = (element) => {
    stack.push(element);
  };
  const popFn = () => {
    stack.pop();
  };

  const peekFn = () => {
    return stack[stack.length - 1];
  };

  return {
    push: pushFn,
    pop: popFn,
    peek: peekFn
  };
};