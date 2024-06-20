// Задержка на промисах

function delay(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done"), ms);
  });
}

delay(3000).then(() => alert('выполнилось через 3 секунды'));

// Анимация круга с помощью промиса
/* хз, что происходит в этой задаче, но я взял код из решения,
на основе которого предлагалось переписать функцию*/

function showCircle(cx, cy, radius) {
  return new Promise(function(resolve, reject){
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    setTimeout(() => {
      div.style.width = radius * 2 + 'px';
      div.style.height = radius * 2 + 'px';

      div.addEventListener('transitionend', function handler() {
        div.removeEventListener('transitionend', handler);
        resolve(div);
      });
    }, 0);
  });
}