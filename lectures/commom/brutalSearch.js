const article = "Сегодня приготовим пломбир и плов";
const pattern = "плов";

const brutalSearch = (text, subStr) => {
    for (let i = 0; i < text.length; i++) {

        console.log(text[i])
        if (text[i] === subStr[0]) {
            console.log('Тут начнется проверка на все слово');

            let j = 0;

            while (j < subStr.length && text[i + j] === subStr[j]) {
                j++
            }

            if (j === subStr.length) {
                console.log("Нашли на позиции", i);
            }

        }
    }
};

//brutalSearch(article, pattern)

const testPattern = "АБАБАС";

const buildPi = (pattern) => {
    const pi = Array(pattern.length).fill(0); // Для 1й буквы никогда совпадений не будет, по этому pi[0] всегда 0
    console.log(pi);

    // let i = 1;

    // while (i > pi.length) {

    // }

    for (let i = 1; i < pi.length; i++) {
        const patternSlice = pattern.slice(0, i + 1); // +1 так работает слайс, не захватывает i
        const sufArr = [];
        const prefArr = [];

        for (let suf = patternSlice.length - 1; suf > 0; suf--) {
            sufArr.push(patternSlice.slice(suf, patternSlice.length))
        }

        for (let pref = 0; pref < patternSlice.length - 1; pref++) {
            prefArr.push(patternSlice.slice(0, pref + 1))
        }

        let bestLength = 0
        let bestLength1 = pi[i - 1]; //Значение которое лежит в массиве пи на один шаг назад
        console.log('Prev BEST LENGTH', bestLength1)
        for (let j = 0; j < sufArr.length; j++) {
            if (sufArr[j] === prefArr[j]) {
                console.log('Совпадение найдено, длинна - ', j + 1) // +1 потому что для индекса букві 3 длинаа слова будет 4 (0 1 2 3 )
                bestLength = j + 1;
            }
        }
        pi[i] = bestLength;
    }
    console.log('Result', pi)
}
//buildPi(testPattern)
// 0 1 2 3 4 5   PATTERN index
// A B A B A C   Pattern value

// 0 1 2 3 4 5   Pi index
// 0 0 1 2 3 0   Pi value   

const buildPiModified = (pattern) => {
    const pi = Array(pattern.length).fill(0);

    for (let i = 1; i < pattern.length; i++) {
        // 1. Найти длинну совпадения предидущего элемента
        // 2. Попытаться увеличить на 1. Если получилось - записать новую длинну в текущий i. Начать новую итерацию. Если нет - п.3
        // 3. Попытаться в кусочке котрый является набором букв с начала слова, длинны совпадения найти совпадения внутри него, если там не 0  то попытаться увеличить него на один символ элемента i. 
    }

}
//buildPiModified(testPattern)

// 0 1 2 3 4 5 6 7 8  Pi index
// 0 0 1 2 3 0 0 1 2 Pi value   