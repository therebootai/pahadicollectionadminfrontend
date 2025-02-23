import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddAndManageCategory from "./pages/AddAndManageCategory";
import AddAndManageCoupon from "./pages/marketing/AddAndManageCoupon";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import PickUp from "./pages/masters/PickUp";
import WebComponents from "./pages/components/WebComponents";
import Variable from "./pages/masters/Variable";
import EditProduct from "./pages/products/EditProduct";
import Customers from "./pages/customers/Customers";
import Orders from "./pages/orders/Orders";
import Users from "./pages/masters/Users";
import Login from "./pages/Login";
import Payment from "./pages/payments/Payment";
import WishList from "./pages/marketing/WishList";
import Attributes from "./pages/masters/Attributes";

function App() {
  return (
    <>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />
        {/* Admin Panel */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-manage-category" element={<AddAndManageCategory />} />

        {/* Marketing Routes */}
        <Route
          path="/marketing/add-manage-coupon"
          element={<AddAndManageCoupon />}
        />
        <Route path="/marketing/wishlist" element={<WishList />} />

        {/* Product Routes */}
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />

        {/* Master Routes */}
        <Route path="/masters/pick-up" element={<PickUp />} />
        <Route path="/masters/variable" element={<Variable />} />
        <Route path="/masters/users" element={<Users />} />
        <Route path="/masters/attributes" element={<Attributes />} />

        {/* Components Routes */}
        <Route path="/components/:type" element={<WebComponents />} />

        {/* Customer Routes */}
        <Route path="/customers" element={<Customers />} />

        {/* Order Routes */}
        <Route path="/orders" element={<Orders />} />

        {/* Payments Routes */}
        <Route path="/payments" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
