import { getProducts, useProducts } from "./../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { saveOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const userCart = document.querySelector(".userCart")

let productsInCart = []

export const OpenCart = () => {
  render()
}

const render = () => {
  let cartHTML = ""
  let totalCost = 0

  for (const product of productsInCart) {
    cartHTML += `
      <div class="cart">
        <p>${product.name}</p>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `
    totalCost += product.price
  }

  userCart.innerHTML = `
    <div>
    <h4>Cart</h4>
    ${cartHTML}
    <hr/>
    <div class="cart">
    <button id="placeOrder">Place Order</button>
    <p>$${totalCost.toFixed(2)}</p>
    </div>
    </div>
  `
}

eventHub.addEventListener("showCustomerCart", e => OpenCart())

eventHub.addEventListener("addToCart", event => {
  const productId = event.detail.addedProduct
  getProducts()
    .then(() => {
      const allProducts = useProducts()
      const productToBeAdded = allProducts.find(prod => prod.id === productId)
      productsInCart.push(productToBeAdded)
      OpenCart()
    })
})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "placeOrder" && productsInCart.length !== 0) {
    const currentCustomerId = parseInt(authHelper.getCurrentUserId())
    getStatuses()
      .then(() => {
        const allStatuses = useStatuses()
        const initialOrderStatus = allStatuses.find(status => status.label.toLowerCase() === "Scheduled".toLowerCase())

        const newOrder = {
          "customerId": currentCustomerId,
          "statusId": initialOrderStatus.id,
          "timestamp": Date.now()
        }

        return saveOrder(newOrder, productsInCart)
      })
  }
})
