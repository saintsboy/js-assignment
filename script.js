let items;

document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.querySelector(".items-container");
  const itemDetails = document.querySelector(".item-details");
  const addForm = document.querySelector(".add-item-form");
  const successMessage = document.querySelector(".success-message");

  const getItemsFromBackend = () => {
    return fetch("https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items")
      .then((response) => response.json())
      .catch((error) => console.error("error:", error));
  };

  const displayItems = async () => {
    const items = await getItemsFromBackend();
    itemsContainer.innerHTML = "";

    items.forEach((item) => {
      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");
      itemCard.innerHTML = `
                <img src="${item.picture_url}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: ${item.price} €</p>
                <button  class="view-details" data-id="${item.id}" onclick="location.href='index2.html/?itemID=${item.id}';">More</button>
            `;
      itemsContainer.appendChild(itemCard);
    });
  };

  itemsContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("view-details")) {
      const itemId = event.target.getAttribute("data-id");
      const item = await getItemsFromBackend().then((items) =>
        items.find((item) => item.id === itemId)
      );
      if (item) {
        itemDetails.innerHTML = `
                    <img src="${item.picture_url}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Kaina: ${item.price} €</p>
                    <p>${item.details}</p>
                    <p>Pardavimo vieta: ${item.selling_point}</p>
                    <button class="delete-item" data-id="${item.id}">Delete</button>
                `;
      }
    }
  });

  itemDetails.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-item")) {
      const itemId = event.target.getAttribute("data-id");
      fetch(`https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items/${itemId}`, {
        method: "Delete",
      });
      itemDetails.innerHTML = `<p>item was deleted.</p>`;
      displayItems();
    }
  });

  addForm.addEventListener("submit", async (event) => {
    window.open("index3.html");
  });

  displayItems();
});
