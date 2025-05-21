import { generateColorBox } from "./color-box"
import { counterBox } from "./counterBox"

export function shoesOrderCart(imgUrl, name, totalPrice, color, bg, size, count, target) {
  const uniqueId = `${name}-${size}-${color}`
  const shopping = `<div
          id="${uniqueId}-container"
          class="w-full p-4 flex bg-white h-fit items-center gap-x-5 rounded-2xl mb-6"
        >
          <div id="${uniqueId}-imageContainer" class="items-center size-fit">
            <img src="${imgUrl}" alt="productImage" class="w-52 rounded-2xl" />
          </div>
          <div class="h-full w-full">
            <div class="flex text-2xl font-bold justify-between items-center">
              <h4 class="line-clamp-1">${name}</h4>
              <img
                src="/svgs/product/recycle-bin.png"
                alt="recycle-bin-icon"
                id="${uniqueId}-recycleIcon"
                class="size-6 cursor-pointer"
              />
            </div>
            <div class="h-full w-full flex items-center my-2.5">
              <p>
                <span id="${uniqueId}-colorBox" class="inline-block align-middle mr-1.5"></span
                >${color} | Size : ${size}
              </p>
            </div>
            <div class="flex w-full items-center justify-between">
              <p class="text-xl font-bold" id="${uniqueId}-totalPrice">$${totalPrice}.00</p>
              <div id="${uniqueId}-counterBoxContainer" class="w-24 flex items-center bg-[#F3F3F3] text-center h-10 px-3 rounded-2xl">
              </div>
            </div>
          </div>
        </div>`
  target.innerHTML += shopping
  const colorBoxContainer = document.getElementById(`${uniqueId}-colorBox`)
  const counterBoxContainer = document.getElementById(`${uniqueId}-counterBoxContainer`)
  const colorBox = generateColorBox(bg, colorBoxContainer, color)
  const recycleIcon = document.getElementById(`${uniqueId}-recycleIcon`)
  const pricePerItem = totalPrice / count;
  colorBox.classList.remove("size-10")
  colorBox.classList.add("size-5")
  counterBox(count, counterBoxContainer, uniqueId, pricePerItem);
  document.addEventListener("click", (event) => {
    if (event.target.id.includes("-recycleIcon")) {
      const card = event.target.closest("[id$='-container']");
      if (card) card.remove();
    }
  });
  console.log(uniqueId);

}