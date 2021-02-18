import { authHelper } from "../auth/authHelper.js"
import { customerLogin } from "./CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".form__login")

let categories = []

export const LoginForm = () => {
  render()
}

const render = () => {
  if (!authHelper.isUserLoggedIn()) {
    contentTarget.innerHTML = `
      <h3>Login</h3>
      <p>Don't have an account? Click <a href="#" id="link__register">here</a> to register.</p>
      <form>
        <fieldset>
          <label for="login-email">Email: </label>
          <input type="text" id="login-email" name="login-email">
        </fieldset>
        <fieldset>
          <label for="login-password">Password: </label>
          <input type="password" id="login-password" name="login-password">
        </fieldset>
        <button id="customerLogin">Login</button>
      </form>
    `
  }
}

eventHub.addEventListener("click", e => {
  if (e.target.id === "customerLogin") {
    e.preventDefault()
    const loginEmail = document.querySelector(".login-email")
    const loginPassword = document.querySelector(".login-password")

    customerLogin(loginEmail, loginPassword)
      .then(user => {
        if (user) {
          contentTarget.innerHTML = ""

          authHelper.storeUserInSessionStorage(user.id)

          const customEvent = new CustomEvent("userLoggedIn")
          eventHub.dispatchEvent(customEvent)
        } else {
          alert("Invalid email and/or password. Please try again.")
        }
      })
  } else if (e.target.id === "link__register") {
    contentTarget.innerHTML = ""

    const customEvent = new CustomEvent("showRegisterForm")
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener("showLoginForm", LoginForm)
