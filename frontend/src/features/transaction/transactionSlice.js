import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./transactionAPI";
// initial state

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
  editing: {},
};

// async thunk

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async () => {
    const data = await API.fetchTransactionAPI();
    return data;
  }
);
export const addTransaction = createAsyncThunk(
  "transaction/addTransaction",
  async (data) => {
    const response = await API.addTransactionAPI(data);
    return response;
  }
);
export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id) => {
    const response = await API.deleteTransactionAPI(id);
    return response;
  }
);
export const editTransaction = createAsyncThunk(
  "transaction/editTransaction",
  async ({ data, id }) => {
    const response = await API.editTransactionAPI(data, id);
    return response;
  }
);

// slice
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    activeEditing(state, action) {
      state.editing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(addTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[index] = action.payload;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
export const { activeEditing } = transactionSlice.actions;
