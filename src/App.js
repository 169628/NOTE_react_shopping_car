import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";

axios.defaults.baseURL = process.env.REACT_APP_URL;

function App() {
  return (
    <div className="App">
      {/* 網址路由綁這邊(不顯示在畫面上純網址操作) */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<Products />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
