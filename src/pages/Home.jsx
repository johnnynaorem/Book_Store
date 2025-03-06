import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import { deleteBook, fetchAllBook } from "../api/book.controller";
import ListBook from "../components/ListBook";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
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
    navigate("/dashboard");
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    // console.log(token);
    if (token !== "") {
      const decodedData = jwtDecode(token);
      setUser(decodedData);
      fetchingBook();
    }
  }, []);
  return (
    <main>
      <Navbar />
      {user ? <div>Hello {user.username}</div> : <p>Loading</p>}
      <button className="btn btn-info" onClick={btnDashBoardHandler}>
        Dashboard
      </button>

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
