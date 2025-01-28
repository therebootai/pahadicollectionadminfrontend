import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import AddAndManageCategory from "./pages/AddAndManageCategory";
import AddAndManageCoupon from "./pages/AddAndManageCoupon";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/add-manage-category"
            element={<AddAndManageCategory />}
          />
          <Route path="/add-manage-coupon" element={<AddAndManageCoupon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
