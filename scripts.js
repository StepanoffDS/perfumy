// СКРИПТЫ СЛАЙДЕРА

var splide = new Splide('.clients__splide', {
	perMove: 1,
	gap: '4px',
	arrows: false,
	pagination: false,
	perPage    : 1,
	autoWidth  : false,
	fixedWidth : 300,
	gap        : '10px',
	speed      : 1000,
	padding: {
		left: '16px'
	}
} );

splide.mount();

const items = document.querySelectorAll('.clients__slide');

items.forEach(function (item) {
	item.addEventListener('click', function () {
			var index = parseInt(item.getAttribute('data-index'), 10);
			splide.go(index);  // Перемещаем слайдер к нужному индексу
	});
});

const backButton = document.querySelector('.back-button');
function toggleBackButton(index) {
	if (index > 0) {
			backButton.style.display = 'flex'; // Показываем кнопку, если не первый слайд
	} else {
			backButton.style.display = 'none'; // Скрываем, если это первый слайд
	}
}

// Добавляем обработчик клика для кнопки «Назад»
backButton.addEventListener('click', function () {
	if (splide.index > 0) {
			splide.go(splide.index - 1); // Возвращает к предыдущему слайду
	}
});

// Обновляем кнопку во время смены слайдов
splide.on('move', function (newIndex) {
	toggleBackButton(newIndex);
});



// СКРИПТЫ КОРЗИНЫ
function addProductToCard() {
	// img, name, priceNow, priceOld, size

	const img = document.querySelector('.hero__img').src;
	const name = document.querySelector('.hero__title').textContent;
	const priceNow = document.querySelector('.hero__price-now span').textContent;
	const priceOld = document.querySelector('.hero__price-old span').textContent;
	const size = 100;
	const qty = 1;

	const cart = localStorage.getItem('cart') ?JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.some(item => item.name === name)) {
		return;
	}

	cart.unshift({ img, name, priceNow, priceOld, size, qty });
	localStorage.setItem('cart', JSON.stringify(cart));

	outputCart()
}

function minusProduct(name) {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach(item => {
		if (item.name === name) {
			if (item.qty > 1) {
				item.qty--;
			}

			const heroName = document.querySelector('.hero__title').textContent;

			if (heroName !== name) {
				cart.splice(cart.indexOf(item), 1);
			}
		}
	});

	localStorage.setItem('cart', JSON.stringify(cart));

	outputCart()
}

function plusProduct(name) {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach(item => {
		if (item.name === name) {
			item.qty++;
		}
	});

	localStorage.setItem('cart', JSON.stringify(cart));

	outputCart()
}

function outputCart() {
	const cartList = document.querySelector('.cart__list');
	cartList.innerHTML = '';

	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach(item => {
		const li = document.createElement('li');
		li.classList.add('cart__item');
		li.innerHTML = `
			<img src="${item.img}" alt="${item.name}" class="cart__item-img">
			<div class="cart__item-body">
				<h5 class="cart__item-title">${item.name}</h5>
				<div class="cart__item-info">
					<div class="cart__item-price">${item.priceNow} zł &nbsp; <span>${item.priceOld} zł</span></div>
					<div class="cart__item-size">${item.size} ml</div>
				</div>
				<div class="cart__item-amount">
					<button class="cart__item-minus" onclick="minusProduct('${item.name}') ">-</button>
					<div class="cart__item-count">
						<span class="cart__item-count-number">${item.qty}</span>
						&nbsp; szt
					</div>
					<button class="cart__item-plus" onclick="plusProduct('${item.name}') ">+</button>
				</div>
			</div>
		`;
		cartList.append(li);
	})

	outputCartTotal()
}

function outputCartTotal() {
	const cartTotalPriceNow = document.querySelector('.cart__total-price-now');
	const cartTotalPriceOld = document.querySelector('.cart__total-price-old span');

	const formPriceNow = document.querySelector('.order-form__price-now');
	const formPriceOld = document.querySelector('.order-form__price-old span');

	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	const totalNow = cart.reduce((acc, item) =>{
		acc += item.priceNow * item.qty
		return acc;
	}, 0);

	const totalOld = cart.reduce((acc, item) =>{
		acc += item.priceOld * item.qty
		return acc;
	}, 0);

	cartTotalPriceNow.textContent = totalNow;
	cartTotalPriceOld.textContent = totalOld;

	formPriceNow.textContent = totalNow;
	formPriceOld.textContent = totalOld;
}

function addProductToCardFromCatalog() {
	const buttons = document.querySelectorAll('.catalog__card-btn');

	buttons.forEach(button => {
    button.addEventListener('click', function() {
        const catalogCard = this.closest('.catalog__card');

        if (catalogCard) {
            const linkElement = catalogCard.querySelector('a');

            if (linkElement) {
							const href = linkElement.getAttribute('href');
							const img = document.querySelector('.catalog__card-img').src;
							const name = document.querySelector('.catalog__card-title').textContent;
							const size = 100;
							const priceNow = document.querySelector('.catalog__card-price--now').textContent;
							const priceOld = document.querySelector('.catalog__card-price--old').textContent;
							const qty = 1;

							console.log(href, img, name, size, priceNow, priceOld, qty);

							const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

							if (cart.some(item => item.name === name)) {
								return;
							}

							cart.push({ img, name, priceNow, priceOld, size, qty });
							localStorage.setItem('cart', JSON.stringify(cart));

							outputCart();
            }
        }
    });
});
}

addProductToCard()
outputCart();
outputCartTotal();
addProductToCardFromCatalog()
