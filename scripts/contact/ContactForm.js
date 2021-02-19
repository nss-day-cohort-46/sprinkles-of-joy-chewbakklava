let formContainer = document.querySelector("#contactForm")

export const contactForm = () => {
    formContainer.innerHTML = `
        <h2>Contact Form</h2>
        <label for="contactForm__email">Email</label>
        <input id="contactForm__email" type="email" name="email">

        <label for="contactForm__phone">Phone(Do not include special characters, such as dashes or parentheses)</label>
        <input id="contactForm__phone" type="text" name="phoneNum">
        
        <label for="contactForm__message">Message</label>
        <input id="contactForm__message" type="textarea" name="message">
    `
}
