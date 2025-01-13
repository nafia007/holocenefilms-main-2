import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, SortAsc } from "lucide-react";
import NFTPurchaseModal from '../components/NFTPurchaseModal';
import SocialChatAndRating from '../components/SocialChatAndRating';
import { getThirdwebContract } from '../utils/thirdwebUtils';
import { ThirdwebProvider, ConnectWallet } from "@thirdweb-dev/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: "61c6a87659a28faeff906ed86e7ab9cb"
});

const FilmCard = ({ film, onPurchase, onSelect, onMint }) => (
  <Card className="w-full transition-all hover:shadow-lg">
    <CardHeader>
      <CardTitle className="text-lg">{film.title}</CardTitle>
      <CardDescription>by {film.filmmaker}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="relative h-48 w-full mb-4">
        <img 
          src={film.imageUrl} 
          alt={film.title} 
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
      </div>
      <p className="text-sm text-gray-600 mb-4">{film.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{film.price} FILM</span>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => onSelect(film)}>Details</Button>
          <Button onClick={() => onPurchase(film)}>Purchase NFT</Button>
          <Button onClick={() => onMint(film)} variant="secondary">Mint NFT</Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Marketplace = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const { toast } = useToast();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        const thirdwebContract = await getThirdwebContract();
        setContract(thirdwebContract);
        toast({
          title: "Connected to marketplace",
          description: "Successfully connected to the NFT marketplace contract",
        });
      } catch (error) {
        console.error('Contract initialization error:', error);
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Failed to connect to the marketplace contract",
        });
      }
    };
    initContract();
  }, [toast]);

  const handleMint = async (film) => {
    try {
      if (!contract) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please connect your wallet first",
        });
        return;
      }

      // Call the contract's mint function
      const tx = await contract.erc721.mint({
        name: film.title,
        description: film.description,
        image: film.imageUrl,
        properties: {
          filmmaker: film.filmmaker,
          price: film.price
        }
      });

      toast({
        title: "NFT Minting Started",
        description: "Your NFT is being minted. Please wait for confirmation.",
      });

      // Wait for the transaction to be confirmed
      const receipt = await tx.wait();

      toast({
        title: "Success!",
        description: `NFT minted successfully! Transaction hash: ${receipt.transactionHash}`,
      });
    } catch (error) {
      console.error('Minting error:', error);
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error.message || "Failed to mint NFT. Please try again.",
      });
    }
  };

  const dummyFilms = [
    {
      id: 1,
      title: "The Last Journey",
      filmmaker: "Director 1",
      price: 0.5,
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "A groundbreaking sci-fi adventure that pushes the boundaries of visual storytelling.",
      category: "sci-fi"
    },
    {
      id: 2,
      title: "Urban Tales",
      filmmaker: "Director 2",
      price: 0.3,
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      description: "A collection of interconnected stories exploring modern city life.",
      category: "drama"
    },
    {
      id: 3,
      title: "Beyond Tomorrow",
      filmmaker: "Director 3",
      price: 0.7,
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      description: "An innovative documentary about future technologies and their impact.",
      category: "documentary"
    },
  ];

  const handlePurchase = (film) => {
    setSelectedFilm(film);
    setIsPurchaseModalOpen(true);
  };

  const handleSelectFilm = (film) => {
    setSelectedFilm(film);
    toast({
      title: "Film Selected",
      description: `Now viewing details for ${film.title}`,
    });
  };

  const filteredAndSortedFilms = dummyFilms
    .filter(film => {
      if (filterBy === 'all') return true;
      return film.category === filterBy;
    })
    .filter(film =>
      film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film.filmmaker.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.id - a.id; // recent first
    });

  return (
    <ThirdwebProvider client={client}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold">Film IP Marketplace</h1>
          <div className="flex items-center gap-4">
            <ConnectWallet />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search films..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedFilms.map((film) => (
            <FilmCard 
              key={film.id} 
              film={film} 
              onPurchase={handlePurchase}
              onSelect={handleSelectFilm}
              onMint={handleMint}
            />
          ))}
        </div>

        {selectedFilm && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Community Discussion</h2>
            <SocialChatAndRating styleId={selectedFilm.id} />
          </div>
        )}

        <NFTPurchaseModal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
          artStyle={selectedFilm}
        />
      </div>
    </ThirdwebProvider>
  );
};

export default Marketplace;
