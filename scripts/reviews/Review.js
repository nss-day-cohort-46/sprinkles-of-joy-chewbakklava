import { useReviews } from "./ReviewProvider.js"

const eventHub = document.querySelector('#container')
const reviewModal = document.querySelector('#reviewModal')

export const Review = (reviewWithCustomer) => {
    const reviewStars = [
        "",
        "⭐️",
        "⭐️⭐️",
        "⭐️⭐️⭐️",
        "⭐️⭐️⭐️⭐️",
        "⭐️⭐️⭐️⭐️⭐️"
    ]
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
        const id = e.target.id.split("--")[1]
        const reviews = useReviews()
        const review = reviews.find(r => r.id === id)
        reviewModal(review)
    }
})

const reviewModal = review => {
    
}