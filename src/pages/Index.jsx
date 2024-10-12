import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { getThirdwebContract } from '../utils/thirdwebUtils';

const Index = () => {
  const { contract } = useContract({
    contract: getThirdwebContract(),
  });
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">Welcome to ArtStyleAI</h1>
          <p className="text-xl text-white mb-8">
            Revolutionizing the intersection of traditional fine art and artificial intelligence
          </p>
          <div className="space-x-4 mb-8">
            <Button asChild>
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/artist-signup">Artist Sign Up</Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
            <h2 className="text-2xl font-bold mb-4">Featured NFT</h2>
            {isLoading ? (
              <p>Loading NFT...</p>
            ) : error ? (
              <p>Error loading NFT</p>
            ) : nft ? (
              <div>
                <ThirdwebNftMedia metadata={nft.metadata} className="mx-auto object-cover" />
                <p className="mt-2 text-lg font-semibold">{nft.metadata.name}</p>
              </div>
            ) : (
              <p>No NFT found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;