import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import Product from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Profile from "./pages/Profile";
import HomeDash from "./pages/Admin/HomeDash";
import ErrorPage from "./pages/ErrorPage";
import Searcher from "./components/Searcher";
import UserDashboard from "./components/UserDashboard";
import ProductDetail from "./pages/ProductDetail";
import CreateCategory from "./pages/Admin/Createcategory";
import AdminRoute from "./pages/AdminRoute";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* Common Routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/searcher" element={<Searcher />} />
      <Route path="/product/:slug" element={<ProductDetail />} />

      {/* User Dashboard */}
      <Route path="/userdash/*" element={<UserDashboard />}>
        <Route path="profile" element={<Profile />} />
        {/* <Route path="orders" element={<Orders />} />
        <Route path="cart" element={<Cart />} /> */}
      </Route>

      {/* Admin Dashboard - Protected */}
      <Route path="/admin/*" element={<AdminRoute />}>
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="product/:slug" element={<UpdateProduct />} />
        <Route path="product" element={<Product />} />
        <Route path="homedash" element={<HomeDash />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
