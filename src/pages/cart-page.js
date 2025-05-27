import { footerGenerator } from "../functions/footer";
import { shoesOrderCart } from "../functions/shoes-order";
import { generateAppButton } from '../../component/app-button';

const footerContainer = document.getElementById("footerContainer");
const totalPriceDisplay = document.getElementById("totalPrice");
const cartContainer = document.getElementById("productContainer");
const checkoutBtnContainer = document.getElementById("checkoutBtnContainer");
const mainContainer = document.getElementById("mainContainer");
const checkoutBtn = generateAppButton("Checkout -->");
const deleteBtn = document.createElement("img");
deleteBtn.src = "/svgs/product/recycle-bin.png";
deleteBtn.className = "size-6 cursor-pointer";
let products = JSON.parse(localStorage.getItem("products")) || [];
checkoutBtn.classList.remove("w-96");
checkoutBtn.classList.add("w-full");
checkoutBtnContainer.appendChild(checkoutBtn);
products.forEach(product => {
    shoesOrderCart(
        product.imgUrl,
        product.name,
        product.price,
        product.color,
        product.bg,
        product.size,
        product.count,
        cartContainer,
        deleteBtn
    );
});
checkoutBtn.addEventListener("click", (event) => {
    location.href = "order"
})
document.addEventListener("click", (event) => {
    if (event.target.id.includes("-recycleIcon")) {
        const card = event.target.closest("[id$='-container']");
        if (!card) return;
        const shadowDiv = document.createElement("div");
        shadowDiv.className = "absolute inset-0 bg-black opacity-30 z-40";
        const checkTask = document.createElement("div");
        checkTask.className = `
      w-full justify-center items-center bg-white absolute bottom-0 left-0 
      flex flex-col gap-5 px-6 py-4 z-50
    `;
        checkTask.innerHTML = `
      <div class="py-5 border-b-2 border-gray-200 flex items-center justify-center w-full">
        <p class="text-lg font-semibold">Remove From Cart?</p>
      </div>
      <div class="flex justify-center gap-4 font-semibold w-full py-3">
        <button id="cancelDelete" class="bg-gray-soft px-4 py-2 rounded-2xl w-1/2 h-16">Cancel</button>
        <button id="confirmDelete" class="bg-black text-white px-4 py-2 rounded-2xl w-1/2 h-16">Yes Remove</button>
      </div>
    `;
        mainContainer.appendChild(shadowDiv);
        mainContainer.appendChild(checkTask);
        const confirmBtn = checkTask.querySelector("#confirmDelete");
        const cancelBtn = checkTask.querySelector("#cancelDelete");
        confirmBtn.addEventListener("click", () => {
            card.remove();
            const cardId = card.id.replace("-container", "");
            const [name, size, color] = cardId.split("-");
            let products = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = products.filter(product =>
                !(product.name === name && product.size === size && product.color === color)
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            checkTask.remove();
            shadowDiv.remove();
            location.reload();
        });

        cancelBtn.addEventListener("click", () => {
            checkTask.remove();
            shadowDiv.remove();
        });
    }
});
footerGenerator(footerContainer);
