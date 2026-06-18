import { cart, deleteCart } from "../data/cart.js";
import { products } from "../data/products.js";
const rupeeRate = 83;

let cartcost = 0;
let cartselectitem = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingItem;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  cartselectitem += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
      src=${matchingItem.image}>

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
        ₹${((matchingItem.priceCents / 100) * rupeeRate).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id=${
            matchingItem.id
          }>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name=${matchingItem.id}>
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name=${matchingItem.id}>
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              ₹${(4.99 * rupeeRate).toFixed(2)} - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name=${matchingItem.id}>
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              ₹${(9.99 * rupeeRate).toFixed(2)} - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
});
let cost=0;
let item1;
cart.forEach((cartItem) => {
 products.forEach((item)=>{
  if(item.id === cartItem.productId)
  {
    item1 = item;
  }
 });
 cost = cost + (((item1.priceCents)/100) * rupeeRate) * cartItem.quantity;
});
const shippingCost = 4.99 * rupeeRate;
const subtotal = cost + shippingCost;
const estimatedTax = subtotal * 0.1;
const grandTotal = subtotal + estimatedTax;

document.querySelector('.js-payment-Cart').innerHTML = `₹${cost.toFixed(2)}`;
document.querySelector('.js-shipping-cost').innerHTML = `₹${shippingCost.toFixed(2)}`;
document.querySelector('.js-subtotal').innerHTML = `₹${subtotal.toFixed(2)}`;
document.querySelector('.js-estimated-tax').innerHTML = `₹${estimatedTax.toFixed(2)}`;
document.querySelector('.js-payment-summary-money').innerHTML = `₹${grandTotal.toFixed(2)}`;
document.querySelector(".js-order-summary").innerHTML = cartselectitem;

document.querySelectorAll(".js-delete-quantity").forEach((cartItem) => {
  cartItem.addEventListener("click", () => {
    const productId = cartItem.dataset.productId;
    deleteCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
  });
});
