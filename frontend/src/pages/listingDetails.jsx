import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Globe, Share, Heart, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import ListingReviews from './listingReviews';
import { toast } from 'react-toastify';
import MapComponent from '../components/mapComponenet';
export default function ListingDetail() {
  const { id } = useParams(); 
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function onReviewSubmit(reviewData) {
    
    try{
      let res = await axios.post(`https://wanderlust-1-5v1d.onrender.com/listings/reviews/new/${id}`, {rating: reviewData.rating, comment: reviewData.comment} , {withCredentials: true  });
      console.log("Review submitted:", res.data);
      toast.success("Review submitted successfully.");
      await fetchListingDetails();
    }
    catch(e){
      console.log("Error submitting review:", e);
      toast.error("Error submitting review.");
    }


  }

  async function onReviewDelete(reviewId) {
    try{
      let res = await axios.delete(`https://wanderlust-1-5v1d.onrender.com/listings/${id}/reviews/${reviewId}`, {withCredentials: true});
      console.log("Review deleted:", res.data);
      toast.success("Review deleted successfully.");
      await fetchListingDetails(); 
    }
    catch(e){
      console.log("Error deleting review:", e);
      toast.error("Error deleting review.");
    }
  }

  const fetchListingDetails = async () => {
      try {
        const response = await axios.get(`https://wanderlust-1-5v1d.onrender.com/listings/${id}`);
        setListing(response.data);
        console.log("Fetched listing details:", response.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchListingDetails();
    }, [id]);  

  if (loading) {
    return <div className="text-center py-20 font-semibold text-gray-500 animate-pulse">Loading amazing place...</div>;
  }

  if (!listing) {
    return <div className="text-center py-20 text-rose-500">Listing not found!</div>;
  }

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      

      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-black font-medium text-sm transition">
          <ChevronLeft size={18} /> Back to home
        </Link>
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-800">
          <button className="flex items-center gap-1 hover:underline"><Share size={16} /> Share</button>
          <button className="flex items-center gap-1 hover:underline"><Heart size={16} /> Save</button>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700 mb-6">
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-black text-black" />
          <span>4.9 ·</span>
          <span className="underline cursor-pointer text-gray-500 font-normal">14 reviews</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-gray-500" />
          <span>{listing.location}, {listing.country}</span>
        </div>
      </div>

      <div className="w-full h-[300px] sm:h-[450px] overflow-hidden rounded-2xl bg-gray-100 shadow-sm mb-8">
        <img 
          src={listing.image?.url || listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
    
        <div className="md:col-span-2 space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Entire cottage hosted by Premium Host</h2>
            <p className="text-gray-500 text-sm">4 guests · 2 bedrooms · 2 beds · 1.5 bathrooms</p>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">About this space</h3>
            <p className="text-gray-600 leading-relaxed text-[15px]">{listing.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm font-medium">
              <div className="flex items-center gap-3">🌊 Beach access</div>
              <div className="flex items-center gap-3">📶 Free WiFi</div>
              <div className="flex items-center gap-3">🚗 Free parking</div>
              <div className="flex items-center gap-3">❄️ Air conditioning</div>
            </div>
          </div>
        </div>


        <div className="md:col-span-1">
          <div className="border rounded-2xl p-6 shadow-xl bg-white sticky top-28 border-gray-200">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">₹{Number(listing.price).toLocaleString('en-IN')}</span>
                <span className="text-gray-500 text-sm"> night</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold">
                <Star size={14} className="fill-black text-black" />
                <span>4.9</span>
              </div>
            </div>

            <div className="border rounded-xl mb-4 text-xs font-bold text-gray-800 divide-y">
              <div className="grid grid-cols-2 divide-x">
                <div className="p-3">CHECK-IN<p className="font-normal text-gray-500 mt-0.5">24/05/2026</p></div>
                <div className="p-3">CHECKOUT<p className="font-normal text-gray-500 mt-0.5">31/05/2026</p></div>
              </div>
              <div className="p-3">GUESTS<p className="font-normal text-gray-500 mt-0.5">1 guest</p></div>
            </div>

            
            <button className="w-full bg-rose-500 text-white font-semibold py-3 rounded-xl hover:bg-rose-600 active:scale-[0.98] transition cursor-pointer text-center">
              Reserve Place
            </button>
            
            <p className="text-center text-gray-500 text-xs mt-3">You won't be charged yet</p>
          </div>
        </div>

      </div>

        <ListingReviews listing={listing} onReviewSubmit={onReviewSubmit} onReviewDelete={onReviewDelete} />
        <MapComponent coordinates={listing?.geometry?.coordinates} location={listing.location}  />

    </div>
  );
}