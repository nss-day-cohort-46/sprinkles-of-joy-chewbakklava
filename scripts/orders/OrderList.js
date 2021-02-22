import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { getProducts, useProducts } from "../products/ProductProvider.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { Order } from "./Order.js"
import { getOrderProducts, useOrderProducts } from "./OrderProductProvider.js"
import { getOrders, useOrders } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let customerOrders = []
let orderProducts = []
let allProducts = []
let allStatuses

export const OrderList = (statusId) => {
  
  if (authHelper.isUserLoggedIn()) {
    getOrders()
    .then(getProducts)
    .then(getOrderProducts)
    .then(getStatuses)
    .then(() => {
      customerOrders = useOrders()
      orderProducts = useOrderProducts()
      allProducts = useProducts()
      allStatuses = useStatuses()
      filterOrders(statusId)
      makeHtmlRep()
      render(statusId)
    })
  }
}

export let filteredOrders
export const filterOrders = (statusId) => { // returns array of orders for current logged in customer
  const loggedInCustomerId = authHelper.getCurrentUserId()
  const allCustomerOrders = customerOrders.filter(order => order.customerId === parseInt(loggedInCustomerId))
  // Sorting orders by timestamp, descending
  const sortedCustomerOrders = allCustomerOrders.sort((a,b) => b.timestamp - a.timestamp)
  // Check to see if user has deleted an order
  const undeletedOrders = sortedCustomerOrders.filter(order => order.userDeleted === false)
  filteredOrders = undeletedOrders
  // check to see if a status filter was selected. If so, filter by order status
  if (statusId > 0) {
    filteredOrders = undeletedOrders.filter(order => order.statusId === statusId)
  }
}

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





const render = (statusId) => {
  // const ordersHtmlRepresentation = customerOrders.map(order => Order(order)).join("")
  
  const options = allStatuses.map(status => `<option ${statusId === status.id ? "selected " : ""}value="${status.id}">${status.label}</option>`).join("")
  const statusSelect = `
    <select class="orderStatusSelect">
      <option ${statusId === 0 ? "selected " : ""} value="0">All orders</option>
      ${options}
    </select>`

  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Previous Orders</h3>
        <div>
        <h5>Filter by Order Status</h5>
        ${statusSelect}
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

eventHub.addEventListener("change", e => {
  if (e.target.classList.contains("orderStatusSelect")) {
    const statusId = parseInt(e.target.value)
    OrderList(statusId)
  }
})