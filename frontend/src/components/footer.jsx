import React from "react";
import { Globe, IndianRupee, MessageCircle, Share2, Component } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-20">
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-200 text-sm">
        
        <div className="space-y-3">
          <h5 className="font-bold text-gray-900">Support</h5>
          <ul className="space-y-2 text-gray-600 font-normal">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">AirCover</li>
            <li className="hover:underline cursor-pointer">Anti-discrimination</li>
            <li className="hover:underline cursor-pointer">Disability support</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="font-bold text-gray-900">Hosting</h5>
          <ul className="space-y-2 text-gray-600 font-normal">
            <li className="hover:underline cursor-pointer">Airbnb your home</li>
            <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
            <li className="hover:underline cursor-pointer">Hosting resources</li>
            <li className="hover:underline cursor-pointer">Community forum</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="font-bold text-gray-900">Wanderlust</h5>
          <ul className="space-y-2 text-gray-600 font-normal">
            <li className="hover:underline cursor-pointer">Newsroom</li>
            <li className="hover:underline cursor-pointer">New features</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Investors</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h5 className="font-bold text-gray-900">Terms & Policy</h5>
          <ul className="space-y-2 text-gray-600 font-normal">
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Terms of Service</li>
            <li className="hover:underline cursor-pointer">Sitemap</li>
            <li className="hover:underline cursor-pointer">UK Modern Slavery Act</li>
          </ul>
        </div>

      </div>

 
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-normal">
          <span>© {new Date().getFullYear()} Wanderlust, Inc.</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span>·</span>
          <span className="hover:underline cursor-pointer">Sitemap</span>
        </div>

        <div className="flex items-center gap-6 font-semibold text-gray-800">
        
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 hover:underline cursor-pointer">
              <Globe size={16} /> English (IN)
            </button>
            <button className="flex items-center gap-0.5 hover:underline cursor-pointer">
              <IndianRupee size={16} /> INR
            </button>
          </div>

          <div className="flex items-center gap-4 text-gray-900">
            
            <div className="flex items-center gap-4 text-gray-900">
            <MessageCircle size={18} className="hover:scale-110 transition cursor-pointer" /> 
            <Share2 size={18} className="hover:scale-110 transition cursor-pointer" />        
            <Component size={18} className="hover:scale-110 transition cursor-pointer" />     
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
}