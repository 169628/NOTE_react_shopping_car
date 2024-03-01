import { useContext, useState } from "react";

import { MessageContext } from "../store/messageStore";

export default function Message() {
  // toast -> 用 useState 編輯 toast -> 建立 useContext、useReducer -> 加到 toast -> 加到 submit api
  // const [message, setMessage] = useState({}); 改為下面跨元件的傳遞
  const [message, dispatch] = useContext(MessageContext);

  return (
    <>
      {/*
      以下為初放入 toast 的測試階段用的 btn， 原本畫面沒有 toast 按了按鈕 toast 就會出現
      <button
        onClick={() => {
            setMessage({
                type: "success",
                title: "成功",
                message: "成功的訊息"
            }) 
            or
          dispatch({ type: "POST_MESSAGE" });
          setTimeout(() => {
            setMessage({}) 
            or
            dispatch({ type: "CLEAR_MESSAGE" });
          }, 3000);
        }}
      >
        測試用按我
      </button> */}
      <div
        className="toast-container position-fixed"
        style={{ top: "64px", right: "15px" }}
      >
        {message.title && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay="3000"
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className="me-auto">{message.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message.message}</div>
          </div>
        )}
      </div>
    </>
  );
}
