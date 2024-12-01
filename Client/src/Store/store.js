import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth-slice/index";
import AdminProductsSlice from "./Admin/Products-Slice"
import ShoppingProductSlice from "./Shop/Produts-Slice";
import ShopCartSlice from "./Shop/Cart-Slice"
import ShopAddressSlice from "./Shop/Address-Slice"
import ShopOrderSlice from "./Shop/Order-Slice"
import AdminOrderSlice from "./Admin/Order-Slice"
import ShopSearchSlice from "./Shop/Search-Slice"
import ShopReviewSlice from "./Shop/Review-Slice"
import CommonFeature from "./Common/Image-Slice"



const store = configureStore({
    reducer:{
        auth:authReducer,

        adminProducts : AdminProductsSlice,
        adminOrder: AdminOrderSlice,
        
        shopProducts : ShoppingProductSlice,
        shopCart : ShopCartSlice,
        shopAddress : ShopAddressSlice,
        shopOrder : ShopOrderSlice,
        shopSearch : ShopSearchSlice,
        shopReview : ShopReviewSlice,
        commonFeature : CommonFeature,

    }
})

export default store;