// reload page
document
  .getElementById("empty-button")
  .addEventListener("click", function reload() {
    document.location.reload();
    localStorage.removeItem("cart-article");
  });

// importing API datas from cards.js file
import { datas } from "./cards.js";

// calling main function
main();

function main() {
  // transform localStorage datas in JSON array
  const products = getProducts();
  // if we don't have nothing in cart, stop the execution by returning
  if (!products) {
    return null;
  }
  // create a tab with name of every API product and their quantity in cart
  const names = findNames(datas);
  // remove multiple same articles
  sortTab(products, names);
}

function sortTab(product, tabNames) {
  const quantityTab = [];
  // putting right cart quantity in tabNames array
  for (let i = 0; i < tabNames.length; i++) {
    for (let j = 0; j < product.length; j++) {
      if (product[j].name == tabNames[i]) {
        tabNames[i + 1] += product[j].quantity;
      }
    }
  }
  // create a new array who take quantity of each articles in cart in tabNames array
  for (let i = 1; i < tabNames.length; i += 2) {
    quantityTab.push(tabNames[i]);
  }
  // getting apiproducts
  const apiProducts = datas;
  // display them in html
  displayProductsInCart(apiProducts, quantityTab);
}

function displayProductsInCart(apiProducts, quantityTab) {
  let totalPrice = 0;
  for (let i = 0; i != apiProducts.length; i++) {
    // if quantity = 0 skip the product
    if (quantityTab[i] == 0) {
    } else {
      // get contextual info and display them
      let price = (apiProducts[i].price / 100) * quantityTab[i] + "€";
      totalPrice += parseInt(price);
      localStorage.setItem("total-price", totalPrice);
      const templateElt = document.getElementById("product-cart-container");
      const cloneElt = document.importNode(templateElt.content, true);
      cloneElt.getElementById("img-cart").src = apiProducts[i].imageUrl;
      cloneElt.getElementById("cart-product-name").textContent =
        apiProducts[i].name;
      cloneElt.getElementById("cart-price").textContent = price;
      cloneElt.getElementById("cart-quantity").textContent = quantityTab[i];

      document.getElementById("products-cart-container").appendChild(cloneElt);
      document.getElementById("total-price").textContent = totalPrice + "€";
    }
  }
}

function findNames(datas) {
  let names = [];
  // push on tab names the name of product and the quantity at 0
  for (let data of datas) {
    names.push(data.name, (data.qty = 0));
  }
  return names;
}

function getProducts() {
  // if we have nothing in localstorage display empty cart version of cart.html
  if (localStorage.getItem("cart-article") === null) {
    document.getElementById("cart-container").classList.add("hidden");
    document.getElementById("empty-cart").classList.remove("hidden");
  } else {
    /* if we have something in localstorage display "with elements" cart version of cart.html
     ** transform the data in localstorage into an JSON array
     */
    document.getElementById("empty-cart").classList.add("hidden");
    document.getElementById("cart-container").classList.remove("hidden");
    const products = localStorage.getItem("cart-article") + "]";
    const final = JSON.parse(products);
    return final;
  }
}
