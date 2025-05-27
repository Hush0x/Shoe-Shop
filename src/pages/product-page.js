import { getProduct } from "../../apis/auth"
import { headBackArrow } from "../../component/header-back-arrow"
import { generateColorBox } from "../functions/color-box"
import { ProductCounterBox } from "../functions/product-counter"
import { showToast } from "../functions/show-toast"
import { generateSizeBox } from "../functions/size-box"
// 
const headerContainer = document.getElementById("headerContainer")
const imageContainer = document.getElementById("imageContainer")
const productName = document.getElementById("productName")
const viewMore = document.getElementById("viewMore")
const viewLess = document.getElementById("viewLess")
const sizeBoxes = document.getElementById("sizeBoxes")
const colorBoxes = document.getElementById("colorBoxes")
const totalPrice = document.getElementById("totalPrice")
const pricingForm = document.getElementById("pricingForm")
const likeIcon = document.getElementById("likeIconProduct")
const counterBoxContainer = document.getElementById("counterBox")
const addToCart = document.getElementById("addToCart")
headBackArrow(headerContainer, "/home.html")
const productId = localStorage.getItem("uid")
getProduct(productId)
let shoesResponse = await getProduct(productId);
productName.textContent = shoesResponse.data.name

viewMore.addEventListener("click", () => {
    viewMore.classList.add("hidden")
    document.getElementById("moreText").classList.remove("hidden")
    viewLess.classList.remove("hidden")
})
viewLess.addEventListener("click", () => {
    viewLess.classList.add("hidden")
    viewMore.classList.remove("hidden")
    document.getElementById("moreText").classList.add("hidden")
})
const sizes = (shoesResponse.data.sizes).split("|")
console.log(sizes);
sizes.forEach(size => {
    generateSizeBox(size, sizeBoxes)
});
const colors = (shoesResponse.data.colors).split("|")
console.log(colors);
const colorMap = {
    black: "bg-black",
    white: "bg-white",
    red: "bg-red-500",
    blue: "bg-blue-500",
    brown: "bg-brown-coffee"
};
colors.forEach(colorName => {
    const hex = colorMap[colorName];
    generateColorBox(hex, colorBoxes, colorName)

});
const productImage = document.createElement("img")
productImage.src = shoesResponse.data.imageURL
console.log(productImage);
imageContainer.appendChild(productImage)
console.log(totalPrice);
const counterControl = ProductCounterBox(counterBoxContainer, shoesResponse.data.price, totalPrice, addToCart, `Add to cart`);

pricingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedSize = localStorage.getItem("size");
    const selectedColor = localStorage.getItem("color");
    if (!selectedSize || !selectedColor) {
        showToast("you should choose size and color!", "invalid");
        return;
    }
    showToast("product added to your Cart page :)", "valid")
    sizeBoxes.innerHTML = "";
    colorBoxes.innerHTML = "";
    sizes.forEach(size => generateSizeBox(size, sizeBoxes));
    colors.forEach(colorName => generateColorBox(colorMap[colorName], colorBoxes, colorName));
    const newProduct = {
        imgUrl: shoesResponse.data.imageURL,
        name: shoesResponse.data.name,
        price: localStorage.getItem("total-price"),
        color: localStorage.getItem("color"),
        bg: localStorage.getItem("background"),
        size: localStorage.getItem("size"),
        count: localStorage.getItem("count")
    };
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    counterControl.resetCounter();
    totalPrice.innerHTML = shoesResponse.data.price;
});

likeIcon.addEventListener("click", () => {
    if (likeIcon.classList.contains("notActive")) {
        likeIcon.classList.remove("notActive");
        likeIcon.src = "/svgs/product/likeFill.svg";
        showToast("Product added to your wishlist :)", "valid")
    } else {
        likeIcon.classList.add("notActive");
        likeIcon.src = "/svgs/product/like.svg";
        showToast("Product removed from your wishlist :(", "invalid")
    }
});