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
const loadMoreBtn = document.querySelector('.load-more__btn');


getPhotos(randomImgUrl);
async function getPhotos(url) {
	try {
		loadMoreBtn.innerText = 'Loading...';
		loadMoreBtn.classList.add('disabled');
		const response = await fetch(url);
		const respData = await response.json();
		if (!Array.isArray(respData)) {
			const arrayRespData = respData.results;
			showPhotos(arrayRespData);
			loadMoreBtn.innerText = 'Load More';
			loadMoreBtn.classList.remove('disabled');
		} else {
			showPhotos(respData);
			loadMoreBtn.innerText = 'Load More';
			loadMoreBtn.classList.remove('disabled');
		}
	}
	catch(err) {
		console.error(err);
		imagesBox.innerText = 'Search limit consumed. Try again in an hour.';
		imagesBox.style.color = 'red';
		loadMoreBtn.innerText = 'Load More';
		loadMoreBtn.classList.add('disabled');
	}
}

 function showPhotos(data) {
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
}

const form = document.querySelector('.form');
const searchInp = document.querySelector('.form__input');


form.addEventListener('submit', (e) => {
	e.preventDefault();
	searchPhoto();
})

btnSearch.addEventListener('click', searchPhoto);

function searchPhoto() {
	page = 1;
	imagesBox.innerHTML = '';
	const apiSearchUrl = `${API_URL_SEARCH}${searchInp.value}&client_id=${API_KEY}&per_page=21&page=${page}`;
	console.log(apiSearchUrl);
	if (searchInp.value) {
		getPhotos(apiSearchUrl);
		btnCross.classList.add('button--active');
	}
}

	btnCross.addEventListener('click', () => {
		btnCross.classList.remove('button--active');
		searchInp.value = '';
	})

	searchInp.addEventListener('input', () => {
		if (searchInp.value) {
			btnCross.classList.add('button--active');
		} else if (!searchInp.value) {
			btnCross.classList.remove('button--active')
		}
	})

	headerTitle.addEventListener('click', () => {
		imagesBox.innerHTML = '';
		searchInp.value = '';
		btnCross.classList.remove('button--active');
		getPhotos(randomImgUrl);
	});

	// modal start 

	const modalEl = document.querySelector('.modal');
	
	function openModal(img) {
		modalEl.classList.toggle('modal--show');
		document.body.classList.add('stop--scrolling');
		modalEl.innerHTML = `
			<div class="modal__card">
				<img class="modal__img-backdrop" alt="${img.alt_description}" src="${img.urls.regular}">
				<div class="modal__image-info">
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
		document.body.classList.toggle('stop--scrolling')
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
	
	// modal end

	// load more button
	const pageNumb = document.querySelector('.page_number');
	const btnPrev = document.querySelector('.btn_prev');
	const btnNext = document.querySelector('.btn_next');

	let page = 1;

	loadMoreBtn.addEventListener('click', () => {
		if (!searchInp.value) {
			getPhotos(randomImgUrl);
		} else {
			page++;
			getPhotos(`${API_URL_SEARCH}${searchInp.value}&client_id=${API_KEY}&per_page=21&page=${page}`);
		}
	})
	