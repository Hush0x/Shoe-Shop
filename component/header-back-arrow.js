export function headBackArrow(container, backTo) {
  const arrowContainer = `
<button class="cursor-pointer" id="arrowBtn">
        <img src="/svgs/backArrow/backArrow.svg" alt="backArrow" class="w-4" />
          </button>
      `
  container.innerHTML = arrowContainer
  document.getElementById("arrowBtn").addEventListener("click", () => {
    window.location.href = backTo;
  })
}
