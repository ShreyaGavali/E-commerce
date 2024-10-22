import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import AdminHome from './admin/pages/home/AdminHome';
import UserList from './admin/pages/userList/UserList';
import User from './admin/pages/user/User';
import NewUser from './admin/pages/newUser/NewUser';
import AdminProductList from './admin/pages/adminProductList/AdminProductList';
import AdminProduct from './admin/pages/adminProduct/AdminProduct';
import NewProduct from './admin/pages/newProduct/NewProduct';
import Topbar from './admin/components/topbar/Topbar';
import Sidebar from './admin/components/sidebar/Sidebar';



const App = () => {
  let admin = false;  // Default value if no valid data is found

  // Safely parse the localStorage data
  const storedData = localStorage.getItem("persist:root");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      const currentUser = parsedData && JSON.parse(parsedData.user);
      admin = currentUser && currentUser.currentUser && currentUser.currentUser.isAdmin;
    } catch (error) {
      console.error("Error reading admin data from localStorage:", error);
    }
  }
  return (
    <>
      {admin ? (<>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/admin/" element={<AdminHome />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/user/:userId" element={<User />} />
            <Route path="/admin/newUser" element={<NewUser />} />
            <Route path="/admin/products" element={<AdminProductList />} />
            <Route path="/admin/product/:productId" element={<AdminProduct />} />
            <Route path="/admin/newProduct" element={<NewProduct />} />
          </Routes>
        </div>
      </>
      ) : (
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:category' element={<ProductList />} />
            <Route path='/products/singleproduct/:id' element={<Product />} />
            <Route path='/cart/:id' element={<Cart />} />
            <Route path='/order' element={<Success />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App