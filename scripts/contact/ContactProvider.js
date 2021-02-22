import { bakeryAPI } from '../Settings.js'

export const saveFormMessage = newFormObj => {
    return fetch(`${bakeryAPI.baseURL}/formMessages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFormObj)
    })
}
    