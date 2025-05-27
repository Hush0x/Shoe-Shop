import { generateAppButton } from '../../component/app-button';
import { slide1Image, slide2Image, slide3Image, slider1, slider2, slider3 } from '../../component/images';
// container 
const slideshow = document.getElementById("slideshow")
// function
function slidePageGenerator(imageSrc, slideTextContent, page, btn, slider) {
    const slidePage = document.createElement("section")
    slidePage.className = "w-full h-full flex flex-col slide"
    // svg
    slidePage.appendChild(imageSrc);
    // slide container
    const slideContainer = document.createElement("div")
    slideContainer.className = "flex flex-col items-center text-center justify-between mt-8 grow px-6"
    // slide text
    const slideText = document.createElement("p")
    slideText.className = "font-semibold text-3xl"
    slideText.textContent = slideTextContent
    slideContainer.appendChild(slideText)
    // slider container
    const sliderContainer = document.createElement("div")
    slider.className = "w-24 h-6 mx-auto"
    sliderContainer.appendChild(slider)
    // button
    sliderContainer.appendChild(btn)
    // append
    slideContainer.appendChild(sliderContainer)
    slidePage.appendChild(slideContainer)
    page.appendChild(slidePage);
    return slidePage
}
// slideshow btn
const slide1btn = generateAppButton("Next")
const slide2btn = generateAppButton("Next")
const slide3btn = generateAppButton("Get Started")
// slideshow slides
const slide1 = slidePageGenerator(slide1Image, "We provide high quality products just for you", slideshow, slide1btn, slider1)
slidePageGenerator(slide2Image, "We provide high quality products just for you", slideshow, slide2btn, slider2)
slidePageGenerator(slide3Image, "We provide high quality products just for you", slideshow, slide3btn, slider3)
let currentStep = 0
// func
function updateUI() {
    slideshow.style.transform = `translateX(-${currentStep * 100}%)`;
}
slide1btn.addEventListener("click", function () {
    if (currentStep < 3) {
        currentStep++;
        updateUI();
    }
});
slide2btn.addEventListener("click", function () {
    if (currentStep < 3) {
        currentStep++;
        updateUI();
    }
});
// 
slide3btn.addEventListener("click", () => {
    window.location.href = "/login.html";
})