let datas = [];

function getCards() {
  // doing the fetch to get data from api URL
  return new Promise((resolve) => {
    fetch("http://localhost:3000/api/furniture")
      .then(function (response) {
        // transform what i recieve in JSON
        return response.json();
      })
      .then(function (data) {
        // returning JSON datas
        datas = data;
        resolve(data);
      })
      .catch(function (error) {
        // display on site and on console error
        console.error(error);
        displayError(error);
      });
  });
}

function displayError(error) {
  // display error on website
  const displayElt = (document.getElementById("error-text").textContent =
    "Erreur :" + error + " Veuillez vérifier votre connexion internet");
}

datas = await getCards();
export { datas };
