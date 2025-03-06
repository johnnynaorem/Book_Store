import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import { deleteBook, fetchAllBook } from "../api/book.controller";
import ListBook from "../components/ListBook";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";

export default function Home() {
  const { username, userId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchingBook = async () => {
    const responseBook = await fetchAllBook();
    if (responseBook?.status === 200) {
      setBooks(responseBook.data);
    }
  };

  const handleBookDelete = async (bookId) => {
    alert("Are You Sure!!!!");
    console.log(bookId);
    const response = await deleteBook(bookId);
    if (response?.status === 200) {
      console.log(response);
      fetchingBook();
    }
  };

  const btnDashBoardHandler = () => {
    navigate("/dashboard", {
      state: {
        username,
        userId,
      },
    });
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token !== "") {
      const decodedData = jwtDecode(token);
      dispatch(setUser(decodedData));
      fetchingBook();
    }
  }, []);
  return (
    <main>
      <Navbar />
      <div>
        Hello {username} {userId}
      </div>
      <button className="btn btn-info" onClick={btnDashBoardHandler}>
        Dashboard
      </button>
      <button onClick={logOutHandler}>Log out</button>
      <div className="container d-flex gap-3">
        {books.length > 0 &&
          books.map((book, index) => (
            <ListBook
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
