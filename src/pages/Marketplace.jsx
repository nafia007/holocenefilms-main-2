import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, SortAsc, Info, Share2, User, ChevronDown, ChevronUp, Users } from "lucide-react";
import NFTPurchaseModal from '../components/NFTPurchaseModal';
import SocialChatAndRating from '../components/SocialChatAndRating';
import FilmmakerProfile from '../components/FilmmakerProfile';
import FilmFilterPanel from '../components/FilmFilterPanel';
import FilmDetailsModal from '../components/FilmDetailsModal';
import CollaborativeProjectsPanel from '../components/CollaborativeProjectsPanel';
import { getThirdwebContract } from '../utils/thirdwebUtils';
import { ConnectWallet, useContract, useNFTBalance } from "@thirdweb-dev/react";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_FILMS } from "../data/mockFilms";

const FilmCard = ({ film, onPurchase, onSelect, onMint, onShare, onViewFilmmaker, onViewDetails }) => (
  <Card className="w-full transition-all hover:shadow-lg bg-white/10 backdrop-blur-lg border-purple-500/20">
    <CardHeader>
      <CardTitle className="text-lg text-purple-100">{film.title}</CardTitle>
      <CardDescription className="text-purple-200">by {film.filmmaker}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="relative h-48 w-full mb-4 group">
        <img 
          src={film.imageUrl} 
          alt={film.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.svg";
          }}
          className="absolute inset-0 w-full h-full object-cover rounded-md transition-transform group-hover:scale-105"
        />
        {film.metadata && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="ghost" className="text-white" onClick={() => onViewDetails(film)}>
              <Info className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        )}
      </div>
      <p className="text-sm text-purple-200 mb-4">{film.description}</p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-purple-100">{film.price} FILM</span>
          {film.royaltyPercentage && (
            <span className="text-sm text-purple-300 ml-2">
              {film.royaltyPercentage}% Royalty
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={() => onViewFilmmaker(film)} className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <User className="h-4 w-4 mr-1" />
            Profile
          </Button>
          <Button variant="outline" onClick={() => onShare(film)} className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button onClick={() => onViewDetails(film)} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <Info className="h-4 w-4 mr-1" />
            Details
          </Button>
          <Button onClick={() => onPurchase(film)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Purchase NFT
          </Button>
          <Button onClick={() => onMint(film)} variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">
            Mint NFT
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Marketplace = () => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isFilmmakerProfileOpen, setIsFilmmakerProfileOpen] = useState(false);
  const [isFilmDetailsOpen, setIsFilmDetailsOpen] = useState(false);
  const [selectedFilmmaker, setSelectedFilmmaker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isCollaborativeOpen, setIsCollaborativeOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: [0, 1000],
    categories: [],
    royaltyRange: [0, 30],
    releaseDate: 'all',
    filmmakerVerified: false,
    exclusiveContent: false
  });
  const { toast } = useToast();
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const { user, filmmakerProfiles } = useAuth();

  // Get contract instance
  const { contract: nftContract } = useContract("0xB07E087e690da81A96Bf7f6bd1Df33f835a501B7");
  // Only call useNFTBalance when we have a valid selectedFilm with tokenId
  const { data: nftBalance } = selectedFilm?.tokenId ? useNFTBalance(nftContract, selectedFilm.tokenId) : { data: null };

  // Import mock film data
// Move this import to the top of the file with other imports

  useEffect(() => {
    // Use mock data instead of fetching from contract
    const loadMockData = async () => {
      try {
        setIsLoading(true);
        // Set films to mock data
        setFilms(MOCK_FILMS);
        toast({
          title: "Marketplace Loaded",
          description: "Successfully loaded film marketplace data",
        });
      } catch (error) {
        console.error('Error loading mock data:', error);
        toast({
          variant: "destructive",
          title: "Loading Error",
          description: "Failed to load marketplace data",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadMockData();
  }, [toast]);

  // This function is kept for reference but not used with mock data
  const fetchFilms = async (contract) => {
    console.log('Using mock data instead of fetching from contract');
    // In a real implementation, this would fetch from the blockchain
    // For now, we're using the mock data imported above
  };

  const handleMint = async (film) => {
    try {
      // Simulate minting with mock data
      toast({
        title: "NFT Minting Started",
        description: "Your NFT is being minted. Please wait for confirmation.",
      });

      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful minting
      toast({
        title: "Success!",
        description: `NFT minted successfully! Token ID: ${film.tokenId}`,
      });

      // No need to refresh films list with mock data
    } catch (error) {
      console.error('Minting error:', error);
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error.message || "Failed to mint NFT. Please try again.",
      });
    }
  };

  const handleShare = (film) => {
    const shareUrl = `${window.location.origin}/film/${film.tokenId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "Share link has been copied to clipboard.",
    });
  };
  
  const handlePurchase = (film) => {
    setSelectedFilm(film);
    setIsPurchaseModalOpen(true);
    
    // Log purchase attempt for demonstration
    console.log(`Purchase initiated for film: ${film.title} (${film.tokenId})`);
  };
  
  const handleViewDetails = (film) => {
    setSelectedFilm(film);
    setIsFilmDetailsOpen(true);
  };
  
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };
  
  const toggleCollaborativePanel = () => {
    setIsCollaborativeOpen(!isCollaborativeOpen);
  };
  
  const handleApplyAdvancedFilters = (filters) => {
    setAdvancedFilters(filters);
    // If sortBy is included in the filters, update it
    if (filters.sortOrder) {
      setSortBy(filters.sortOrder);
    }
    toast({
      title: "Filters Applied",
      description: "The marketplace has been filtered according to your preferences.",
    });
  };
  
  const handleResetFilters = () => {
    setAdvancedFilters({
      priceRange: [0, 1000],
      categories: [],
      royaltyRange: [0, 30],
      releaseDate: 'all',
      filmmakerVerified: false,
      exclusiveContent: false
    });
    setSortBy('recent');
    setFilterBy('all');
    setSearchTerm('');
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values.",
    });
  };

  const filteredAndSortedFilms = films
    // Basic category filter
    .filter(film => {
      if (filterBy === 'all') return true;
      return film.category === filterBy;
    })
    // Text search filter
    .filter(film =>
      film.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      film.filmmaker.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // Advanced filters
    .filter(film => {
      // Price range filter
      const filmPrice = parseFloat(film.price) || 0;
      if (filmPrice < advancedFilters.priceRange[0] || filmPrice > advancedFilters.priceRange[1]) {
        return false;
      }
      
      // Category filter (if categories are selected)
      if (advancedFilters.categories.length > 0) {
        const filmCategory = film.category || film.metadata?.properties?.category || '';
        if (!advancedFilters.categories.includes(filmCategory.toLowerCase())) {
          return false;
        }
      }
      
      // Royalty range filter
      const royaltyPercentage = film.royaltyPercentage || 0;
      if (royaltyPercentage < advancedFilters.royaltyRange[0] || royaltyPercentage > advancedFilters.royaltyRange[1]) {
        return false;
      }
      
      // Release date filter
      if (advancedFilters.releaseDate !== 'all') {
        const createdAt = film.metadata?.properties?.createdAt;
        if (createdAt) {
          const filmDate = new Date(createdAt);
          const now = new Date();
          
          if (advancedFilters.releaseDate === 'week') {
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (filmDate < oneWeekAgo) return false;
          } else if (advancedFilters.releaseDate === 'month') {
            const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            if (filmDate < oneMonthAgo) return false;
          } else if (advancedFilters.releaseDate === 'year') {
            const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            if (filmDate < oneYearAgo) return false;
          }
        }
      }
      
      // Verified filmmaker filter
      if (advancedFilters.filmmakerVerified) {
        const isVerified = filmmakerProfiles && filmmakerProfiles[film.filmmaker];
        if (!isVerified) return false;
      }
      
      // Exclusive content filter
      if (advancedFilters.exclusiveContent) {
        // Check if film has exclusive content flag in metadata
        const isExclusive = film.metadata?.properties?.exclusive || false;
        if (!isExclusive) return false;
      }
      
      return true;
    })
    // Sorting
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'royalty') return b.royaltyPercentage - a.royaltyPercentage;
      if (sortBy === 'popularity') {
        // Sort by a combination of views and sales (mock data for now)
        const aPopularity = (a.metadata?.properties?.views || 0) + (a.metadata?.properties?.sales || 0);
        const bPopularity = (b.metadata?.properties?.views || 0) + (b.metadata?.properties?.sales || 0);
        return bPopularity - aPopularity;
      }
      return b.tokenId - a.tokenId; // recent first
    });

  // Handle viewing filmmaker profile
  const handleViewFilmmaker = (film) => {
    const filmmakerName = film.filmmaker || 'Unknown';
    console.log('Opening profile for filmmaker:', filmmakerName);
    
    // Create a featured work object from the current film
    const currentFilmWork = { 
      title: film.title || 'Featured Work', 
      imageUrl: film.imageUrl || '/placeholder.svg' 
    };
    
    // Create a basic profile with the filmmaker name and any available metadata
    const basicProfile = {
      name: filmmakerName,
      avatarUrl: film.imageUrl || '/placeholder.svg',
      bio: film.description || 'No biography available for this filmmaker.',
      location: 'Location not specified',
      website: '',
      twitter: '',
      instagram: '',
      specialties: film.category ? [film.category] : [],
      awards: [],
      featuredWorks: [currentFilmWork],
      joinedDate: new Date().toLocaleDateString(),
      rating: film.royaltyPercentage ? parseFloat((film.royaltyPercentage/2).toFixed(1)) : 0,
      totalSales: 0
    };
    
    // Check if we have the filmmaker profile in our context
    if (filmmakerProfiles && Object.keys(filmmakerProfiles).length > 0) {
      // Try to find an exact match first
      const filmmaker = filmmakerProfiles[filmmakerName];
      
      if (filmmaker) {
        console.log('Found exact match for filmmaker profile:', filmmaker);
        // Add the current film to featured works without duplicates
        const existingWorks = filmmaker.featuredWorks || [];
        const workExists = existingWorks.some(work => work.title === currentFilmWork.title);
        const updatedWorks = workExists ? existingWorks : [...existingWorks, currentFilmWork];
        
        setSelectedFilmmaker({
          ...filmmaker, 
          featuredWorks: updatedWorks
        });
        setIsFilmmakerProfileOpen(true);
        return;
      }
      
      // If no exact match, try to find a close match
      const availableFilmmakers = Object.keys(filmmakerProfiles);
      const closestMatch = availableFilmmakers.find(name => 
        name.toLowerCase().includes(filmmakerName.toLowerCase()) || 
        filmmakerName.toLowerCase().includes(name.toLowerCase())
      );
      
      if (closestMatch) {
        console.log('Found close match for filmmaker profile:', closestMatch);
        const matchedProfile = filmmakerProfiles[closestMatch];
        // Add the current film to featured works without duplicates
        const existingWorks = matchedProfile.featuredWorks || [];
        const workExists = existingWorks.some(work => work.title === currentFilmWork.title);
        const updatedWorks = workExists ? existingWorks : [...existingWorks, currentFilmWork];
        
        setSelectedFilmmaker({
          ...matchedProfile, 
          name: filmmakerName, // Use the name from the film
          featuredWorks: updatedWorks
        });
        setIsFilmmakerProfileOpen(true);
        return;
      }
    }
    
    // If we reach here, we couldn't find a matching profile
    // Use John Doe as a fallback profile for demonstration
    if (filmmakerProfiles && filmmakerProfiles['John Doe']) {
      console.log('Using John Doe as fallback profile');
      const johnDoeProfile = filmmakerProfiles['John Doe'];
      // Add the current film to featured works
      const existingWorks = johnDoeProfile.featuredWorks || [];
      const updatedWorks = [...existingWorks, currentFilmWork];
      
      setSelectedFilmmaker({
        ...johnDoeProfile, 
        name: filmmakerName, // Use the name from the film
        featuredWorks: updatedWorks
      });
      setIsFilmmakerProfileOpen(true);
      toast({
        title: "Using demo profile",
        description: "Showing a sample filmmaker profile with your film included."
      });
    } else {
      // Use the basic profile we created
      console.log('Creating basic profile for filmmaker');
      setSelectedFilmmaker(basicProfile);
      setIsFilmmakerProfileOpen(true);
      toast({
        title: "Filmmaker Profile",
        description: "Viewing profile for " + filmmakerName + "."
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Film IP Marketplace
          </h1>
          <div className="flex items-center gap-4">
            <ConnectWallet />
            {user?.isFilmmaker && (
              <Button 
                onClick={toggleCollaborativePanel} 
                variant="outline" 
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                <Users className="h-4 w-4 mr-2" />
                Collaborative Projects
              </Button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              <Input
                type="text"
                placeholder="Search films..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-100 placeholder-purple-300"
              />
            </div>
            <Button
              onClick={toggleFilterPanel}
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {isFilterPanelOpen ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-100">
                <SortAsc className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white/10 backdrop-blur-lg border-purple-500/20">
                <SelectItem value="recent" className="text-purple-200">Most Recent</SelectItem>
                <SelectItem value="price-asc" className="text-purple-200">Price: Low to High</SelectItem>
                <SelectItem value="price-desc" className="text-purple-200">Price: High to Low</SelectItem>
                <SelectItem value="title" className="text-purple-200">Title</SelectItem>
                <SelectItem value="royalty" className="text-purple-200">Highest Royalty</SelectItem>
                <SelectItem value="popularity" className="text-purple-200">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Advanced Filter Panel */}
        {isFilterPanelOpen && (
          <div className="mb-8">
            <FilmFilterPanel 
              onApplyFilters={handleApplyAdvancedFilters} 
              onResetFilters={handleResetFilters} 
              initialFilters={advancedFilters}
            />
          </div>
        )}
        
        {/* Collaborative Projects Panel */}
        {isCollaborativeOpen && (
          <div className="mb-8">
            <CollaborativeProjectsPanel />
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-purple-200">Loading marketplace...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedFilms.map((film) => (
              <FilmCard
                key={film.tokenId}
                film={film}
                onPurchase={handlePurchase}
                onSelect={setSelectedFilm}
                onMint={handleMint}
                onShare={handleShare}
                onViewFilmmaker={handleViewFilmmaker}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Purchase Modal */}
        {selectedFilm && (
          <NFTPurchaseModal
            isOpen={isPurchaseModalOpen}
            onClose={() => setIsPurchaseModalOpen(false)}
            artStyle={selectedFilm}
          />
        )}
        
        {/* Film Details Modal */}
        {selectedFilm && (
          <FilmDetailsModal
            isOpen={isFilmDetailsOpen}
            onClose={() => setIsFilmDetailsOpen(false)}
            film={selectedFilm}
          />
        )}
        
        {/* Filmmaker Profile Dialog */}
        <Dialog open={isFilmmakerProfileOpen} onOpenChange={setIsFilmmakerProfileOpen}>
          <DialogContent className="max-w-3xl bg-gray-900/95 border-purple-500/30 shadow-xl p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-2xl font-bold text-purple-100">Filmmaker Profile</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] px-6">
              <div className="py-4">
                {selectedFilmmaker ? (
                  <FilmmakerProfile filmmaker={selectedFilmmaker} />
                ) : (
                  <div className="p-4 text-center text-purple-200">
                    <p>Loading filmmaker profile...</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Marketplace;
