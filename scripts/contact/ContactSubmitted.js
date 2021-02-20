import { contactForm, submitMessageContainer } from "./ContactForm.js"

export const messageSubmitted = () => {
    submitMessageContainer.innerHTML = `
            Thank you for your message! We will respond in 2-5 business days<br>

            <button id="messageResponse--newMessage">Send another message</button>
            <button id="messageResponse--close">Close</button>
    `
}

const eventHub = document.querySelector("#container")

eventHub.addEventListener("click", event => {
    
    if (event.target.id.startsWith("messageResponse--")) {
      
      const formModal = document.querySelector("#modal--contact")
      const [idPrefix, idSuffix] = event.target.id.split("--")
      switch (idSuffix) {
        case "newMessage":
          contactForm()
          displayFlex()
          break;
        case "close":
            formModal.style.display = "none"
          break;
      }
    }
  })

  const displayFlex = () => {
    const formModal = document.querySelector("#modal--contact")
    formModal.style.display = "flex"
}