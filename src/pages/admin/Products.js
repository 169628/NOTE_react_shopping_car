import axios from "axios";
import { useEffect, useState, useRef } from "react";

import ProductModal from "../../components/ProductModal";
import { Modal } from "bootstrap";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [modalType, setModalType] = useState("create");
  const [item, setItem] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    //取得產品資料
    getProducts();
    //綁 modal 記得要選有 bootstrap 的
    modalRef.current = new Modal("#createModal");
  }, []);

  const getProducts = async () => {
    const result = await axios.get(
      `/v2/api/${process.env.REACT_APP_PATH}/admin/products`
    );
    setProduct(result.data.products);
  };

  const openModal = (type, item) => {
    setModalType(type);
    setItem(item);
    modalRef.current.show();
  };

  const closeModal = () => {
    modalRef.current.hide();
  };

  return (
    <>
      <div className="p-3">
        <ProductModal
          closeModal={closeModal}
          getProducts={getProducts}
          type={modalType}
          item={item}
        />
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              openModal("create");
            }}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">名稱</th>
              <th scope="col">售價</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  {/* is_enabled 值為 1 跟 0 代表 true 跟 false */}
                  <td>{item.is_enabled ? "已啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        openModal("edit", item);
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link disabled" href="/" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {[...new Array(5)].map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="page-item" key={`${i}_page`}>
                <a className={`page-link ${i + 1 === 1 && "active"}`} href="/">
                  {i + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
