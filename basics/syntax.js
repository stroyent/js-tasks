/* variables */

let admin,
	name;

name = "Джон";

admin = name;

alert(admin);

let ourPlanetName,
	currentUserName;

/* functions */

function checkAge(age) {
	return (age > 18) ? true : confirm('Родители разрешили?');
}

function checkAge(age) {
	return (age > 18) || confirm('Родители разрешили?');
}

function min(a, b) {
	if (a < b) {
	return a;
	}
	return b;
}



function checkPowerValidity(power) {
	return (power > 0) && (power % 1 === 0)	
}

function pow(x, n) {
	if (!checkPowerValidity(n)) {
		alert('n must be a natural number')
		return;
		}
	let result = 1;
	for (let i=1; i<=n; i++) {
	result = result * x 
	}
	return result
}

x = prompt('x =');
n = prompt('n =');
pow(x,n)

/* lambda-functions */

function ask(question, yes, no) {
	if (confirm(question)) yes()
	else no();
}

ask(
	"Вы согласны?",
	() => alert("Вы согласились."),
	() => alert("Вы отменили выполнение.")
	);

