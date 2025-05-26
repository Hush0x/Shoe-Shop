export function showToast(message, validOrNot, duration = 3000) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "fixed top-5 right-5 px-5 py-3 text-white rounded-lg shadow-md z-50 font-semibold text-sm opacity-100"
    if (validOrNot === "valid") {
        toast.classList.add("bg-green-500")
    } else {
        toast.classList.add("bg-red-500")
    }
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove()
    }, duration);
}
