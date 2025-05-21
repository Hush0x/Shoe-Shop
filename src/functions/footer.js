import { cartIcon, fillCartIcon, fillHomeIcon, homeIcon, orderIcon, profileIcon, walletIcon } from "../../component/images";

export function footerGenerator(target) {
    const icons = [
        {
            image: fillHomeIcon,
            name: "Home",
            imageFill: homeIcon,
            url: `/home.html`
        }, {
            image: cartIcon,
            name: "Cart",
            imageFill: fillCartIcon,
            url: `/cart.html`
        }, {
            image: orderIcon,
            name: "Order",
            imageFill: 0,
            url: `/order.html`
        }, {
            image: walletIcon,
            name: "Wallet",
            imageFill: 0,
            url: `/wallet.html`
        }, {
            image: profileIcon,
            name: "Profile",
            imageFill: 0,
            url: `/profile.html`
        }
    ];
    // Clear target
    target.innerHTML = '';
    icons.forEach((icon, index) => {
        const container = document.createElement('div');
        container.className = "w-7 p-1 flex flex-col items-center cursor-pointer";
        container.id = `icon-container-${index + 1}`;
        const iconName = document.createElement("p")
        iconName.className = "font-semibold text-xs"
        iconName.textContent = icon.name
        container.addEventListener("click", () => {
        })
        container.appendChild(icon.image);
        container.appendChild(iconName);
        target.appendChild(container);
        container.addEventListener("click", () => {
            window.location.href = icon.url
        })
    });
}