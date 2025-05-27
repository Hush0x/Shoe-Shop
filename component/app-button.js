export function generateAppButton(btnText) {
    const slideBtn = document.createElement("button")
    slideBtn.className = " bg-gray-900 w-96 h-[46px] rounded-4xl text-white my-8 cursor-pointer flex items-center justify-center"
    slideBtn.textContent = btnText
    return slideBtn;
}