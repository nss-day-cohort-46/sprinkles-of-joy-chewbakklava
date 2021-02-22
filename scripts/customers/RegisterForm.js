import { authHelper } from "../auth/authHelper.js"
import { customerLogin, getCustomers, saveCustomer, useCustomers } from "./CustomerProvider.js"
import { pattern } from "../contact/ContactForm.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".form__register")

let categories = []

export const RegisterForm = () => {
  render()
}

const render = () => {
  if (!authHelper.isUserLoggedIn()) {
    contentTarget.innerHTML = `
      <h3>Register for a customer account</h3>
      <p>Already have an account? Login <a href="#" id="link__login">here</a>.</p>
      <form>
        <fieldset>
        <label for="register-firstName">First: </label>
        <input type="text" id="register-firstName" name="register-firstName">
        </fieldset>
        <fieldset>
        <label for="register-lastName">Last: </label>
        <input type="text" id="register-lastName" name="register-lastName">
        </fieldset>
        <fieldset>
        <label for="register-email">Email: </label>
        <input type="text" id="register-email" name="register-email">
        </fieldset>
        <fieldset>
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="register-password">
        </fieldset>
        <fieldset>
        <input type="checkbox" id="register-rewards" name="register-rewards">
        <label for="register-rewards">Yes, I would like to join the rewards program. </label>
        </fieldset>
        <button id="customerRegisterSubmit">Register</button>
        <p class="alreadyRegistered"></p>
      </form>
    `
  }
}

eventHub.addEventListener("showRegisterForm", RegisterForm)

eventHub.addEventListener("click", evt => {
  if (evt.target.id === "link__login") {
    contentTarget.innerHTML = ""

    const customEvent = new CustomEvent("showLoginForm")
    eventHub.dispatchEvent(customEvent)
  }
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "customerRegisterSubmit") {
    event.preventDefault()
    const firstName = document.querySelector("#register-firstName").value
    const lastName = document.querySelector("#register-lastName").value
    const checked = document.querySelector("#register-rewards").checked
    const email = document.querySelector("#register-email").value
    const password = document.querySelector("#register-password").value

    if (pattern.test(email) && firstName !== "" && lastName !== "" && password !== "") {
      
      getCustomers()
      .then(() => {
        const customerList = useCustomers()

        const matchingCustomer = customerList.filter(customer => customer.email === email)

        if (matchingCustomer.length === 0) {
          const newCustomer = {
            name: `${firstName} ${lastName}`,
            rewardsMember: checked,
            email: email,
            password: password
          }

          saveCustomer(newCustomer)
          .then(savedCustomer => {

            contentTarget.innerHTML = ""

            authHelper.storeUserInSessionStorage(savedCustomer.id)
      
            const customEvent = new CustomEvent("userRegistered")
            eventHub.dispatchEvent(customEvent)
          })
          
          } else {
            let alreadyRegisteredContainer = document.querySelector(".alreadyRegistered")

            alreadyRegisteredContainer.innerHTML = `
            It looks like you already have an account. 
            Please login or, if you forgot your email or password, use the Contact Form to request an account reset
            `
          }
      })
    } else {
      let alreadyRegisteredContainer = document.querySelector(".alreadyRegistered")

      alreadyRegisteredContainer.innerHTML = `
      All fields are not accurately completed
      `
    }
  }
})
