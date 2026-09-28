import { buildPi } from './prefix-function';

const kmp_search = (text, pattern) => {
    const pi = buildPi(pattern); //0 1 2 3 4 5 6 7 8 тут лежит массив такого плана
    //0 0 0 2 3 4 0 1 2  

    let j = 0;

    for (let i = 0; i < text.length; i++) {

        while (j > 0 && text[i] !== pattern[j]) {
            j = pi[j - 1];
        }

        if (text[i] === pattern[j]) {
            j++
        }

        if (j === pattern.length) {
            return i - pattern.length + 1; // Индекс первой буквы найденого слова
        }
    }

}