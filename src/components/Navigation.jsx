import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ConnectWallet from './ConnectWallet';

const Navigation = () => {
  return (
    <nav className="bg-gradient-to-r from-[#1A1F2C] to-[#221F26] shadow-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Holocene Films IP marketplace
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/marketplace" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Film Market
            </Link>
            <Link to="/market-insights" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Market Insights
            </Link>
            <Link to="/admin" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Admin Dashboard
            </Link>
            <Link to="/community" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Community
            </Link>
            <Link to="/dex" className="text-purple-200 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Buy FilmTokens
            </Link>
            <ConnectWallet />
            <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;