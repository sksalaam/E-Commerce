import { Route, Routes } from "react-router-dom";
import { AuthLayout, AdminLayout, ShoppingLayout } from "./Layouts";
import { Register, Login } from "./Pages/Auth";
import { Orders, Dashboard, Products } from "./Pages/Admin";
import { Home, Account, Listing, Checkout } from "./Pages/Shopping";
import CheckAuth from "./Components/Common/CheckAuth";
import UnAuth from "./Pages/UnAuth/UnAuth";
import { useSelector } from "react-redux";

function App() {
  const {user, isAuthenticated} = useSelector(state => state.auth)
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
          <Route path="orders" element={<Orders />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
          <Route index element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="listing" element={<Listing />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="/unauth" element={<UnAuth />} />
      </Routes>
    </div>
  );
}

export default App;
