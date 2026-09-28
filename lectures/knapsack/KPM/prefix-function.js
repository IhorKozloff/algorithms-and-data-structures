// 0 1 2 3 4 5   PATTERN index
// A B A B A C   Pattern value

// 0 1 2 3 4 5   Pi index
// 0 0 1 2 3 0   Pi value   
const testPattern = "АБАБАС";
export const buildPi = (pattern) => {
    const pi = Array(pattern.length).fill(0);

    for (let i = 1; i < pattern.length; i++) {

        // Сколько символов уже совпало
        let j = pi[i - 1];

        // Пока текущая буква не подходит,
        // откатываемся к более короткому совпадению
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = pi[j - 1];
        }

        // Если буква подошла — увеличиваем длину совпадения
        if (pattern[i] === pattern[j]) {
            j++;
        } else {
            
        }

        // Записываем результат для текущей позиции
        pi[i] = j;
    }

    return pi;


}
buildPiModified(testPattern)