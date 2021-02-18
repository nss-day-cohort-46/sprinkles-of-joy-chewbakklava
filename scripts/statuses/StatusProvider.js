import { bakeryAPI } from "../Settings.js"

let statuses = []

export const useStatuses = () => statuses.slice()

export const getStatuses = () => {
  return fetch(`${bakeryAPI.baseURL}/statuses`)
    .then(r => r.json())
    .then(r => statuses = r)
}
