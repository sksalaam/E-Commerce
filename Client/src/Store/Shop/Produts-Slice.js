import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
  isLoading:false,
  productList:[]
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts',
  async ()=>{
     const result = await axios.get('http://localhost:3000/api/shop/products/get');
     return result?.data;
  }
)



const ShoppingProductSlice = createSlice({
  name:'shoppingProducts',
  initialState,
  reducers :{

  },
  extraReducers:(builder)=>{
     builder.addCase(fetchAllFilteredProducts.pending,(state, action)=>{
      state.isLoading = true;
     }).addCase(fetchAllFilteredProducts.fulfilled,(state, action)=>{
      state.isLoading = false;
      state.productList = action.payload.data;
     }).addCase(fetchAllFilteredProducts.rejected,(state, action)=>{
      state.isLoading = false;
      state.productList = [];
     })
  }
})

export default ShoppingProductSlice.reducer;
