import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, Menu, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../assets/logo.svg'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AuthContext);
  function handleClick() {
    let res = axios.post("https://wanderlust-1-5v1d.onrender.com/auth/logout", {}, { withCredentials: true })
      .then(res => {
        console.log("Logged out successfully:", res.data);
        toast("Logged out successfully.");
        window.location.href = "/"; 
      })
      .catch(err => {
        console.error("Error during logout:", err);
        toast("Error logging out. Please try again.");
      });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-50 px-4 md:px-12 h-20 flex items-center justify-between transition-all">
      

      <div className="hidden md:flex items-center text-rose-500 font-bold text-xl cursor-pointer tracking-tight select-none">
        <img src={logo} alt="Wanderlust Logo" className="h-8 w-auto" />
          <span className=" text-2xl font-extrabold tracking-tighter">
            <Link to="/">&nbsp; Wanderlust</Link>
          </span>      
      
      </div>

     
      <div className="flex items-center border border-gray-200 rounded-full pl-5 pr-2 py-1.5 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-gray-300 transition duration-200 bg-white w-full max-w-xs md:max-w-sm">
  
       
        <input 
            type="text" 
            placeholder="Search destinations..." 
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none pr-2 font-normal"
        />
        
        <button 
            type="button" 
            className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition cursor-pointer flex-shrink-0 shadow-sm"
        >
            <Search size={14} strokeWidth={3} />
            <span className="hidden sm:inline">Search</span>
        </button>

      </div>
      
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <Link 
          to="/createListing" 
          className="hidden lg:block text-sm font-semibold text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-full transition text-center"
        >
          Become a host
        </Link>
        {/* <div className="p-3 hover:bg-gray-50 rounded-full cursor-pointer text-gray-700 transition hidden sm:block">
          <Globe size={18} />
        </div> */}
        
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 border border-gray-200 rounded-full p-2 pl-3 hover:shadow-md transition bg-white cursor-pointer relative"
        >
          <Menu size={18} className="text-gray-600" />
          <div className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center overflow-hidden bg-gradient-to-r from-gray-400 to-gray-500">
            <User size={18} fill="currentColor" />
          </div>
        </button>

   
        {isOpen && (

        <div className="absolute right-0 top-14 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          { !user  && <Link to="/signup" className="px-4 py-2.5 text-sm font-normal text-gray-800 hover:bg-gray-50 transition block">Sign up</Link>}        
          { !user &&  <Link to="/signin" className="px-4 py-2.5 text-sm font-normal text-gray-800 hover:bg-gray-50 transition block">Log in</Link>}
          <Link to="/createListing" className="px-4 py-2.5 text-sm font-normal text-gray-800 hover:bg-gray-50 transition block">Become a host</Link>
          <button className="px-4 py-2.5 text-sm font-normal text-gray-600 hover:bg-gray-50 transition text-left w-full cursor-pointer">Help Center</button>
          { user && <button className="px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-gray-50 transition text-left w-full cursor-pointer" onClick={handleClick}>Log out</button>}    
         </div>
        )}
      </div>

    </nav>
  );
}