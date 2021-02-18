import { bakeryAPI } from "../Settings.js"

let categories = []

export const useCategories = () => {
  categories.slice()
}

export const getCategories = () => {
  return fetch(`${bakeryAPI.baseURL}/categories`)
    .then(response => response.json())
    .then(categoriesArray => {
      categories = categoriesArray
    })
}
