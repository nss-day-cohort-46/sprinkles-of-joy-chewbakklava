import { getCategories, useCategories } from "./CategoryProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".filter__category")

let categories = []

export const CategorySelect = () => {
  getCategories()
  .then( () => {
    categories = useCategories()
    render()
  })
}

const render = () => {
  
  contentTarget.innerHTML = `
  <select class="dropdown" id="categorySelect">
  <option value="0">All baked goods...</option>
  ${categories.map(category => `<option value="${category.id}">${category.name}</option>`).join("")}
  </select>
  `
}

eventHub.addEventListener("change", changeEvent => {
  if (changeEvent.target.id === "categorySelect") {
    const categoryCustomEvent = new CustomEvent("categorySelected", {
      detail: {
        selectedCategory: parseInt(changeEvent.target.value)
      }
    })
    eventHub.dispatchEvent(categoryCustomEvent)
  }
})
