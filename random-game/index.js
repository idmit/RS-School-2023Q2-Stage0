const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

const blockSize = 25;
const cells = 20;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;


const body = document.querySelector('body');
const scoreTitle = document.querySelector('.score-title');
const headerTitle = document.querySelector('.header-title');
const gameOverTitle = document.querySelector('.game-over');
const highScoreTitle = document.querySelector('.high-score');
const btn = document.querySelector('.btn');

let resetInt;

const scoreItems = document.querySelectorAll('.score-item');

const games = JSON.parse(localStorage.getItem('prev-games')) || [];

scoreItems.forEach((el) => {
	el.textContent = 'Total score : 0';
})

if (JSON.parse(localStorage.getItem('prev-games')) !== undefined) {
		for (let i = 0; i < games.length; i++) {
			scoreItems[i].innerHTML = `<b>Total score : ${games[i]}</b>`
	}
} 

function drawBorder() {
	ctx.fillStyle = '#413e3e';
	ctx.fillRect(0, 0, width, blockSize);
	ctx.fillRect(0, height - blockSize, width, blockSize );
	ctx.fillRect(0, 0, blockSize, height);
	ctx.fillRect(width - blockSize, 0, blockSize, height);
}


function drawGrid() {
	ctx.lineWidth = 1.1;
	ctx.strokeStyle = "#00000053";
	ctx.shadowBlur = 0;
	for (let i = 1; i < cells; i++) {
		let f = (width / cells) * i;
		ctx.beginPath();
		ctx.moveTo(f, 0);
		ctx.lineTo(f, height - 25);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, f);
		ctx.lineTo(width - 25, f);
		ctx.stroke();
		ctx.closePath();
	}
}

function drawScore() {
	scoreTitle.textContent = `Score: ${score}`
	highScoreTitle.textContent = `High score: ${highScore}`
}

function gameOver() {
	clearInterval(intervalId);
	clearInterval(resetInt);

	ctx.clearRect(0, 0, width, height);
	setScoreResult();
	
	snake.segments.forEach((el) => {
		el.col = 0;
		el.row = 0;
	})
	food.position.col = 0;
	food.position.row = 0;
	btn.classList.add('btn--active');
	ctx.fillStyle = '#232323';
	ctx.fillRect(0, 0, width, height);
	gameOverTitle.innerHTML = `<p>Game over! <br>Your score : ${score}</p>`;
}

function setScoreResult () {
	if (games.length >= 10) {
		games.pop()
		games.unshift(score);
	} else {
		games.unshift(score);
	}
	localStorage.setItem('prev-games', JSON.stringify(games));
	for (let i = 0; i < games.length; i++) {
		scoreItems[i].innerHTML = `<b>Total score : ${games[i]}</b>`
	}
}

const circle = function (x, y, radius, fill) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fill) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
}

const Block = function (col, row) {
	this.col = col;
	this.row = row;
}

Block.prototype.drawSquare = function (color) {
	const x = this.col * blockSize;
	const y = this.row * blockSize;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, blockSize, blockSize);
}

Block.prototype.drawCircle = function (color) {
	const centerX = this.col * blockSize + blockSize / 2;
	const centerY = this.row * blockSize + blockSize / 2;
	ctx.fillStyle = color;
	circle(centerX, centerY, blockSize / 2, true);
}

Block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
}

const Snake = function() {
	this.segments = [
		new Block(7, 5),
		new Block(6, 5),
		new Block(5, 5)
	];
	this.direction = 'right';
	this.nextDirection = 'right';
};

Snake.prototype.draw = function () {
	this.segments.forEach((el, index) =>{
		if (index == 0) {
			el.drawSquare('#efefef');
		} else {
			el.drawSquare('rgb(196, 74, 210)');
		}
		
	})
}

Snake.prototype.move = function () {
	const head = this.segments[0];
	let newHead;

	this.direction = this.nextDirection;

	if (this.direction === "right") {
		newHead = new Block(head.col + 1, head.row);
	} else if (this.direction === "down") {
		newHead = new Block(head.col, head.row + 1);
	} else if (this.direction === "left") {
		newHead = new Block(head.col - 1, head.row);
	} else if (this.direction === "up") {
		newHead = new Block(head.col, head.row - 1);
	}

	if (this.checkCollision(newHead)) {
		gameOver();
		return;
	}

	this.segments.unshift(newHead);

	
	if(newHead.equal(food.position)) {
		score++;
		highScore = score >= highScore ? score : highScore;
		localStorage.setItem('high-score', highScore);
		food.move(this.segments);
	} else {
		this.segments.pop();
	}
}

Snake.prototype.checkCollision = function (head) {
	const leftCollision = (head.col === 0);
	const topCollision = (head.row === 0);
	const rightCollision = (head.col === widthInBlocks - 1);
	const bottomCollision = (head.row === heightInBlocks - 1);
	wallCollision = leftCollision || topCollision ||
	rightCollision || bottomCollision;
	selfCollision = false;
 
	for (let i = 0; i < this.segments.length; i++) {
	if (head.equal(this.segments[i])) {
	selfCollision = true;
	}
	}
	return wallCollision || selfCollision;
}

Snake.prototype.setDirection = function (newDirection) {
	if (this.direction === 'up' && newDirection === 'down') {
		return;
	} else if (this.direction === 'right' && newDirection === 'left') {
		return;
	} else if (this.direction === 'down' && newDirection === 'up') {
		return;
	} else if (this.direction === 'left' && newDirection === 'right') {
		return;
	}

	this.nextDirection = newDirection;
}

const Food = function () {
	this.position = new Block(10, 10);
};

Food.prototype.draw = function () {
	this.position.drawCircle('#ff0044');
}

Food.prototype.move = function (snakeSegments) {
	const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
	const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
	this.position = new Block(randomCol, randomRow);
	let index = snakeSegments.length - 1;
	while (index >= 0) {
		if (this.position.equal(snakeSegments[index])) {
			this.move(snakeSegments);
			return;
		}
		index--;
	}
}

let snake = new Snake();
let food = new Food();

function startGame () {
	ctx.clearRect(0, 0, width, height);
	drawScore();
	drawGrid();
	snake.move();
	snake.draw();
	food.draw();
	drawBorder();
}

	let intervalId = setInterval(startGame, 130);

	startGame ()




const directions = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
}

function checkKeydown() {
	body.addEventListener('keydown', (event) => {
		let newDirection = directions[event.keyCode];
		if (newDirection !== undefined) {
			snake.setDirection(newDirection);
		}
	})
}

checkKeydown();


btn.addEventListener('click', () => {
	btn.classList.remove('btn--active')
	snake = new Snake();
	apple = new Apple();
	score = 0;

	gameOverTitle.textContent = '';
	resetInt = setInterval(startGame, 130);
	checkKeydown();

	return resetInt;
})