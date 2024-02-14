function DeleteModal({
  closeDeleteModal,
  deleteTitle,
  deleteHandler,
  deleteId,
}) {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      id="deleteModal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-white fs-5" id="exampleModalLabel">
              刪除確認
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeDeleteModal}
            />
          </div>
          <div className="modal-body">刪除{deleteTitle}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDeleteModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteHandler(deleteId);
              }}
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
