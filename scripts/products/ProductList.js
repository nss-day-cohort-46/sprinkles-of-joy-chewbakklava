import { getProducts, useProducts } from "./ProductProvider.js"
import { getCategories, useCategories } from "../categories/CategoryProvider.js"
import { Product } from "./Product.js"
import { getReviews, useReviews } from "../reviews/ReviewProvider.js"
import { getCustomers, useCustomers } from "../customers/CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".menu__items")

let bakeryProducts = []
let bakeryCategories = []
let reviews = []
let customers = []

export const ProductList = () => {
  getProducts()
    .then(getCategories)
    .then(getReviews)
    .then(getCustomers)
    .then(() => {
      bakeryProducts = useProducts()
      bakeryCategories = useCategories()
      reviews = useReviews()
      customers = useCustomers()

      render()
    })
}

const render = () => {
  contentTarget.innerHTML = bakeryProducts.map(product => {
    const productCategory = bakeryCategories.find(cat => cat.id === product.categoryId)
    const productReviews = reviews.filter(review => review.productId === product.id)

    return Product(product, productCategory, productReviews, customers)
  }).join("")
}

eventHub.addEventListener("categorySelected", event => {
  
  
    // debugger
    if(event.detail.selectedCategory > 0) {
      // debugger
      // let selectedCategory = event.detail.selectedCategory
      const filteredProducts = bakeryProducts.filter(prod => prod.categoryId === event.detail.selectedCategory)
      const productCategory = bakeryCategories.find(cat => cat.id === event.detail.selectedCategory)
      
      contentTarget.innerHTML = filteredProducts.map(prod => Product(prod, productCategory)).join("")} 
      else {
      contentTarget.innerHTML = ProductList()
    }
    
})