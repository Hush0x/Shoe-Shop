export function generateColorBox(color, target, colorName) {
    const colorBox = document.createElement("div")
    colorBox.className = `size-10 rounded-full ${color} flex items-center justify-center`
    colorBox.addEventListener("click", () => {
        colorBox.classList.add("active")
        colorBox.innerHTML = `<img src="/svgs/product/check.png" alt="checkIcon">`
    })
    if (color === "bg-white") {
        colorBox.classList.add("border-2")
    }
    colorBox.addEventListener("click", () => {
        const allBoxes = target.querySelectorAll("div")
        allBoxes.forEach(box => {
            box.innerHTML = ``
        })
        colorBox.innerHTML = `<img src="/svgs/product/check.png" alt="checkIcon" class="w-3/4">`
        localStorage.setItem("color", colorName)
        localStorage.setItem("background", color)
    })
    target.appendChild(colorBox)
    return colorBox

}