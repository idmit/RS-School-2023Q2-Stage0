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



function drawBorder() {
	ctx.fillStyle = '#413e3e';
	ctx.fillRect(0, 0, width, blockSize);
	ctx.fillRect(0, height - blockSize, width, blockSize );
	ctx.fillRect(0, 0, blockSize, height);
	ctx.fillRect(width - blockSize, 0, blockSize, height);
}

drawBorder();

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

drawGrid();

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

const Food = function () {
	this.position = new Block(10, 10);
};

Food.prototype.draw = function () {
	this.position.drawCircle('#ff0044');
}

function drawScore() {
	scoreTitle.textContent = `Score: ${score}`
	highScoreTitle.textContent = `High score: ${highScore}`
}

let snake = new Snake();
let food = new Food();

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