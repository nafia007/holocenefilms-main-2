import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-purple-600">ArtStyleAI</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/marketplace" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              Marketplace
            </Link>
            <Link to="/artist-profile" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              Artist Profile
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              Community
            </Link>
            <Link to="/dex" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
              Buy StyleTokens
            </Link>
            <Button asChild variant="outline" className="ml-4">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="ml-2">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;