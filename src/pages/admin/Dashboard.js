import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";

import Message from "../../components/Message";
import {
  MessageContext,
  initState,
  messageReducer,
} from "../../store/messageStore";

function Dashboard() {
  // 轉址用
  const navigate = useNavigate();
  // 以下 tokenStatus 是為了下面產品列表等 token 檢查完再出現而設的
  const [tokenStatus, setTokenStatus] = useState(false);
  // 訊息顯示的跨元件
  const reducer = useReducer(messageReducer, initState);

  const signOutHandler = () => {
    //登出直接把cookie設為空
    document.cookie = "pptoken=;";
    navigate("/login");
  };

  //取得存在cookie裡的token
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("pptoken="))
    ?.split("=")[1];
  //設定header
  axios.defaults.headers.common["Authorization"] = token;

  useEffect(() => {
    //進入後台畫面=>檢查如果沒有token就直接踢回login畫面，不可到後台
    if (!token) {
      return navigate("/login");
    }
    //有token檢查token是否正確
    (async () => {
      try {
        await axios.post("/v2/api/user/check");
        // 都正確 tokenStatus 設為 true 讓產品列表出現
        setTokenStatus(true);
      } catch (error) {
        if (!error.response.data.success) {
          return navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return (
    <>
      <MessageContext.Provider value={reducer}>
        <Message />
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <p className="text-white mb-0">HEX EATS 後台管理系統</p>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    onClick={signOutHandler}
                  >
                    登出
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
          <div className="bg-light" style={{ width: "200px" }}>
            <ul className="list-group list-group-flush">
              <Link
                className="list-group-item list-group-item-action py-3"
                to="/admin/products"
              >
                <i className="bi bi-cup-fill me-2" />
                產品列表
              </Link>
              <Link
                className="list-group-item list-group-item-action py-3"
                to="/admin/coupons"
              >
                <i className="bi bi-ticket-perforated-fill me-2" />
                優惠卷列表
              </Link>
              <Link
                className="list-group-item list-group-item-action py-3"
                to="/admin/orders"
              >
                <i className="bi bi-receipt me-2" />
                訂單列表
              </Link>
            </ul>
          </div>
          {/* 指 tokenStatus 也要是 true 才會出現 */}
          <div className="w-100">{tokenStatus && <Outlet></Outlet>}</div>
        </div>
      </MessageContext.Provider>
    </>
  );
}

export default Dashboard;
