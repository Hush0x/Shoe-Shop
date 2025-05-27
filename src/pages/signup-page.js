import { signPageGenerator } from '../functions/sign-page';
import { generateAppButton } from '../../component/app-button';
import { signupAccount } from '../../apis/auth';
import { tokenName } from '../../apis/auth-token';
const signupContainer = document.getElementById("signupContainer")
const signupBtn = generateAppButton("Signup")
signupBtn.type = "submit"
signupBtn.classList.remove("bg-gray-900", "cursor-pointer")
signupBtn.classList.add("bg-gray-steel", "cursor-not-allowed")
signupBtn.disabled = true
signupBtn.classList.remove("bg-gray-900")
signupBtn.classList.add("bg-gray-steel")
signupBtn.disabled = true
signPageGenerator("Signup to Your Account", "login", "signUpForm", signupContainer)
const goToLogin = document.getElementById("loginBtn")
const signupForm = document.getElementById("signUpForm")
const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const specialChar = /[@!$.*\-_/%^&#~]/;
const numbers = /[0-9]/;
const signupPasswordInput = document.getElementById("signUpForm-password")
const signupFormUnInput = document.getElementById("signUpForm-userName")
signupForm.appendChild(signupBtn)
goToLogin.addEventListener("click", () => {
    signupForm.reset()
    window.location.href = "/login.html";
})
signupPasswordInput.addEventListener("input", () => {
    const passCheck = signupPasswordInput.value;
    if ((passCheck.length >= 8) &&
        (upperCase.test(passCheck)) &&
        (lowerCase.test(passCheck)) &&
        (specialChar.test(passCheck)) &&
        (numbers.test(passCheck))) {
        document.getElementById("signUpForm-password-error").classList.add("invisible")
    }
    else {
        document.getElementById("signUpForm-password-error").classList.remove("invisible")
    }
})
signupFormUnInput.addEventListener("input", () => {
    const unCheck = signupFormUnInput.value;
    if ((unCheck.length >= 5)) document.getElementById("signUpForm-Un-error").classList.add("invisible")
    else document.getElementById("signUpForm-Un-error").classList.remove("invisible")
})


signupForm.addEventListener("input", () => {
    const passCheck = signupPasswordInput.value;
    const unCheck = signupFormUnInput.value;
    if (
        (passCheck.length >= 8) &&
        (upperCase.test(passCheck)) &&
        (lowerCase.test(passCheck)) &&
        (specialChar.test(passCheck)) &&
        (unCheck.length >= 5) &&
        (numbers.test(passCheck))
    ) {
        signupBtn.classList.add("bg-gray-900", "cursor-pointer")
        signupBtn.classList.remove("bg-gray-steel", "cursor-not-allowed")
        signupBtn.disabled = false
    } else {
        signupBtn.classList.remove("bg-gray-900", "cursor-pointer");
        signupBtn.classList.add("bg-gray-steel", "cursor-not-allowed");
        signupBtn.disabled = true;
    }
})
signupForm.addEventListener("submit", async (event) => {
    const passCheck = signupPasswordInput.value;
    const unCheck = signupFormUnInput.value;
    const data = { username: unCheck, password: passCheck };
    localStorage.setItem("username", data.username)

    event.preventDefault();
    try {
        const res = await signupAccount(data)
        localStorage.setItem(tokenName, res.data.token)
        showToast(`Welcome , ${data.username}!`, "valid")
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1500);
        signupForm.reset()
    }
    catch (error) {
        console.log(error);
        showToast(`This account is already exist`, "invalid")
    }
});
