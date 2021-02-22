import { saveFormMessage } from "./ContactProvider.js"
import { messageSubmitted } from "./ContactSubmitted.js"

let formContainer = document.querySelector(".contact")

export const contactForm = () => {
    
    formContainer.innerHTML = `
        <div id="modal--contact" class="modal--parent">
            <div class="modal--content">
                <form>
                <button id="contactForm__close">X</button>
                <h2 id="contactHeader">Contact Form</h2>
                <label for="contactForm__email">Email</label>
                <input id="contactForm__email" type="email" name="email">

                <label for="contactForm__phone">Phone<br>(Do not include special characters, such as dashes or parentheses)</label>
                <input id="contactForm__phone" type="text" name="phoneNum">
                
                <label for="contactForm__message">Message</label>
                <input id="contactForm__message" type="textarea" name="message">

                <div class="blankFieldsOnSubmit"></div>
                <input id="submitContact" type="submit" value="submit">
                </form>
            </div>
        </div>
    `
}

const headerEventHub = document.querySelector(".navContainer")

headerEventHub.addEventListener("click", event => {
    
    if (event.target.id === "showContactForm") {
        const formModal = document.querySelector("#modal--contact")
        formModal.style.display = "flex"
    }
})

export const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

const eventHub = document.querySelector("#container")
export let submitMessageContainer

eventHub.addEventListener("click", event => {
    // debugger
    if (event.target.id === "submitContact") {
        event.preventDefault()
        
        // regular expression to test for accurate email format

        const email = document.querySelector("#contactForm__email").value
        const phone = document.querySelector("#contactForm__phone").value
        const message = document.querySelector("#contactForm__message").value

        // checks to make sure all fields are completed accurately
        if (pattern.test(email) && phone.length === 10 && Number.isInteger(parseInt(phone)) && message !== "") {
            // event.preventDefault()
            const newFormMessage = {
                email: email,
                phone: parseInt(phone),
                message: message
            } 
            saveFormMessage(newFormMessage)

            submitMessageContainer = document.querySelector(".modal--content")
            messageSubmitted()
        } else {
            const incompleteFormDiv = document.querySelector(".blankFieldsOnSubmit")   
            incompleteFormDiv.innerHTML = `One of the fields was not completed accurately`

        }
        
    }
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "contactForm__close") {
        const formModal = document.querySelector("#modal--contact")
        formModal.style.display = "none"
    }
})