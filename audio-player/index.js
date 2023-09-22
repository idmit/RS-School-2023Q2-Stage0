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

let isPlay = false;



const songs = ['A$AP Rocky – Everyday Lyrics', 'Bazzi feat. 21Savage - Focus', 'Sam Smith feat. A$AP Rocky - Im not the only one', 'A$AP Rocky – Praise the lord'];

let songIndex = 0;

prevBtn.addEventListener('click', () => {
	isPlay = false;
	if (!isPlay) {
		songImg.classList.remove('image-decoration');
		headerLogo.classList.remove('logo-decoration');
	}
	changeBtnPlay();
	songIndex--;
	if (songIndex < 0) {
		songIndex = 3;
	}
	loadSong(songs[songIndex]);
})

nextBtn.addEventListener('click', () => {
	isPlay = false;
	if (!isPlay) {
		songImg.classList.remove('image-decoration');
		headerLogo.classList.remove('logo-decoration');
	}
	changeBtnPlay();
	songIndex++;
	if (songIndex > 3) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
})

playBtn.addEventListener('click', () => {
	playAudio();
	songImg.classList.toggle('image-decoration');
	headerLogo.classList.toggle('logo-decoration');
});

function playAudio() {
	if (!isPlay) {
		// audio.currentTime = 0;
		audio.play();
		isPlay = true;
		changeBtnPause();
	} else if (isPlay) {
		audio.pause();
		isPlay = false;
		changeBtnPlay();
	}
}

function changeBtnPause() {
	playBtn.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 32 32"><path class="button" d="M14 10h-2v12h2V10zm6 0h-2v12h2V10z"/><path class="button" d="M16 4A12 12 0 1 1 4 16A12 12 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Z"/></svg>
	`
}

function changeBtnPlay() {
	playBtn.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path class="button" d="M9.5 15.584V8.416a.5.5 0 0 1 .77-.42l5.576 3.583a.5.5 0 0 1 0 .842l-5.576 3.584a.5.5 0 0 1-.77-.42Z"/><path class="button" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12Zm11-9.5A9.5 9.5 0 0 0 2.5 12a9.5 9.5 0 0 0 9.5 9.5a9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5Z"/></svg>
	`
}

function loadSong(song) {
	audioTitle.innerHTML = song;
	audio.src = `assets/audio/${song}.mp3`;
	songImg.src = `assets/img/cover${songIndex + 1}.jpg`;
}

loadSong(songs[songIndex]);

