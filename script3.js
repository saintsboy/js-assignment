const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputPicture_url = document.getElementById("picture_url");
const inputDetails = document.getElementById("details");
const inputLocation = document.getElementById("location");

const addForm = document.querySelector(".add-item-form");
const successMessage = document.querySelector(".success-message");

function addForm() {
  const newItem = {
    name: inputName.innerHTML,
    price: inputPrice.innerHTML,
    picture_url: inputPicture_url.innerHTML,
    details: inputDetails.innerHTML,
    location: inputLocation.innerHTML,
  };

  console.log(newItem);

  fetch("https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  successMessage.textContent = "Item added.";
  setTimeout(() => {
    window.location.replace("./index.html");
  }, 3000);
}
