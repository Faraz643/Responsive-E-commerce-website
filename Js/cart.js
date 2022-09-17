import {
  product,
  mainArticleContainer,
  showQuantity,
  totalItemsInCart,
  updateCart,
} from "./app.js";

let basket = JSON.parse(localStorage.getItem("Item Info")) || [];

let ordersContainer = document.querySelector(".main-items-container");

let priceSummaryContainer = document.querySelector(".check-out-wrapper");

let recommendationText = document.querySelector(".based-rec-text");

let recommendationSection = document.querySelector(".recommendation-section");

let cartQuantity = document.getElementById("sum-items");

let checkoutSummary = () => {
  // calculated(sum) price for total items in basket with their quantities

  let priceSummary;
  let priceSummaryList = basket.map((currentProduct) => {
    let check = product.find(
      (OriginalProduct) => OriginalProduct.id === currentProduct.id
    );
    let calc = check.price * currentProduct.quantity;
    return calc;
  });

  // if(basket.length)
  if (basket.length === 0) {
    priceSummary = 0;
  } else {
    priceSummary = priceSummaryList.reduce((total, now) => total + now);
  }

  // ----- showing products from basket-----

  ordersContainer.innerHTML = basket
    .map(function (x) {
      let OriginalItem = product.find((itemIndex) => itemIndex.id === x.id);
      let totalPrice = parseInt(OriginalItem.price) * x.quantity;
      return `<div class="product-wrapper">
        <div class="pro-details">
        <i class="fa-solid fa-circle-xmark delete-product-ic" title="Remove Item" id="${x.id}" onClick="removeItem(this)"></i>

          <img
            src="${OriginalItem.image}"
            alt=""
            class="pro-image"
          />
          <div class="pro-name-c-s">
            <p class="pro-name">${OriginalItem.name}</p>
            <p class="pro-clr">
              <span class="clr-grey">color: </span
              ><span class="black-fs">Blue</span>
            </p>
            <p class="pro-size">
              <span class="clr-grey">size: </span
              ><span class="black-fs">M</span>
            </p>
          </div>
        </div>
        <div class="pro-price">
          <p class="price-per">$${OriginalItem.price} /-</p>
        </div>
        <div class="pro-qty-ico">
          <i class="fa-solid fa-minus clr-grey bgc-grey" id="${x.id}" onClick="decreaseItemCart(this)"></i>
          <span class="current-qty">${x.quantity}</span>
          <i class="fa-solid fa-plus clr-grey bgc-black" id="${x.id}" onClick="increaseItemCart(this)"></i>

        </div>
        <div class="tot-pr">
          <p class="total-price">$${totalPrice}</p>
        </div>
      </div> `;
    })
    .join("");

  // ---- showing price summary ----

  priceSummaryContainer.innerHTML = `
    <div class="grid-items text2">
      <p class="g-i-2-text text-bold">Payment Summary</p>
    </div>
    <div class="grid-items checkout-container box-shadow-on">
      <!-- Coupon Code -->
      <div class="flex-box-center">
      <div class="tr-code-wrap">
        <div class="tr-c-w-items">
          <p class="trans-code-text">Transaction Code</p>
        </div>

        <div class="tr-c-w-items">
          <p class="trans-code black-fs">VCE5464FD</p>
        </div>
        <input
          type="text"
          class="code"
          name="coupon-code"
          placeholder="COUPON CODE"
        />
        <div class="tr-c-w-items">
          <button class="apply-btn" onclick="functionHere()">
            Apply
          </button>
        </div>
      </div>
      <div class="dotted-line-grey"></div>
      <!-- Order Summary  -->
      <div class="price-summary-wrapper">
        <div class="price-sum-items">
          <p class="clr-grey">Order Summary</p>
        </div>
        <div class="price-sum-items"><p class="ord-sum">&#8377; ${priceSummary}</p></div>
        <div class="price-sum-items">
          <p class="clr-grey">Additional Services</p>
        </div>
        <div class="price-sum-items">
          <p class="add-serv clr-blue">$10</p>
        </div>
        <div class="price-sum-items">
          <p class="clr-grey">Total Amount</p>
        </div>
        <div class="price-sum-items">
          <p class="total-amount">&#8377; ${priceSummary + 10}</p>
        </div>
      </div>
      <div class="dotted-line-grey"></div>
      </div>
      <!-- Proceed to buy -->
      <div class="proceed-flex">
        <button class="proceed-btn">Proceed to Buy</button>
      </div>
       <div><button class="refresh-cart-btn" onClick="window.location.reload()"> <i class="fa fa-duotone fa-arrows-rotate"> </i> Refresh Cart</button> </div> 
      
    </div>
  </div>`;
};

// ----- showing empty cart message -----

let validatecart = () => {
  if (basket.length === 0) {
    ordersContainer.innerHTML = `<h2 class="cart-empty">Your Cart is empty.</h2>
        <h3> <a href="index.html" class="cart-empty-text"> Shop Latest Deals Now</a></h3>`;
    recommendationText.innerHTML = "Recommended Items will be shown here";
    priceSummaryContainer.innerHTML = "";
    recommendedItems();
  } else {
    checkoutSummary();
    recommendedItems();
  }
};

let removeItem = (id) => {
  let elementId = id.id;

  let check = basket.findIndex((x) => x.id === elementId);

  basket.splice(check, 1);

  localStorage.setItem("Item Info", JSON.stringify(basket));
  // console.log('1')
  validatecart();
  // console.log('2')
  // console.log('3')
  console.log(basket.length);

  if (basket.length === 0) {
    totalItemsInCart.innerHTML = 0;
    validatecart();
    console.log("basket-lenght = 0");
  }

  // else if (basket.length === 0) return;
  else {
    var sumOfQuantity = basket
      .map((x) => x.quantity)
      .reduce((total, currentItem) => total + currentItem);
    totalItemsInCart.innerHTML = sumOfQuantity;
  }
};

let recommendedItems = () => {
  let arr = basket.map((x) => x.id);

  let z = product.filter((y) => y.id === arr.find((x) => y.id === x));

  let categories = z.map((x) => x.category);

  let categorizedItems = product.filter(
    (y) => y.category === categories.find((x) => y.category === x)
  );

  mainArticleContainer.innerHTML = categorizedItems
    .map((x) => {
      return `
      
      <article class="product-card">
    <div class="img-large-cart-icon">
      <span class="material-symbols-outlined article-icon no-bd-black">
        fit_screen
      </span>
      <span class="material-symbols-outlined article-icon no-bd-black">
        add_shopping_cart
      </span>
    </div>
    <div class="product-details">
      <div class="rect-box ${x.background}">
        <img src="${x.image}" alt="" />
      </div>

      <div class="name-price">
        <h4 class="pro-name">${x.name}</h4>
        <p class="pro-price">$${x.price}</p>
      </div>
    </div>
    <div class="count-item">
    <p class="select-q">Select Quantity</p>
    <div style="user-select:none;">
          <span
            class="material-symbols-outlined decrease-item no-bd-black"
            title="Decrease quantity" onclick="window.decreaseItem(this)"
            id="${x.id}">remove</span>
          <span
            class="material-symbols-outlined increase-item no-bd-black"
            title="Increase quantity" onclick="increaseItem(this)"
            id="${x.id}">add</span>
            </div>
            <div class="item-q-wrap">
                <p class="item-quantity" id="${x.id}">${showQuantity(x.id)}</p>
            </div>
        </div>
        </article>
       `;
    })
    .join("");
};

let increaseItemCart = (id) => {
  let itemId = id.id;

  let data = product.filter(function (x) {
    return x.id === itemId;
  })[0];

  let searchItem = basket.find((currentItem) => currentItem.id === itemId);

  if (searchItem === undefined) {
    basket.push({
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: 1,
    });
  } else {
    searchItem.quantity += 1;
  }

  localStorage.setItem("Item Info", JSON.stringify(basket));
  updateCart();

  checkoutSummary();
  updateCartQuantity();
};

let decreaseItemCart = (id) => {
  let searchItem = basket.find((x) => x.id === id.id);
  let findIndex = basket.indexOf(basket.find((x) => x.id === id.id));
  if (searchItem === undefined) {
    return;
  } else {
    if (searchItem.quantity <= 0) return;
    else {
      searchItem.quantity -= 1;
    }
  }

  basket = basket.filter((x) => x.quantity !== 0);

  localStorage.setItem("Item Info", JSON.stringify(basket));

  updateCart();
  // checkoutSummary();
  validatecart();
  updateCartQuantity();
};

let updateCartQuantity = () => {
  if (basket.length > 0) {
    let sumQuantity = basket
      .map((x) => x.quantity)
      .reduce((sum, current) => sum + current);

    cartQuantity.innerHTML = sumQuantity;
  } else {
    cartQuantity.innerHTML = 0;
  }
};

validatecart();

// to use functions globally use window.functionName = functionName

window.removeItem = removeItem;
window.decreaseItemCart = decreaseItemCart;
window.increaseItemCart = increaseItemCart;
