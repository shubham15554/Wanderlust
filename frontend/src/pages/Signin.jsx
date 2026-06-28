import React, { useState , useContext ,} from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleLogin , handleGoogleLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };
  



  const handleGoogleClick = async ()=>{
    try{
      let msg = handleGoogleLogin();
     
    }
    catch(err){
      console.log(err);
      toast.error("Somethng went wrong");
    }
  }

  const validateForm = () => {
    let localErrors = {};
    if (!formData.email.trim()) {
      localErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      localErrors.email = 'Invalid email address';
    }
    if (formData.password.length < 6) {
      localErrors.password = 'Password must be at least 6 characters';
    }
    return localErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try{
      
       let res =  await handleLogin(formData.email , formData.password  );
       const from = location.state?.from?.pathname || "/";
       toast.success("Login successful!");
       navigate("/");
       console.log(res);
       
       
      }
      catch(e){
        console.error("Error during signin:", e);
        toast.error("Invalid credentials");
      }
    }
  };


  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
    
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
        
        <div className="border-b border-gray-100 py-4 px-6 text-center relative">
          <h1 className="text-md font-bold text-gray-800">Welcome to Airbnb</h1>
        </div>

        <div className="p-6">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="rounded-xl border border-gray-300 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-black focus-within:border-black transition duration-200">

              <div className="relative border-b border-gray-200 px-3 py-2.5 bg-white">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com" 
                  className="w-full bg-transparent text-sm text-gray-800 focus:outline-none mt-0.5 placeholder-gray-300"
                />
              </div>

              <div className="relative px-3 py-2.5 bg-white flex items-center justify-between">
                <div className="w-full">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Password</label>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="w-full bg-transparent text-sm text-gray-800 focus:outline-none mt-0.5 placeholder-gray-300"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-black p-1 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            </div>

            {(errors.email || errors.password) && (
              <div className="text-xs text-rose-500 bg-rose-50 p-3 rounded-lg space-y-0.5">
                {errors.email && <p>• {errors.email}</p>}
                {errors.password && <p>• {errors.password}</p>}
              </div>
            )}

            <p className="text-[11px] text-gray-500 leading-tight">
              We'll call or text you to confirm your number. Standard message and data rates apply. 
              <span className="font-semibold underline cursor-pointer ml-1">Privacy Policy</span>
            </p>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 hover:opacity-95 transition cursor-pointer active:scale-[0.99]"
            >
              Continue
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="space-y-2.5">
            <button className="w-full py-2.5 border border-gray-300 hover:border-black rounded-xl font-semibold text-xs text-gray-700 flex items-center justify-center gap-2 transition cursor-pointer bg-white" onClick={handleGoogleClick} >
              
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.7 12.3c0-.8-.1-1.7-.2-2.5H12v4.8h6.6c-.3 1.5-1.1 2.8-2.4 3.7v3.1h3.9c2.3-2.1 3.6-5.2 3.6-9.1z"/>
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3.1c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.8-2.1-6.8-5H1.2v3.2C3.2 21.4 7.3 24 12 24z"/>
                <path fill="#FBBC05" d="M5.2 14.2c-.3-.8-.4-1.7-.4-2.7s.1-1.9.4-2.7V5.6H1.2C.4 7.2 0 9.1 0 11s.4 3.8 1.2 5.4l4-3.2z"/>
                <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.2 2.6 1.2 6.6l4 3.2c1-2.9 3.6-5 6.8-5z"/>
              </svg>
              Continue with Google
            </button>

          </div>

          
          <div className="mt-5 text-center text-sm text-gray-600">
            Create a new account?{' '}
            <Link to="/signup" className="text-black font-semibold underline hover:text-gray-700 transition">
              Sign up
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}