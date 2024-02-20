import axios from "axios";
import { useEffect, useState } from "react";

function CouponModal({ closeModal, getCoupons, type, item }) {
  const [data, setData] = useState({
    title: "超級特惠價格",
    is_enabled: 1,
    percent: 80,
    code: "testCode",
  });
  // 時間一共有3種格式，input 的格式、儲存的時間格式、api 的格式都不同
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (type == "edit") {
      setData(item);
      setDate(new Date(item.due_date));
    }
  }, [type, item]);

  const changeHandler = (e) => {
    const { name, value, checked } = e.target;

    if (["percent"].includes(name)) {
      setData({
        ...data,
        [name]: Number(value),
      });
    } else if (name == "is_enabled") {
      setData({
        ...data,
        [name]: +checked,
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const submitHandler = async () => {
    const submitData = {
      ...data,
      due_date: date.getTime(), //將儲存的時間格式轉成 unix timestamp
    };
    let api = `/v2/api/${process.env.REACT_APP_PATH}/admin/coupon`;
    let method = "post";
    if (type == "edit") {
      api += `/${item.id}`;
      method = "put";
    }
    const res = await axios[method](api, { data: submitData });
    if (res.data.success) {
      closeModal();
      getCoupons();
    }
  };

  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type == "create" ? "建立優惠卷" : `編輯${item.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  name="title"
                  className="form-control mt-1"
                  value={data.title}
                  onChange={changeHandler}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="text"
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                    value={data.percent}
                    onChange={changeHandler}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                    // 年抓出來+"-"、月抓出來+"-"、日抓出來
                    value={`${date.getFullYear().toString()}-${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`}
                    // input 進入跟顯示是2種不同格式
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                    value={data.code}
                    onChange={changeHandler}
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                checked={!!data.is_enabled}
                onChange={changeHandler}
              />
              是否啟用
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              關閉
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;
