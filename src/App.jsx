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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-manage-category" element={<AddAndManageCategory />} />

        {/* Marketing Routes */}
        <Route
          path="/marketing/add-manage-coupon"
          element={<AddAndManageCoupon />}
        />

        {/* Product Routes */}
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />

        {/* Master Routes */}
        <Route path="/masters/pick-up" element={<PickUp />} />
        <Route path="/masters/variable" element={<Variable />} />
        <Route path="/masters/users" element={<Users />} />

        {/* Components Routes */}
        <Route path="/components/:type" element={<WebComponents />} />

        {/* Customer Routes */}
        <Route path="/customers" element={<Customers />} />

        {/* Order Routes */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
