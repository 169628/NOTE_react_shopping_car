import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const { cart, getCart } = useOutletContext();

  const removeCartItem = async (id) => {
    try {
      await axios.delete(`/v2/api/${process.env.REACT_APP_PATH}/cart/${id}`);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-md-6 bg-white py-5"
            style={{ minHeight: "calc(100vh - 56px - 76px)" }}
          >
            <div className="d-flex justify-content-between">
              <h2 className="mt-2">購物車</h2>
            </div>
            {cart?.carts?.map((item) => {
              return (
                <div key={item.id} className="d-flex mt-4 bg-light">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    alt=""
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="w-100 p-3 position-relative">
                    <button
                      type="button"
                      className="btn position-absolute"
                      style={{ top: "16px", right: "16px" }}
                      onClick={() => {
                        removeCartItem(item.id);
                      }}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <p className="mb-0 fw-bold">{item.product.title}</p>
                    <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                      {item.product.content}
                    </p>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="input-group w-50 align-items-center">
                        <div className="input-group-prepend pe-1">
                          <a href="#">
                            {" "}
                            <i className="fas fa-minus"></i>
                          </a>
                        </div>
                        <input
                          type="text"
                          className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                        <div className="input-group-append ps-1">
                          <a href="#">
                            <i className="fas fa-plus"></i>
                          </a>
                        </div>
                      </div>
                      <p className="mb-0 ms-auto">NT${item.product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總金額</p>
              <p className="mb-0 h4 fw-bold">NT${cart.final_total}</p>
            </div>
            <a
              href="./checkout.html"
              className="btn btn-dark btn-block mt-4 rounded-0 py-3"
            >
              確認送出
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
