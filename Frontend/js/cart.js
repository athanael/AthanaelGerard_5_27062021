// calling main function
main();

// function async because we need to wait to have findNames execution
async function main() {
  // if user click on empty-button, remove cart information of localstorage
  document.getElementById("empty-button").addEventListener("click", () => {
    localStorage.removeItem("cart-article");
  });
  // transform localStorage datas in JSON array
  const products = getProducts();
  // if we don't have nothing in cart, stop the execution by returning
  if (!products) {
    return null;
  }
  // create a tab with name of every API product and their quantity in cart
  const names = await findNames();
  // remove multiple same articles
  sortTab(products, names);
}

async function sortTab(product, tabNames) {
  const quantityTab = [];
  // putting right cart quantity in tabNames array
  for (i = 0; i < tabNames.length; i++) {
    for (j = 0; j < product.length; j++) {
      if (product[j].name == tabNames[i]) {
        tabNames[i + 1] += product[j].quantity;
      }
    }
  }
  // create a new array who take quantity of each articles in cart in tabNames array
  for (i = 1; i < tabNames.length; i += 2) {
    quantityTab.push(tabNames[i]);
  }
  // getting apiproducts
  const apiProducts = await findProducts();
  // display them in html
  displayProductsInCart(apiProducts, quantityTab);
}

function displayProductsInCart(apiProducts, quantityTab) {
  let totalPrice = 0;
  for (i = 0; i != apiProducts.length; i++) {
    // if quantity = 0 skip the product
    if (quantityTab[i] == 0) {
    } else {
      // get contextual info and display them
      let price = (apiProducts[i].price / 100) * quantityTab[i] + "€";
      totalPrice += parseInt(price);
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

function findNames() {
  let names = [];
  // get API products info
  return fetch("http://localhost:3000/api/furniture")
    .then(function (response) {
      // transform them into JSON
      return response.json();
    })
    .then(function (datas) {
      // push on tab names the name of product and the quantity at 0
      for (data of datas) {
        names.push(data.name, (data.qty = 0));
      }
      // returning tab
      return names;
    })
    .catch(function (error) {
      // display error in console
      console.error(error);
    });
}

function findProducts() {
  // get API products info
  return fetch("http://localhost:3000/api/furniture")
    .then(function (response) {
      // transform them into JSON
      return response.json();
    })
    .then(function (datas) {
      // return JSON datas
      return datas;
    })
    .catch(function (error) {
      // display error in console
      console.error(error);
    });
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
