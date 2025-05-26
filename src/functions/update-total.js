export function updateTotalPriceDisplay() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.endsWith("-total-price-in-order")) {
            const value = Number(localStorage.getItem(key));
            total += value;
        }
    }
    const display = document.getElementById("totalPrice");
    display.textContent = `${total}`;
    console.log(total);
}