const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const audio = document.querySelector('.audio');
const progressBar = document.querySelector('.progress__bar');
const lineProgress = document.querySelector('.progress');
const audioTitle = document.querySelector('.song-title');
const songImg = document.querySelector('.cover-img');

const headerLogo = document.querySelector('.header-logo__text');
const logoImg = document.querySelector('.logo-img');
const secondLogoImg = document.querySelector('.second-logo-img');

let currentSongTime = document.querySelector('.current-time');
let durationSongTime = document.querySelector('.duration-time');

// задаем флаг, при загрузке страницы музыка не играет
let isPlay = false;

// добавляем названия треков
const songs = ['Eminem - Without me', 'The Weeknd - Save your tears','A$AP Rocky – Everyday Lyrics', 'Bazzi feat. 21Savage - Focus', 'Sam Smith feat. A$AP Rocky - Im not the only one', 'A$AP Rocky – Praise the lord'];

// индекс текущего трека
let songIndex = 0;

// функция загрузки треков
function loadSong(song) {
	audioTitle.innerHTML = song;
	audio.src = `assets/audio/${song}.mp3`;
	songImg.src = `assets/img/cover${songIndex + 1}.jpg`;
}

loadSong(songs[songIndex]);

// клик по кнопке плей/пауза
playBtn.addEventListener('click', () => {
	playAudio();
	songImg.classList.toggle('image-decoration');
	headerLogo.classList.toggle('logo-decoration');
	logoImg.classList.toggle('rotate');
	secondLogoImg.classList.toggle('second-rotate');
});

// вкючение трека
function playAudio() {
	if (!isPlay) {
		audio.play();
		isPlay = true;
		changeBtnPause();
	} else if (isPlay) {
		audio.pause();
		isPlay = false;
		changeBtnPlay();
	}
}

// изменение кнопки pause на кнопку play
function changeBtnPause() {
	playBtn.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 32 32"><path class="button" d="M14 10h-2v12h2V10zm6 0h-2v12h2V10z"/><path class="button" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Z"/></svg>
	`
}

// изменение кнопки play на кнопку pause
function changeBtnPlay() {
	playBtn.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path class="button" d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"/><path class="button" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12Zm11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5Z"/></svg>
	`
}

// клик по кнопке назад
prevBtn.addEventListener('click', () => {
	prevSong();
});

// клик по кнопке вперед
nextBtn.addEventListener('click', () => {
	nextSong();
})

// функция переключения на предыдущий трек
function prevSong() {
	isPlay = true;
	if (isPlay) {
		changeBtnPause();
		songImg.classList.add('image-decoration');
		headerLogo.classList.add('logo-decoration');
		logoImg.classList.add('rotate');
		secondLogoImg.classList.add('second-rotate');
	}
	songIndex--;
	if (songIndex < 0) {
		songIndex = 5;
	};
	loadSong(songs[songIndex]);
	lineProgress.style.width = 0;
	audio.play();
}

// функция переключения на следующий трек
function nextSong() {
	isPlay = true;
	if (isPlay) {
		changeBtnPause();
		songImg.classList.add('image-decoration');
		headerLogo.classList.add('logo-decoration');
		logoImg.classList.add('rotate');
		secondLogoImg.classList.add('second-rotate');
	}
	songIndex++; 
	if (songIndex > 5) {
		songIndex = 0;
	};
	loadSong(songs[songIndex]);
	lineProgress.style.width = 0;
	audio.play();
}

// изменение прогресс бара
function updateProgress() {
	const duration = audio.duration;
	const currentTime = audio.currentTime;
	const progressPersent = (currentTime / duration) * 100;
	lineProgress.style.width = `${progressPersent}%`;
	getTime();
}

// преобразование и установка времени
function getTime () {
	let currentMin = Math.floor(audio.currentTime / 60);
	let currentSec = (audio.currentTime % 60).toFixed();
	if (currentSec.length < 2) {
		currentSec = '0' + currentSec;
	};
	currentSongTime.textContent = currentMin + ':' + currentSec;
	let durationMin = Math.floor(audio.duration / 60);
	let durationSec = (audio.duration % 60).toFixed();
	if (durationSec.length < 2) {
		durationSec = '0' + durationSec;
	};
	durationSongTime.textContent = durationMin + ':' + durationSec;
}

audio.addEventListener('canplaythrough', () => {
	getTime();
});

// слушатель для апдейта прогресс-бара
audio.addEventListener('timeupdate', updateProgress);

// отслеживаем на каком времени трека кликнул пользователь
function setProgress(e) {
	const width = this.clientWidth;
	const clickCoordX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickCoordX / width) * duration;
}

progressBar.addEventListener('click', setProgress);

// когда трек закончится, автоматически включится следующий
audio.addEventListener('ended', nextSong); 



