import { footerGenerator } from "../functions/footer";
import { shoesOrderCart } from "../functions/shoes-order";
const footerContainer = document.getElementById("footerContainer")

const cartContainer = document.getElementById("productContainer");
const products = JSON.parse(localStorage.getItem("products")) || [];
let totalPrice = 0
products.forEach(product => {
    shoesOrderCart(
        product.imgUrl,
        product.name,
        product.price,
        product.color,
        product.bg,
        product.size,
        product.count,
        cartContainer
    );
    totalPrice += Number(product.price)
    console.log(totalPrice);
});
function renderCart() {
    cartContainer.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let totalPrice = 0;

    products.forEach(product => {
        shoesOrderCart(
            product.imgUrl,
            product.name,
            product.price,
            product.color,
            product.bg,
            product.size,
            product.count,
            cartContainer
        );
        totalPrice += Number(product.price);
    });

    footerGenerator(footerContainer, totalPrice); // اگر فوتر نیاز به قیمت داره
}

footerGenerator(footerContainer)
