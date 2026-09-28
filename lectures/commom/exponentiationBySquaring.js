//Алгоритм быстрого возведения в степень
export let count = 0
export const powFn = (number, pow) => {
    if (pow === 0) {
        //console.log('Сработало исключение когда pow === 0')
        count ++
        return 1;
    } else {
        //console.log('Сработал блок иначе когда pow НЕ 0')
        
        if(pow%2 === 1) {
            count++
            console.log('Сработал блок когда pow НЕ четное')
            const result = powFn(number, pow - 1) * number;
            return result;
        } else {
            count++
            console.log('Сработал блок когда pow четное')
            const result = powFn(number*number, pow/2);
            return result;
        };
    }
}