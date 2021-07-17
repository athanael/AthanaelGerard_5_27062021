main();

function main() {
  displayElements();
  removeLocalStorage();
}

function displayElements() {
  document.getElementById("order-name").textContent =
    localStorage.getItem("order-id");
  document.getElementById("price").textContent =
    localStorage.getItem("total-price") + "€";
}

function removeLocalStorage() {
  localStorage.removeItem("total-price");
  localStorage.removeItem("order-id");
}
