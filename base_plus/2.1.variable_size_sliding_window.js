
//Поиск наименьшего окна которое дает определенную сумму
const variable_size_sliding_window = (arr, targetSum) => {
  let leftIndex = 0;

  let currentSum = 0;
  let minLength = Infinity;

  for (let rightIndex = 0; rightIndex < arr.length; rightIndex++) {
    currentSum += arr[rightIndex];
    
    if (currentSum >= targetSum) {

      while (currentSum >= targetSum) {
        currentSum -= arr[leftIndex]
        leftIndex += 1;
      }
      const currentLength = rightIndex - leftIndex + 1;
      if (currentLength < minLength) {
        minLength = currentLength
      }

    }


  }
  return minLength === Infinity ? 0 : minLength;
  //После етого имеем правый индекс 5.6.7.8 и тд и сумму большую или ранвую сумме из условия

}
//Сложность по времени O(n), по памяти O(1)