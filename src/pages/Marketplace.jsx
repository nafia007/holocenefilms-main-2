import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ArtStyleCard = ({ title, artist, price, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">by {artist}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">${price}</span>
        <Button>Purchase</Button>
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const dummyStyles = [
    { id: 1, title: "Vibrant Abstracts", artist: "Jane Doe", price: 49.99, imageUrl: "https://example.com/image1.jpg" },
    { id: 2, title: "Minimalist Landscapes", artist: "John Smith", price: 39.99, imageUrl: "https://example.com/image2.jpg" },
    { id: 3, title: "Digital Surrealism", artist: "Alice Johnson", price: 59.99, imageUrl: "https://example.com/image3.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">ArtStyle Marketplace</h1>
      <div className="mb-8">
        <Input type="text" placeholder="Search for art styles..." className="w-full max-w-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyStyles.map((style) => (
          <ArtStyleCard key={style.id} {...style} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;