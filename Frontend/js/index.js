// calling main function
main();

// function async because we need to wait to have getCards execution
async function main() {
  // cards contain all API products
  const cards = await getCards();
  for (card of cards) {
    // display every API product on page
    displayCards(card);
  }
}

function getCards() {
  // doing the fetch to get data from api URL
  return fetch("http://localhost:3000/api/furniture")
    .then(function (response) {
      // transform what i recieve in JSON
      return response.json();
    })
    .then(function (data) {
      // returning JSON datas
      return data;
    })
    .catch(function (error) {
      // display on site and on console error
      console.error(error);
      displayError(error);
    });
}

function displayError(error) {
  // display error on website
  const displayElt = (document.getElementById("error-text").textContent =
    "Erreur :" + error + " Veuillez vérifier votre connexion internet");
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
