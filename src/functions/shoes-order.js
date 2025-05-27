import { generateColorBox } from "./color-box"
import { counterBox } from "./counterBox"

export function shoesOrderCart(imgUrl, name, totalPrice, color, bg, size, count, target, deleteBtn) {
  const idName = name.replace(/ /g, "")
  const uniqueId = `${idName}-${size}-${color}`;
  const shoppingCart = document.createElement("div");
  shoppingCart.innerHTML = `
    <div id="${uniqueId}-container" class="w-full p-4 flex bg-white h-fit items-center gap-x-5 rounded-2xl mb-6">
      <div id="${uniqueId}-imageContainer" class="items-center size-fit">
        <img src="${imgUrl}" alt="productImage" class="w-52 rounded-2xl" />
      </div>
      <div class="h-full w-full">
        <div id="${uniqueId}-header" class="flex text-2xl font-bold justify-between items-center">
          <h4 class="line-clamp-1">${name}</h4>
        </div>
        <div class="h-full w-full flex items-center my-2.5">
          <p>
            <span id="${uniqueId}-colorBox" class="inline-block align-middle mr-1.5"></span>
            ${color} | Size : ${size}
          </p>
        </div>
        <div class="flex w-full items-center justify-between">
          <p class="text-xl font-bold" id="${uniqueId}-totalPrice">$${totalPrice}.00</p>
          <div id="${uniqueId}-counterBoxContainer" class="w-24 flex items-center bg-gray-100	 text-center h-10 px-3 rounded-2xl"></div>
        </div>
      </div>
    </div>
  `;

  target.appendChild(shoppingCart.firstElementChild);

  // Generate color box
  const colorBoxContainer = document.getElementById(`${uniqueId}-colorBox`);
  const colorBox = generateColorBox(bg, colorBoxContainer, color);
  colorBox.classList.remove("size-10", "cursor-pointer");
  colorBox.classList.add("size-5");

  // Generate counter box
  const counterBoxContainer = document.getElementById(`${uniqueId}-counterBoxContainer`);
  const pricePerItem = totalPrice / count;
  counterBox(count, counterBoxContainer, uniqueId, pricePerItem);

  // Append delete button
  const header = document.getElementById(`${uniqueId}-header`);
  const clonedDeleteBtn = deleteBtn.cloneNode(true);
  clonedDeleteBtn.id = `${uniqueId}-recycleIcon`;
  header.appendChild(clonedDeleteBtn);
}
