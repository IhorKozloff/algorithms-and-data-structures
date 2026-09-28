import { Stack } from './index.js';

const validateBracers = (string) => {
    const stack = new Stack();

    

    const availableOpenBracers = "([";
    const availableCloseBracers = ")]";
    const avilableBracers = availableOpenBracers + availableCloseBracers;

    for (let i = 0; i < string.length; i++) {
        const currentSymbol = string[i];

        if (!avilableBracers.includes(currentSymbol)) {
            console.log(`Символ ${currentSymbol} не скобка.`);
            continue;
        };

        if (availableOpenBracers.includes(currentSymbol)) { //Если скобка откр. просто пушим ее в стек
            stack.push(currentSymbol);
        } else { // Если закр. нужно извлечь и стека последнюю скобку
            if (stack.isEmpty()) {
                console.log(`Ошибка найдена в элементе с индексом ${i}`)
                console.log(`${console.log(stack.getData())}`)
                console.log('Появилась закрывающая скобка, хотя перед ней нет для нее открывающихся.')
                return 
            };

            const leftBrace = stack.pop();

            let rightBrace;
            if (leftBrace === '(') {
                rightBrace = ')'
            } else if (leftBrace === '[') {
                rightBrace = ']'
            };


            if (rightBrace !== currentSymbol) {
                console.log(`Ошибка найдена в элементе с индексом ${i}`)
                console.log('Несоответствие закрывающихся скобок')
                return
            }
        }

    }
    console.log(stack.getData())
}

//validateBracers('([t]([((q([]))])])e)[([][][](r))]')