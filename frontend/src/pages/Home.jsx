import React, { useState, useEffect } from "react"; 
import ListingCard from "../components/listingcard";
import axios from "axios"; 

function Home() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true); 

    
    useEffect(() => {
        const fetchListings = async () => {
            try {
                let res = await axios.get("https://wanderlust-1-5v1d.onrender.com/listings", { withCredentials: true });
                console.log(res.data);
                setListings(res.data);
            } catch (e) {
                console.error("API Fetch Error:", e);
            } finally {
                setLoading(false); 
            }
        };

        fetchListings(); 
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-gray-500 font-semibold animate-pulse">
                Loading properties...
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
         
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-10">
                {listings.length > 0 ? (
                    listings.map((list) => {
                        return (
                            <ListingCard 
                                key={list._id || list.title} 
                                listing={list} 
                            />
                        );
                    })
                ) : (
                    <div className="text-center col-span-full py-10 text-gray-500">
                        No listings found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;