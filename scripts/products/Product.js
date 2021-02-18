const eventHub = document.querySelector("#container")

export const Product = (product, category) => {
    return `
      <section class="baked_good">
          <header class="baked_good__header">
              <h4>${product.name}</h4>
              <p>$${product.price}</p>
          </header>
          <div>
              <button id="addProduct">Add to Cart</button>
              <p>${product.description} [${category.name}]</p>
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
