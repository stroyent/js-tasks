// Привет, object

let user = {};

user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;

// Проверка на пустоту

function isEmpty(obj) {
	for (let property in obj) {
		return false;
	}
	return true;
}

// Объекты-константы?
// да, можно, написано же: "Дело в том, что объявление const защищает от изменений 
// только саму переменную user, а не её содержимое."

// Сумма свойств объекта

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
};

function addValues(obj) {
	let result = 0;
	for (key in obj) {
		result += obj[key]
	}
	return result;
}

sum = addValues(salaries);

// Умножаем все числовые свойства на 2

function multiplyNumeric(obj) {
	for (let key in obj) {
		if (typeof(obj[key]) === "number") {
			obj[key] *= 2
    }
  }
}

// Скопирован ли массив?
// 4

// Операции с массивами

let styles = ['Джаз', 'Блюз'];
styles.push('Рок-н-ролл');
styles[findMiddle(styles)] = 'Классика';
alert(styles.shift());
styles.unshift('Рэп', 'Регги');

function findMiddle(arr) {
	middle = Math.floor((arr.length - 1) / 2);
	return middle
}

// Вызов в контексте массива
// ["a", "b", function() {alert( this );}]

// Сумма введённых чисел

function sumInput() {
	let numbers = []
	let next;
	
	while (true) {
		next = prompt("Введите числовое значение", 0);
		if ((next === undefined) || (next === '') || !isFinite(next)) {
			break;
		}
		numbers.push(Number(next));
	}
	let sum = 0;
	for (number of numbers) {
		sum += number;
	}
	return sum;
}

sumInput();

// Подмассив наибольшей суммы

/* arr = [1, -2, 3, 4, -9, 6]

function getMaxSubSum(arr) {
	sum = 0
	for (let i = 0; i < arr.length; i++) {
		
	}
}

getMaxSubSum(arr); */