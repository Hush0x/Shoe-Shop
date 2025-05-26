export function searchHistoryGenerator(lastSearch, target, takeRecentSearch) {
    const container = document.createElement("div")
    container.className = "w-full h-fit flex text-base font-medium py-2 text-[#7F7F7F] items-center justify-between cursor-pointer"
    container.id = `${lastSearch}-container`
    container.innerHTML = `
        <p id="${lastSearch}-text">${lastSearch}</p>
        <img src="/svgs/input/delete.png" alt="deleteIcon" class="size-7 cursor-pointer" id="${lastSearch}-deleteIcon"/>
      `
    target.appendChild(container)
    let search
    const deleteIcon = container.querySelector(`#${lastSearch}-deleteIcon`)
    const recentSearch = container.querySelector(`#${lastSearch}-text`)
    deleteIcon.addEventListener("click", (event) => {
        const storedHistory = JSON.parse(localStorage.getItem("search-history")) || []
        const updatedHistory = storedHistory.filter(item => item !== lastSearch)
        localStorage.setItem("search-history", JSON.stringify(updatedHistory))
        container.remove();
    });
    recentSearch.addEventListener("click", () => {
        search = lastSearch
        console.log(search);
        takeRecentSearch(search)
    })
}