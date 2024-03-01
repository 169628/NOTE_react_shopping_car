import ReactLoading from "react-loading";

export default function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div
          style={{
            // 先加一塊黑色大背板
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            // 不要讓它被蓋住
            zIndex: 1000,
            // loading 的圖飾呈現在正中間
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // 追加特效--模糊
            backdropFilter: "blur(3px)",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="white"
            height={60}
            width={100}
          />
        </div>
      )}
    </>
  );
}
