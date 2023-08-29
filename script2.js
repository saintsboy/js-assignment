const itemId = url.searchParams.get("itemID");
const itemsContainer = document.querySelector(".items-container");
const itemDetails = document.querySelector(".item-details");

itemsContainer.addEventListener("click", async (event) => {
  const item = await getItemsFromBackend.then((items) =>
    items.find((item) => item.id === itemId)
  );
  itemDetails.innerHTML = `
                    <img src="${item.picture_url}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Kaina: ${item.price} €</p>
                    <p>${item.details}</p>
                    <p>Pardavimo vieta: ${item.selling_point}</p>
                    <button class="delete-item" data-id="${item.id}">Delete</button>
                `;
  itemsContainer.appendChild(itemDetails);
  console.log(itemDetails);
});

const getItemsFromBackend = () => {
  return fetch(`https://64ec6878f9b2b70f2bfa4265.mockapi.io/Items/${itemId}`)
    .then((response) => response.json())
    .catch((error) => console.error("error:", error));
};
