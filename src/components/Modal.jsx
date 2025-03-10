import React, { forwardRef } from "react";

const Modal = forwardRef(
  ({ bookCred, mode, buttons, onChangeHandler, onSubmit }, modalRef) => {
    console.log(mode);
    return (
      <div>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {mode === "create" ? "Create Book" : "Update Book"}
                </h1>
                {/*  Correct `ref` usage for the close button */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={modalRef}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={bookCred.title}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={bookCred.author}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Page Number</label>
                    <input
                      type="number"
                      name="pages"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={bookCred.pages}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !bookCred.title || !bookCred.author || bookCred.pages <= 0
                    }
                  >
                    {buttons[0]}
                  </button>
                </form>
                {/* Secondary button for closing modal */}
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  {buttons[1]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
