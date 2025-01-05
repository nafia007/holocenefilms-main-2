import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { getThirdwebContract } from '../utils/thirdwebUtils';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const { contract } = useContract({
    contract: getThirdwebContract(),
  });
  const { data: nft, isLoading, error } = useNFT(contract, "0");

  const renderNFTContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-[200px] w-[300px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load NFT. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (!nft) {
      return (
        <Alert>
          <AlertTitle>No NFT Found</AlertTitle>
          <AlertDescription>
            There are currently no featured NFTs available.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src="data:image/png;base64,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" 
          alt={nft?.metadata.name}
          className="w-full h-auto rounded-lg mb-4"
        />
        <p className="mt-2 text-lg font-semibold">{nft?.metadata.name}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">Welcome to Holocene Films IP marketplace</h1>
          <p className="text-xl text-white mb-8">
            Revolutionizing the intersection of traditional fine art and artificial intelligence
          </p>
          <div className="space-x-4 mb-12">
            <Button asChild className="bg-white text-purple-600 hover:bg-gray-100">
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/artist-signup">Artist Sign Up</Link>
            </Button>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl inline-block">
            <h2 className="text-2xl font-bold mb-6 text-white">Featured NFT</h2>
            {renderNFTContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;