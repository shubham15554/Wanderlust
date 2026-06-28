import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ListingCard({ listing }) {
  const [isLiked, setIsLiked] = useState(false);

  const backupImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80";

  return (
    <div className="group relative flex flex-col cursor-pointer max-w-[320px] mx-auto w-full">
      
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm">
        <Link to={`/listings/${listing._id}`}>
          <img
            src={listing.image?.url || backupImage}
            alt={listing.title}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

       
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-1.5 bg-transparent active:scale-90 transition duration-150 cursor-pointer z-10"
        >
          <Heart 
            size={24} 
            className={`transition-all duration-300 ${
              isLiked 
                ? 'fill-rose-500 text-rose-500 scale-110' 
                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'
            }`} 
          />
        </button>
      </div>

      <div className="mt-3 flex flex-col text-sm">
        
        <div className="flex items-center justify-between font-semibold text-gray-900">
          <h3 className="truncate max-w-[80%] text-[15px]">
            {listing.location}, {listing.country}
          </h3>
          <div className="flex items-center gap-1 font-normal text-gray-800 text-[13px]">
            <Star size={14} className="fill-black text-black" />
            <span>4.9</span> 
          </div>
        </div>

       
        <p className="text-gray-500 text-[13px] truncate mt-0.5 font-normal">
          {listing.title}
        </p>

    
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="font-bold text-[15px] text-gray-900">
            ₹{Number(listing.price).toLocaleString('en-IN')}
          </span>
          <span className="text-gray-500 font-normal text-xs">night</span>
        </div>

      </div>
    </div>
  );
}