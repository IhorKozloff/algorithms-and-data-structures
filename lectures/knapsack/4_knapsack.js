const testCapacity = 19;
const testM = [7, 3, 1, 5, 4]// Масса
const testP = [10, 4, 2, 6, 7]// Ценность
// const testM = [7]// Масса
// const testP = [10]// Ценность

export const knapsackFn = (capacity, barValues) => {

    const barM = [0, ...barValues.m];
    const barP = [0, ...barValues.p];
    console.log(barM, barP)
    const stringLenght = capacity + 1; // +1 потому что добавляем 0 в начало каждой строки, что б получилось capacity индексов и 0.

    const track_2D = barM.map(() => Array(stringLenght).fill(0));


    for (let i = 1; i < track_2D.length; i++) {// Номер строки или К-во предметов которые проверяем можно ли впихнуть
        //console.log('New Line', i)
        for (let j = 1; j < stringLenght; j++) {// Номер в строке или текущая вместительность
            
            //console.log(`Current element M=${barM[i]}, P=${barP[i]}, j=${j}, j >= barM[i] === ${j >= barM[i]}`)
            if (j >= barM[i]) {

                let a = track_2D[i - 1][j] // число из строки  выше того же номера в строке
                let b = track_2D[i - 1][j - barM[i]] + barP[i] // число на строке выше того же элемена минус масса текущего 
                // console.log(i, j)
                // console.log(a,b)
                const result = Math.max(a, b)
                track_2D[i][j] = result;
            } else {
                track_2D[i][j] = track_2D[i - 1][j];
            }
        }
    }


    let q = 0
    for (const row of track_2D) {
        console.log(q, JSON.stringify(row, null, 0));
        q++
    }

    const bestPrice = track_2D[track_2D.length -1][capacity];
    console.log(bestPrice)

    //Генерация списка слитков
    const barList = []
    let j = capacity;
    for (let i = track_2D.length - 1; i > 0; i--) {
        if (track_2D[i][j] !== track_2D[i -1][j]) {
            barList.push(barM[i]);
            j = j - barM[i];
        } 
    }
    console.log(barList);
};
knapsackFn(testCapacity, {m: testM, p: testP});