import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSclice'; 

const store = configureStore({
    reducer: {
        auth: authReducer, 
    }
});

export default store;