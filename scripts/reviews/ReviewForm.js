import { authHelper } from "../auth/authHelper.js"
import { useProducts } from "../products/ProductProvider.js"

const eventHub = document.querySelector('#container')
const reviewModalElement = document.querySelector('.productReview')

eventHub.addEventListener("reviewFormRequested", e => {
    const productId = e.detail.productId
    ReviewForm(productId)
})

export const ReviewForm = () => {

// Product Select
    const allProducts = useProducts()
    const productSelectHTML = `
        <select name="productSelect" id="reviewForm__productSelect">
            ${allProducts.map(product => `<option value="${product.id}">${product.name}</option>`).join("")}
        </select>`

    const reviewFormHTML = `
    <div id="review__modal" class="modal--parent">
        <div class="modal--content">
            <form class="reviewForm">
                <span class="close">&times;</span>
                <label id="reviewForm__select--label" for="reviewForm__productSelect">Select a product</label>
                <div class="reviewForm__top">
                    ${productSelectHTML}
                    <select name="reviewForm__rating" id="reviewForm__rating">
                        <option value="1">⭐️</option>
                        <option value="2">⭐️⭐️</option>
                        <option value="3">⭐️⭐️⭐️</option>
                        <option value="4">⭐️⭐️⭐️⭐️</option>
                        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                    </select>
                </div>
                <textarea id="reviewForm__text" rows="4" cols="50"></textarea>
                <button id="reviewForm__submitButton">Submit Review</button>
            </form>
        </div>
    </div>
    `
    reviewModalElement.innerHTML = reviewFormHTML
    reviewModalElement.classList.remove("hidden")
}

eventHub.addEventListener("showNewReviewForm", e => {
    ReviewForm()
})