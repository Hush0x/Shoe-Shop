export function generateFilter(name, target) {
    const filterBtn = document.createElement("div")
    filterBtn.className = "w-fit px-5 h-10 flex items-center text-gray-800 bg-white rounded-3xl border-2 border-gray-800 font-semibold text-base m-2 whitespace-nowrap cursor-pointer"
    filterBtn.textContent = name
    filterBtn.id = `${name}-filter`
    if (name === "All") {
        filterBtn.classList.remove("text-gray-800", "bg-white")
        filterBtn.classList.add("bg-gray-800", "text-white")
    }
    filterBtn.addEventListener("click", () => {
        const allFilters = target.querySelectorAll("div")
        allFilters.forEach(box => {
            box.classList.add("text-gray-800", "bg-white")
            box.classList.remove("bg-gray-800", "text-white")
        })
        filterBtn.classList.remove("text-gray-800", "bg-white")
        filterBtn.classList.add("bg-gray-800", "text-white")
    })
    target.appendChild(filterBtn)
    return filterBtn
}