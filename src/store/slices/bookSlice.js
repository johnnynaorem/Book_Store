import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBook,
  deleteBook,
  fetchAllBook,
  updateBook,
} from "../../api/book.controller";

export const fetchBook = createAsyncThunk("fetching/book", async () => {
  const responseBook = await fetchAllBook();
  return responseBook.data;
});

export const deletingBook = createAsyncThunk("delete/book", async (bookId) => {
  const response = await deleteBook(bookId);
  return response;
});

export const creatingBook = createAsyncThunk(
  "create/book",
  async ({ userId, bookCred }) => {
    const response = await createBook(userId, bookCred);
    return response.data;
  }
);

export const updatatingBook = createAsyncThunk(
  "update/book",
  async ({ bookId, bookCred }) => {
    const response = await updateBook(bookId, bookCred);
    return response;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deletingBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletingBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((b) => b.id !== action.meta.arg);
      })
      .addCase(deletingBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(creatingBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(creatingBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(creatingBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updatatingBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatatingBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.map((book) => {
          return book.id == action.meta.arg.bookId
            ? { ...book, ...action.meta.arg.bookCred }
            : book;
        });
      })
      .addCase(updatatingBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setBooks } = bookSlice.actions;

export default bookSlice.reducer;
