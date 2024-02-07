import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [errorStatus, setErrorStatus] = useState("");

  const changeHandler = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post("/v2/admin/signin", login);
      //收到token跟期限
      const { expired, token } = res.data;
      //存在cookie裡
      document.cookie = `pptoken=${token}; expires=${new Date(expired)}`;

      if (res.data.success) {
        //登入成功=>轉址
        navigate("/admin/products");
      }
    } catch (error) {
      return setErrorStatus(error.response.data.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>

          <div
            className={`alert alert-danger ${
              errorStatus ? "d-block" : "d-none"
            }`}
            role="alert"
          >
            {errorStatus}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input
                id="email"
                className="form-control"
                name="username"
                type="email"
                placeholder="Email Address"
                onChange={changeHandler}
              />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="name@example.com"
                onChange={changeHandler}
              />
            </label>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            登入
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
