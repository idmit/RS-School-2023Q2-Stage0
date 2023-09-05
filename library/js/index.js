
// start burger menu
(function () {
	const burger = document.querySelector('.burger');
	const menu = document.querySelector('.nav-list');
	const menuLinks = document.querySelectorAll('.nav-link');
	burger.addEventListener('click', () => {
		profileMenu.classList.remove('profile__menu--active');
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

// текущий счетчик
let currentIndex = 0;

// добавляем отслеживание события на кнопку
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// действие при нажатии на кнопку предыдущего слайда
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

// действие при нажатии на кнопку следующего слайда
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

// tabs start
document.addEventListener('DOMContentLoaded', () => {
	// объявляем основную функцию для вкладок, чтобы вся логика была в одном месте
	const tabs = () => { 
		// ищем элемент с кнопками и записываем в константу
		const head = document.querySelector('.tabs__head'); 
		// ищем элемент с контентом и записываем в константу
		const body = document.querySelector('.tabs__body');

		// объявляем функцию для получения названия активной вкладки
		const getActiveTabName = () => { 
			// возвращаем значение data-tab активной кнопки
			return head.querySelector('.tabs__caption_active').dataset.tab; 
			
		}

		// объявляем функцию для установки активного элемента контента
		const setActiveContent = () => {
			 // если уже есть активный элемент контента
			if (body.querySelector('.tabs__content_active')) {
				// то скрываем его
				body.querySelector('.tabs__content_active').classList.remove('tabs__content_active')
			}
			// затем ищем элемент контента, у которого значение data-tab совпадает со значением data-tab активной кнопки и отображаем его
			body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('tabs__content_active');
		}
		 // проверяем при загрузке страницы, есть ли активная вкладка
		if (!head.querySelector('.tabs__caption_active')) { // если активной вкладки нет
			// то делаем активной по-умолчанию первую вкладку
			head.querySelector('.tabs__caption').classList.add('tabs__caption_active'); 
		}

		// устанавливаем активный элемент контента в соответствии с активной кнопкой при загрузке страницы
		setActiveContent(getActiveTabName())

		// при клике на .tabs__head
		head.addEventListener('click', e => {
			// узнаем, был ли клик на кнопке
			const caption = e.target.closest('.tabs__caption')
			// если клик был не на кнопке, то прерываем выполнение функции
			if (!caption) return
			// если клик был на активной кнопке, то тоже прерываем выполнение функции и ничего не делаем
			if (caption.classList.contains('tabs__caption_active')) return;

			// если уже есть активная кнопка
			if (head.querySelector('.tabs__caption_active')) {
				// то удаляем ей активный класс
				head.querySelector('.tabs__caption_active').classList.remove('tabs__caption_active')
			}

			// затем добавляем активный класс кнопке, на которой был клик
			caption.classList.add('tabs__caption_active')

			// устанавливаем активный элемент контента в соответствии с активной кнопкой
			setActiveContent(getActiveTabName())
		})
	}

	// вызываем основную функцию
	tabs();

});

// tabs end

// modal start 

// получить все кнопки меню пользователя
const profileBtn = document.querySelector('.profile-button');
const profileMenu = document.querySelector('.profile__menu');
const profileLinks = document.querySelectorAll('.profile__menu_link');
const modalMenu = document.querySelector('.header__auth');

// навешиваем событие по клику на иконку пользователя (открывается окно с выбором логина или регистрации)
profileBtn.addEventListener('click', () => {
	menu.classList.remove('nav-list_active');
	burger.classList.remove('burger_active');
	profileMenu.classList.toggle('profile__menu--active');
});

// при клике на любую ссылку в меню, скрываем это меню
for (let i = 0; i < profileLinks.length; i++) {
	profileLinks[i].addEventListener('click', () => {
		profileMenu.classList.remove('profile__menu--active');
	})
};

// клик по области в меню
modalMenu.addEventListener('click', event => {
	event._isClickWithInMenu = true;
});

// клик по области вне меню пользователя закрывает меню
document.body.addEventListener('click', event => {
	if (event._isClickWithInMenu) return;
	profileMenu.classList.remove('profile__menu--active');
});
