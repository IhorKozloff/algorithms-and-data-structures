//Ты разрабатываешь отчёт, который должен находить количество непрерывных периодов расходов, сумма которых равна заданному бюджету.
//Нужно вернуть количество всех непрерывных подмассивов, сумма элементов которых равна 5.
//Например, [2, 3] — подходящий подмассив, потому что его сумма равна 5.
const expenses = [
  2, 1, 3, 2, 4, 1, 2, 3, 1, 2
];

const target = 5;

const practice_subarray_sum_equals_K = (arr, targetNum) => {
  let resultCount = 0;
  //для пи фукции делаем массив
  let piSum = 0;

  //для сумм делаем мап где ключ сумма а значение - сколько раз встречалась
  const uniqueTrack = new Map();
  //0 суммаа, 1 сколько раз встречалась
  uniqueTrack.set(0, 1);

  for (let i = 0; i < arr.length; i++) {
    //Первым делом получаем текущую накопленную пи сумму, тут без массива
    piSum += arr[i];

    const tail = piSum - targetNum;

    //Если есть хвост, его значение плюсуем к текущему значению результат
    if (uniqueTrack.has(tail)) {
      const tailValue = uniqueTrack.get(tail);
      resultCount += tailValue;
    };

    //Всегда записываем текущую накопленную пи сумму в мап
    if (uniqueTrack.has(piSum)) {
      const currentPiSummValue = uniqueTrack.get(piSum);
      uniqueTrack.set(piSum, currentPiSummValue + 1)
    } else {
      uniqueTrack.set(piSum, 1)
    }
  }
  return resultCount
}

console.log('result', practice_subarray_sum_equals_K(expenses, target));