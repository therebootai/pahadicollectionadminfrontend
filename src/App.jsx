import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddAndManageCategory from "./pages/AddAndManageCategory";
import AddAndManageCoupon from "./pages/AddAndManageCoupon";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import PickUp from "./pages/masters/PickUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-manage-category" element={<AddAndManageCategory />} />

        {/* Product Routes */}
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />

        {/* Master Routes */}
        <Route path="/masters/pick-up" element={<PickUp />} />
        <Route
          path="/masters/add-manage-coupon"
          element={<AddAndManageCoupon />}
        />
      </Routes>
    </>
  );
}

export default App;
