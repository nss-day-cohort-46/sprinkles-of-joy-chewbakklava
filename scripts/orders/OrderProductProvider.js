import { bakeryAPI } from "../Settings.js"

let orderProducts = []

export const useOrderProducts = () => orderProducts.slice()

export const getOrderProducts = () => {
  return fetch(`${bakeryAPI.baseURL}/orderproducts`)
    .then(response => response.json())
    .then(apiData => {
      orderProducts = apiData
    })
}

export const saveOrderProducts = (orderProductsArray) => {
  const orderProductsPromiseArray = orderProductsArray.map(op => {
    return fetch(`${bakeryAPI.baseURL}/orderproducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(op)
    })
  })
  return Promise.all(orderProductsPromiseArray)
}
