import React, { useEffect, useState , useContext } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function ListingReviews({ listing, onReviewSubmit, onReviewDelete }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    console.log(listing);
    e.preventDefault();
    if (!comment.trim()) return;
    console.log("review submmitted by " , user)
    onReviewSubmit({ rating, comment });
    setComment(""); 
  };


  return (
    <div className="border-t border-gray-200 mt-10 pt-10">

      <div className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
        <Star size={22} className="fill-amber-500 text-amber-500" />
        <span>4.9 · {listing.reviews?.length || 0} reviews</span>
      </div>

      {user && <form onSubmit={handleSubmit} className="max-w-xl mb-10 space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <h4 className="font-semibold text-gray-800 text-base">Leave a Review</h4>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setRating(num)}
                className="cursor-pointer transition transform active:scale-95"
              >
                <Star 
                  size={20} 
                  className={num <= rating ? "fill-amber-500 text-amber-500" : "text-gray-300"} 
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience about this place..."
            className="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black resize-none"
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-rose-500 hover:bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer">
          Submit Review
        </button>
      </form>
}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {listing.reviews && listing.reviews.length > 0 ? (
          listing.reviews.map((rev) => (
            <div key={rev._id} className="space-y-2 border-b md:border-none pb-4 md:pb-0">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                    {rev.author?.name?.[0]?.toUpperCase() || "G"}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900">{rev.author?.name || "Anonymous Guest"}</h5>
                    <p className="text-xs text-gray-500">
                      {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {user && user._id === rev.author?._id && (
                  <button 
                    onClick={() => onReviewDelete(rev._id)}
                    className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="flex gap-0.5">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-normal">
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm font-normal col-span-full">No reviews yet. Be the first to review this property!</p>
        )}
      </div>

    </div>
  );
}