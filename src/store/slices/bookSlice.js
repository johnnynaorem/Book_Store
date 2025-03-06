import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteBook, fetchAllBook } from "../../api/book.controller";

export const fetchBook = createAsyncThunk("fetching/book", async () => {
  const responseBook = await fetchAllBook();
  return responseBook.data;
});

export const deletingBook = createAsyncThunk("delete/book", async (bookId) => {
  const response = await deleteBook(bookId);
  return response;
});

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
      });
  },
});

export default bookSlice.reducer;
