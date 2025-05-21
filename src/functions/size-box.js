export function generateSizeBox(size, target) {
    const sizeBox = document.createElement("div")
    sizeBox.className = `size-10 rounded-full border-2 border-[#717171] text-[#717171] font-large text-sm text-lg cursor-pointer flex items-center justify-center`
    const sizeContent = document.createElement("p")
    sizeContent.textContent = size
    sizeBox.appendChild(sizeContent)
    sizeBox.addEventListener("click", () => {
        const allBoxes = target.querySelectorAll("div")
        allBoxes.forEach(box => {
            box.classList.remove("active", "bg-black", "text-white")
            box.classList.add("border-2", "text-[#717171]")
        })
        sizeBox.classList.add("active", "bg-black", "text-white")
        sizeBox.classList.remove("border-2", "text-[#717171]")
        localStorage.setItem("size", size)
    })
    target.appendChild(sizeBox)
}