const inputName = document.querySelector("#name");
const inputPrice = document.getElementById("price");
const inputPicture_url = document.getElementById("picture_url");
const inputDetails = document.getElementById("details");
const inputLocation = document.getElementById("location");

const addForm = document.querySelector(".add-item-form");
const successMessage = document.querySelector(".success-message");

function validateInputForm() {
  const urlRegex =
    /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

  if (!inputName.value) {
    throw new Error("Name is empty");
  }

  if (!inputDetails.value) {
    throw new Error("Description is empty");
  }

  if (!inputLocation.value) {
    throw new Error("Location is empty");
  }

  if (!inputPrice.value) {
    throw new Error("Price is empty");
  }

  if (!urlRegex.test(inputPicture_url.value)) {
    throw new Error("Bad Link");
  }
}

function pushItem() {
  const newItem = {
    name: inputName.value,
    price: inputPrice.value,
    picture_url: inputPicture_url.value,
    details: inputDetails.value,
    location: inputLocation.value,
  };
  try {
    validateInputForm();
    fetch("https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    successMessage.textContent = "Item added.";
    setTimeout(() => {
      window.location.replace("./index.html");
    }, 3000);
  } catch (error) {
    successMessage.textContent = error.message;

    console.log(inputName.textContent);
    console.log(inputPrice.innerHTML);
    console.log(inputName);
    console.log(inputName.value);
  }
}
