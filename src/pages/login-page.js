import { signPageGenerator } from '../functions/sign-page';
import { generateAppButton } from '../../component/app-button';
import { loginCheck } from '../../apis/auth';
import { tokenName } from '../../apis/auth-token';
import { showToast } from '../functions/show-toast';
const loginContainer = document.getElementById("loginContainer")
const SigninBtn = generateAppButton("Signin")
SigninBtn.type = "submit"
SigninBtn.classList.remove("bg-[#212529]", "cursor-pointer")
SigninBtn.classList.add("bg-[#6E7174]", "cursor-not-allowed")
SigninBtn.disabled = true
// generate pages
signPageGenerator("Login to Your Account", "Signup", "loginForm", loginContainer)
// elements
const goToSignup = document.getElementById("SignupBtn")
const loginForm = document.getElementById("loginForm")
const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const specialChar = /[@!$.*\-_/%^&#~]/;
const numbers = /[0-9]/;
const loginPasswordInput = document.getElementById("loginForm-password")
const loginUnInput = document.getElementById("loginForm-userName")
// forms append
loginForm.appendChild(SigninBtn)
// events
goToSignup.addEventListener("click", () => {
    loginForm.reset()
    window.location.href = "/signup.html";
})
// inputs
loginPasswordInput.addEventListener("input", () => {
    const passCheck = loginPasswordInput.value;
    if ((passCheck.length >= 8) &&
        (upperCase.test(passCheck)) &&
        (lowerCase.test(passCheck)) &&
        (specialChar.test(passCheck)) &&
        (numbers.test(passCheck))) {
        document.getElementById("loginForm-password-error").classList.add("invisible")
    }
    else {
        document.getElementById("loginForm-password-error").classList.remove("invisible")
    }
})
loginUnInput.addEventListener("input", () => {
    const unCheck = loginUnInput.value;
    if ((unCheck.length >= 5)) document.getElementById("loginForm-Un-error").classList.add("invisible")
    else document.getElementById("loginForm-Un-error").classList.remove("invisible")
})
//login form event
loginForm.addEventListener("input", () => {
    const passCheck = loginPasswordInput.value;
    const unCheck = loginUnInput.value;
    if (
        (passCheck.length >= 8) &&
        (upperCase.test(passCheck)) &&
        (lowerCase.test(passCheck)) &&
        (specialChar.test(passCheck)) &&
        (unCheck.length >= 5) &&
        (numbers.test(passCheck))
    ) {
        SigninBtn.classList.add("bg-[#212529]", "cursor-pointer")
        SigninBtn.classList.remove("bg-[#6E7174]", "cursor-not-allowed")
        SigninBtn.disabled = false
    } else {
        SigninBtn.classList.remove("bg-[#212529]", "cursor-pointer");
        SigninBtn.classList.add("bg-[#6E7174]", "cursor-not-allowed");
        SigninBtn.disabled = true;
    }
})
loginForm.addEventListener("submit", async (event) => {
    const passCheck = loginPasswordInput.value;
    const unCheck = loginUnInput.value;
    const data = { username: unCheck, password: passCheck };
    localStorage.setItem("username", data.username)
    event.preventDefault();
    try {
        const res = await loginCheck(data)
        localStorage.setItem(tokenName, res.data.token)
        loginForm.reset()
        showToast(`Welcome back, ${data.username}!`, "valid")
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1500);
    }
    catch (error) {
        console.log(error);
        showToast(`your account does not found!`, "invalid")
    }
});
