// Стек это структура данных в которую данные записываются и удаляются по системе LIFO - Last in Firs out

export class Stack {
    stackData = [];

    constructor() {

    }

    push(item) {
        this.stackData.push(item);
    }
    pop() { // Извлечь элемент с конца массива
        return this.stackData.pop();
    }
    clear() {
        this.stackData.length = 0
    }
    isEmpty() {
        return this.stackData.length === 0;
    }
    getData () {
        return this.stackData
    }
}
