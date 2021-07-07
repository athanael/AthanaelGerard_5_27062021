main();

async function main() {
  const id = getId();
  const currentProduct = await verifyProduct(id);
  displayProduct(currentProduct);
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
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = price + "€";
  document.getElementById("product-description").textContent =
    product.description;
}
