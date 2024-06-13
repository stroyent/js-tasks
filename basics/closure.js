// Сумма с помощью замыканий

function sum(a) {
  function innerSum(b) {
    return (a + b);
  }
  return innerSum;
}

// Фильтрация с помощью функции

function inBetween(a, b) {
  return ((element) => (element >= a) && (element <= b));
}

function inArray(other_arr) {
  return ((element) => other_arr.includes(element));
}

// Сортировать по полю

function byField(fieldName) {
  return ((a, b) => a[fieldName] > b[fieldName] ? 1 : -1);
}

// Армия функций

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let counter = i;
    let shooter = function() {
      alert( counter );
    };
    shooters.push(shooter);
    i++;
  }


  return shooters;
}