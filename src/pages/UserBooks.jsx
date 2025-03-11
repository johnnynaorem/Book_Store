import React, { useEffect, useRef, useState } from "react";
import { getUserBook } from "../api/user.controller";
import ListBook from "../components/ListBook";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  creatingBook,
  deletingBook,
  setBooks,
  updatatingBook,
} from "../store/slices/bookSlice";
import Modal from "../components/Modal";

const UserBooks = () => {
  const modalRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const [_bookId, setBookId] = useState();
  const { books, loading } = useSelector((state) => state.book);
  const [bookCred, setBookCred] = useState({ title: "", pages: 0, author: "" });
  const [mode, setMode] = useState("create");

  const fetchUserWithBook = async (userId) => {
    const res = await getUserBook(userId);
    if (res?.status === 200) {
      dispatch(setBooks(res.data.books));
    }
  };

  const onChangeHandler = (e) => {
    setBookCred((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookDelete = async (bookId) => {
    dispatch(deletingBook(bookId));
  };

  const handlebookUpdate = async (e) => {
    e.preventDefault();
    console.log(_bookId);
    const result = await dispatch(
      updatatingBook({
        bookId: _bookId,
        bookCred,
      })
    );
    if (updatatingBook.fulfilled.match(result)) {
      modalRef.current?.click();
    }
  };

  const openCreateModal = () => {
    setMode("create");
    setBookCred({ title: "", author: "", pages: 0 });
  };

  const openUpdateModal = (book) => {
    setMode("update");
    setBookCred(book);
    setBookId(book.id);
  };

  const onCreateFormSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(creatingBook({ userId: id, bookCred }));

    if (creatingBook.fulfilled.match(result)) {
      setBookCred({ title: "", pages: 0, author: "" }); // Clear form after success
      modalRef.current?.click(); // Close modal using ref
    }
  };

  useEffect(() => {
    const { id } = params;
    fetchUserWithBook(id);
  }, [id]);

  return (
    <div className="mt-3 container">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-light my-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={openCreateModal}
      >
        Create Book
      </button>
      <Modal
        mode={mode}
        bookCred={bookCred}
        ref={modalRef}
        title="Create Modal"
        buttons={
          mode === "create" ? ["Create Book", "Exit"] : ["Update Book", "Exit"]
        }
        onChangeHandler={onChangeHandler}
        onSubmit={mode === "create" ? onCreateFormSubmit : handlebookUpdate}
      />
      {loading && <p>Laoding</p>}
      <div className="container d-flex gap-3">
        {books.length > 0 &&
          books.map((book, index) => (
            <ListBook
              key={index}
              index={index}
              book={book}
              handleBookDelete={handleBookDelete}
              handlebookUpdate={() => openUpdateModal(book)}
            />
          ))}
      </div>
    </div>
  );
};

export default UserBooks;
