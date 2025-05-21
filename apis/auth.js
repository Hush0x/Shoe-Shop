import { generateHttpClient } from "./client";
import { urls } from "./urls";
export function loginCheck(body) {
    const response = generateHttpClient().post(urls.auth.login, body)
    return (response)
}
export function signupAccount(body) {
    const response = generateHttpClient().post(urls.auth.signup, body)
    return (response)
}
export function getShoes(query) {
    const response = generateHttpClient().get(urls.allShoes.shoes + query)
    return (response)
}
export function getShoesFilter() {
    const response = generateHttpClient().get(urls.allShoes.brands)
    return (response)
}
export function getProduct(productId) {
    const response = generateHttpClient().get(`${urls.allShoes.product}/${productId}`)
    return response;
}
