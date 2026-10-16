


const back_tracking_learning_fn = (optionsArray) => {
  //   const result = [];

  //   function backtrack(path) {
  //     //Крайний случай, если длинна пути максимальная, то запсать ету комбинацию в массив, и вернуться на шаг назад
  //     // if (path.length === fruits.length) {
  //     //   result.push([...path]);
  //     //   return;
  //     // }

  //     for (const fruit of fruits) {
  //       if (path.includes)
  //     };
  //   };

  //   backtrack([]);

  //   return result.length;
}

// const fruits = [
//   'Apple',
//   'Banana',
//   'Orange',
//   'Kiwi',
//   'Mango',
//   'Peach',
//   'Grape'
// ];
// const result = back_tracking_learning_fn(fruits)

// console.log(result);
// console.log('Количество вариантов:', result.length);

const fruits = ['Apple', 'Banana', 'Orange', 'Kiwi'];
const path = [];
const result = [];


function backtrack(path) {


  if (path.length === fruits.length) {
    result.push([...path]);
    return
  };


  for (const item of fruits) {
    
    if (!path.includes(item)) {

      path.push(item);

      backtrack(path);
      path.pop()
    };

  }
};


//backtrack(path);
// console.log('result', result)
// console.log('exec count', executNumber)
//console.log('result', result)

////TRAINING
const stars = ['Sirius', 'Vega', 'Polaris', 'Rigel'];

const combinationPath = [];
const catalog = [];

function backtrack_stars(path) {
    // Шаг 1: условие выхода
    if (path.length === 3) {
      catalog.push([...path]);
      return;
    }

    for (const item of stars) {
      if (path.includes(item)) {
        console.log(`${item} есть в текущем path ${path}`);
      } else {
        console.log(`Такого ${item} еще нет в текущем path ${path}, добавим`);
        path.push(item);
        backtrack_stars(path);
        path.pop()
      }
    }
};
backtrack_stars(combinationPath);
console.log(catalog)