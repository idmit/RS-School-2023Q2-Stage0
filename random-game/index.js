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