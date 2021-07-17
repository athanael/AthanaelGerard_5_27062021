// get in main function
main();

// importing API datas from cards.js file
import { datas } from "./cards.js";

function main() {
  // get id info from the URL
  const id = getId();
  // var to check if its the first time that user order something
  let firstTime = true;
  // if localstorage is not empty set firstTime to false
  if (localStorage.getItem("cart-article")) {
    firstTime = false;
  }
  // verify what product to display with id
  const currentProduct = verifyProduct(datas, id);
  // display product
  displayProduct(currentProduct);
  document.getElementById("buy-button").addEventListener("click", function (e) {
    getQuantityAndVernis(currentProduct, firstTime);
    firstTime = false;
  });
}

function getQuantityAndVernis(currentProduct, isFirstTime) {
  // hide validation and error order text
  let storageArticle;
  document.getElementById("text-error-quantity").classList.add("hidden");
  document.getElementById("text-validation").classList.add("hidden");
  // put varnish value in vernis html
  const vernis = document.getElementById("vernis").value;
  // put quantity value in quantity html
  let quantity = parseInt(document.getElementById("quantity").value);
  // if quantity is not good display error message
  if (isNaN(quantity) || quantity <= 0) {
    document.getElementById("text-error-quantity").classList.remove("hidden");
  } else {
    // put quantity and varnish in tab of APIdatas
    currentProduct.quantity = quantity;
    currentProduct.varnish = vernis;
    // setting default value in localStorage
    if (localStorage.getItem("cart-article") == null) {
      localStorage.setItem("cart-article", "");
      isFirstTime = true;
    }
    // if its first time open the array of JSON with [
    if (isFirstTime == true) {
      storageArticle =
        "[" +
        localStorage.getItem("cart-article") +
        JSON.stringify(currentProduct);
    } else {
      // else putting JSON info with ,
      storageArticle =
        localStorage.getItem("cart-article") +
        "," +
        JSON.stringify(currentProduct);
    }
    // creating items in localstorage
    localStorage.setItem("cart-article", storageArticle);
    isFirstTime = false;
    document.getElementById("text-validation").classList.remove("hidden");
  }
}

function verifyProduct(data, idToVerify) {
  // check all the products of the api if the id is the same that in the URL return the good product
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id == idToVerify) {
      return data[i];
    }
  }
}

function getId() {
  // get id info from the URL
  return new URL(window.location.href).searchParams.get("id");
}

function displayProduct(product) {
  // get contextual infos and display them on html
  let price = product.price / 100;
  document.getElementById("img").src = product.imageUrl;
  document.getElementById("product-name").classList.remove("hidden");
  document.getElementById("product-price").classList.remove("hidden");
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = price + "€";
  document.getElementById("product-description").textContent =
    product.description;
  displayVernis(product.varnish);
}

function displayVernis(product) {
  for (let i = 0; i < product.length; i++) {
    // create as options for select as varnish are alvailable
    const containerElt = document.getElementById("vernis-template");
    const cloneElt = document.importNode(containerElt.content, true);
    cloneElt.getElementById("option").value = product[i];
    cloneElt.getElementById("option").textContent = product[i];
    document.getElementById("vernis").appendChild(cloneElt);
  }
}
