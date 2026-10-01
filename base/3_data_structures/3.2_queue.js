const createQueue = () => {
    const queue = [];
    //Удалить первый эл стоит O(n), мы не удаляем а меняем треккер первого елемента, и операция стоит O(1)
    let firstIndex = 0;

    const enqueue = (el) => {
      queue.push(el);
    };

    const dequeue = () => {
      firstIndex += 1;
    };

    const peek = () => {
      return queue[firstIndex];
    };

    return {
        enqueue,
        dequeue,
        peek
    };
};