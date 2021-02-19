console.log("Welcome to Sprinkles of Joy!")

import "./customers/RegisterForm.js"
import "./orders/OpenCart.js"
import "./orders/OrderList.js"
import "./reviews/ReviewForm.js"
import { CustomerNav } from "./customers/CustomerNav.js"
import { CategorySelect } from "./categories/CategorySelect.js"
import { LoginForm } from "./customers/LoginForm.js"
import { ProductList } from "./products/ProductList.js"
import { ReviewForm } from "./reviews/ReviewForm.js"
import { getProducts } from "./products/ProductProvider.js"

LoginForm()
CustomerNav()
CategorySelect()
ProductList()

//==================================TEST CODE====================================//

getProducts().then(ReviewForm)