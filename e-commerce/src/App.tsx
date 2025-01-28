import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/Home/Home";
import CartDetails from "./components/Cart/CartDetails";
import Checkout from "./components/Checkout/Checkout";
import Products from "./components/Product/Products";
import Contact from "./components/Contact/Contact";
import Index from "./Admin/Admin/Index/Index";
import ProductStore from "./Admin/Admin/Product/ProductStore";
import Register from "./Admin/Admin/RegisterAdmin/Register";
import Analytics from "./Admin/Admin/Analytics/Analytics";
import Order from "./Admin/Order/Order";

// Import the toast and Toaster
import { Toaster } from 'react-hot-toast';
interface Item {
  id: number;
  name: string;
  size: string;
  price: number;
  image: string;
}

interface CheckoutProps {
  items: Item[];
  subtotal: number;
  shipping: number;
  total: number;
}
function App() {
  return (
    <div className="min-h-screen h-[50vh] cursor-pointer">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout  />} />
          <Route path="/details/:id" element={<CartDetails />} />

          {/* dashboard */}
          <Route path="/index" element={<Index />} />
          <Route path="/products" element={<ProductStore />} />
          <Route path="/register" element={<Register />} />
          <Route path="/analytic" element={<Analytics />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>

      {/* Add Toaster for toast notifications */}
      <Toaster />
    </div>
  );
}

export default App;
