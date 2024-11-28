import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./Admin/Products-Slice"
import ShoppingProductSlice from "./Shop/Produts-Slice";
import ShopCartSlice from "./Shop/Cart-Slice"
import ShopAddressSlice from "./Shop/Address-Slice"



const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts : AdminProductsSlice,
        shopProducts : ShoppingProductSlice,
        shopCart : ShopCartSlice,
        shopAddress : ShopAddressSlice,

    }
})

export default store;