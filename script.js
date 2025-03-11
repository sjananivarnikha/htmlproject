const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

if (btnCart && btnClose && cart) {
  btnCart.addEventListener('click', () => cart.classList.add('cart-active'));
  btnClose.addEventListener('click', () => cart.classList.remove('cart-active'));
} else {
  console.error("Cart elements are missing in the DOM.");
}

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
  loadContent();
}

function loadContent() {
  document.querySelector('.cart-content').addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-remove')) {
      removeItem.call(e.target);
    }
  });

  document.querySelector('.cart-content').addEventListener('input', (e) => {
    if (e.target.classList.contains('cart-quantity')) {
      changeQty.call(e.target);
    }
  });

  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => btn.addEventListener('click', addCart));

  updateTotal();
}

// Remove Item
function removeItem() {
  if (confirm('Are you sure you want to remove this item?')) {
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList = itemList.filter((el) => el.title !== title);
    this.parentElement.remove();
    updateTotal();
  }
}

// Change Quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  updateTotal();
}

let itemList = [];

// Add Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector('.food-title').innerHTML;
  let price = food.querySelector('.food-price').innerHTML;
  let imgSrc = food.querySelector('.food-img').src;

  let newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title === newProduct.title)) {
    alert('Product already added in Cart');
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;

  let cartBasket = document.querySelector('.cart-content');
  if (!cartBasket) {
    console.error("'.cart-content' element not found.");
    return;
  }

  cartBasket.append(element);
  updateTotal();
}

function createCartProduct(title, price, imgSrc) {
  return `
  <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amt">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>
  </div>`;
}

// Update Total
function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;
  cartItems.forEach((product) => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace(/[^\d.]/g, ''));
    let qty = product.querySelector('.cart-quantity').value;
    total += price * qty;
    product.querySelector('.cart-amt').innerText = `Rs.${price * qty}`;
  });

  totalValue.innerHTML = 'Rs.' + total.toFixed(2);

  // Update Cart Count
  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;

  cartCount.style.display = count === 0 ? 'none' : 'block';
}