import { useReviews } from "./ReviewProvider.js"

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
    // build HTML
    let reviewHTML = `
        <div id="review__modal" class="modal--parent">
            <div class="modal--content">
                <span class="close">&times;</span>
                <p class="reviewModal__text">${review.text}</p>
                <p class="reviewModal__rating">${reviewStars[review.rating]}</p>
            </div>
        </div>
        `

    // add HTML to modal
    reviewModalElement.innerHTML = reviewHTML

    // toggle modal class to hide
    reviewModalElement.classList.toggle('hidden')
}

eventHub.addEventListener("click", e => {
    if (e.target.classList.contains("close")) {
        reviewModalElement.classList.toggle('hidden')
    }
})