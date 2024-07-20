window.onload = function () {
    const fieldSize = 10;
    const turns = [];
    const turnDirections = [];

    const opposites = {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up',
    };

    let newDirection;
    let tailPass = false;

    const head = {
        x: null,
        y: null,
        direction: null,
    };

    const tail = {
        x: null,
        y: null,
        direction: null,
    };


    function spawn() {
        head.x = 1;
        head.y = 0;
        head.direction = 'right';

        tail.x = 0;
        tail.y = 0;
        tail.direction = 'right';

        document.getElementById(`${head.x} ${head.y}`).className = 'snake';
        document.getElementById(`${tail.x} ${tail.y}`).className = 'snake';

    }

    
    function spawnApple() {
        let x, y;
        while (true) {
            x = Math.floor(Math.random() * fieldSize);
            y = Math.floor(Math.random() * fieldSize);
            if (document.getElementById(`${x} ${y}`).className === 'cell') {
                break;
            }
        }
        document.getElementById(`${x} ${y}`).className = 'apple';


    }


    function elongateSnek() {
        tailPass = true;
    }


    function moveHead() {
        newDirection = turnDirections.shift();
        console.log(`newDirection = ${newDirection}`);
        if (newDirection != undefined && newDirection != opposites[head.direction] && newDirection != head.direction) {
            head.direction = newDirection;
            turns.push([head.x, head.y, head.direction]);
        }
        if (head.direction === 'left') {
            head.x = head.x - 1;
        }
        else if (head.direction === 'right') {
            head.x = head.x + 1;
        }
        else if (head.direction === 'up') {
            head.y = head.y - 1;
        }
        else if (head.direction === 'down') {
            head.y = head.y + 1;
        }

        if (head.x >= fieldSize || head.y >= fieldSize || head.x < 0 || head.y < 0 ||
            document.getElementById(`${head.x} ${head.y}`).className === 'snake'
        ) {
            gameOver();
        }
        if (document.getElementById(`${head.x} ${head.y}`).className === 'apple') {
            elongateSnek();
            spawnApple();
        }
        document.getElementById(`${head.x} ${head.y}`).className = 'snake';
    }


    function moveTail() {
        if (tailPass === true) {
            tailPass = false;
            return;
        }

        document.getElementById(`${tail.x} ${tail.y}`).className = 'cell';

        if (tail.direction === 'left') {
            tail.x = tail.x - 1;
        }
        else if (tail.direction === 'right') {
            tail.x = tail.x + 1;
        }
        else if (tail.direction === 'up') {
            tail.y = tail.y - 1;
        }
        else if (tail.direction === 'down') {
            tail.y = tail.y + 1;
        }

        if (turns.length > 0 && tail.x === turns[0][0] && tail.y === turns[0][1]) {
            tail.direction = turns[0][2];
            turns.shift();
        }
    }


    function drawField() {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                let cell = document.createElement('div');
                document.getElementById('game').appendChild(cell);
                cell.className = 'cell';
                cell.id = `${x} ${y}`
            }
        }
    }


    function gameOver() {
        alert("Game Over");
        clearInterval(gameCycle);
    }


    document.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowDown') {
            newDirection = 'down';
        } else if (event.code === 'ArrowUp') {
            newDirection = 'up';
        } else if (event.code === 'ArrowLeft') {
            newDirection = 'left';
        } else if (event.code === 'ArrowRight') {
            newDirection = 'right';
        }

        turnDirections.push(newDirection);
    });


    drawField();
    spawn();
    spawnApple();
    const gameCycle = setInterval(() => {
        moveHead();
        moveTail();
    }, 250);
}