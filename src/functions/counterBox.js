export function counterBox(numb, target, uniqueId, pricePerItem) {
    const counterBox = `
        <img src="/svgs/product/minus.png" alt="minus" class="size-5 cursor-pointer" id="${uniqueId}-minusIcon" />
        <p class="grow font-semibold" id="${uniqueId}-productCount">${numb}</p>
        <img src="/svgs/product/add.png" alt="addIcon" class="size-5 cursor-pointer" id="${uniqueId}-addIcon" />
    `;
    target.innerHTML = counterBox;
    const addBtn = document.getElementById(`${uniqueId}-addIcon`);
    const minusBtn = document.getElementById(`${uniqueId}-minusIcon`);
    const countDisplay = document.getElementById(`${uniqueId}-productCount`);
    const totalPrice = document.getElementById(`${uniqueId}-totalPrice`);
    function updateUI() {
        countDisplay.textContent = numb;
        if (totalPrice) {
            let newTotal = numb * pricePerItem;
            totalPrice.textContent = `$${newTotal}.00`;
            localStorage.setItem("total-price-in-order", newTotal)
        }
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
    updateUI();
}
