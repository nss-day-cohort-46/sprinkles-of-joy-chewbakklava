export const Order = (customerOrder, productsArray) => {
  return `
    <h3>Order ${customerOrder.id}</h3>
    <div class="order">
      <section>
      ${`map through products in this order`} 
      Order Total: ${`products.price + products.price + ...`}
      </section>
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
    </div>
  `
}
