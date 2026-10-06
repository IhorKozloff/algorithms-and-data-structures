export const createNode = (value) => {
  const result = {
    value,
    left: null,
    right: null
  };
  return result;
};

const createBinarySearchTree = (rootUserData) => {
  let root = rootUserData || null;

  const insert = (value) => {
    const newNode = createNode(value);
    if (root === null) {
      root = newNode;
      return;
    };

    let current = root;
    while (true) {
      const status = newNode.value < current.value ? 'left' : 'right';

      if (current[status]) {
        current = current[status];
      } else {
        current[status] = newNode;
        break;
      }
    }
  };

  const find = (value) => {
    let current = root;

    while (current !== null) {
      if (current.value === value) {
        return current;
      };
      current = value < current.value ? current.left : current.right;
    }
    return undefined;
    //Сложность O(log n), в худшем случае ето связанный список - O(n)
  }

  const remove = (value) => {
    let currentNode = root;
    let prevNode = null;

    //Ищем текущий узел который хоти удалить, и его предшевственника
    while (currentNode !== null && currentNode.value !== value) {
      prevNode = currentNode;
      currentNode = value < currentNode.value ? currentNode.left : currentNode.right;
    }

    //Если не нашли, законцили удаление ничем
    if (!currentNode) {
      return;
    };

    //Если оказалось что мы хотим удалить корневой элемент
    if (currentNode === root) {
      root = null;
      return;
    };

    //Если все сложнее то ...
    //Сделаем правый или левый удаляемый обьект у родителя
    const status = prevNode.left === currentNode ? 'left' : 'right';

    //Если у удаляемого узла нет детей
    if (!currentNode.left && !currentNode.right) {
      prevNode[status] = null;
      return;
    };

    //Если есть оба ребенка, ищем саксессор - минимальный в правом дереве.
    if (currentNode.left && currentNode.right) {
      //если в правом дереве следующий же елемент не имеет левого ребенка, нет смысла запускать цикл
      if (currentNode.right.left === null) {
        currentNode.right.left = currentNode.left;
        prevNode[status] = currentNode.right;
        return;
      }

      // В противном случае циклом ищем саксессор и его прев
      let successor = currentNode.right;
      let prevSuccessor = null;

      while (true) {
        if (successor.left === null) {
          break;
        } else {
          prevSuccessor = successor;
          successor = successor.left;
        };
      };

      // Нашли ел у которого нет левого ребенка, и если есть правый то нужно прикрепить правого к преву
      if (successor.right) {
        prevSuccessor.left = successor.right;
      }
      //И теперь заменить саксессор на место удаленного текущего обьекта
      successor.left = currentNode.left;
      successor.right = currentNode.right;
      prevNode[status] = successor;

    } else {
      //Если нет только одного любого ребенка
      prevNode[status] = currentNode.left || currentNode.right;
      return;
    }
  };


  const walkInOrder = (order) => { // Разновидности поиска в глубину
    const walkOrder = order || 'inOrder';

    const walk = (node) => {
      if (!node) {
        return [];
      }

      const leftResult = walk(node.left);
      const rightResult = walk(node.right);

      switch (walkOrder) {
        case 'inOrder': return [...leftResult, { name: node.user, age: node.value }, ...rightResult]; //получается сортировка по возрастанию LEFT → NODE → RIGHT
        case 'preOrder': return [{ name: node.user, age: node.value }, ...leftResult, ...rightResult];// ТУТ СМЫСЛ В ТОМ ЧТО Б ОБРАБОТАТЬ САМ УЗЕЛ, ПОТОМ ВСЕ ЕГО ЛЕВОЕ ПОДДЕРЕВО, ПОТОМ ПРАВОЕNODE → LEFT → RIGHT 5 3 1   9 8 7   15 14 13 и тд
        case 'postOrder': return [...leftResult, ...rightResult, { name: node.user, age: node.value }]; //LEFT → RIGHT → NODE
      }

    }
    const sortResult = walk(root);
    return sortResult;
  }

  const walkLevelOrder = () => { // Поиск или обход дерева в ширину
    const queue = [];
    let firstIndex = 0;
    const result = [];

    if (root) {
      queue.push(root);
    };

    while (firstIndex < queue.length) {
      const currentNode = queue[firstIndex];
      const processedNode = { name: currentNode.user, age: currentNode.value };
      result.push(processedNode);

      currentNode.left && queue.push(currentNode.left);
      currentNode.right && queue.push(currentNode.right);
      
      firstIndex += 1;
    };
    return result;
  };

  return {
    insert,
    walkInOrder,
    walkLevelOrder
  };
};
const rootData = {
  user: 'Alex',
  value: 40,
  left: {
    user: 'Bob',
    value: 25,
    left: {
      user: 'David',
      value: 15,
      left: {
        user: 'Mike',
        value: 10,
        left: null,
        right: null
      },
      right: {
        user: 'John',
        value: 20,
        left: null,
        right: null
      }
    },
    right: {
      user: 'Chris',
      value: 30,
      left: {
        user: 'Tom',
        value: 27,
        left: null,
        right: null
      },
      right: {
        user: 'Sam',
        value: 35,
        left: null,
        right: null
      }
    }
  },
  right: {
    user: 'Robert',
    value: 60,
    left: {
      user: 'James',
      value: 50,
      left: {
        user: 'Peter',
        value: 45,
        left: null,
        right: null
      },
      right: {
        user: 'Mark',
        value: 55,
        left: null,
        right: null
      }
    },
    right: {
      user: 'William',
      value: 70,
      left: {
        user: 'Steve',
        value: 65,
        left: null,
        right: null
      },
      right: {
        user: 'Kevin',
        value: 80,
        left: null,
        right: null
      }
    }
  }
};
const { walkInOrder, walkLevelOrder } = createBinarySearchTree(rootData);
//console.log(walkInOrder())
//console.log(walkInOrder('preOrder'))
//console.log(walkInOrder('postOrder'))
console.log(walkLevelOrder())