export const Order = (customerOrder) => {
  return `
    <div class="order">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
    </div>
  `
}
