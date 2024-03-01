import { createContext } from "react";

export const MessageContext = createContext({});

export const initState = {
  type: "",
  title: "",
  text: "",
};

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return {
        ...action.payload,
      };

    case "CLEAR_MESSAGE":
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export function errorMessage(dispatch, error) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "danger",
      title: "更新失敗",
      message: Array.isArray(error?.response?.data?.message) // 先判斷是否為 array，因為太長，用可選串連來避免出現錯誤
        ? error?.response?.data?.message.join("、") // 是 array 則以 "、" 為分隔符號
        : error?.response?.data?.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
}

export function successMessage(dispatch, res) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: "success",
      title: "更新成功",
      message: res.data.message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, 3000);
}
