import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isAuthenticated: false,
    isLoading: true,
    user : null,
}
export const registerUser = createAsyncThunk('/auth/register',
    async(formData)=>{
        const response = await axios.post('http://localhost:3000/api/auth/register', formData,{
            withCredentials: true,
        })
        return response.data
    }    
)
export const loginUser = createAsyncThunk(
    "/auth/login",  
    async (formData) => {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );  
    //   if (response.data.success) {
    //     sessionStorage.setItem('user', JSON.stringify(response.data.user));
    //   }
      return response.data;
    }
  );

export const check_Auth = createAsyncThunk('/auth/checkauth',
    async()=>{
        const response = await axios.get('http://localhost:3000/api/auth/check-auth',
            {
                withCredentials: true,
                headers: {
                  "Cache-Control":
                    "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
            })
            
        return response.data
    }    
)


const authSlice= createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser:()=>{
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state)=>{
            state.isLoading = false;
            state.user = null
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected, (state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;

        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user =action.payload.success? action.payload.user :null ;
            state.isAuthenticated = action.payload.success;
        }).addCase(loginUser.rejected, (state)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;            
        }).addCase(check_Auth.pending,(state)=>{
            state.isLoading = true;
        }).addCase(check_Auth.fulfilled, (state, action)=>{
            console.log('Auth Check Fulfilled:', action.payload);
            state.isLoading = false;
            state.user =action.payload.success? action.payload.user: null ;
            state.isAuthenticated = action.payload.success;
        }).addCase(check_Auth.rejected, (state, action)=>{
            console.log('Auth Check Failed:', action.payload);
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;       
        })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer