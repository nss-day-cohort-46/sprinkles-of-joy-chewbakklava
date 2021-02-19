import { filterOrders } from "./OrderList"

export const Order = (customerOrder, productsArray) => {
  let total = 0
  // debugger
  productsArray.forEach(product => total += product.price)

  return `
    <h3>Order ${customerOrder.id}</h3>
    <div class="order">
      <section>
      ${productsArray.map(product => product.name).join("<br>")}<br> 
      Order Total: $${total.toFixed(2)}
      </section>
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      </div>
      <button id="deleteOrder__${customerOrder.id}">Delete</button>
  `
}

const eventHub = document.querySelector("#container")

eventHub.addEventListener("click", event => {
  if (event.target.id.startsWith("deleteOrder__")) {
    const [idPrefix, orderId] = event.target.id.split("__")
    getOrders()
    .then(loggedInCustomerId = authHelper.getCurrentUserId())
    .then(() => {
      let filteredOrders = ""
      filterOrders()
  }) 
  }
  })