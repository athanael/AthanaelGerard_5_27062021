main();

async function main() {
  const id = getId();
  const currentProduct = await verifyProduct(id);
  displayProduct(currentProduct);
  document.getElementById("buy-button").addEventListener("click", function (e) {
    getQuantityAndVernis(currentProduct);
  });
}

function getQuantityAndVernis(currentProduct) {
  document.getElementById("text-error-quantity").classList.add("hidden");
  document.getElementById("text-validation").classList.add("hidden");
  const vernis = document.getElementById("vernis").value;
  let quantity = parseInt(document.getElementById("quantity").value);
  if (isNaN(quantity) || quantity <= 0) {
    document.getElementById("text-error-quantity").classList.remove("hidden");
  } else {
    currentProduct.quantity = quantity;
    currentProduct.varnish = vernis;
    if (localStorage.getItem("cart-quantity") == null) {
      localStorage.setItem("cart-quantity", 0);
    }
    if (localStorage.getItem("cart-article") == null) {
      localStorage.setItem("cart-article", "");
    }
    const storageArticle = [
      localStorage.getItem("cart-article") + JSON.stringify(currentProduct),
    ];
    localStorage.setItem("cart-article", storageArticle);
    const storageQuantity = (quantity += parseInt(
      localStorage.getItem("cart-quantity")
    ));
    localStorage.setItem("cart-quantity", quantity);
    document.getElementById("text-error-quantity").textContent = "";
    document.getElementById("text-validation").classList.remove("hidden");
  }
}

function verifyProduct(idToVerify) {
  fetch("http://localhost:3000/api/furniture");
  return fetch("http://localhost:3000/api/furniture")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id == idToVerify) {
          return data[i];
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getId() {
  return new URL(window.location.href).searchParams.get("id");
}

function displayProduct(product) {
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
  for (i = 0; i < product.length; i++) {
    const containerElt = document.getElementById("vernis-template");
    const cloneElt = document.importNode(containerElt.content, true);
    cloneElt.getElementById("option").value = product[i];
    cloneElt.getElementById("option").textContent = product[i];
    document.getElementById("vernis").appendChild(cloneElt);
  }
}
