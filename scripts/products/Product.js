import { Review } from "../reviews/Review.js"

const eventHub = document.querySelector("#container")

export const Product = (product, category, reviews, customers) => {
    const reviewsWithCustomers = reviews.map(review => {
        const customer = customers.find(customer => customer.id === review.customerId)
        return {
            review: review,
            customer: customer
        }
    })

    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${product.name}</h4>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct--${product.id}">Add to Cart</button>
              <p>${product.description} [${category.name}]</p>
          </div>
          <div class="reviews">
              ${reviewsWithCustomers.map(review => Review(review)).join("")}
          </div>
      </section>
  `
}

eventHub.addEventListener("click", evt => {
    if (evt.target.id.startsWith("addProduct--")) {
        const [prefix, productId] = evt.target.id.split("--")
        const addProductEvent = new CustomEvent("addToCart", {
            detail: {
                addedProduct: parseInt(productId)
            }
        })
        eventHub.dispatchEvent(addProductEvent)
    }
})
