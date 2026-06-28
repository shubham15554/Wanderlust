import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Building, Trees, Waves, Flame, Compass, Bed, Upload, Image as ImageIcon } from "lucide-react";

export default function CreateListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); 
  const [aiLoading, setAiLoading] = useState(false);
  const [listingData, setListingData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    category: "Trending", 
  });
  const [image, setImage] = useState(null);

  
  const categories = [
    { name: "Trending", icon: <Flame size={20} /> },
    { name: "Rooms", icon: <Bed size={20} /> },
    { name: "Iconic Cities", icon: <Compass size={20} /> },
    { name: "Mountains", icon: <Trees size={20} /> },
    { name: "Pools", icon: <Waves size={20} /> },
    { name: "Farms", icon: <Building size={20} /> },
  ];

  const handleChange = (e) => {
    setListingData({ ...listingData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleAIGenerate = async () => {
    if (!image) {
      return toast.error("Please upload an image first so AI can look at it!");
    }

    setAiLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("https://wanderlust-1-5v1d.onrender.com/generate-description", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data && res.data.description) {
        setListingData((prev) => ({ ...prev, description: res.data.description }));
        toast.success("AI Description Generated! ✨");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to generate AI description");
    } finally {
      setAiLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload an image!");
     
    setLoading(true);
    const formData = new FormData();
    Object.keys(listingData).forEach(key => formData.append(key, listingData[key]));
    formData.append("image", image);

    try {
      const res = await axios.post("https://wanderlust-1-5v1d.onrender.com/listings/new", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Property Listed Successfully! 🎉");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center font-sans">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300">
        
        {/* हेडर */}
        <div className="text-center mb-10">
          <span className="text-rose-500 font-bold text-xs uppercase tracking-widest bg-rose-50 px-3 py-1.5 rounded-full">Host your space</span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mt-3">Become a Host</h2>
          <p className="mt-2 text-sm text-gray-500">Share your place's vibe with travelers worldwide.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
         
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">Select Property Category</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setListingData({ ...listingData, category: cat.name })}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    listingData.category === cat.name
                      ? "border-rose-500 bg-rose-50/50 text-rose-600 font-semibold scale-105 shadow-xs"
                      : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-800"
                  }`}
                >
                  {cat.icon}
                  <span className="text-[11px] mt-1.5 truncate w-full">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>


          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Property Title</label>
            <input
              type="text"
              name="title"
              value={listingData.title}
              onChange={handleChange}
              placeholder="e.g., Luxury Glass Cabin with Private Pool"
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-gray-800 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Upload Cover Photo</label>
            
            <div className="relative group border-2 border-dashed border-gray-300 rounded-2xl hover:border-rose-400 transition-all duration-200 overflow-hidden min-h-[180px] flex flex-col justify-center items-center bg-gray-50/50 p-4">
              
              {imagePreview ? (
               
                <div className="absolute inset-0 w-full h-full">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all duration-200">
                    <p className="text-white text-xs font-semibold bg-white/20 backdrop-blur-xs px-4 py-2 rounded-full border border-white/40">Change Photo</p>
                  </div>
                </div>
              ) : (
             
                <div className="text-center cursor-pointer pointer-events-none">
                  <Upload className="mx-auto text-gray-400 group-hover:text-rose-500 transition-colors mb-2 animate-pulse" size={32} />
                  <p className="text-sm font-medium text-gray-700">Click to upload property image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                required={!imagePreview}
              />
            </div>
          </div>


          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Description</label>
            <textarea
              name="description"
              value={listingData.description}
              onChange={handleChange}
              rows="4"
              placeholder="What makes your place special? Mention amenities like fast WiFi, views, or bonfire setups..."
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-gray-800 transition resize-none"
              required
            />

            <button 
              type="button" 
              onClick={handleAIGenerate}
              disabled={aiLoading}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 mt-2 mb-4 text-sm font-semibold rounded-xl border border-pink-200/60 bg-gradient-to-r from-rose-50/50 via-indigo-50/30 to-amber-50/40 text-gray-800 transition-all duration-300 hover:scale-102 hover:border-pink-300 hover:shadow-[0_4px_15px_rgba(244,63,94,0.08)] active:scale-99 cursor-pointer ${
                aiLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {aiLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-rose-600/80 font-medium animate-pulse">AI is writing...</span>
                </>
              ) : (
                <>
                
                  <span className="bg-gradient-to-r from-rose-500 via-indigo-500 to-amber-500 bg-clip-text text-transparent text-base font-bold animate-pulse">
                    ✨
                  </span>
                  <span className="bg-gradient-to-r from-gray-900 via-rose-950 to-indigo-950 bg-clip-text text-transparent font-bold tracking-wide">
                    Generate with AI
                  </span>
                </>
              )}
            </button>`
          </div>
          

        
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Price / Night (₹)</label>
              <input
                type="number"
                name="price"
                min="0"
                value={listingData.price}
                onChange={handleChange}
                placeholder="2499"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-gray-800 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">City / Location</label>
              <input
                type="text"
                name="location"
                value={listingData.location}
                onChange={handleChange}
                placeholder="Goa"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-gray-800 transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Country</label>
              <input
                type="text"
                name="country"
                value={listingData.country}
                onChange={handleChange}
                placeholder="India"
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-gray-800 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-base font-bold rounded-xl hover:from-rose-600 hover:to-pink-700 active:scale-[0.99] transition-all shadow-[0_10px_20px_rgba(244,63,94,0.2)] focus:outline-none cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Publishing your listing...</span>
              </div>
            ) : (
              "Publish My Property"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}