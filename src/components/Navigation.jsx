<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ConnectWallet from './ConnectWallet';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const { user, isAdmin, logout } = useAuth();
=======

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ConnectWallet from './ConnectWallet';
import { LogOut } from 'lucide-react';
import { toast } from "sonner";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status whenever the component mounts or updates
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const userEmail = localStorage.getItem('userEmail');
      
      setIsLoggedIn(loginStatus);
      setIsAdmin(userEmail === 'nafiakocks76@gmail.com');
    };

    checkLoginStatus();
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    navigate('/');
  };

>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
  return (
    <nav className="bg-gradient-to-r from-[#1A1F2C] to-[#221F26] shadow-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
<<<<<<< HEAD
                Holocene Films IP marketplace
=======
                ArtStyleAI
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/marketplace" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
<<<<<<< HEAD
              Film Market
=======
              Art Market
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
            </Link>
            <Link to="/market-insights" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Market Insights
            </Link>
<<<<<<< HEAD
            {isAdmin() && (
=======
            {isAdmin && (
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
              <Link to="/admin" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Admin Dashboard
              </Link>
            )}
            <Link to="/community" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Community
            </Link>
            <Link to="/dex" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
<<<<<<< HEAD
              Buy FilmTokens
            </Link>
            <ConnectWallet />
            {user ? (
              <Button 
                onClick={logout} 
                variant="outline" 
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
=======
              Buy Tokens
            </Link>
            <ConnectWallet />
            
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                className="border-red-500 text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
                Logout
              </Button>
            ) : (
              <>
                <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

<<<<<<< HEAD
export default Navigation;
=======
export default Navigation;
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
