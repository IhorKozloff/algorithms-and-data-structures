
//ЗАдача про слитки. Нужно наполнить рюкзак слитками, максимально приближенными к вместительности, и какими.
// Первый способ - РЕШЕНИЕ С ПРАВО НА ЛЕВО
const testCapacity = 19;
const testBarValues = [3, 5, 7, 10];

const barCapacityCount = (capacity, barValues) => {
    const dp = Array(capacity + 1).fill(0); // значения только 1 или 0 - это флаги - можно ли заполнить ячейку вместительностью index без остатка каким либо слитком
    dp[0] = 1; // Рюкзак вместительностью 0 можно наполнить 0 слитков. По этому флаг - 1

    //dp = index[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    //     value[1, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0]
    //Во вложенном цикле на первой итерации мы берем тройку, и отнимая с конца, от 14 по 3 ищем пока не астретим 1 в value. Когда встретили - заканчиваем, и начинаем 2ю итерацию со следующей цифрой - 5.

    //Вывод элементов участвующих в сумме
    const prevList = Array(capacity + 1).fill(-1);

    for (let j = 0; j < barValues.length; j++) {
      
        for (let i = dp.length - 1; i > 0; i--) {
    
            const currentSummIndex = i;
            const prevSumIndex = currentSummIndex - barValues[j];
            if (dp[prevSumIndex] === 1) {
                dp[currentSummIndex] = 1

                //Запись в массив предков, который аналогичен dp, массу слитка, из за которой ставим единичку в массив dp
                prevList[currentSummIndex] = barValues[j]

            }
        }
    }

    //Вывод результата - Какую наибольшуу сумму чисел можно вместить
    let totalSum = capacity;
    while (dp[totalSum] === 0) {
        totalSum -= 1;
    };
    console.log(totalSum)


    //Вывод слитков
    const barsResult = [];
    let index = totalSum;
    while(index > 0) {
        const currentValue = prevList[index];
        barsResult.push(currentValue);
        index = index - currentValue;
    }

    console.log(dp)
    console.log(prevList)
    console.log(barsResult)
}
//barCapacityCount(testCapacity, testBarValues);

//2й СПОСОБ - РЕШЕНИЕ С КОПИЕЙ МАССИВА
const barCapacityCountAlt = (capacity, barValues) => {
    let F = Array(capacity + 1).fill(0);
    F[0] = 1;

    //Вывод элементов участвующих в сумме
    const prevList = Array(capacity + 1).fill(-1);
    
    for (let j=0; j < barValues.length; j++) {//Перебираем слитки
        let F_new = [...F]; // Создаем копию массива основного трека

        for (let i = F[j]; i < F.length; i++) { //Прогоняем слиток по всем индескам F, но начинаем не с 0 а с 3, 5, 7.... чтоб индекс минус слиток не проверять на отрицательное число.
            if(F[i - barValues[j]] === 1) { // Если на треке F, вернутся на 3,5,7 индексов назад и там будет 1, то и в текущем индексе трека можно поставить 1.
                F_new[i] = 1;               // но ставим единицу в копию списка
                

                //Запись в массив предков, который аналогичен dp, массу слитка, из за которой ставим единичку в массив dp
                prevList[i] = barValues[j]
            }
        }
        F = [...F_new]; // Перезаписываем основной трек
    }
    console.log('F', F)
    //Ищем максимально приближенный к сумме индекс с единичкой. Тоже самое что и в первом варианте
    let resultIndex = capacity;
    while (F[resultIndex] === 0) {
        resultIndex -= 1
    };
    console.log('resultIndex', resultIndex);
    console.log('prevList', prevList);
    

    //Вывод набора слитков
    let resultBarsArray = [];
    let temp = resultIndex
    while(temp > 0) {
        resultBarsArray.push(prevList[temp]);
        temp -= prevList[temp];
    }
    console.log('resultBarsArray', resultBarsArray);
}
barCapacityCountAlt(testCapacity, testBarValues);