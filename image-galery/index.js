const API_KEY = 'teLMqnqHTZxZpqGQ1f8hQwV9e0JxPRfNnrOw9eWvayU';
const API_URL_PHOTOS = 'https://api.unsplash.com/photos/random';
const API_URL_SEARCH = 'https://api.unsplash.com/search/photos?query=';

const imagesBox = document.querySelector('.images-box');

const imgTitle = document.querySelector('.image__title');
const likesNum = document.querySelector('.likes__number');
const img = document.querySelector('image-card__photo');
const btnSearch = document.querySelector('.form__button-search');
const btnCross = document.querySelector('.form__button-cross');


getPhotos(`${API_URL_PHOTOS}?client_id=${API_KEY}&count=21`);
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


