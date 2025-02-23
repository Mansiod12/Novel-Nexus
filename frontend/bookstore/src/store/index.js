import { configureStore } from "@reduxjs/toolkit"; // Correct import
import authReducer from "./auth"; 

const store = configureStore({
    reducer: {
        auth: authReducer, 
    },
});

export default store;
