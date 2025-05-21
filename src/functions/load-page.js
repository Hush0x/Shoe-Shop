export function loadPage(target) {
    const load = setTimeout(() => {
        window.location.href = target;
    }, 3000)
}