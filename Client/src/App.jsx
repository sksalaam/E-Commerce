import { Route, Routes } from "react-router-dom";
import { AuthLayout, AdminLayout, ShoppingLayout } from "./Layouts";
import { Register, Login } from "./Pages/Auth";
import {  Dashboard, Products } from "./Pages/Admin";
import { Home, Account, Listing, Checkout } from "./Pages/Shopping";
import CheckAuth from "./Components/Common/CheckAuth";
import UnAuth from "./Pages/UnAuth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { check_Auth } from "./Store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"
import AdminOrders from "./Pages/Admin/Orders";
import PaypalReturnPage from "./Pages/Shopping/Paypal-Return";
import PaymentSuccessPage from "./Pages/Shopping/Payment-Success";


function App() {
  const {user, isAuthenticated, isLoading} = useSelector(state => state.auth);
  
  const dispatch = useDispatch();

  useEffect(()=>{ 
    dispatch(check_Auth())
  },[dispatch]);
  
  if (isLoading) return <Skeleton className="w-[800] h-[600] bg-black rounded-full" />



  return (
   
     <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<AdminOrders />} />
         
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          {/* <Route path="search" element={<SearchProducts />} /> */}
        </Route>
        <Route path="/unAuth" element={<UnAuth />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
