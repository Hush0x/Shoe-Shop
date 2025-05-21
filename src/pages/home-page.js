import { getGreeting } from '../functions/greeting';
import { footerGenerator } from '../functions/footer';
import { getShoes, getShoesFilter } from '../../apis/auth';
import { generateFilter } from '../../component/filter-button';
import { loadProducts } from '../functions/load-product';
// elements
let page = 1
const limit = 10
let totalPage = 0
const greetingContainer = document.getElementById("greeting")
const greetingValue = getGreeting()
const filterContainer = document.getElementById("filterContainer")
const notificationContainer = document.getElementById("notifContainer")
const footerContainer = document.getElementById("footerContainer")
const productContainer = document.getElementById("productContainer")
const userName = document.createElement("p")
const logOut = document.createElement("a")
logOut.href = "/login.html"
logOut.className = "cursor-pointer"
logOut.textContent = "Logout"
logOut.addEventListener("click", () => {
  localStorage.clear()
});
userName.textContent = localStorage.getItem("username")
// generate footer
footerGenerator(footerContainer)
// greeting
greetingContainer.innerText = greetingValue
greetingContainer.appendChild(logOut)
notificationContainer.appendChild(userName)
// filter
const filterAll = generateFilter("All", filterContainer)
filterAll.addEventListener("click", () => {
  productContainer.querySelectorAll("div").forEach(div => {
    div.classList.remove("hidden");
  })
})
const { data: filterResponse } = await getShoesFilter()
filterResponse.forEach((item) => {
  const x = generateFilter(item, filterContainer);
  x.addEventListener("click", () => {
    const products = Array.from(productContainer.children)
    let result = products.filter((element) => element.getAttribute("brand") === item);
    productContainer.querySelectorAll(".card").forEach(div => {
      div.classList.add("hidden");
    });
    products
      .filter(p => p.getAttribute("brand") === item)
      .forEach(p => p.classList.remove("hidden"));
  });
});
// shoes
let shoesResponse = await getShoes(`?page=${page}&limit=${limit}`);
totalPage = shoesResponse.data.totalPages;
console.log(totalPage);
shoesResponse.data.data.forEach(item => {
  loadProducts(productContainer, item);
});
productContainer.addEventListener("scroll", async () => {
  if (window.scrollY + window.innerHeight + 300 >= document.documentElement.scrollHeight && page < totalPage) {
    page++;
    const newShoes = await getShoes(`?page=${page}&limit=${limit}`);
    newShoes.data.data.forEach(item => {
      loadProducts(productContainer, item);
    });
  }
});
// 
