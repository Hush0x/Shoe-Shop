import { headBackArrow } from '../../component/header-back-arrow';
export function signPageGenerator(labelText, btnText, formId, page) {
  const signPage = `<div class="w-full flex items-center h-14" id="${formId}-header"></div>
        <img src="/svgs/logo/loginLogo.svg" alt="app logo" class="w-14 m-20" />
        <h2 class="font-semibold text-3xl my-12">${labelText}</h2>
        <form class="w-full flex flex-col items-center grow" id=${formId}>
          <div class="w-full flex flex-col items-center grow">
            <div
              class="bg-gray-50	 flex items-center gap-1 h-9 w-full rounded-b-sm relative"
              id ="${formId}-userNameContainer"
            >
              <img
                src="/svgs/input/email.svg"
                alt="email logo"
                class="w-4 h-4 absolute left-2"
                id="${formId}-emailLogo"
              />
              <input
                type="text"
                name="Username"
                id="${formId}-userName"
                placeholder="Username"
                class="w-full font-normal text-sm h-full pl-7"
              />
            </div>
            <div class="text-left w-full">
            <p class="text-red-500 text-xs invisible" id="${formId}-Un-error">Your username must be at least 8 characters long!</p>
            </div>
            <div
              class="bg-gray-50	 flex items-center h-9 w-full rounded-b-sm mt-2.5 relative"
              id="${formId}-passwordContainer"
            >
              <img
                src="/svgs/input/password.svg"
                alt="password"
                class="w-4 absolute left-2"
                id="${formId}-passwordLogo"
              />
              <input
                type="password"
                name="password"
                id="${formId}-password"
                maxlength="20"
                placeholder="Password"
                class="w-full font-normal text-sm h-full pl-7"
              />
              <img
                src="/svgs/input/hidden.svg"
                alt="hidden password"
                class="w-4 cursor-pointer absolute right-2"
                id="${formId}-eyeLogo"
              />
            </div>
            <div class="text-left w-full">
            <p class="text-red-500 text-xs invisible" id="${formId}-password-error">Password must be stronger. Use 8+ characters with upper/lowercase, number & symbol!
            </p>
            </div>
            <button type="button" class="font-medium text-sm cursor-pointer" id="${btnText}Btn">${btnText}</button>
          </div>
        </form>`
  page.innerHTML = signPage
  const header = document.getElementById(`${formId}-header`);
  headBackArrow(header, "/welcome.html")
  const eyeLogo = document.getElementById(`${formId}-eyeLogo`)
  const password = document.getElementById(`${formId}-password`);
  document.getElementById(`${formId}-userNameContainer`).addEventListener("focusin", () => {
    document.getElementById(`${formId}-emailLogo`).src = "/svgs/input/focusedEmail.svg"
  })
  document.getElementById(`${formId}-passwordContainer`).addEventListener("focusin", () => {
    document.getElementById(`${formId}-passwordLogo`).src = "/svgs/input/focusedPassword.svg"
    if (password.type === "password") {
      eyeLogo.src = "/svgs/input/focusedHidden.svg"
    } else {
      eyeLogo.src = "/svgs/input/showPassword.svg";
    }
  })
  document.getElementById(`${formId}-eyeLogo`).addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      eyeLogo.src = "/svgs/input/showPassword.svg";
    } else {
      password.type = "password";
      eyeLogo.src = "/svgs/input/focusedHidden.svg";
    }
  });
}

