import { generateAppButton } from "../../component/app-button";
import { cartIconBorderWhite } from "../../component/images";

export function ProductCounterBox(target, total, totalContainer, btnContainer, btnText) {
    let numb = 0;
    const unitPrice = total;
    const counterBoxHtml = `
        <img src="/svgs/product/minus.png" alt="minus" class="size-5 cursor-pointer" id="minusIcon" />
        <p class="grow " id="productCount">${numb}</p>
        <img src="/svgs/product/add.png" alt="addIcon" class="size-5 cursor-pointer" id="addIcon"/>
    `;
    target.innerHTML = counterBoxHtml;
    totalContainer.textContent = unitPrice;
    const addBtn = document.getElementById("addIcon");
    const minusBtn = document.getElementById("minusIcon");
    const countDisplay = document.getElementById("productCount");
    const addToCartBtn = generateAppButton(btnText);
    addToCartBtn.innerHTML += `<img src="${cartIconBorderWhite.src}" alt="minus" class="size-5 minus-icon" id="minusIcon" />`
    addToCartBtn.type = "submit"
    addToCartBtn.classList.remove("w-96", "my-8", "bg-[#212529]", "cursor-pointer");
    addToCartBtn.classList.add("grow", "flex-row-reverse", "gap-5", "my-auto", "bg-[#6E7174]", "cursor-not-allowed");
    addToCartBtn.disabled = true;
    btnContainer.appendChild(addToCartBtn);
    function updateUI() {
        const newTotal = numb === 0 ? unitPrice : unitPrice * numb;
        countDisplay.textContent = numb;
        totalContainer.textContent = newTotal;
        addToCartBtn.disabled = numb === 0;
        localStorage.setItem("total-price", newTotal);
        if (numb === 0) {
            addToCartBtn.classList.remove("bg-[#212529]", "cursor-pointer");
            addToCartBtn.classList.add("bg-[#6E7174]", "cursor-not-allowed");
        } else {
            addToCartBtn.classList.remove("bg-[#6E7174]", "cursor-not-allowed");
            addToCartBtn.classList.add("bg-[#212529]", "cursor-pointer");
        }
        localStorage.setItem("count", numb)
    }
    addBtn.addEventListener("click", () => {
        numb++;
        updateUI();
    });
    minusBtn.addEventListener("click", () => {
        if (numb > 0) {
            numb--;
            updateUI();
        }
    });
    return {
        resetCounter: () => {
            numb = 0;
            updateUI();
        },
        getCount: () => numb
    }
}
