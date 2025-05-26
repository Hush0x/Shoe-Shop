import { tokenName } from "./auth-token";
console.log(localStorage.getItem(tokenName));
if ((!localStorage.getItem(tokenName))) {
    location.href = "/login.html"
}