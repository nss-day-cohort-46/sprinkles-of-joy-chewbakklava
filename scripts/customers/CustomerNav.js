import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { LoginForm } from "./LoginForm.js"

const eventHub = document.querySelector("#container")
const userNav = document.querySelector(".userNav")

export const CustomerNav = () => {
  if (authHelper.isUserLoggedIn()) {
    getCustomer(authHelper.getCurrentUserId())
      .then(userObject => {
        render(userObject)
      })
  }
}

const render = (customer) => {
  userNav.innerHTML = `
    <h3>Welcome ${customer.name}!</h3>
    <ul class="userNav__links">
    <li class="userNav__link first" id="userNav--showCart">My Cart</li>
    <li class="userNav__link" id="userNav--newReview">New Review</li>
    <li class="userNav__link" id="userNav--pastOrders">Order History</li>
    <li class="userNav__link last" id="userNav--logout">Logout</li>
    </ul>
  `
}

eventHub.addEventListener("userLoggedIn", event => {
  CustomerNav()
})

eventHub.addEventListener("userRegistered", event => {
  CustomerNav()
})

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("userNav--")) {
    
    const [idPrefix, idSuffix] = event.target.id.split("--")
    let customEvent
    switch (idSuffix) {
      case "showCart":
        customEvent = new CustomEvent("showCustomerCart")
        break;
      case "newReview":
        customEvent = new CustomEvent("showNewReviewForm")
        break;
      case "pastOrders":
        customEvent = new CustomEvent("showOrderHistory")
        break;
      case "logout":
        customEvent = new CustomEvent("userLogout")
        logout()
        break;
      }
    eventHub.dispatchEvent(customEvent)
  }
})


const logout = () => {
  sessionStorage.removeItem('soj-customer-id')
  userNav.innerHTML = `Bye! Take care!`
  LoginForm()
}