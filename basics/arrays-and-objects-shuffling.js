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
		return Math.floor(Math.random() * 2 - 1);
	})
}


function fischerYatesShuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}


// Получить средний возраст

function getAverageAge(users) {
	let sum = users.reduce((sum, user) => sum + user.age, 0);
	return sum / users.length;
}

// Оставить уникальные элементы массива

function unique(arr) {
	let uniqueElements = [];
	for (item of arr) {
		if (!uniqueElements.includes(item)) {
			uniqueElements.push(item);
			}
	}
	return uniqueElements;
}

// Создайте объект с ключами из массива

function groupById(arr){
	return arr.reduce((result, user) => {
		result[user.id] = user;
		return result;
	}, {});
}

// Сумма свойств объекта

function sumSalaries(salaries) {
	let salaries_array = Object.values(salaries);
	let sum = 0; // либо salaries_array.reduce((sum, current) => sum + current, 0)
	for (salary of salaries_array) {
		sum += salary;
	}
	return sum;
}

// Подсчёт количества свойств объекта

function count(obj) {
	return Object.keys(obj).length;
}
