let formContainer = document.querySelector(".contact")

export const contactForm = () => {
    
    formContainer.innerHTML = `
        <div id="modal--contact" class="modal--parent">
            <div class="modal--content">
                <form>
                <h2>Contact Form</h2>
                <label for="contactForm__email">Email</label>
                <input id="contactForm__email" type="email" name="email">

                <label for="contactForm__phone">Phone(Do not include special characters, such as dashes or parentheses)</label>
                <input id="contactForm__phone" type="text" name="phoneNum">
                
                <label for="contactForm__message">Message</label>
                <input id="contactForm__message" type="textarea" name="message">

                <input type="submit" value="submit">
                </form>
            </div>
        </div>
    `
}

const eventHub = document.querySelector(".navContainer")

eventHub.addEventListener("click", event => {
    debugger
    if (event.target.id === "showContactForm") {
        const formModal = document.querySelector("#modal--contact")
        formModal.style.display = "flex"
    }
})
