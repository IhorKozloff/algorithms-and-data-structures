const subarraySum = (nums, k) => {
  // let currentSum = 0;
  let count = 0;
  const pi = new Array(nums.length);
  pi[0] = nums[0];

  for (let i = 1; i < pi.length; i++) {
    pi[i] = nums[i] + pi[i - 1];
  };

  const hash_map = new Map([
    [0, 1]
  ]);

  for (let i = 0; i < pi.length; i++) {
    //1. Разбираемся с хвостом

    const tail = pi[i] - k;
    if (hash_map.has(tail)) {
      //В старых записях ничего не меняем, ориентируемся на существующие данные и трогаем только счетчик
      const value = hash_map.get(tail);
      count += value;
    };

    //Сохраняем текущую запись, надо понять сохранить как новую или обновить
    if (hash_map.has(pi[i])) {
      const value = hash_map.get(pi[i]);
      hash_map.set(pi[i], value + 1);
    } else {
      hash_map.set(pi[i], 1);
    }

  };
  console.log('pi', pi);
  console.log('hash_map', hash_map);
  console.log('count', count);

  return count;
};
const nums = [3, 0, 0, 5, 2];
const k = 5;
subarraySum(nums, k)