main();

async function main() {
  const cards = await getCards();
  for (card of cards) {
    displayCards(card);
  }
}

function getCards() {
  return fetch("http://localhost:3000/api/furniture")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.error(error);
      displayError(error);
    });
}

function displayError(error) {
  console.log("OKKKKK");
  const displayElt = (document.getElementById("error-text").innerText =
    "Erreur :" + error);
}

function displayCards(card) {
  let price = card.price / 100;
  const templateElt = document.getElementById("card-template");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("card-image").src = card.imageUrl;
  cloneElt.getElementById("title").textContent = card.name;
  cloneElt.getElementById("price").textContent = price + "€";
  cloneElt.getElementById("description").textContent = card.description;
  cloneElt.getElementById("card-link").href =
    "Frontend/html/product.html?id=" + card._id;

  document.getElementById("container").appendChild(cloneElt);
}
