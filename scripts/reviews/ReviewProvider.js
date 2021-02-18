import { bakeryAPI } from '../Settings.js'

let reviewsCollection = []

export const useReviews = () => [...reviewsCollection]

export const getReviews = () => {
    return fetch(`${bakeryAPI.baseURL}/reviews`)
        .then(res => res.json())
        .then(pRes => reviewsCollection = pRes)
}