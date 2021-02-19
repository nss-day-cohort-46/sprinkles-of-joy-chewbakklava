import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { deleteReview, useReviews } from "./ReviewProvider.js"

const eventHub = document.querySelector('#container')
const reviewModalElement = document.querySelector('.productReview')

const reviewStars = [
    "",
    "⭐️",
    "⭐️⭐️",
    "⭐️⭐️⭐️",
    "⭐️⭐️⭐️⭐️",
    "⭐️⭐️⭐️⭐️⭐️"
]

export const Review = (reviewWithCustomer) => {
    return `
    <div class="review">
        <p class="review__rating" id="review__rating--${reviewWithCustomer.review.id}">${reviewStars[reviewWithCustomer.review.rating]}</p>
        <strong>
            <p class="review__name">${reviewWithCustomer.customer.name}</p>
        </strong>
    </div>
    `
}

eventHub.addEventListener("click", e => {
    if (e.target.id.includes("review__rating--")) {
        const id = parseInt(e.target.id.split("--")[1])
        const reviews = useReviews()
        const review = reviews.find(r => r.id === id)
        reviewModal(review)
    }
})


const reviewModal = review => {
    getCustomer(review.customerId)
    .then( foundCustomer => {
        const currentCustomerId = parseInt(authHelper.getCurrentUserId())
        const authorId = foundCustomer.id
        let deleteButton = ""
        if (currentCustomerId === authorId) {
            deleteButton = `<button class="review__modal--delete" id="deleteButton--${review.id}">Delete</button>`
        }
        let reviewHTML = `
            <div id="review__modal" class="modal--parent">
                <div class="modal--content">
                    <div class="reviewModal">
                        <span class="close">&times;</span>
                        <p class="reviewModal__text">${review.text}</p>
                        <div class="review__modal--middle">
                            <p class="reviewModal__rating">${reviewStars[review.rating]}</p>
                            <p class="reviewModal__customerName">${foundCustomer.name}</p>
                        </div>
                        ${deleteButton}
                    </div
                </div>
            </div>
            `
    
        reviewModalElement.innerHTML = reviewHTML
    
        // remove class 'hidden' from reviewModal
        reviewModalElement.classList.toggle('hidden')
    })
}

// add class 'hidden' to reviewModal if x is clicked
eventHub.addEventListener("click", e => {
    if (e.target.classList.contains("close")) {
        reviewModalElement.classList.toggle('hidden')
    }
})

eventHub.addEventListener("click", e => {
    if (e.target.id.includes("deleteButton--")) {
        const [prefix, reviewId] = e.target.id.split("--")
        deleteReview(reviewId)
        reviewModalElement.classList.add("hidden")
    }
})