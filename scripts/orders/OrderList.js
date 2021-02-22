import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { Order } from "./Order.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getOrders, useOrders } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []
let orderProducts = []
let allProducts = []

export const OrderList = () => {
  
  if (authHelper.isUserLoggedIn()) {
    getOrders()
    .then(getProducts)
    .then(getOrderProducts)
    .then(() => {
      customerOrders = useOrders()
      orderProducts = useOrderProducts()
      allProducts = useProducts()
      filterOrders()
      makeHtmlRep()
      render()
    })
  }
}

export let filteredOrders
export const filterOrders = () => { // returns array of orders for current logged in customer
  const loggedInCustomerId = authHelper.getCurrentUserId()
  filteredOrders = customerOrders.filter(order => order.customerId === parseInt(loggedInCustomerId))}

let ordersHtmlRepresentation
const makeHtmlRep = () => {
 
  ordersHtmlRepresentation = filteredOrders.map(order => {
    // returns array of related objects for the filtered orders
    const relatedOrderProducts = orderProducts.filter(op => op.orderId === order.id)

    // returns array all products for each filtered order
    const productsOfOrder = relatedOrderProducts.map(rop => {
      return allProducts.find(product => rop.productId === product.id)
    })
   
    return Order(order, productsOfOrder)

  }).join(" ")
   
}


const render = () => {
  // const ordersHtmlRepresentation = customerOrders.map(order => Order(order)).join("")

  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Previous Orders</h3>
        <div>
        <h5>Ordered on</h5>
        ${ordersHtmlRepresentation}
        </div>
        <button id="modal--close">Close Order History</button>
        </div>
    </div>
      `
}

eventHub.addEventListener("showOrderHistory", () => {
  OrderList()
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}

eventHub.addEventListener("ordersStateChanged", event => {
  OrderList()
})