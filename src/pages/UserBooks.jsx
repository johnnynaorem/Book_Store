import React, { useEffect, useState } from "react";
import { getUserBook } from "../api/user.controller";
import ListBook from "../components/ListBook";
import { useParams } from "react-router-dom";

const UserBooks = () => {
  const params = useParams();
  const [userBooks, setUserBooks] = useState([]);
  const fetchUserWithBook = async (userId) => {
    const res = await getUserBook(userId);
    if (res?.status === 200) {
      setUserBooks(res.data.books);
    }
  };
  const handleBookDelete = async (bookId) => {};
  useEffect(() => {
    const { id } = params;
    fetchUserWithBook(id);
  }, []);
  return (
    <div>
      <p>hi</p>
      <div className="container d-flex gap-3">
        {userBooks.length > 0 &&
          userBooks.map((book, index) => (
            <ListBook
              key={index}
              index={index}
              book={book}
              handleBookDelete={handleBookDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default UserBooks;
