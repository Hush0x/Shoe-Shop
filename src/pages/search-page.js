import { getShoes } from "../../apis/auth"
import { addToWishlistIcon } from "../../component/images"
import { loadProducts } from "../functions/load-product"
import { searchHistoryGenerator } from "../functions/search-history"
const searchInput = document.getElementById("searchInput")
const searchText = document.getElementById("searchText")
const foundCounts = document.getElementById("foundCounts")
const productContainer = document.getElementById("productContainer")
const searchForm = document.getElementById("searchForm")
const searchHistoryContainer = document.getElementById("searchHistoryContainer")
const clearBtn = document.getElementById("clearBtn")
const recentSearchContainer = document.getElementById("recentSearchContainer")
const searchResultContainer = document.getElementById("searchResultContainer")
const notFoundContainer = document.getElementById("notFoundContainer")
const savedHistory = JSON.parse(localStorage.getItem("search-history") || "[]");
const limit = 10
let totalPage = 5
let searchHistory = [...savedHistory]
let count = 0
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("search-history")
    searchHistory = []
    recentSearchContainer.innerHTML = ""
})
searchInput.addEventListener("click", () => {
    recentSearchContainer.innerHTML = "";
    searchHistory.forEach(item => {
        searchHistoryGenerator(item, recentSearchContainer, takeRecentSearch)
    })
    searchHistoryContainer.classList.remove("hidden")
    searchResultContainer.classList.add("hidden")
    productContainer.classList.add("hidden")
})
searchForm.addEventListener("submit", async (event) => {
    count = 0
    searchHistoryContainer.classList.add("hidden")
    searchResultContainer.classList.remove("hidden")
    productContainer.classList.remove("hidden")
    notFoundContainer.classList.add("hidden")
    productContainer.innerHTML = ""
    event.preventDefault()
    const text = searchInput.value
    searchText.textContent = text
    if (searchHistory.length < 10) {
        searchHistory.unshift(searchInput.value)
    }
    else {
        searchHistory.pop();
        searchHistory.unshift(searchInput.value)
    }
    searchForm.reset()
    for (let i = 1; i <= totalPage; i++) {
        const searchResponse = await getShoes(`?page=${i}&limit=${limit}&search=${text}`)
        try {
            if ((searchResponse.data.data).length > 0) {
                (searchResponse.data.data).forEach(item => {
                    loadProducts(productContainer, item)
                    count++
                });
                foundCounts.textContent = count
            }
        } catch (error) {
            console.log(error);
        }
        if (count == 0) {
            foundCounts.textContent = count
            notFoundContainer.classList.remove("hidden")
            productContainer.classList.add("hidden")
        }

    }
    localStorage.setItem("search-history", JSON.stringify(searchHistory))

    recentSearchContainer.innerHTML = ""
    searchHistory.forEach(item => {
        searchHistoryGenerator(item, recentSearchContainer, takeRecentSearch)
    })
})
function takeRecentSearch(search) {
    searchInput.value = search
}