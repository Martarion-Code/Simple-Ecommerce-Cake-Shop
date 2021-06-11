"use strict";

const sortBtn = document.querySelector(".sortBtn");
const filterBtn = document.querySelectorAll(".filter-btn");
const storeItem = document.querySelectorAll(".store-item");
const storeItemPlace = document.querySelector("#store-items");
const cart = document.querySelector("#cart");
const priceItemCartHTMLCol = cart.getElementsByClassName("cart-item-price");
const showCartBtn = document.querySelector("#cart-info");
const shopIcon = document.querySelector(".store-item-icon");
const storeItemsContainer = document.querySelector(
  ".store .container #store-items"
);
const searchField = document.querySelector("#search-item");

/**Page Navigation feature */

addEventListener("click", function (e) {
  if (
    e.target.classList.contains("nav-link") ||
    e.target.classList.contains("banner-link") ||
    e.target.classList.contains("about-us-link")
  ) {
    e.preventDefault();

    const btnId =
      e.target.getAttribute("id") == true
        ? e.target.getAttribute("id")
        : e.target.getAttribute("href");
    document.querySelector(btnId).scrollIntoView({ behavior: "smooth" });
  }
});

/**Filter feature */
filterBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

sortBtn.addEventListener("click", function (e) {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.getAttribute("data-filter") !== "all") {
      const filterItm = [...storeItem].filter((el) => {
        return (
          el.getAttribute("data-item") == e.target.getAttribute("data-filter")
        );
      });
      insertItemToPlace(filterItm, storeItemPlace);
    } else {
      insertItemToPlace(storeItem, storeItemPlace);
    }
  }
});

function insertItemToPlace(arrayItem, storePlaceItem) {
  storePlaceItem.innerHTML = "";
  arrayItem.forEach((item) => storePlaceItem.prepend(item));
}

/**Cart feature */

console.log(priceItemCartHTMLCol);

function priceItemCart(priceItemCartArg) {
  const price = [...priceItemCartArg].reduce(
    (acc, curr) => (acc += Number(curr.textContent)),
    0
  );
  cart.querySelector("#cart-total").innerHTML = price.toFixed(2);
  showCartBtn.querySelector(".item-total").innerHTML = price.toFixed(2);
  showCartBtn.querySelector("#item-count").innerHTML = priceItemCartArg.length;
}

function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.remove(firstChild);
  }
}

priceItemCart(priceItemCartHTMLCol);

showCartBtn.addEventListener("click", function () {
  cart.classList.contains("show-cart")
    ? cart.classList.remove("show-cart")
    : cart.classList.add("show-cart");
});

storeItemsContainer.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("store-item-icon") ||
    e.target.classList.contains("fa-shopping-cart")
  ) {
    const storeItem = e.target.closest(".store-item");
    // console.log(storeItem.querySelector('#store-item-name').innerHTML)
    // console.log(storeItem.querySelector('#store-item-price').innerHTML)
    // console.log(storeItem.querySelector('img').getAttribute('src'))

    const srcImg = storeItem
      .querySelector("img")
      .getAttribute("src")
      .split("/");
    srcImg[0] = "img-cart";
    // console.log(srcImg.join("/"))
    const item = `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
        <img src="${srcImg.join(
"/")}" class="img-fluid rounded-circle" id="item-img" alt="">
        <div class="item-text">

          <p id="cart-item-title" class="font-weight-bold mb-0">${
            storeItem.querySelector("#store-item-name").innerHTML
          }</p>
          <span>$</span>
          <span id="cart-item-price" class="cart-item-price" class="mb-0">${
            storeItem.querySelector("#store-item-price").innerHTML
          }</span>
        </div>
        <a href="#" id='cart-item-remove' class="cart-item-remove">
          <i class="fas fa-trash"></i>
        </a>
      </div>`;

    cart.insertAdjacentHTML("afterbegin", item);
    //   cart.insertAdjacentHTML('afterbegin', item)

    alert("You added item to the cart");
  }

  priceItemCart(priceItemCartHTMLCol);
});

const clearCartId = cart.querySelector("#clear-cart").getAttribute("id");

cart.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    // e.target.closest('.card-item')
    e.target.closest(".cart-item").remove();
    priceItemCart(priceItemCartHTMLCol);
  } else if (e.target.getAttribute("id") == clearCartId) {
    e.preventDefault();
    //   console.log(e.target)
    cart.querySelectorAll(".cart-item").forEach((item) => {
      item.remove();
    });
    priceItemCart(priceItemCartHTMLCol);
  }
});

/**Search Feature */

console.log(storeItem);

var str = "W3Schools";
var patt1 = /w3schools/i;
var result = str.match(patt1);

console.log(result);

searchField.addEventListener("keyup", function (e) {
  const filterItems = [...storeItem].filter((item) =>
    item.getAttribute("data-item").includes(this.value)
  );

  insertItemToPlace(filterItems, storeItemPlace);
});
