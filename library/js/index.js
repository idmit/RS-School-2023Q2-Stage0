
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

// profile menu start
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

// profile menu end

// modal start 

// получить все кнопки для открытия модального окна логина или регистрации
const openLogin = document.querySelectorAll('.open-login');
const openRegistry = document.querySelectorAll('.open-registry');
// получить модальные окна логина, регистрации и все модалки.
const login = document.querySelector('.modal__login');
const registry = document.querySelector('.modal__registry');
const modals = document.querySelectorAll('.modal');
// получить ссылки в модалках на логин/регистрацию
const linkLogin = document.getElementById('login__link');
const linkRegistry = document.getElementById('register__link');

// перебрать все кнопки для открытия модального окна логина и добавить к каждой класс
openLogin.forEach(btn => {
	btn.addEventListener('click', () => {
		login.classList.add('modal--active');
	})
});


// Альтернатива
// for (let i = 0; i < openLogin.length; i++) {
// 	openLogin[i].addEventListener('click', () => {
// 		login.classList.add('modal--active');
// 	})
// };

// перебрать все кнопки для открытия модального окна регистрации и добавить к каждой класс
openRegistry.forEach(btn => {
	btn.addEventListener('click', () => {
		registry.classList.add('modal--active');
	})
})

// Альтернатива
// for (let i = 0; i <hr openRegistry.length; i++) {
// 	openRegistry[i].addEventListener('click', () => {
// 		registry.classList.add('modal--active');
// 	})
// };

// обрабатываем клик на кнопку login в модальном окне
linkLogin.addEventListener('click', () => {
	registry.classList.remove('modal--active');
	login.classList.add('modal--active');
})

// обрабатываем клик на кнопку Register в модальном окне
linkRegistry.addEventListener('click', () => {
	login.classList.remove('modal--active');
	registry.classList.add('modal--active');
})

// обрабатываем клик вне формы или на кнопку закрытия формы
const closeModal = event => {
	// ловим куда точно был клик мышкой
	const target = event.target;
	
	// если клик по окну модалки или на кнопку закрытия, а не по самой форме, закрываем 
	if (target === login || target === registry || target.closest('.modal__btn')) {
		login.classList.remove('modal--active');
		registry.classList.remove('modal--active');
	}
};

// ловим события клика и применяем функцию закрытия модалки
login.addEventListener('click', closeModal);
registry.addEventListener('click', closeModal);

// форма регистрации 

// получаем форму регистрации 
const registryForm = document.querySelector('.registry__form');

//получить все инпуты в форме регистрации 
const registryNameInp = document.getElementById('registry__first-name');
const registrySurNameInp = document.getElementById('registry__last-name');
const registryEmailInp = document.getElementById('registry__email');
const registryPassInp = document.getElementById('registry__pass');

// получаем кнопку сабмита для формы регистрации 
const registryFormBtn = document.querySelector('.registry__button-submit');

// Добавляем счетчик количества посещений пользователя в localStorage
const userVisitsNum = (userVisits) => {
	userVisits++;
	localStorage.setItem('Visits', userVisits);
};

// обрабатываем клик на кнопку сабмита в форме регистрации
registryForm.addEventListener('submit', () => {

	//Получаем все значения в инпутах и убираем все пробелы в строке
	let registryNameValue = registryNameInp.value.replace(/\s/g, '');
	let registrySurNameValue = registrySurNameInp.value.replace(/\s/g, '');
	// при получении email убираем все пробелы и переводим в нижний регистр
	let registryEmailValue = registryEmailInp.value.toLowerCase().replace(/\s/g, '');
	let registryPassValue = registryPassInp.value.replace(/\s/g, '');

	// форматируем полученное значение имени пользователя и записываем в localStorage
	registryNameValue = `${registryNameValue[0].toUpperCase()}${registryNameValue.slice(1).toLowerCase()}` // первый символ в верхнем регистре, остальные в нижнем регистре
	localStorage.setItem('userName', registryNameValue);

	// форматируем полученное значение фамилии пользователя и записываем в localStorage
	registrySurNameValue = `${registrySurNameValue[0].toUpperCase()}${registrySurNameValue.slice(1).toLowerCase()}` // первый символ в верхнем регистре, остальные в нижнем регистре
	localStorage.setItem('surName', registrySurNameValue);

	// записываем email пользователя 
	localStorage.setItem('userEmail', registryEmailValue);

	// записываем пароль пользователя 
	localStorage.setItem('userPassword', registryPassValue);

	localStorage.removeItem('userVisits');

	//создать счетчик визитов юзера и присвоить в него значение из БД
	let userVisits = Number(localStorage.getItem('userVisits'));

	//увеличить кол-во визитов юзера на 1
	userVisitsNum(userVisits);

	// записываем в localStorage подписан ли пользователь и количество купленных книг
	localStorage.setItem('userSubscription', false);
	localStorage.setItem('userOwnBooks', 0);

	// генерируем случайное 9-е число
	let generateNum = Math.floor(Math.random() * 9e8) + 1e8;
	// конвертируем в 16-ую систему
	let convertedNum = generateNum.toString(16).toUpperCase();
	// если меньше 9 знаков добавляем 0 в начало
	while (convertedNum.length < 9) {
		convertedNum = "0" + convertedNum;
	};
	// записываем сгенерированный номер карты в localStorage
	localStorage.setItem('cardNumber', convertedNum);
	// пользователь зарегистрировался 
	localStorage.setItem('userReg', true);
	// localStorage.setItem('userAuth', true);
});

//
// получаем форму авторизации
const loginForm = document.querySelector('.login__form');

//получаем все поля авторизации
const loginNameInp = document.getElementById('login');
const loginPassInp = document.getElementById('login-password');

// получаем кнопку отправки формы авторизации
const loginFormBtn = document.querySelector('.login-form-btn');

// получаем спаны для вывода ошибок
const autLoginError = document.querySelector('.error-text-login');
const autPassError = document.querySelector('.error-text-pass');

// обработка клика по кнопке submit формы авторизации 
loginForm.addEventListener('submit', (e) => {
	// e.stopPropagation();
	e.preventDefault();
	// получаем введенные значения инпут
	let loginNameValue = loginNameInp.value.replace(/\s/g, '');
	let loginPassValue = loginPassInp.value.replace(/\s/g, '');

	// датчик валидации 
	let loginErrorResult = 0;

	autLoginError.textContent = '';
	if (loginNameValue !== localStorage.getItem('userEmail') && loginNameValue !== localStorage.getItem('cardNumber')) {
	autLoginError.textContent = 'This email or card number is not registered';
	loginNameInp.classList.add('error_value');
	loginErrorResult++
	} else {
	loginNameInp.classList.remove('error_value');
	loginNameInp.classList.add('verify');
	}

	autPassError.textContent = '';
	if (loginPassValue !== localStorage.getItem('userPassword')) {
	autPassError.textContent = 'incorrect password';
	loginPassInp.classList.add('error_value');
	loginErrorResult++
	} else {
	loginPassInp.classList.remove('error_value');
	loginPassInp.classList.add('verify')
	}

	if (loginErrorResult > 0) {
		return;
	}


	let userVisits = Number(localStorage.getItem('userVisits'));
	userVisitsNum(userVisits);

	location.reload();

	localStorage.setItem('userAuth', true);

})


// если юзер зарегистрирован
	if (localStorage.getItem('userReg') === 'true' && localStorage.getItem('userAuth') !== 'true') {
	


	
	// получаем форму проверки карты
	const cardFindForm = document.querySelector('.find-card');
	
	// получаем все инпуты 
	const cardNameInp = document.querySelector('.reader-name-input');
	const cardNumberInp = document.getElementById('reader-card');

	// получаем поля для вывода ошибок в инпутах

	const textNameError = document.querySelector('.error-text-card-name');
	const textNumberError = document.querySelector('.error-text-card-number');

	// получаем кнопку сабмита
	const cardBtn = document.querySelector('.button-check');


	console.log(localStorage.getItem('cardNumber'));

	// отменяем дефолтное поведение кнопки submit
	cardFindForm.addEventListener('submit', (e) => {
		e.preventDefault();
	})

	cardBtn.addEventListener('click', () => {

		let cardNameValue = cardNameInp.value.replace(/(^|\s)\S/g, function (x) { return x.toUpperCase() });
		let cardNumberValue = cardNumberInp.value.toUpperCase();
		console.log(cardNumberValue);
		let cardValidationError = 0;

		textNameError.textContent = '';
		if (cardNameValue === '') {
			textNameError.textContent = 'The field is not filled';
			cardValidationError++
		} else if (cardNameValue !== `${localStorage.getItem('userName')} ${localStorage.getItem('surName')}` ) {
			textNameError.textContent = 'User is not found';
			cardValidationError++
		} else {
			cardNameInp.classList.add('verify');
		}

		textNumberError.textContent = '';
		if (cardNumberValue === '') {
			textNumberError.textContent = 'The field is not filled';
			cardValidationError++
		} else if (cardNumberValue !== localStorage.getItem('cardNumber')) {
			textNumberError.textContent = 'Card number is not found';
			cardValidationError++;
		} else {
			cardNumberInp.classList.add('verify');
		}

		if (cardValidationError > 0) {
			return;
		}

		 //сбросить все значения инпутов
		cardNameInp.value = '';
		cardNameInp.classList.remove('verify');
		cardNumberInp.value = '';
		cardNumberInp.classList.remove('verify');



		const libraryCardContent = document.querySelector('.library-card');

	libraryCardContent.innerHTML = `
					<form action="#" method="get" class="find-card">
						<h3 class="card-title">Find your Library card</h3>
						<div class="card-body change-card-body">
							<div class="gold-bg change-bg">
								<h4 class="title-gold-bg">Brooklyn Public Library</h4>
								<label for="reader-name">
									<input type="text" id="reader-name" placeholder="${localStorage.getItem('userName')} ${localStorage.getItem('surName')}" class="reader-name-input reg_placeholder" readonly>
								</label>
								<label for="reader-card">
									<input type="text" id="reader-card" placeholder="${localStorage.getItem('cardNumber')}" class="reader-name-input reg_placeholder" readonly>
									<span class="error-text-card-number"></span>
								</label>
							</div>
							<ul class="profile__modal_list change_list">
								<li class="profile__modal_item change-item">
									<span class="profile__modal_list-name change-list-name">Visits</span>
									<img src="assets/svg/person.svg" alt="person-svg" class="profile__modal_svg">
									<span class="profile__modal_list-number">${localStorage.getItem('Visits')}</span>
								</li>
								<li class="profile__modal_item change-item">
									<span class="profile__modal_list-name change-list-name">Bonuses</span>
									<img src="assets/svg/Star1.svg" alt="person-svg" class="profile__modal_svg"> 
									<span class="profile__modal_list-number">1240</span>
								</li>
								<li class="profile__modal_item change-item">
									<span class="profile__modal_list-name change-list-name">Books</span>
									<img src="assets/svg/book.svg" alt="person-svg" class="profile__modal_svg">
									<span class="profile__modal_list-number">${localStorage.getItem('userOwnBooks')}</span>
								</li>
							</ul>
							</div>
						</form>
						<div class="text-right">
							<h3 class="get-card-title">Visit your profile</h3>
							<p class="text-card">With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.</p>
								<div class="buttons-get-card">
									<button class="button-get-card open-login"><span class="button-get-text">Profile</span></button>
								</div>
						</div>
	`;
		setTimeout(() => {
			libraryCardContent.innerHTML = `
			<form class="find-card" action>
						<h3 class="card-title">Find your Library card</h3>
						<div class="card-body">
							<div class="gold-bg">
								<h4 class="title-gold-bg">Brooklyn Public Library</h4>
								<label for="reader-name">
									<input type="text" id="reader-name" placeholder="Reader's name" class="reader-name-input">
									<span class="error-text-card-name"></span>
								</label>
								<label for="reader-card">
									<input type="text" id="reader-card" placeholder="Card number" class="reader-name-input">
									<span class="error-text-card-number"></span>
								</label>
							</div>
							<button class="button-check" type="submit">Check the card</button>
							</div>
						</form>
						<div class="text-right">
							<h3 class="get-card-title">Get a reader card</h3>
							<p class="text-card">You will be able to see a reader card after logging into account or you can register a
								new account</p>
								<div class="buttons-get-card">
									<button class="button-get-card open-registry"><span class="button-get-text">Sign Up</span></button>
									<button class="button-get-card open-login"><span class="button-get-text">Log in</span></button>
								</div>
						</div>
			`
			location.reload();
		}, 10000);

	});

};

// этап покупки абонемента

// получаем форму покупки абонемента 

const buyCardForm = document.querySelector('.buy-card-info');

// получаем все поля в форме 

const bankCardNumber = document.getElementById('bank-card-number');
const expCodeFirstPart = document.getElementById('expiration-code');
const expCodeSecondPart = document.getElementById('second_expiration-code');
const cvcCode = document.getElementById('cvc-code');
const cardHolderName = document.getElementById('cardholder-name');
const postalCode = document.getElementById('postal-code');
const cityName = document.getElementById('city-town-name');

// получаем поля для вывода ошибок
const bankCardNumberError = document.querySelector('.error-bank-card');
const expCodeFirstError = document.querySelector('.error-exp-code');
const expCodeSecondError = document.querySelector('.error-exp2-code');
const cvcCodeError = document.querySelector('.error-cvc-code');
const cardHolderError = document.querySelector('.error-user-name');
const postalCodeError = document.querySelector('.error-postal-code');
const cityNameError = document.querySelector('.error-text-city');

// получили кнопку сабмита формы
const buyCardFormBtn = document.querySelector('.button-buy-modal');

buyCardForm.addEventListener('submit', (e) => {
	e.preventDefault();
})

buyCardFormBtn.addEventListener('click', () => {

	// получаем значения полей
	let bankCardNumberValue = bankCardNumber.value.replace(/\s/g, '');
	let expCodeFirstPartValue = expCodeFirstPart.value.replace(/\s/g, '');
	let expCodeSecondPartValue = expCodeSecondPart.value.replace(/\s/g, '');
	let cvcCodeValue = cvcCode.value.replace(/\s/g, '');
	let cardHolderNameValue = cardHolderName.value.replace(/(^|\s)\S/g, function (x) { return x.toUpperCase() });
	let postalCodeValue = postalCode.value.replace(/\s/g, '');
	let cityNameValue = cityName.value.replace(/\s/g, '');

	let buyCardValidationError = 0;

	// валидация поля card number
	bankCardNumberError.textContent = '';
	if (bankCardNumberValue === '') {
		bankCardNumber.classList.add('error_value');
		bankCardNumberError.textContent = 'The field is not filled';
		buyCardValidationError++
		bankCardNumber.classList.remove('verify');
	} else if (bankCardNumberValue.length !== 16) {
		bankCardNumber.classList.add('error_value');
		bankCardNumberError.textContent = 'The field must contain 16 digits';
		buyCardValidationError++
		bankCardNumber.classList.remove('verify');
	} else {
		bankCardNumber.classList.remove('error_value');
		bankCardNumber.classList.add('verify');
	}

	// валидация поля expСode 1
	expCodeFirstError.textContent = '';
	if (expCodeFirstPartValue === '') {
		expCodeFirstPart.classList.add('error_value');
		expCodeFirstError.textContent = 'The field is not filled';
		buyCardValidationError++
		expCodeFirstPart.classList.remove('verify');
	} else if (expCodeFirstPartValue.length !== 2) {
		expCodeFirstPart.classList.add('error_value');
		expCodeFirstError.textContent = 'The field must contain 2 digits';
		buyCardValidationError++
		expCodeFirstPart.classList.remove('verify');
	} else {
		expCodeFirstPart.classList.remove('error_value');
		expCodeFirstPart.classList.add('verify');
	}

	// валидация поля exp code 2
	expCodeSecondError.textContent = '';
	if (expCodeSecondPartValue === '') {
		expCodeSecondPart.classList.add('error_value');
		expCodeSecondError.textContent = 'The field is not filled';
		buyCardValidationError++;
		expCodeSecondPart.classList.remove('verify');
	} else if (expCodeSecondPartValue.length !== 2) {
		expCodeSecondPart.classList.add('error_value');
		expCodeSecondError.textContent = 'The field must contain 2 digits';
		buyCardValidationError++
		expCodeFirstPart.classList.remove('verify');
	} else {
		expCodeSecondPart.classList.remove('error_value');
		expCodeFirstPart.classList.add('verify');
	}

	// валидация поля cvc code  
	cvcCodeError.textContent = '';
	if (cvcCodeValue === '') {
		cvcCode.classList.add('error_value');
		cvcCodeError.textContent = 'The field is not filled';
		buyCardValidationError++;
		cvcCode.classList.remove('verify');
	} else if (cvcCodeValue.length !== 3) {
		cvcCode.classList.add('error_value');
		cvcCodeError.textContent = 'The field must contain 3 digits';
		buyCardValidationError++;
		cvcCode.classList.remove('verify');
	} else {
		cvcCode.classList.remove('error_value');
		cvcCode.classList.add('verify');
	}

	// валидация поля cardholder 
	cardHolderError.textContent = '';
	if (cardHolderNameValue === '') {
		cardHolderName.classList.add('error_value');
		cardHolderError.textContent = 'The field is not filled';
		buyCardValidationError++;
		cardHolderName.classList.remove('verify');
	} else if (!/[A-Za-z]/.test(cardHolderNameValue)) {
		cardHolderName.classList.add('error_value');
		cardHolderError.textContent = 'The field must contains only letters';
		buyCardValidationError++;
		cardHolderName.classList.remove('verify');
	} else {
		cardHolderName.classList.remove('error_value');
		cardHolderName.classList.add('verify');
	}

	// валидация поля postal code
	postalCodeError.textContent = '';
	if(postalCodeValue === '') {
		postalCode.classList.add('error_value');
		postalCodeError.textContent = 'The field is not filled';
		buyCardValidationError++;
		postalCode.classList.remove('verify');
	} else {
		postalCode.classList.remove('error_value');
		postalCode.classList.add('verify')
	}

	cityNameError.textContent = '';
	if(cityNameValue === '') {
		cityName.classList.add('error_value');
		cityNameError.textContent = 'The field is not filled';
		buyCardValidationError++
		cityName.classList.remove('verify');
	} else {
		cityName.classList.remove('error_value');
		cityName.classList.add('verify');
	}

	if (buyCardValidationError > 0) {
		return
	}

	location.reload();

	localStorage.setItem('userSubscription', true);
} )