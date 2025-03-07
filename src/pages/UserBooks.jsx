import React, { useEffect, useState } from "react";
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

const UserBooks = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { books, loading, error } = useSelector((state) => state.book);
  const fetchUserWithBook = async (userId) => {
    const res = await getUserBook(userId);
    if (res?.status === 200) {
      dispatch(setBooks(res.data.books));
    }
  };
  const handleBookDelete = async (bookId) => {
    dispatch(deletingBook(bookId));
  };
  const handlebookUpdate = async (bookId) => {
    dispatch(
      updatatingBook({
        bookId,
        bookCred: { title: "React Guide Update", author: "John Doe" },
      })
    );
  };
  useEffect(() => {
    const { id } = params;
    fetchUserWithBook(id);
  }, []);

  const bookCreateHandler = async () => {
    dispatch(
      creatingBook({
        userId: id,
        bookCred: { title: "React Guide", author: "John Doe" },
      })
    );
  };
  return (
    <div>
      <button className="btn btn-info" onClick={bookCreateHandler}>
        Create Book
      </button>
      {loading && <p>Laoding</p>}
      <div className="container d-flex gap-3">
        {books.length > 0 &&
          books.map((book, index) => (
            <ListBook
              key={index}
              index={index}
              book={book}
              handleBookDelete={handleBookDelete}
              handlebookUpdate={handlebookUpdate}
            />
          ))}
      </div>
    </div>
  );
};

export default UserBooks;
