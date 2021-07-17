// calling main function
main();

// importing API datas from cards.js file
import { datas } from "./cards.js";

function main() {
  // cards contain all API products
  const cards = datas;
  for (let card of cards) {
    // display every API product on page
    displayCards(card);
  }
}

function displayCards(card) {
  // transform cents price to euro price
  let price = card.price / 100;
  // bring template in templateElt
  const templateElt = document.getElementById("card-template");
  // copy templateElt and put copy inside cloneElt
  const cloneElt = document.importNode(templateElt.content, true);

  // changing context information
  cloneElt.getElementById("card-image").src = card.imageUrl;
  cloneElt.getElementById("title").textContent = card.name;
  cloneElt.getElementById("price").textContent = price + "€";
  cloneElt.getElementById("description").textContent = card.description;
  cloneElt.getElementById("card-link").href =
    "Frontend/html/product.html?id=" + card._id;

  // put clone element as a new child of my container
  document.getElementById("container").appendChild(cloneElt);
}
