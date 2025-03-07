import axios from "axios";
const urlBase = "http://localhost:3000";

export const fetchAllBook = async () => {
  try {
    const response = await axios.get(`${urlBase}/book/get-books`);
    return response;
  } catch (error) {
    alert("Some error occur while fetching all books");
  }
};

export const deleteBook = async (bookId) => {
  try {
    const response = await axios.delete(`${urlBase}/book/${bookId}`);
    return response;
  } catch (error) {
    alert("Some error occur while deleting book");
  }
};

export const createBook = async (userId, bookCred) => {
  try {
    const response = await axios.post(
      `${urlBase}/book/create-book/${userId}`,
      bookCred
    );
    return response;
  } catch (error) {
    alert("Error while creating book");
  }
};

export const updateBook = async (userId, bookCred) => {
  try {
    const response = await axios.patch(`${urlBase}/book/${userId}`, bookCred);
    return response;
  } catch (error) {
    alert("Error while updating book");
  }
};
