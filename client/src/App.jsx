import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NavBar } from "./pages/NavBar";
import ProtectedRoute from "./components/protectedRoute";
import { Register } from "./pages/Register";
import { useSelector } from "react-redux";
import { Children } from "react";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetails";
import AdminRoute from "./components/adminRoute";
import AdminOrders from "./pages/AdminOrders";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  // const navigate = useNavigate();
  return (
    <BrowserRouter>
      {userInfo && <NavBar />}
      {/* <NavBar /> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={userInfo ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route  path="product/:id" element={<ProductDetail  />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
