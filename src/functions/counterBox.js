import { updateTotalPriceDisplay } from "./update-total";

const counters = {};

export function counterBox(numb, target, uniqueId, pricePerItem) {
    if (counters[uniqueId]) {
        counters[uniqueId].updateCount(numb);
        return counters[uniqueId];
    }
    const savedCount = parseInt(localStorage.getItem(`${uniqueId}-count`), 10);
    let count = !isNaN(savedCount) ? savedCount : numb;
    let elements = {};

    function init() {
        target.innerHTML = `
            <img src="/svgs/product/minus.png" alt="minus" class="size-5 cursor-pointer" id="${uniqueId}-minusIcon" />
            <p class="grow font-semibold" id="${uniqueId}-productCount">${count}</p>
            <img src="/svgs/product/add.png" alt="addIcon" class="size-5 cursor-pointer" id="${uniqueId}-addIcon" />
        `;

        elements = {
            addBtn: document.getElementById(`${uniqueId}-addIcon`),
            minusBtn: document.getElementById(`${uniqueId}-minusIcon`),
            countDisplay: document.getElementById(`${uniqueId}-productCount`),
            totalPrice: document.getElementById(`${uniqueId}-totalPrice`),
        };

        elements.addBtn.addEventListener("click", () => {
            count++;
            updateUI();
        });

        elements.minusBtn.addEventListener("click", () => {
            if (count > 0) {
                count--;
                updateUI();
            }
        });

        updateUI();
    }

    function updateUI() {
        if (!elements.countDisplay || !target.isConnected) return;
        elements.countDisplay.textContent = count;
        localStorage.setItem(`${uniqueId}-count`, count);
        if (elements.totalPrice) {
            const newTotal = count * pricePerItem;
            elements.totalPrice.textContent = `$${newTotal}.00`;
            localStorage.setItem(`${uniqueId}-total-price-in-order`, newTotal);
            updateTotalPriceDisplay();
        }
    }
    init();

    const counter = {
        updateCount: (newCount) => {
            count = newCount;
            updateUI();
        }
    };

    counters[uniqueId] = counter;
    return counter;
}
