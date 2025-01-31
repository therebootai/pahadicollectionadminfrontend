import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddAndManageCategory from "./pages/AddAndManageCategory";
import AddAndManageCoupon from "./pages/masters/AddAndManageCoupon";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import PickUp from "./pages/masters/PickUp";
import WebComponents from "./pages/components/WebComponents";
import Variable from "./pages/masters/Variable";

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
        <Route path="/masters/variable" element={<Variable />} />

        {/* Components Routes */}
        <Route path="/components/:type" element={<WebComponents />} />
      </Routes>
    </>
  );
}

export default App;
