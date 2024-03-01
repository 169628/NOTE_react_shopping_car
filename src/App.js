import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Coupons from "./pages/admin/Coupons";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import FrontProduct from "./pages/front/FrontProduct";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";

axios.defaults.baseURL = process.env.REACT_APP_URL;

function App() {
  return (
    <div className="App">
      {/* 網址路由綁這邊(不顯示在畫面上純網址操作) */}
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route path="" element={<Home />}></Route>
          <Route path="product" element={<FrontProduct />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
          <Route path="cart" element={<Cart />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<Products />}></Route>
          <Route path="coupons" element={<Coupons />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
