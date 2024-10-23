import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./slice";

const store = configureStore({
    reducer: {
        appslice: sliceReducer 
    }
});

export default store;
