# Sprinkles of Joy

## Settings
After each team member clones down the repository
1. Make a copy of the `Settings.js.example` file in the `scripts` directory and remove the `.example` extension.
1. Make a copy of the `bakerydb.json.example` file in the `api` directory and remove the `.example` extension.
1. Run your local json-server with `json-server -p 8088 -w bakerydb.json` from the `api` directory.
1. Run your application server with `serve`.

## PR Template

Add a pull request template for this project with these [instructions](https://docs.github.com/en/github/building-a-strong-community/creating-a-pull-request-template-for-your-repository).

## ERD

Your very first step is to create an Entity Relationship Diagram and get it approved by an instructor. Take a look at your database and use either dbdiagram.io or Lucidchart to build the ERD. Once your ERD has been approved, be sure to add a link to it in your README. If at any time during this project, your team needs to modify your ERD, please communicate the changes and get approval.

## A Note About Authentication

We want you to know that the login code we have given you is fake, completely insecure, and would never be implemented in a professional application. It is a simulation authentication using very simplistic tools, because authentication is not a learning objective of students at NSS. You will be using [session storage](https://javascript.info/localstorage#sessionstorage) to keep track of which user has logged into the application.

## HTTP Response Status Codes
What do the status codes in HTTP responses mean? Check it out [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

## Features

### Reviews
  1. A customer can see all reviews for a product. Does the current database store reviews? How will your ERD need to change?
  1. An authenticated customer can add a review for any product on the menu. Along with the review text, a customer can also provide a rating using the numbers 1-5.
  1. An authenticated customer can delete any review they wrote. A customer cannot delete a review another customer wrote.

### Customer's Order History
  1. A customer's order history should only list the orders they have placed, no other customer's orders should be displayed. 
  1. When a customer views their order history, each product in the order should be displayed. 
  1. The total cost for each order should also be displayed.
  1. A customer may delete any past order with the status of `Ready for Pickup`.

### Contact Form
  1. When the customer clicks the *Contact* link in the navbar, they should be presented with a form.
  1. The form should allow them to provide an email, a phone number and the message they want to communicate.
  1. When the form is submitted, the data the customer provided is saved.

### Menu
  1. When the customer selects the first option in the menu category dropdown, the customer should see the all the products.

### Customer's Shopping Cart
  1. After an order is placed, the cart should be reset to contain zero products.
  1. The *Place Order* button is disabled when there are no items in the cart.

### Logout
  1. Provide an affordance for the customer to log out of their account.
  1. When a customer logs out, the customer portal should not display any user specific information. Instead the customer sees the login form.

## User experiance & README
1. Before your team moves on to the stretch goals, take some time to add some styling to improve the user experiance of the application 
1. Write a good README for the application.

## Stretch Goals

### Rewards Program
  1. In the customer portal, next to the welcome message, indicate to the customer visually if they are part of the rewards program.
  1. If they are not part of the rewards program, provide an affordance for them to join the rewards program. Be sure to update the database.

### Reviews
  1. A customer can edit any review they wrote. A customer cannot edit a review another customer wrote.
  1. Provide a more visually appealing way to display the rating that is part of the review. For example, a star rating.

### Register
  1. Using the register form, a customer without an account should be able to create a new account.
  1. When the customer successfully registers for a new account, they should also be authenticated into the application.

### Evolving into a Cat Cafe
  1. Add an additional section on the web application where the customer can select one of the available cat breeds from a dropdown.
  1. When a breed is selected, display the images of 4 cats from that breed.
  1. [TheCatAPI](https://docs.thecatapi.com/) will provide both the list of breeds and the cat images.

### Customer's Shopping Cart
  1. A customer can not place an order unless they have logged in to their account. They can still add items to the cart without being authenticated.
  1. A customer can remove items from their shopping cart, whether they are logged in or not.
  1. Show a count of the number of items in the customer's cart in parenthesis next to *My Cart*. 

### Customer's Order History
  1. Provide a drop down for the customer to filter previous orders by their status.
  1. Display the previous orders from most recent, descending.
  1. Modify the feature where a customer can delete any of their previous orders with the status of `Ready for Pickup`. Instead of permanently removing it from the database, implement a soft delete. Does there need to be any changes to your ERD?
