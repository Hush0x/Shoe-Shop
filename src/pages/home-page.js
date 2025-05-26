import { getGreeting } from '../functions/greeting';
import { footerGenerator } from '../functions/footer';
import { getShoes, getShoesFilter } from '../../apis/auth';
import { generateFilter } from '../../component/filter-button';
import { loadProducts } from '../functions/load-product';
// elements
let page = 1
const limit = 10
let totalPage = 5
const greetingContainer = document.getElementById("greeting")
const greetingValue = getGreeting()
const filterContainer = document.getElementById("filterContainer")
const searchInput = document.getElementById("searchInput")
const notificationContainer = document.getElementById("notifContainer")
const footerContainer = document.getElementById("footerContainer")
const productContainer = document.getElementById("productContainer")
const userName = document.createElement("p")
let isInfiniteScrollActive = true;
// logout
const logOut = document.createElement("p")
logOut.className = "cursor-pointer"
logOut.textContent = "Logout"
logOut.addEventListener("click", () => {
  localStorage.clear()
  location.reload();
});
userName.textContent = localStorage.getItem("username")
// generate footer
footerGenerator(footerContainer)
// greeting
greetingContainer.innerText = greetingValue
greetingContainer.appendChild(logOut)
notificationContainer.appendChild(userName)
// shoes
let shoesResponse = await getShoes(`?page=${page}&limit=${limit}`);
totalPage = shoesResponse.data.totalPages;
shoesResponse.data.data.forEach(item => {
  loadProducts(productContainer, item);
});

// filter all
const filterAll = generateFilter("All", filterContainer)
filterAll.addEventListener("click", async () => {
  isInfiniteScrollActive = true;
  productContainer.innerHTML = ""
  shoesResponse.data.data.forEach(item => {
    loadProducts(productContainer, item);
  });
})
// filter shoes
const { data: filterResponse } = await getShoesFilter()
filterResponse.forEach((item) => {
  const brand = item
  const filterBtn = generateFilter(item, filterContainer);
  filterBtn.addEventListener("click", async () => {
    isInfiniteScrollActive = false;
    productContainer.innerHTML = "";
    for (let i = 1; i <= totalPage; i++) {
      let brandResponse = await getShoes(`?page=${i}&limit=${limit}`);
      const filter = brandResponse.data.data
      const brandFilter = filter.filter(x => x.brand === brand);
      console.log(i);
      console.log(brandFilter);
      brandFilter.forEach(product => {
        loadProducts(productContainer, product);
      });
    }
  });
});
productContainer.addEventListener("scroll", async () => {
  if (!isInfiniteScrollActive) return;
  if (productContainer.scrollTop + productContainer.clientHeight >= productContainer.scrollHeight - 200 && page < totalPage) {
    page++;
    const newShoes = await getShoes(`?page=${page}&limit=${limit}`);
    newShoes.data.data.forEach(item => {
      loadProducts(productContainer, item);
    });
  }
});
// search
searchInput.addEventListener("focusin", () => {
  location.href = `/search`
})
