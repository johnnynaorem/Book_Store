import React from "react";

export default function ListBook({
  book,
  handleBookDelete,
  index,
  handlebookUpdate,
  title,
}) {
  return (
    <div key={index} className="card" style={{ width: "18rem" }}>
      <img
        src="https://scholarlykitchen.sspnet.org/wp-content/uploads/2018/07/iStock-506432952.jpg"
        alt="bookImage"
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {book.author}
        </h6>
        <p className="card-text">total pages: {book.pages}</p>
      </div>
      {title !== "home" && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handlebookUpdate}
          >
            Edit
          </button>
          <button
            className=" btn btn-danger"
            onClick={() => handleBookDelete(book.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
