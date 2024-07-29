window.onload = function () {
    const fieldSize = 10;
    const turns = [];
    const turnDirections = [];

    const snakeCoordinates = [];

    const opposites = {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up',
    };

    let direction,
        newDirection;
    
    const apple = {
        x: null,
        y: null,
        element: null,
    }

    let segment_id = 1;


    function spawn() {
        snakeCoordinates.push({x: 1, y: 0, direction: 'right'}, {x: 0, y: 0, direction: 'right'});

        for (segment of snakeCoordinates) {
            let snekDiv = document.createElement('div');
            document.getElementById('game').appendChild(snekDiv);
            snekDiv.className = 'snake';
            snekDiv.id = `${segment_id}`;
            segment.element = document.getElementById(snekDiv.id);
            segment_id++;
        }
    }

    
    function initializeApple() {
        respawnApple();

        let appleDiv = document.createElement('div');
        document.getElementById('game').appendChild(appleDiv);
        appleDiv.className = 'apple';
        appleDiv.id = 'apple';

        apple.element = document.getElementById('apple');
        apple.element.style.gridColumn = `${apple.x + 1} / span 1`;
        apple.element.style.gridRow = `${apple.y + 1} / span 1`;
    }


    function respawnApple() {
        let x, y;
        while (true) {
            x = Math.floor(Math.random() * fieldSize);
            y = Math.floor(Math.random() * fieldSize);
            if (!snakeCoordinates.find(item => item.x === x && item.y === y)) {
                break;
            }
        }
        apple.x = x;
        apple.y = y;
    }


    function elongateSnek(segment) {
        let newSegment = document.createElement('div');
        document.getElementById('game').appendChild(newSegment);
        newSegment.style.visibility = 'hidden';
        newSegment.className = 'snake';
        newSegment.id = `${++segment_id}`;

        let {x, y, direction} = segment;

        snakeCoordinates.push({
            x,
            y,
            direction,
            element: document.getElementById(newSegment.id),
        });
    }


    function moveSnek() {
        let head = snakeCoordinates[0];
        newDirection = turnDirections.shift();

        if (newDirection != undefined && newDirection != opposites[head.direction] && newDirection != direction) {
            direction = newDirection;
            turns.push({x: head.x, y: head.y, direction: direction});
        }

        if (turns.length > 0) {
            for (let i = turns.length - 1; i >= 0; i--) {
                let turn = turns[i];
                let snakeBend = snakeCoordinates.find(item => item.x === turn.x && item.y === turn.y);
                if (snakeBend === undefined) {
                    turns.shift();
                } else {
                    snakeBend.direction = turn.direction;
                }
            }
        }

        let lastTailPosition = {...snakeCoordinates.at(-1)}; //for elongation

        for (segment of snakeCoordinates) {
            if (segment.direction === 'left') {
                segment.x--;
            } else if (segment.direction === 'right') {
                segment.x++;
            } else if (segment.direction === 'up') {
                segment.y--;
            } else if (segment.direction === 'down') {
                segment.y++;
            }
        }
        
        if (head.x >= fieldSize || head.y >= fieldSize || head.x < 0 || head.y < 0 ||
            snakeCoordinates.filter(item => item.x === head.x && item.y === head.y).length > 1
        ) {
            gameOver();
        }

        if (head.x === apple.x && head.y === apple.y) {
            elongateSnek(lastTailPosition);
            respawnApple();
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


    function drawState() {
        for (segment of snakeCoordinates) {
            segment.element.style.gridColumn = `${segment.x + 1} / span 1`;
            segment.element.style.gridRow = `${segment.y + 1} / span 1`;
        }
        snakeCoordinates.at(-1).element.style.visibility = 'visible';

        apple.element.style.gridColumn = `${apple.x + 1} / span 1`;
        apple.element.style.gridRow = `${apple.y + 1} / span 1`;
    }


    spawn();
    initializeApple();
    const gameCycle = setInterval(() => {
        moveSnek();
        drawState();
    }, 250);
}