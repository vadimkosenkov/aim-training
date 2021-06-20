const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('.board');
const colors = ['#ff6d69', '#fecc50', '#0be7fb', '#9eaad9', '#c99ccf'];
let time = 0;
let score = 0;
let timerId = null;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startDelay();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        event.target.classList.add('circle-hide');
        setTimeout(event.target.remove, 500);
        score++;
        createRandomCircle(event);
    }
});

function startDelay() {
    setTimeout(startGame, 500);
}

function startGame() {
    timerId = setInterval(decreaseTime, 1000);
    timeEl.parentNode.classList.remove('hide');
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        timeEl.parentNode.classList.add('hide');
        clearTimeout(timerId);
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    board.style.animation = 'result-view 0.5s ease-out';
    board.innerHTML = `<div><h1>Счет:<span class='primary'> ${score}</span></h1><a href="#" class="start" id="restart">Играть снова</a></div>`;

    const restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener('click', (event) => {
        event.preventDefault();
        restart();
    });
}

function restart() {
    reset();
    const tmpScreens = document.querySelectorAll('.screen');
    for (let elem of tmpScreens) {
        elem.classList.remove('up');
    }
    screens[0].classList.add('up');
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width: boardWidth, height: boardHeight } = board.getBoundingClientRect();
    const x = getRandomNumber(0, boardWidth - size);
    const y = getRandomNumber(0, boardHeight - size);
    const color = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function reset() {
    console.log('test');
    console.log(board.innerHTML);
    board.innerHTML = ``;
    console.log(board.innerHTML);
    // time = 0;
    score = 0;
}