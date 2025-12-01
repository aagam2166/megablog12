import React, { useEffect, useState } from 'react';  // ✅ added useEffect, useState
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
// ✅ make sure these exist
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";


import { Outlet } from 'react-router-dom'; // ✅ if you're using nested routes

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return null;

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet /> {/* ✅ fixed the comment and braces */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
