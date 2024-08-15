window.onload = function () {
    let fieldWidth = 10;
    let fieldHeight = 10;
    const cellSizePx = 50;
    const turns = [];
    const turnDirections = [];

    const snakeCoordinates = [];

    const opposites = {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up',
    };

    const rotationDegrees = {
        'left': 270,
        'right': 90,
        'up': 0,
        'down': 180,
    };

    let direction,
        newDirection;
    
    const apple = {
        x: null,
        y: null,
        element: null,
    }

    let segment_id = 1;

    function handleFormSubmit(event) {
        event.preventDefault();
        let data = new FormData(dimensionsForm);
        fieldWidth = Number(data.get('width'));
        fieldHeight = Number(data.get('height'));
        resizeField();
        restartGame();
        const pauseButton = document.getElementById('pauseButton');
        if (pauseButton.innerText === 'Resume') {
            clearInterval(gameCycle);
        };
    }

    function resizeField() {
        const field = document.getElementById('game');
        field.style.cssText += `
            width: ${cellSizePx * fieldWidth}px;
            height: ${cellSizePx * fieldHeight}px;
            grid-template-rows: repeat(${fieldHeight}, 1fr);
            grid-template-columns: repeat(${fieldWidth}, 1fr);
        `;
    }


      

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

        snakeCoordinates[0].element.className += ' head';
        
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
            x = Math.floor(Math.random() * fieldWidth);
            y = Math.floor(Math.random() * fieldHeight);
            if (!snakeCoordinates.find(item => item.x === x && item.y === y)) {
                break;
            }
        }
        apple.x = x;
        apple.y = y;
    }


    function elongateSnek(x, y, direction) {
        let newSegment = document.createElement('div');
        document.getElementById('game').appendChild(newSegment);
        newSegment.style.visibility = 'hidden';
        newSegment.className = 'snake';
        newSegment.id = `${++segment_id}`;

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

        let {x, y, direction: tail_direction} = snakeCoordinates.at(-1);

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
        
        if (head.x >= fieldWidth || head.y >= fieldHeight || head.x < 0 || head.y < 0 ||
            snakeCoordinates.filter(item => item.x === head.x && item.y === head.y).length > 1
        ) {
            gameOver();
        }

        if (head.x === apple.x && head.y === apple.y) {
            elongateSnek(x, y, tail_direction);
            respawnApple();
        }
    }
    

    function gameOver() {
        clearInterval(gameCycle);
        let restart = confirm("Game Over. Try again?");
        if (restart) {
            restartGame();
        }
    }

    function restartGame() {
        for (segment of snakeCoordinates) {
            segment.element.remove()
        }
        snakeCoordinates.length = 0;
        segment_id = 1;
        spawn();
        gameCycle = setInterval(() => {
            moveSnek();
            drawState();
        }, 250);
    }

    function pause() {
        const pauseButton = document.getElementById('pauseButton');
        const pauseUnpause = function() {
            if (pauseButton.innerText === 'Pause') {
                clearInterval(gameCycle);
                pauseButton.innerText = 'Resume';
            }
            else {
                gameCycle = setInterval(() => {
                    moveSnek();
                    drawState();
                }, 250);
                pauseButton.innerText = 'Pause';
            }
        }
        pauseButton.addEventListener('click', pauseUnpause);
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

        

        snakeCoordinates[0].element.style.transform = `rotate(${rotationDegrees[snakeCoordinates[0].direction]}deg)`;
    }

    spawn();
    initializeApple();
    pause();
    let gameCycle = setInterval(() => {
        moveSnek();
        drawState();
    }, 250);

    const dimensionsForm = document.getElementById('dimensions-form');
    dimensionsForm.elements.width.value = `${fieldWidth}`;
    dimensionsForm.elements.height.value = `${fieldHeight}`;
    dimensionsForm.addEventListener('submit', handleFormSubmit);
}