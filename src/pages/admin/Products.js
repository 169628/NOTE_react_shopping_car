import axios from "axios";
import { useEffect, useState, useRef } from "react";

import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";

import ChangePage from "../../components/ChangePage";
import { Modal } from "bootstrap";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [pagination, setPagination] = useState({});
  const [modalType, setModalType] = useState("create");
  const [item, setItem] = useState({});
  const modalRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    //取得產品資料
    getProducts();
    //綁 modal 記得要選有 bootstrap 的
    modalRef.current = new Modal("#createModal");
    deleteRef.current = new Modal("#deleteModal");
  }, []);

  const getProducts = async (page = 1) => {
    try {
      const result = await axios.get(
        `/v2/api/${process.env.REACT_APP_PATH}/admin/products?page=${page}`
      );

      setPagination(result.data.pagination);
      setProduct(result.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (type, item) => {
    setModalType(type);
    setItem(item);
    modalRef.current.show();
  };

  const closeModal = () => {
    modalRef.current.hide();
  };

  const openDeleteModal = (item) => {
    setItem(item);
    deleteRef.current.show();
  };

  const closeDeleteModal = () => {
    deleteRef.current.hide();
  };

  const deleteHandler = async (id) => {
    try {
      const result = await axios.delete(
        `/v2/api/${process.env.REACT_APP_PATH}/admin/product/${id}`
      );
      if (result.data.success) {
        closeDeleteModal();
        getProducts();
      }
    } catch (error) {}
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
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          deleteTitle={item.title}
          deleteHandler={deleteHandler}
          deleteId={item.id}
        />
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              openModal("create", item);
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
                      onClick={() => {
                        openDeleteModal(item);
                      }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ChangePage pagination={pagination} pageRender={getProducts} />
      </div>
    </>
  );
}
