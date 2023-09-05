
// start burger menu
(function () {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.nav-list');
	const menuLinks = document.querySelectorAll('.nav-link');
	burger.addEventListener('click', () => {
		burger.classList.toggle('burger_active');
		menu.classList.toggle('nav-list_active');
	});
	for(let i = 0; i < menuLinks.length; i++) {
		menuLinks[i].addEventListener('click', () => {
			menu.classList.remove('nav-list_active');
			burger.classList.remove('burger_active');
		});
	};
	document.getElementById('nav').addEventListener('click', event => {
		event._isClickWithInMenu = true;
	});
	document.getElementById('burger').addEventListener('click', event => {
		event._isClickWithInMenu = true;
	});
	document.body.addEventListener('click', event => {
		if (event._isClickWithInMenu) return;
		document.querySelector('.nav-list').classList.remove('nav-list_active');
		document.querySelector('.burger').classList.remove('burger_active');
	});
}());

// burder menu end

// slider start

// находим блок с фото и кнопки пагинации
const carousel = document.querySelector('.carousel');
const dots = document.querySelectorAll('.circle');

const paginationBtns = document.querySelectorAll('.control')
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const sliderImage = document.querySelectorAll('.slider-image');
const firstImg = carousel.querySelectorAll('.image-item')[0];
const arrows = document.querySelectorAll('.arrow');
const buttonArrow = document.querySelectorAll('.button');

let currentIndex = 0;

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

function prevSlide() {
	currentIndex--;
	if (currentIndex === 0) {
		prevButton.setAttribute('disabled', 'disabled');
	}
	if (currentIndex > 0 && currentIndex < 4) {
		prevButton.removeAttribute('disabled');
		nextButton.removeAttribute('disabled');
	}

	if (currentIndex === 4) {
		nextButton.setAttribute('disabled', 'disabled');
	}
	if (currentIndex < 0) currentIndex = sliderImage.length - 1;
	rollSlider();
	thisSlide(currentIndex);
};

function nextSlide() {
	currentIndex++;
	if (currentIndex >= sliderImage.length) currentIndex = 0;
	rollSlider();
	thisSlide(currentIndex);
};

// функция перелистывания слайда
function rollSlider() {
	const firstImgWidth = firstImg.clientWidth + 25;
	carousel.style.transform = `translateX(${-currentIndex * firstImgWidth}px)`;
};

// добавить стиль на активную кнопку
function thisSlide(index) {
	dots.forEach(item => item.classList.remove('active-circle'));
	dots[index].classList.add('active-circle');
};

// убрать/добавить возможность нажатия на кнопку пагинации
function fillPagination(index) {
	dots.forEach(item => item.removeAttribute('disabled'));
	dots[index].setAttribute('disabled', 'disabled');
	paginationBtns.forEach(item => item.classList.remove('disabled-button'));
	paginationBtns[index].classList.add('disabled-button');
}

// функция перелистывания при нажатии на кнопки пагинации
dots.forEach((circle, i) => {
	circle.setAttribute('data-num', i);
	circle.addEventListener('click', changeClientWidth);

	function changeClientWidth(e) {
		let clickedDotNum = e.target.dataset.num;
		if (clickedDotNum == currentIndex) {
			return;
		} else {
			let imageWidth = carousel.firstElementChild.clientWidth;
			let pixels = (-imageWidth * clickedDotNum) - (clickedDotNum * 25);
			carousel.style.transform = 'translateX(' + pixels + 'px)';
			dots[currentIndex].classList.remove('active-circle');
			dots[clickedDotNum].classList.add('active-circle');
			currentIndex = clickedDotNum;
			fillPagination(currentIndex);
		}
	}
});

// slider end

