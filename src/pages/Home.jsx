import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import ListBook from "../components/ListBook";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { deletingBook, fetchBook } from "../store/slices/bookSlice";

export default function Home() {
  const { username, userId } = useSelector((state) => state.user);
  const { books, loading, error } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBookDelete = async (bookId) => {
    alert("Are You Sure!!!!");
    dispatch(deletingBook(bookId));
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token !== "") {
      const decodedData = jwtDecode(token);
      dispatch(setUser(decodedData));
      dispatch(fetchBook());
    }
  }, []);
  return (
    <main>
      <Navbar />
      <div className="container d-flex gap-3 mt-5">
        {books.length > 0 &&
          books.map((book, index) => (
            <ListBook
              title="home"
              key={index}
              index={index}
              book={book}
              handleBookDelete={handleBookDelete}
            />
          ))}
      </div>
    </main>
  );
}
