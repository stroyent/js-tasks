// Переведите текст вида border-left-width в borderLeftWidth

function camelize(str) {
  let words = str.split('-');
  let capitalized_words = [words[0]];

  for (let i = 1; i < words.length; i++) {
    word_uppercase = words[i][0].toUpperCase() + words[i].slice(1);
    capitalized_words.push(word_uppercase);
  }

  return capitalized_words.join('');
}

// Фильтрация по диапазону

function filterRange(arr, a, b) {
  return arr.filter(item => (item >= a) && (item <= b));
}

// Фильтрация по диапазону "на месте"

function filterRangeInPlace(arr, a, b) {
  arr.forEach(function(item, index, array) {
    if (item < a || item > b) {
      arr.splice(index, 1)
    }
  });
}

// Сортировать в порядке по убыванию

arr.sort((a, b) => b - a)

// Скопировать и отсортировать массив

function copySorted(arr) {
  return arr.slice().sort()
}

// Создать расширяемый калькулятор
// (честно списал, но разобрался)

function Calculator() {
  this.methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
  }

  this.calculate = function(str) {
    let parts = str.split(' ');
    let a = Number(parts[0]);
    let b = Number(parts[2]);
    let operator = parts[1];
    if (!this.methods[operator] || isNaN(a) || isNaN(b)) {
      throw Error('incorrect input');
    }
    
    return this.methods[operator](a, b);
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  }
}

// Трансформировать в массив имён

/* сука забыл про map и случайно написал целую функцию
function collectField(field, objects) {
	let result = [];
	for (let item of objects) {
    result.push(item[field]);
	}
	return result;
} */

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [ vasya, petya, masha ];

let names = users.map(user => user.name)

alert( names );

// Трансформировать в объекты

let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [ vasya, petya, masha ];

let usersMapped = users.map(user => ({
	fullName: user.name + ' ' + user.surname,
	id: user.id,
}))

// Отсортировать пользователей по возрасту

function sortByAge(users) {
  users.sort((a, b) => a.age - b.age);
}

// Перемешайте массив

function shuffle(array) {
	array.sort(function() {
		return (Math.random() * 2 - 1) // рандомное число между -1 и 1. чёт чтобы получить целые, надо заморочиться, мож и так сойдёт
	})
}

let arr = [1, 2, 3];

shuffle(arr);
alert(arr);

shuffle(arr);
alert(arr);

shuffle(arr);
alert(arr);