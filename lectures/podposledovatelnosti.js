const arr = [4, 2, 7, 1, 5];

const dp = [1, 1, 2, 1, 2]

//
const longestIncreasingSubsequence = (arr) => {
    const dp = Array(arr.length).fill(1);

    // здесь будет алгоритм
    for (let i = 1; i <= arr.length; i++) { //i = 1 - потому что элементом i[0] может закончится только одна последовательность

        for (let j = 0; j < i; j++) { //бежим по етому же массиву, чтоб чекнуть все елементы слева, до i, не включительно.

            if (arr[j] < arr[i]) { //смотрим, есть ли левее значение меньше текущего arr[i]
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }

    }

    return Math.max(...dp);
};
