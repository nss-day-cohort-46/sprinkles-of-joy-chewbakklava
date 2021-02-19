import { authHelper } from "../auth/authHelper.js"

const eventHub = document.querySelector('#container')
const reviewModalElement = document.querySelector('.productReview')

eventHub.addEventListener("reviewFormRequested", e => {
    const productId = e.detail.productId
    ReviewForm(productId)
})

export const ReviewForm = productId => {
    if (authHelper.isUserLoggedIn()) {
        const reviewFormHTML = `
        
        <div id="review__modal" class="modal--parent">
            <div class="modal--content">
                <form class="reviewForm">
                    <span class="close">&times;</span>
                    <input type="textarea" id="reviewForm__text">
                    <select name="reviewForm__rating" id="reviewForm__rating">
                        <option value="1">⭐️</option>
                        <option value="2">⭐️⭐️</option>
                        <option value="3">⭐️⭐️⭐️</option>
                        <option value="4">⭐️⭐️⭐️⭐️</option>
                        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                    </select>
                </form>
            </div>
        </div>
        `

        reviewModalElement.innerHTML = reviewFormHTML
        reviewModalElement.classList.remove("hidden")
    } else {
        alert(`Please login or create an account to leave a review!`)
    }
}
