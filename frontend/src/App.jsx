import { useState } from 'react'
import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Signin from './pages/Signin';
import { AuthProvider } from './contexts/AuthContext';
import ListingDetail from './pages/listingDetails';
import Footer from './components/footer';
import ProtectedRoute from './utils/protectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import CreateListing from './pages/createListing';
import {GoogleOAuthProvider} from '@react-oauth/google';

function App() {

  return (
    <>
      
      <Router>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" /> 
            <Navbar/>
            <Routes>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/signin" element={<Signin/>} />
              <Route path="/createListing" element={
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              } />
              <Route path="/listings/:id" element={<ListingDetail/>} />
              <Route path="/" element={<Home/>} />
            </Routes>
            <Footer/>
          </AuthProvider>
        </GoogleOAuthProvider>
      </Router>
    </>
  )
}

export default App
