import { Outlet } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";

export default function FrontLayout() {
  const [cart, setCart] = useState({});
  useEffect(() => {
    //取得購物車
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const result = await axios.get(
        `/v2/api/${process.env.REACT_APP_PATH}/cart`
      );
      setCart(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar cart={cart} />
      {/* 重點在 Outlet 的資料傳遞，建議以物件的形式傳遞 */}
      <Outlet context={{ getCart, cart }} />
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
