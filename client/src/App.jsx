import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import Createcategory from "./pages/Admin/Createcategory";
import Product from "./pages/Admin/Product";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Profile from "./pages/Profile";
import HomeDash from "./pages/Admin/HomeDash";
import ErrorPage from "./pages/ErrorPage";
import Searcher from "./components/Searcher";
import UserDashboard from "./components/UserDashboard";
import ProductDetail from "./pages/ProductDetail";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/categorydemo" element={<ProductGrid />} /> */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/searcher" element={<Searcher />} />
      <Route path="/product/:slug" element={<ProductDetail />} />

      {/* User Dashboard */}
      <Route path="/userdash/*" element={<UserDashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Profile />} />
        <Route path="cart" element={< Profile />} />
      </Route>

      {/* Admin Dashboard */}
      <Route path="/admin/*" element={<AdminDashboard />}>
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />

        <Route path="create-category" element={<Createcategory />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="product/:slug" element={<UpdateProduct />} />
        <Route path="product" element={<Product />} />
        <Route path="homedash" element={<HomeDash />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
