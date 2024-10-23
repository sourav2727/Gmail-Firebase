import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "appslice",
  initialState: {
    open: false,
    emails: [],
    updateemail: null,
    searchText: null,
    usersignin: null,
  },
  reducers: {
    setopen: (state, action) => {
      state.open = action.payload;
    },
    setemails: (state, action) => {
      state.emails = action.payload.map(email => ({
        ...email,
        createdAt: email.createdAt.toDate().toISOString(), 
      }));
    },
    setupdateemail: (state, action) => {
      state.updateemail = action.payload;
    },
    setsearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setusersignin: (state, action) => {
      state.usersignin = action.payload;
    },
  },
});

export const {
  setopen,
  setemails,
  setupdateemail,
  setsearchText,
  setusersignin,
} = slice.actions;
export default slice.reducer;
