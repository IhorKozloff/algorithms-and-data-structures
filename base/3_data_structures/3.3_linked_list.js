const createNode = (value) => {
  return {
    value: value,
    next: null
  }
};

const createLinkedList = () => {
  let head = null;


  const append = (value) => {

    if (!head) {
      head = createNode(value);
    } else {
      let current = head;

      while (current.next !== null) {
        current = current.next;
      };

      const newNode = createNode(value);
      current.next = newNode;
    }
  };

  const prepend = (value) => {
    const newNode = createNode(value);
    newNode.next = head;
    head = newNode;
  }

  const find = (value) => {
    let current = head;
    if (!current) {
      return undefined;
    };

    while (current.value !== value && current.next !== null) {
      current = current.next;
    };

    return current.value === value ? current : undefined;
  }

  const remove = (value) => {
    let current = head;
    let prevLink = null;

    if (!current) {
      return;
    };

    if (current.value === value) {
      head = current.next;
      return;
    };

    while (current.value !== value && current.next !== null) {
      prevLink = current;
      current = current.next;
    }

    if (current.value === value) {
      prevLink.next = current.next;
    }
  };
  // prepend O(1)
  // find	O(n)
  // remove	O(n)
  // append	O(n)

  return {
    append
  };
};
