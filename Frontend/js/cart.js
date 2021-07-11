main();

function main() {
  document.getElementById("empty-button").addEventListener("click", () => {
    localStorage.removeItem("cart-article");
    localStorage.removeItem("cart-quantity");
  });
  const products = getProducts();
}

function getProducts() {
  if (localStorage.getItem("cart-article") === null) {
    document.getElementById("cart-container").classList.add("hidden");
    document.getElementById("empty-cart").classList.remove("hidden");
  } else {
    document.getElementById("empty-cart").classList.add("hidden");
    document.getElementById("cart-container").classList.remove("hidden");
    const products = localStorage.getItem("cart-article") + "]";
    const final = JSON.parse(products);
    console.log(final);
  }
}
