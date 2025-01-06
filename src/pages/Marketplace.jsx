import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NFTPurchaseModal from '../components/NFTPurchaseModal';
import SocialChatAndRating from '../components/SocialChatAndRating';
import { getThirdwebContract } from '../utils/thirdwebUtils';

const FilmCard = ({ film, onPurchase, onSelect }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={film.imageUrl} alt={film.title} className="w-full h-64 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{film.title}</h3>
      <p className="text-sm text-gray-600">by {film.filmmaker}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-lg font-bold">{film.price} CRYPTO</span>
        <Button onClick={() => onPurchase(film)}>Purchase NFT</Button>
      </div>
      <Button onClick={() => onSelect(film)} className="mt-2 w-full">View Details</Button>
    </div>
  </div>
);

const Marketplace = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      const thirdwebContract = await getThirdwebContract();
      setContract(thirdwebContract);
    };
    initContract();
  }, []);

  const dummyFilms = [
    { id: 1, title: "The Last Journey", filmmaker: "Director 1", price: 0.5, imageUrl: "/placeholder.svg" },
    { id: 2, title: "Urban Tales", filmmaker: "Director 2", price: 0.3, imageUrl: "/placeholder.svg" },
    { id: 3, title: "Beyond Tomorrow", filmmaker: "Director 3", price: 0.7, imageUrl: "/placeholder.svg" },
  ];

  const handlePurchase = (film) => {
    setSelectedFilm(film);
    setIsPurchaseModalOpen(true);
  };

  const handleSelectFilm = (film) => {
    setSelectedFilm(film);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Holocene Films Marketplace</h1>
      <div className="mb-8">
        <Input type="text" placeholder="Search for films..." className="w-full max-w-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyFilms.map((film) => (
          <FilmCard 
            key={film.id} 
            film={film} 
            onPurchase={handlePurchase}
            onSelect={handleSelectFilm}
          />
        ))}
      </div>
      {selectedFilm && (
        <SocialChatAndRating styleId={selectedFilm.id} />
      )}
      <NFTPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        artStyle={selectedFilm}
      />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">NFT Marketplace</h2>
        <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xB07E087e690da81A96Bf7f6bd1Df33f835a501B7&chain=%7B%22name%22%3A%22Polygon+Mainnet%22%2C%22chain%22%3A%22Polygon%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F137.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22POL%22%2C%22symbol%22%3A%22POL%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22matic%22%2C%22chainId%22%3A137%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22polygon%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRNqgazYuxUa5WdddFPftTWiP3KwzBMgV9Z19QWnLMETc%22%2C%22width%22%3A2000%2C%22height%22%3A2000%2C%22format%22%3A%22png%22%7D%7D&clientId=61c6a87659a28faeff906ed86e7ab9cb&theme=dark&primaryColor=purple"
          width="100%"
          height="750px"
          style={{ maxWidth: '100%' }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Marketplace;