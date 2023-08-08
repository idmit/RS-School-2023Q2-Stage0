console.log(`
		Итоговая оценка : 100/100 \n
		1) Вёрстка валидная +10 \n
		2) Вёрстка семантическая +16 \n
		3) Вёрстка соответствует макету +54 \n
		4) Общие требования к верстке +20 \n
`)

console.log(`
		1.Task: (https://github.com/rolling-scopes-school/tasks/blob/master/tasks/library/library-part2.md) \n
		2. Deploy: (https://rolling-scopes-school.github.io/idmit-JSFEPRESCHOOL2023Q2/library/) \n
		3. Done 08.08.2023 / deadline 14.08.2023 \n
		4. Score: 100 / 100 \n
`)

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





