export const hashFn = (string, size) => {

  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = hash * 31 + string.charCodeAt(i)
  };
  return hash % size;
}

export const hashTable = (size = 10) => {
  let data = new Array(size);

  const add = (itemObject) => {
    //{key: string, value: string}
    const index = hashFn(itemObject.key, size);
    if (!data[index]) {
      data[index] = {
        ...itemObject,
        next: null
      };
    } else {
      let current = data[index];

      while (current.next !== null && current.key !== itemObject.key) {
        current = current.next;
      };


      if (current.key === itemObject.key) {
        current.value = itemObject.value; // Нельзя новій обьект присваивать в ету ссылку, Object.assign(current, itemObject); - можно так если много свойств
      } else {
        current.next = {
          ...itemObject,
          next: null
        }
      }


    }
  }
  const get = (key) => { // возвращает value а не весь обьект
    const index = hashFn(key, size);
    if (!data[index]) {
      return undefined;
    };

    if (data[index].key === key) {
      return data[index].value;
    };

    if (!data[index].next) {
      return undefined;
    } else {
      let current = data[index];

      while (current.next !== null && current.key !== key) {
        current = current.next;
      };

      return current.key === key ? current.value : undefined;
    };
  }

  const remove = (keyString) => {
    const index = hashFn(keyString, size);
    if (!data[index]) {
      return;
    };

    if (data[index].key === keyString) {
      data[index] = data[index].next || undefined;
    } else {
      let current = data[index];
      let prevLink = null;

      while (current.next !== null && current.key !== keyString) {
        prevLink = current; // 1 Порядок важен
        current = current.next; // 2
      };

      if (current.key === keyString) {
        prevLink.next = current.next;
      }
    }
  }
  return (
    add,
    get,
    remove
  )
}

// средний случай → O(1)
// худший случай  → O(n)
console.log(hashFn('dkflkldj', 50))