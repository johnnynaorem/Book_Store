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
