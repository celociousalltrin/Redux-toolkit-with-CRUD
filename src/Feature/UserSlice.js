import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Data from "../MockData/Data";

export const GetData = createAsyncThunk("user/GetData", async () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) =>
      res.data.map((item, index) => Object.assign(item, Data[index]))
    )
    .catch((err) => console.log(err));
});


export const UserSlice = createSlice({
  name: "user",
  initialState: { value: [] } ,

  reducers: {
    addAuthor: (state, action) => {
      state.value.push(action.payload);
    },

    updateAuthor: (state, action) => {
      state.value.map((item) => {
        if (item.userId === action.payload.userId) {
           item.name = action.payload.name;
        }
      });
    },

    deleteAuthor: (state, action) => {
      state.value = state.value.filter(
        (item) => item.userId !== action.payload.userId
      );
    },

    addAuthorBook: (state, action) => {
      state.value.push(action.payload);
    },

    deleteAuthorBook: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
  },

  extraReducers: {
    [GetData.pending]: () => {
      console.log("pending");
    },
    [GetData.fulfilled]: (state, action) => {
      return { ...state, value: action.payload };
    },
    [GetData.rejected]: () => {
      console.log("rejected");
    },
  },
});


export default UserSlice.reducer;
export const {
  addAuthor,
  deleteAuthor,
  updateAuthor,
  addAuthorBook,
  deleteAuthorBook,
} = UserSlice.actions;