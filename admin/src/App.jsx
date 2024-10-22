import React,{useState} from 'react'
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';

const App = () => {
  // const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;

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
      {admin ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newProduct" element={<NewProduct />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} /> {/* Redirect to login if not admin */}
        </Routes>
      )}
    </>
  );
}

export default App