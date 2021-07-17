document.getElementById("order-button").addEventListener("click", (e) => {
  let price = document.getElementById("total-price").value;
  console.log(price);
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;
  let isValid = 0;
  isValid += isValidFirstName(firstName);
  isValid += isValidLastName(lastName);
  isValid += isValidAdress(address);
  isValid += isValidCity(city);
  isValid += isValidEmail(email);
  if (isValid == 5) {
    getOrderId(firstName, lastName, address, city, email);
  }
});

async function getOrderId(fn, ln, ad, ci, em) {
  let orderId = await transformDataToJson(
    firstName,
    lastName,
    address,
    city,
    email
  );
  localStorage.setItem("order-id", orderId);
  localStorage.removeItem("cart-article");
  document.location.href = "confirmation.html";
}

function isValidFirstName(firstName) {
  firstName = firstName.toLowerCase();
  let pattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim;
  const regex = new RegExp(pattern);
  if (regex.test(firstName) === true) {
    document.getElementById("error-firstname").classList.add("hidden");
    return 1;
  } else {
    document.getElementById("error-firstname").classList.remove("hidden");
    document.getElementById("error-firstname").textContent =
      "Merci de rentrer un prénom correct";
  }
  return 0;
}

function isValidLastName(lastName) {
  let pattern = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gim;
  const regex = new RegExp(pattern);
  if (regex.test(lastName) === true) {
    document.getElementById("error-lastname").classList.add("hidden");
    return 1;
  } else {
    document.getElementById("error-lastname").classList.remove("hidden");
    document.getElementById("error-lastname").textContent =
      "Merci de rentrer un nom correct";
  }
  return 0;
}

function isValidAdress(address) {
  let pattern = /^([0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{1,50})$/gim;
  const regex = new RegExp(pattern);
  if (regex.test(address) === true) {
    document.getElementById("error-address").classList.add("hidden");
    return 1;
  } else {
    document.getElementById("error-address").classList.remove("hidden");
    document.getElementById("error-address").textContent =
      "Merci de rentrer une adresse correcte";
  }
  return 0;
}

function isValidCity(city) {
  let pattern = /^([a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{1,50})$/gim;
  const regex = new RegExp(pattern);
  if (regex.test(city) === true) {
    document.getElementById("error-city").classList.add("hidden");
    return 1;
  } else {
    document.getElementById("error-city").classList.remove("hidden");
    document.getElementById("error-city").textContent =
      "Merci de rentrer une ville correcte";
  }
  return 0;
}

function isValidEmail(email) {
  let pattern =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gim;
  const regex = new RegExp(pattern);
  if (regex.test(email) === true) {
    document.getElementById("error-email").classList.add("hidden");
    return 1;
  } else {
    document.getElementById("error-email").classList.remove("hidden");
    document.getElementById("error-email").textContent =
      "Merci de rentrer un email correct";
  }
  return 0;
}

function transformDataToJson(fn, ln, ad, ci, em) {
  let tabProducts = JSON.parse(localStorage.getItem("cart-article") + "]");
  let productsNameTab = [];
  for (let i = 0; i < tabProducts.length; i++) {
    productsNameTab.push(tabProducts[i]._id);
  }
  productsNameTab = JSON.stringify(productsNameTab);
  let data = `{\n  \"contact\": {\n    \"firstName\": \"${fn}\",\n    \"lastName\": \"${ln}\",\n    \"address\": \"${ad}",\n    \"city\": \"${ci}\",\n    \"email\": \"${em}\"\n  },\n  \"products\": ${productsNameTab}\n}\n`;
  let jsonData = JSON.parse(data);

  const fetchMethod = {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  return fetch("http://localhost:3000/api/furniture/order", fetchMethod)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.orderId;
    })
    .catch(function (error) {
      console.error(error);
    });
}
