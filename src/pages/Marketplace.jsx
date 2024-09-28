import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NFTPurchaseModal from '../components/NFTPurchaseModal';

const ArtStyleCard = ({ style, onPurchase }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={style.imageUrl} alt={style.title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{style.title}</h3>
      <p className="text-sm text-gray-600">by {style.artist}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">{style.price} CRYPTO</span>
        <Button onClick={() => onPurchase(style)}>Purchase NFT</Button>
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const dummyStyles = [
    { id: 1, title: "Futuristic Warrior", artist: "AI Artist 1", price: 0.5, imageUrl: "https://i.imgur.com/Ky4Yl0e.png" },
    { id: 2, title: "Urban Nostalgia", artist: "AI Artist 2", price: 0.3, imageUrl: "https://i.imgur.com/Ky4Yl0e.png" },
    { id: 3, title: "Cosmic Ascension", artist: "AI Artist 3", price: 0.7, imageUrl: "https://i.imgur.com/Ky4Yl0e.png" },
  ];

  const handlePurchase = (style) => {
    setSelectedStyle(style);
    setIsPurchaseModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ArtStyle Marketplace</h1>
      <div className="mb-8">
        <Input type="text" placeholder="Search for art styles..." className="w-full max-w-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyStyles.map((style) => (
          <ArtStyleCard key={style.id} style={style} onPurchase={handlePurchase} />
        ))}
      </div>
      <NFTPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        artStyle={selectedStyle}
      />
    </div>
  );
};

export default Marketplace;