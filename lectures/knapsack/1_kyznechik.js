//Сколько различных траекторий что б добраться в точку N при условии что можно двигаться на 1 или 2 клетки

const count_track = (N) => {

    const result = [
        0, //0 добвочный нулевой барьер, что б при вычислении N - 2 не вылезти за границу массива слева.
        1,
        ...Array(N - 2).fill(0)];

    for (let i = 2; i <= N; i++) {
        result[i] = result[i - 1] + result[i - 2];
    };
    return result[N];
};

//Тоже самое, только если можно шагать на 1, 2 и 3 клетки а так же если некоторые клетки запрещены
const count_track_plus = (
    N,
    allowed // Массив типа [true, false, true, true, false, true];
) => {
    const result = [
        0, //0 добвочный нулевой барьер, что б при вычислении N - 2 не вылезти за границу массива слева.
        1,
        Number(allowed[2]),
        ...Array(N - 2).fill(0)];

    for (let i = 3; i <= N; i++) {
        if (allowed[i]) {
            result[i] = result[i - 1] + result[i - 2] + result[i - 3]
        }
    };
    return result[N]
}

const count_min_cost = (N, priceArray) => {
    const result = [NaN, priceArray[1], priceArray[1] + priceArray[2], ...Array(N - 2).fill(0)];
    const roadMap = [null, null, 1, ...Array(N - 2).fill(null)];

    for (let i = 3; i <= N; i++) {
        result[i] = priceArray[i] + Math.min(result[i - 1], result[i - 2])
    };
    return result[N]
}

//Минимальная стоимость + маршрут, можно шагать на 1, 2 и клетки
export const count_min_route = (N, priceArray) => {
    console.log('========Income Data=======')
    console.log('N: ', N, 'priceArray: ', priceArray)
    console.log('=======End Income Data========')
    console.log('')

    const fibonachiTrack = Array(N + 1).fill(0);
    const parent = Array(N + 1).fill(null);

    fibonachiTrack[1] = priceArray[1];
    fibonachiTrack[2] = priceArray[1] + priceArray[2];

    parent[2] = 1;
    console.log('-----Start Arrays----');
    console.log('Start Arrays', 'fibonachiTrack:', fibonachiTrack, 'Parent: ', parent);
    console.log('-----End Start Arrays----');
    for (let i = 3; i <= N; i++) {
        if (fibonachiTrack[i - 1] < fibonachiTrack[i - 2]) {
            fibonachiTrack[i] = priceArray[i] + fibonachiTrack[i - 1];
            parent[i] = i - 1;
        } else {
            fibonachiTrack[i] = priceArray[i] + fibonachiTrack[i - 2];
            parent[i] = i - 2;
        }
    }

    console.log('');
    console.log('-----Finished Arrays----');
    console.log('parent', parent)
    console.log('fibonachiTrack', fibonachiTrack)
    console.log('-----Finished Start Arrays----');


    const restorePath = (parent, N) => {
        const path = [];

        let current = N;

        while (current !== null) {
            path.push(current);
            current = parent[current];
        }

        return path.reverse();
    };
    console.log(restorePath(parent, N))

    return {
        cost: fibonachiTrack[N],
        path: restorePath(parent, N)
    };

}



//Задача про альпинистов, тоже самое что и кузнечик просто тренировка. Шагать помжно на 1 и 2
const CampReachmendPrice = [
    0,
    7,
    3,
    8,
    2,
    6,
    1,
    5,
    4,
    9,
    2
];
export const otimalAlpenRoute = (finalPoint, routesPrice) => {
    const fibonachiTrack = Array(finalPoint + 1).fill(0)//[0,0,0,0,0,0,0,0,0,0,0]
    fibonachiTrack[1] = routesPrice[1];
    fibonachiTrack[2] = routesPrice[2] + routesPrice[1];

    const fromIdxsArray = Array(finalPoint + 1).fill(null);
    fromIdxsArray[1] = null;

    for (let i = 3; i <= finalPoint; i++) {
        const currentPrice = routesPrice[i];
        let currentAndOptimalPrevSumm;

        if (fibonachiTrack[i - 1] < fibonachiTrack[i - 2]) {
            currentAndOptimalPrevSumm = currentPrice + fibonachiTrack[i - 1];
            fromIdxsArray[i] = i - 1;

        } else {
            currentAndOptimalPrevSumm = currentPrice + fibonachiTrack[i - 2];
            fromIdxsArray[i] = i - 2;

        }
        fibonachiTrack[i] = currentAndOptimalPrevSumm;
    }


    const restorePath = (parent, N) => {
        console.log('Income parent', parent)
        const path = [];

        let current = N;

        while (current !== null) {
            path.push(current);
            current = parent[current];
        }

        return path.reverse();
    };
    console.log(restorePath(fromIdxsArray, finalPoint))

    console.log(fibonachiTrack)

}