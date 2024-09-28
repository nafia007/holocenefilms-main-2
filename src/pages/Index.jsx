import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">Welcome to ArtStyleAI</h1>
          <p className="text-xl text-white mb-8">
            Revolutionizing the intersection of traditional fine art and artificial intelligence
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/artist-signup">Artist Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;