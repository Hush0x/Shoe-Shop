export function loadProducts(target, item) {
  const card = document.createElement("div");
  card.className = "card flex flex-col gap-1 bg-base-100 w-44 h-60 cursor-pointer relative";
  card.id = item.id;
  card.setAttribute("brand", item.brand)
  card.innerHTML = `
      <figure>
        <img src="${item.imageURL}" alt="Shoes" class="size-44 rounded-3xl" />
      </figure>
      <div class="card-body">
        <h2 class="card-title line-clamp-1 font-bold text-xl">${item.name}</h2>
        <p class="font-semibold text-base">$${item.price}.00</p>
      </div>
    `;
  card.addEventListener("click", () => {
    window.localStorage.setItem("uid", item.id)
    window.location.href = `/product.html?id=${item.id}`
  });
  target.appendChild(card);
  return card
}