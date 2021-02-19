import { authHelper } from "../auth/authHelper.js"

const eventHub = document.querySelector('#container')
const reviewModalElement = document.querySelector('.productReview')

eventHub.addEventListener("reviewFormRequested", e => {
    const productId = e.detail.productId
    ReviewForm(productId)
})

export const ReviewForm = productId => {
    if (authHelper.isUserLoggedIn()) {

    } else {
        alert(`Please login or create an account to leave a review!`)
    }

}