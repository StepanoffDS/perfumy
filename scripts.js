var splide = new Splide('.clients__splide', {
	perMove: 1,
	gap: '4px',
	arrows: false,
	pagination: false,
	perPage    : 1,
	autoWidth  : false,
	fixedWidth : 300,
	gap        : '10px',
	padding: {
		left: '16px'
	}
} );

splide.mount();

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

	cart.push({ img, name, priceNow, priceOld, size, qty });
	localStorage.setItem('cart', JSON.stringify(cart));

	outputCart()
}

addProductToCard()

function minusProduct(name) {
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach(item => {
		if (item.name === name) {
			if (item.qty >= 1) {
				item.qty--;
			}
			if (item.qty === 0) {
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

outputCart();

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

outputCartTotal();
