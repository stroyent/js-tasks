// Перепишите, используя async/await

async function loadJson(url) {
  try {
    let response = await fetch(url);
    if (response.status === 200) {
    json = await response.json();
    return json;
    }
  } catch(err) {
    alert(err);
  }
}

loadJson('no-such-user.json');

// Перепишите, используя async/await (2)

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

async function demoGithubUser() {
  let user = null;
  while (true) {
    let name = prompt("Введите логин?", "iliakan");
    try {      
      user = await loadJson(`https://api.github.com/users/${name}`);
      alert(`Полное имя: ${user.name}.`);
      break;
    } catch(err) {
      if (err instanceof HttpError && err.response.status === 404) {
          alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
      } else {
        throw err;
      }
    }
  }
}

demoGithubUser();

// Вызовите async–функцию из "обычной"

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  wait().then(result => alert(result));
}