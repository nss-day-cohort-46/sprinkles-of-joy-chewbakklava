// Session storage documentation:
// https://javascript.info/localstorage#sessionstorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

// Using Chrome DevTools with session storage:
// https://developers.google.com/web/tools/chrome-devtools/storage/sessionstorage

export const authHelper = {
  isUserLoggedIn: () => {
    if (sessionStorage.getItem("soj-customer-id")) {
      console.log("User is logged in")
      return true
    }
    console.log("User is NOT logged in")
    return false
  },
  getCurrentUserId: () => sessionStorage.getItem("soj-customer-id"),
  storeUserInSessionStorage: (userId) => sessionStorage.setItem("soj-customer-id", userId)
}
