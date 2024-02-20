import axios from "axios";
import { useEffect, useState, useRef } from "react";

import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import ChangePage from "../../components/ChangePage";
import { Modal } from "bootstrap";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [modalType, setModalType] = useState("create");
  const [item, setItem] = useState({});
  const modalRef = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {
    //取得產品資料
    getCoupons();
    //綁 modal 記得要選有 bootstrap 的
    modalRef.current = new Modal("#couponModal");
    deleteRef.current = new Modal("#deleteModal");
  }, []);

  const getCoupons = async () => {
    const result = await axios.get(
      `/v2/api/${process.env.REACT_APP_PATH}/admin/coupons`
    );
    setPagination(result.data.pagination);
    setCoupons(result.data.coupons);
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
        `/v2/api/${process.env.REACT_APP_PATH}/admin/coupon/${id}`
      );
      if (result.data.success) {
        closeDeleteModal();
        getCoupons();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-3">
        <CouponModal
          closeModal={closeModal}
          getCoupons={getCoupons}
          type={modalType}
          item={item}
        />
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          deleteTitle={item.title}
          deleteHandler={deleteHandler}
          deleteId={item.id}
        />
        <h3>優惠卷列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              openModal("create", item);
            }}
          >
            建立優惠卷
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">標題</th>
              <th scope="col">折扣</th>
              <th scope="col">到期日</th>
              <th scope="col">優惠碼</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.percent}</td>
                  <td>{new Date(item.due_date).toString()}</td>
                  <td>{item.code}</td>
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
        <ChangePage pagination={pagination} pageRender={getCoupons} />
      </div>
    </>
  );
}
