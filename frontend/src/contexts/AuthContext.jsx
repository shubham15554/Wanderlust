import { useState, useEffect, createContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {useGoogleLogin} from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [loading, setLoading] = useState(true); 
  let navigate = useNavigate();
  
  useEffect(() => {
    const checkUserOnRefresh = async () => {
      try {
        const res = await axios.get("https://wanderlust-1-5v1d.onrender.com/auth/profile", { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);
        }
        else {
          console.log("No active session found");
          setUser(null);
        }
      } catch (err) {
        console.log("No active session found");
        setUser(null);
      } finally {
        
        setLoading(false); 
      }
    };
    checkUserOnRefresh();
  }, []);

  const handleRegister = async (name, email, password) => {
    try {
      setLoading(true);
      let res = await axios.post("https://wanderlust-1-5v1d.onrender.com/auth/signup", { name, email, password }, { withCredentials: true });

      if (res.data.success) {
        setUser(res.data.newUser);
        return res.data.message;
      } else {
        throw new Error(res.data.error);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      let res = await axios.post("https://wanderlust-1-5v1d.onrender.com/auth/signin", { email, password }, { withCredentials: true });
      if (res.data.success) {
        setUser(res.data.user);
        return res.data.message; 
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleResponse = async (authresult) => {
      try {
        setLoading(true);
        const code = authresult.code;

        const res = await axios.post(
          "http://localhost:8000/auth/googleAuth",
          {
            code: code,
          },
          { withCredentials: true }
        );
        
        if(res.data.success){
          setUser(res.data.user);
          toast.success("Welcome to Wanderlust!");
          navigate("/");
          
        }
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: 'auth-code'
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, handleRegister, handleLogin, handleGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};