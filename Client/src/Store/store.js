import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./Admin/Products-Slice"



const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts : AdminProductsSlice,
    }
})

export default store;