import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ChangePage from "../../components/ChangePage";
import Loading from "../../components/Loading";

export default function () {
  const [product, setProduct] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts(1);
  }, []);

  const getProducts = async (page = 1) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `/v2/api/${process.env.REACT_APP_PATH}/products?page=${page}`
      );
      setPagination(result.data.pagination);
      setProduct(result.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {product.map((item) => {
            return (
              <div className="col-md-3" key={item.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80"
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                  <a href="#" className="text-dark">
                    <i
                      className="far fa-heart position-absolute"
                      style={{ right: "16px", top: "16px" }}
                    ></i>
                  </a>
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">
                      {/* 連結的部分是直接修改路由、由元件抓取路由上的 id 去呈現畫面 */}
                      <Link to={item.id}>{item.title}</Link>
                    </h4>
                    <p className="card-text text-muted mb-0">{item.content}</p>
                    <p className="text-muted mt-3">NT$ {item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChangePage pagination={pagination} pageRender={getProducts} />
      </div>
    </>
  );
}
