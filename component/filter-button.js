export function generateFilter(name, target) {
    const filterBtn = document.createElement("div")
    filterBtn.className = "w-fit px-5 h-10 flex items-center text-[#343A40] bg-white rounded-3xl border-2 border-[#343A40] font-semibold text-base m-2 whitespace-nowrap cursor-pointer"
    filterBtn.textContent = name
    filterBtn.id = `${name}-filter`
    if (name === "All") {
        filterBtn.classList.remove("text-[#343A40]", "bg-white")
        filterBtn.classList.add("bg-[#343A40]", "text-white")
    }
    filterBtn.addEventListener("click", () => {
        const allFilters = target.querySelectorAll("div")
        allFilters.forEach(box => {
            box.classList.add("text-[#343A40]", "bg-white")
            box.classList.remove("bg-[#343A40]", "text-white")
        })
        filterBtn.classList.remove("text-[#343A40]", "bg-white")
        filterBtn.classList.add("bg-[#343A40]", "text-white")
    })
    target.appendChild(filterBtn)
    return filterBtn
}