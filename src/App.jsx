import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddAndManageCategory from "./pages/AddAndManageCategory";
import AddAndManageCoupon from "./pages/AddAndManageCoupon";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-manage-category" element={<AddAndManageCategory />} />
        <Route path="/add-manage-coupon" element={<AddAndManageCoupon />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
