const API_KEY = 'teLMqnqHTZxZpqGQ1f8hQwV9e0JxPRfNnrOw9eWvayU';
const API_URL_PHOTOS = 'https://api.unsplash.com/photos/random';
const API_URL_SEARCH = 'https://api.unsplash.com/search/photos?query=';
const randomImgUrl = `${API_URL_PHOTOS}?client_id=${API_KEY}&count=21`;

const imagesBox = document.querySelector('.images-box');

const imgTitle = document.querySelector('.image__title');
const likesNum = document.querySelector('.likes__number');
const img = document.querySelector('image-card__photo');
const btnSearch = document.querySelector('.form__button-search');
const btnCross = document.querySelector('.form__button-cross');
const headerTitle = document.querySelector('.header__title');


getPhotos(randomImgUrl);
async function getPhotos(url) {
	try {
		const response = await fetch(url);
		const respData = await response.json();
		console.log(respData);
		showPhotos(respData);
	}
	catch(err) {
		console.error(err);
	}
	
}

function showPhotos(data) {
	imagesBox.innerHTML = '';
	if (!Array.isArray(data)) {
		data.results.forEach(img => {
			const imgEl = document.createElement('div');
			imgEl.classList.add('image-card');
			imgEl.innerHTML = `
				<div class="image__cover">
					<img src = "${img.urls.regular}" class="image-card__photo" alt ="${img.alt_description}">
					<div class="image__info">
						<div class="image__title">${img.user.name}</div>
						<div class="image__likes">
							<img src="heart-broken.svg">
							<span class="likes__number">${img.likes}</span>
						</div>
					</div>
					
					<div class="image__cover--dark"></div>
				</div>
			`;
			imgEl.addEventListener('click', () => openModal(img));
			imagesBox.appendChild(imgEl);
			
		});
	} else (
		data.forEach(img => {
			const imgEl = document.createElement('div');
			imgEl.classList.add('image-card');
			imgEl.innerHTML = `
				<div class="image__cover">
					<img src = "${img.urls.regular}" class="image-card__photo" alt ="${img.alt_description}">
					<div class="image__info">
						<div class="image__title">${img.user.name}</div>
						<div class="image__likes">
							<img src="heart-broken.svg">
							<span class="likes__number">${img.likes}</span>
						</div>
					</div>
					
					<div class="image__cover--dark"></div>
				</div>
			`;
			imgEl.addEventListener('click', () => openModal(img));
			imagesBox.appendChild(imgEl);
		})
	)
	
}

const form = document.querySelector('.form');
const searchInp = document.querySelector('.form__input');



form.addEventListener('submit', (e) => {
	e.preventDefault();
	const apiSearchUrl = `${API_URL_SEARCH}${searchInp.value}&client_id=${API_KEY}&per_page=21`;
	console.log(apiSearchUrl);
	if (searchInp.value) {
		getPhotos(apiSearchUrl);
		btnCross.classList.add('button--active');
	}
})

btnSearch.addEventListener('click', () => {
	const apiSearchUrl = `${API_URL_SEARCH}${searchInp.value}&client_id=${API_KEY}&per_page=21`;
	console.log(apiSearchUrl);
	if (searchInp.value) {
		getPhotos(apiSearchUrl);
		btnCross.classList.add('button--active');
	}
})

	btnCross.addEventListener('click', () => {
		btnCross.classList.remove('button--active');
		searchInp.value = '';
	})

	headerTitle.addEventListener('click', () => {
		searchInp.value = '';
		btnCross.classList.remove('button--active');
		getPhotos(randomImgUrl);
	});


	// modal start 

	const modalEl = document.querySelector('.modal');
	
	async function openModal(img) {
		modalEl.classList.add('modal--show');
		modalEl.innerHTML = `
			<div class="modal__card">
				<img class="modal__img-backdrop" alt="${img.alt_description}" src="${img.urls.regular}">
				<div class="image__info">
					<div class="image__title image__title-modal">${img.user.name}</div>
					<div class="image__likes image__likes-modal">
						<img src="heart-broken.svg">
						<span class="likes__number">${img.likes}</span>
					</div>
				</div>
				<button class="modal__button-cross">
						<svg class="modal__cross" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15"><path class="modal__cross-fill" fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z" clip-rule="evenodd"/></svg>
					</button>
			</div>
		`
		const btnClose = document.querySelector('.modal__button-cross');
		btnClose.addEventListener('click', closeModal);
	}

	function closeModal() {
		modalEl.classList.toggle('modal--show');
	}

	window.addEventListener('click', (e) => {
		if(e.target === modalEl) {
			closeModal();
		}
	})
	
	window.addEventListener('keydown', (e) => {
		if (e.keyCode === 27) {
			closeModal();
		}
	})
	// imagesBox.addEventListener('click', openModal);