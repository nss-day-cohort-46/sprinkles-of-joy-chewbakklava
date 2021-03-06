import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"

const eventHub = document.querySelector("#container")

let customerOrders = []

export const useOrders = () => customerOrders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      customerOrders = response
    })
}

export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then( createdOrder => {
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": createdOrder.id,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(dispatchStateChangeEvent)
}

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")

  eventHub.dispatchEvent(ordersStateChangedEvent)
}

// export const deleteOrder = (orderObj) => {
//   return fetch(`${bakeryAPI.baseURL}/orders/${orderObj.id}`, {
//     method: "DELETE"
//   })
//   .then(getOrders)
//   .then(dispatchStateChangeEvent)
// }

export const softDeleteOrder = order => {
  const deletedOrder = {
    id: order.id,
    customerId: order.customerId,
    statusId: order.statusId,
    timestamp: order.timestamp,
    userDeleted: true
  }
  return fetch(`${bakeryAPI.baseURL}/orders/${order.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(deletedOrder)
  })
  .then(getOrders)
  .then(dispatchStateChangeEvent)
}