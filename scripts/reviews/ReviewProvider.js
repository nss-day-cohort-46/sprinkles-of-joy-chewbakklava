import { ProductList } from '../products/ProductList.js'
import { bakeryAPI } from '../Settings.js'

let reviewsCollection = []

export const useReviews = () => [...reviewsCollection]

export const getReviews = () => {
    return fetch(`${bakeryAPI.baseURL}/reviews`)
        .then(res => res.json())
        .then(pRes => reviewsCollection = pRes)
}

export const saveReview = review => {
    return fetch(`${bakeryAPI.baseURL}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })
    .then( ProductList() )
}