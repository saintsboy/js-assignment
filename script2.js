const itemId = new URL(document.location).searchParams.get("itemID");
const itemsContainer = document.querySelector(".items-container");
const itemDetails = document.querySelector(".item-details");

window.addEventListener("load", async function () {
  const item = await getItemsFromBackend();
  itemDetails.innerHTML = `
                    <img src="${item.picture_url}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Kaina: ${item.price} €</p>
                    <p>${item.details}</p>
                    <p>Pardavimo vieta: ${item.selling_point}</p>
                    <button class="delete-button" data-id="${item.id}">Delete</button>
                `;
  itemsContainer.appendChild(itemDetails);
  console.log(itemDetails);
});

itemDetails.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-button")) {
    fetch(`https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items/${itemId}`, {
      method: "Delete",
    });
    itemDetails.innerHTML = `<p>item was deleted.</p>`;
    setTimeout(() => {
      window.location.replace("./index.html");
    }, 3000);
  }
});

const getItemsFromBackend = () => {
  return fetch(`https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items/${itemId}`)
    .then((response) => response.json())
    .catch((error) => console.error("error:", error));
};
