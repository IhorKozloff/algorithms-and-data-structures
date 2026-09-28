//Задача про купюры и сумму. Сколько нужно купюр, что б набрать 18. И каких
const testSum = 18;
const testCoinValues = [1, 2, 5, 10];

const coin_count = (sum, coinValues) => {
    const track = Array(sum + 1).fill(Infinity);
    track[0] = 0

    const coinValuesTrack = Array(sum + 1).fill(null);
    coinValuesTrack[0] = null

    for (let i = 1; i < track.length; i++) {
        for (let j = 0; j < coinValues.length; j++) {
            const coinValue = coinValues[j];
            if (i - coinValue >= 0) { // индекс в массиве track это число от 0 до summ.

                const newValue = track[i - coinValue] + 1;


                if (newValue < track[i]) {
                    track[i] = newValue;
                    coinValuesTrack[i] = coinValue;
                }

            }
        }
    }
    console.log(track)
    console.log(coinValuesTrack)
    const coinValuesResult = () => {
        let c = sum;
        const result = [];
        while (c != 0) {
            const currentCoinValue = coinValuesTrack[c];
            console.log(currentCoinValue)
            result.push(currentCoinValue);
            c = c - currentCoinValue;
        }
        return result;
    }
    const bestCountOfCoins = track[sum];
    const bestCoinsList = coinValuesResult();

    return {
        count_of_coins: bestCountOfCoins,
        coinsList: bestCoinsList
    }
};
//console.log(coin_count(testSum, testCoinValues));