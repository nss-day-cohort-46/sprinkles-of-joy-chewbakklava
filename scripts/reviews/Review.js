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
        <p class="review__text">${reviewWithCustomer.review}</p>
        <p class="review__rating">${reviewStars[reviewWithCustomer.rating]}</p>
        <strong>
            <p class="review__name">${reviewWithCustomer.author}</p>
        </strong>
    </div>
    `
}