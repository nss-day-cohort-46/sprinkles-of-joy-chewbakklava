import { authHelper } from "../auth/authHelper.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { filteredOrders, OrderList} from "./OrderList.js"
import { getOrders, deleteOrder } from "./OrderProvider.js"




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
      let loggedInCustomerId
      getOrders()
      .then(getStatuses)
      .then(loggedInCustomerId = authHelper.getCurrentUserId())
        .then(() => {
          const statuses = useStatuses()
          // pulls the order where the Id matches the idSuffix of the delete button that was clicked
          let orderToDelete = filteredOrders.find(order => order.id === parseInt(orderId))
            // checks to see if the order that the user wants to delete is allowed to be deleted
            if (orderToDelete.statusId === statuses[0].id) {
              // Delete orders that are Ready For Pickup
              deleteOrder(orderToDelete)

          } else {
            // Tell the user the order can't be deleted
            let contentTarget = document.querySelector(`.modal--content`)

            contentTarget.innerHTML += `
            <modal>If you delete this order, you won't know when it's ready for pickup! Let's leave it a little longer</modal> 
            <button id="statusMessage--close">X</button>`

          }
    }) 
    }
  })

  eventHub.addEventListener("click", event => {
    if (event.target.id === "statusMessage--close") {
      OrderList()
    }
  })
  
  eventHub.addEventListener("ordersStateChanged", event => {
    OrderList()
  })