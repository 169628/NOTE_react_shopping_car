import axios from "axios";
import { useEffect, useState, useContext } from "react";

import {
  MessageContext,
  errorMessage,
  successMessage,
} from "../store/messageStore";

// 新增跟編輯都共用一個 modal
function ProductModal({ closeModal, getProducts, type, item }) {
  const [data, setData] = useState({
    title: "[賣]讀卡機",
    category: "3C",
    origin_price: 100,
    price: 300,
    unit: "個",
    description: "Sit down please 名設計師設計",
    content: "這是內容",
    is_enabled: 1,
    imageUrl: "主圖網址",
  });

  // 送出跨元件的訊息顯示，message 用不到可以刪掉，但 "," 要留著
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    // 因新增跟編輯都共用一個 modal 的關係，如果是編輯就用傳進來的資料
    if (type == "edit") {
      setData(item);
    }
  }, [type, item]);

  const changeHandler = (e) => {
    const { name, value, checked } = e.target;

    // 如果是價格相關，要轉換形別為 number
    if (["price", "origin_price"].includes(name)) {
      setData({
        ...data,
        [name]: Number(value),
      });
    } else if (name == "is_enabled") {
      setData({
        ...data,
        [name]: +checked, //前面寫 "+" 把布林值轉型為 0 跟 1
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const submitHandler = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_PATH}/admin/product`;
      let method = "post";
      // 發送 api 前先判斷是新增還是編輯(2個不同api、方法也不同)
      if (type == "edit") {
        api += `/${item.id}`;
        method = "put";
      }
      const res = await axios[method](api, { data: data });
      if (res.data.success) {
        // 成功送跨元件訊息，封裝在 messageStore
        successMessage(dispatch, res);
        closeModal();
        getProducts();
      }
    } catch (error) {
      console.log(error);
      // 失敗送跨元件訊息，封裝在 messageStore
      errorMessage(dispatch, error);
    }
  };
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id="createModal"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type == "create" ? "建立新商品" : `編輯${item.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="image">
                    輸入圖片網址
                    <input
                      type="text"
                      name="imageUrl"
                      id="image"
                      placeholder="請輸入圖片連結"
                      className="form-control"
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="customFile">
                    或 上傳圖片
                    <input
                      type="file"
                      id="customFile"
                      className="form-control"
                    />
                  </label>
                </div>
                <img src="" alt="" className="img-fluid" />
              </div>
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      // 這邊一定要用 value useState 在變的時候才顯示得出來
                      value={data.title}
                      className="form-control"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={data.category}
                        className="form-control"
                        onChange={changeHandler}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        value={data.unit}
                        className="form-control"
                        onChange={changeHandler}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        value={data.origin_price}
                        className="form-control"
                        onChange={changeHandler}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={data.price}
                        className="form-control"
                        onChange={changeHandler}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      value={data.description}
                      className="form-control"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="content">
                    說明內容
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      value={data.content}
                      className="form-control"
                      onChange={changeHandler}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      是否啟用
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        checked={!!data.is_enabled} //一個"!"是布林真值變假值、2個是布林轉換 0 跟 1
                        className="form-check-input"
                        onChange={changeHandler}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
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

export default ProductModal;
