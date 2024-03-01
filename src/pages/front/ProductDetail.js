import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function ProductDetail() {
  const [product, setProduct] = useState({});
  const [carQuantity, setCarQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // 抓路由 id
  const { id } = useParams();
  // 取出自上一層傳入的 function
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    try {
      const result = await axios.get(
        `/v2/api/${process.env.REACT_APP_PATH}/product/${id}`
      );
      setProduct(result.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addCar = async () => {
    try {
      setIsLoading(true);
      const carData = {
        data: {
          product_id: id,
          qty: carQuantity,
        },
      };
      await axios.post(`/v2/api/${process.env.REACT_APP_PATH}/cart`, carData);
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <>
      <div className="container">
        <div
          style={{
            minHeight: "400px",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
            backgroundPosition: "center center",
          }}
        ></div>
        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-7">
            <h2 className="mb-0">{product.title}</h2>
            <p className="fw-bold">NT${product.price}</p>
            <p>{product.content}</p>
            <div className="my-4">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                alt=""
                className="img-fluid mt-4"
              />
            </div>
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div
                  className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                ></div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                  id="headingTwo"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                ></div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body pb-5">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                  id="headingThree"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                ></div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body pb-5">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-group mb-3 border mt-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon2"
                  // 放到購物車至少要有 1 且不會是負數
                  onClick={(e) => {
                    setCarQuantity((pre) => (pre == 1 ? pre : pre - 1));
                  }}
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
              <input
                type="number"
                className="form-control border-0 text-center my-auto shadow-none"
                value={carQuantity}
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                // 限制使用者只能用"+/-"按鈕去修改數字
                readOnly
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon1"
                  onClick={(e) => {
                    setCarQuantity((pre) => pre + 1);
                  }}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-dark w-100 rounded-0 py-3"
              onClick={() => {
                addCar();
              }}
              // 限制在加入購物車的過程中不可以按按鈕
              disabled={isLoading}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
