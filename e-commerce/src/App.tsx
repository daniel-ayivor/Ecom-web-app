import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"
import Home from "./components/Home/Home"
import CartDetails from "./components/Cart/CartDetails"
import Checkout from "./components/Checkout/Checkout"
import Products from "./components/Product/Products"
import Contact from "./components/Contact/Contact"
import Index from "./Admin/Admin/Index/Index"




function App() {


  return (

    <div className="min-h-screen h-[50vh] cursor-pointer">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/details/:id" element={<CartDetails />} />

{/* dashboard */}
<Route path="/dashboard" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
