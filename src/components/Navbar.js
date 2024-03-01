import { NavLink } from "react-router-dom";

export default function Navbar({ cart }) {
  return (
    <>
      <div className="bg-white sticky-top">
        <div className="container">
          <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
            <NavLink
              className="navbar-brand position-absolute"
              style={{
                left: "50%",
                transform: "translate(-50%, -50%)",
                top: "50%",
              }}
              to="/"
            >
              購物車網站
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse bg-white custom-header-md-open"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <NavLink className="nav-link ps-0" to="/product">
                    產品列表
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex">
              <NavLink to="/cart" className="nav-link active position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-danger">
                  {cart?.carts?.length}
                </span>
                <i className="bi bi-bag-fill"></i>
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
