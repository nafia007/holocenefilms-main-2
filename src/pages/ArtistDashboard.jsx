import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UploadCloud, Image, Eye, DollarSign, Paintbrush, Crop, Film, Link as LinkIcon, Coins } from 'lucide-react';
import { getThirdwebContract } from '../utils/thirdwebUtils';
import { useContract } from "@thirdweb-dev/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadFileToIPFS, uploadFilmWithMetadata, uploadUrlWithMetadata, getGatewayUrl } from '../utils/ipfsUtils';
import { useAuth } from "../contexts/AuthContext";

const ArtistDashboard = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [minting, setMinting] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [films, setFilms] = useState([]);
  const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
  const [filmUrl, setFilmUrl] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10); // Default 10%
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('feature');
  const { user } = useAuth();
  
  // Get contract instance
  const { contract: nftContract } = useContract("0xB07E087e690da81A96Bf7f6bd1Df33f835a501B7");
  
  // Mock data for the chart
  const revenueData = [
    { name: 'Jan', revenue: 500 },
    { name: 'Feb', revenue: 1500 },
    { name: 'Mar', revenue: 1000 },
    { name: 'Apr', revenue: 2000 },
    { name: 'May', revenue: 1800 },
    { name: 'Jun', revenue: 2500 },
  ];

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload successful",
        description: "Your artwork has been uploaded and is being analyzed.",
      });
      
      // Add new artwork to the list
      setArtworks([
        ...artworks,
        {
          id: Date.now(),
          title: e.target.title.value,
          description: e.target.description.value,
          thumbnail: URL.createObjectURL(e.target.artwork.files[0]),
          date: new Date().toLocaleDateString(),
          status: 'Processing',
        }
      ]);
      
      // Reset form
      e.target.reset();
    }, 2000);
  };

  const handleFilmUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Get form values
      const title = e.target.filmTitle.value;
      const description = e.target.filmDescription.value;
      const filmPrice = parseFloat(price);
      const royalty = parseInt(royaltyPercentage);
      
      // Validate inputs
      if (!title || !description || isNaN(filmPrice) || filmPrice <= 0) {
        throw new Error("Please fill in all required fields with valid values");
      }
      
      // Create base metadata
      const metadata = {
        name: title,
        description: description,
        properties: {
          price: filmPrice,
          royaltyPercentage: royalty,
          category: category,
          filmmaker: "Current User", // In a real app, get from auth context
          createdAt: new Date().toISOString(),
        }
      };
      
      let ipfsResult;
      let thumbnailUrl = '/placeholder.svg';
      
      // Upload to IPFS based on upload type
      if (uploadType === 'file' && e.target.filmFile.files.length > 0) {
        const filmFile = e.target.filmFile.files[0];
        
        // Show progress toast
        toast({
          title: "Uploading to IPFS",
          description: "Your film is being uploaded to IPFS. This may take a while...",
        });
        
        // Upload film file and metadata to IPFS
        ipfsResult = await uploadFilmWithMetadata(filmFile, metadata);
        
        // Create a local object URL for the thumbnail preview
        thumbnailUrl = URL.createObjectURL(filmFile);
      } else if (uploadType === 'url' && filmUrl) {
        // Validate URL
        try {
          new URL(filmUrl);
        } catch (e) {
          throw new Error("Please enter a valid URL");
        }
        
        // Upload URL reference and metadata to IPFS
        ipfsResult = await uploadUrlWithMetadata(filmUrl, metadata);
      } else {
        throw new Error("Please provide either a file or a valid URL");
      }
      
      // Create film data object with IPFS information
      const filmData = {
        id: Date.now(),
        title: title,
        description: description,
        price: filmPrice,
        royaltyPercentage: royalty,
        category: category,
        filmmaker: "Current User",
        date: new Date().toLocaleDateString(),
        status: 'Ready to Mint',
        thumbnail: thumbnailUrl,
        fileType: uploadType === 'file' ? 'video' : 'url',
        source: uploadType === 'file' ? 'ipfs' : filmUrl,
        metadataUri: ipfsResult.metadataUri,
        contentUri: ipfsResult.contentUri || null
      };
      
      // Add new film to the list
      setFilms([...films, filmData]);
      
      toast({
        title: "Film upload successful",
        description: "Your film has been uploaded to IPFS and is ready to mint as an NFT.",
      });
      
      // Reset form
      e.target.reset();
      setFilmUrl('');
      setPrice('');
      setRoyaltyPercentage(10);
      setCategory('feature');
      setUploadType('file');
    } catch (error) {
      console.error('Film upload error:', error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "Failed to upload film. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleMintNFT = async (film) => {
    if (!nftContract) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your wallet first",
      });
      return;
    }
    
    setMinting(true);
    try {
      // Get the contract instance
      const contract = await getThirdwebContract();
      
      // Check if we have the IPFS metadata URI
      if (!film.metadataUri) {
        throw new Error("Missing metadata URI. Please re-upload the film.");
      }
      
      // Call the contract's mint function with the IPFS metadata URI
      const tx = await contract.erc721.mintTo("Current User", film.metadataUri);
      
      toast({
        title: "NFT Minting Started",
        description: "Your NFT is being minted. Please wait for confirmation.",
      });
      
      // Wait for the transaction to be confirmed
      const receipt = await tx.wait();
      
      // Set up royalty distribution
      await contract.call('setRoyaltyInfo', [
        tx.id, // Use the token ID from the transaction
        film.filmmaker,
        film.royaltyPercentage * 100 // Convert percentage to basis points (10% = 1000)
      ]);
      
      // Update film status
      const updatedFilms = films.map(f => 
        f.id === film.id ? { 
          ...f, 
          status: 'Minted', 
          tokenId: tx.id,
          transactionHash: receipt.transactionHash 
        } : f
      );
      setFilms(updatedFilms);
      
      toast({
        title: "Success!",
        description: `NFT minted successfully! Transaction hash: ${receipt.transactionHash}`,
      });
    } catch (error) {
      // Handle error
      console.error('Minting error:', error);
      toast({
        variant: "destructive",
        title: "Minting Failed",
        description: error.message || "Failed to mint NFT. Please try again.",
      });
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">Artist Dashboard</h1>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="upload">Upload Art</TabsTrigger>
          <TabsTrigger value="upload-film">Upload Film</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Artwork</CardTitle>
              <CardDescription>
                Upload high-quality images of your artwork to be analyzed and tokenized.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (FILM)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="royaltyPercentage">Royalty Percentage</Label>
                    <Select value={royaltyPercentage.toString()} onValueChange={(value) => setRoyaltyPercentage(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select royalty percentage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="15">15%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                        <SelectItem value="25">25%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Film Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature">Feature Film</SelectItem>
                      <SelectItem value="short">Short Film</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="music">Music Video</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="artwork">Upload Artwork</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Input 
                      id="artwork" 
                      name="artwork"
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      required
                    />
                    <label htmlFor="artwork" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <UploadCloud className="h-10 w-10 text-gray-400" />
                        <span className="mt-2 text-sm font-medium">
                          Drag and drop an image, or click to browse
                        </span>
                        <span className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Artwork"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Style Tokenization Guide</CardTitle>
              <CardDescription>
                Learn how your artwork is analyzed and tokenized
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Image className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">1. Upload Your Art</h3>
                  <p className="text-sm text-muted-foreground">Upload high-quality images of your unique style</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Paintbrush className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">2. AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Our AI extracts the essence of your unique style</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-1">3. Earn Revenue</h3>
                  <p className="text-sm text-muted-foreground">Get paid when AI artists use your style</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload-film" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Film</CardTitle>
              <CardDescription>
                Upload your film or provide a URL to mint it as an NFT and sell it on the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFilmUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="filmTitle">Film Title</Label>
                  <Input id="filmTitle" name="filmTitle" placeholder="Enter the title of your film" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="filmDescription">Description</Label>
                  <Textarea 
                    id="filmDescription" 
                    name="filmDescription"
                    placeholder="Describe your film, including genre, plot, cast, and any other relevant details"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Upload Method</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`border rounded-md p-4 cursor-pointer ${uploadType === 'file' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-300'}`}
                      onClick={() => setUploadType('file')}
                    >
                      <div className="flex items-center space-x-2">
                        <Film className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">Upload File</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Upload your film file directly</p>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-4 cursor-pointer ${uploadType === 'url' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-300'}`}
                      onClick={() => setUploadType('url')}
                    >
                      <div className="flex items-center space-x-2">
                        <LinkIcon className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">Provide URL</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Link to your film hosted elsewhere</p>
                    </div>
                  </div>
                </div>
                
                {uploadType === 'file' ? (
                  <div className="space-y-2">
                    <Label htmlFor="filmFile">Upload Film File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Input 
                        id="filmFile" 
                        name="filmFile"
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        required={uploadType === 'file'}
                      />
                      <label htmlFor="filmFile" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <UploadCloud className="h-10 w-10 text-gray-400" />
                          <span className="mt-2 text-sm font-medium">
                            Drag and drop a video file, or click to browse
                          </span>
                          <span className="mt-1 text-xs text-gray-500">
                            MP4, MOV, AVI up to 500MB
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="filmUrl">Film URL</Label>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-5 w-5 text-gray-400" />
                      <Input
                        id="filmUrl"
                        placeholder="https://example.com/your-film-url"
                        value={filmUrl}
                        onChange={(e) => setFilmUrl(e.target.value)}
                        required={uploadType === 'url'}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter a valid URL to your film (YouTube, Vimeo, etc.)
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (FILM)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="royaltyPercentage">Royalty Percentage</Label>
                    <Select value={royaltyPercentage.toString()} onValueChange={(value) => setRoyaltyPercentage(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select royalty percentage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="10">10%</SelectItem>
                        <SelectItem value="15">15%</SelectItem>
                        <SelectItem value="20">20%</SelectItem>
                        <SelectItem value="25">25%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Film Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feature">Feature Film</SelectItem>
                      <SelectItem value="short">Short Film</SelectItem>
                      <SelectItem value="documentary">Documentary</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="music">Music Video</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                      Uploading to IPFS...
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Upload Film
                    </>
                  )}
                </Button>
                
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Film Portfolio</CardTitle>
              <CardDescription>Manage your uploaded films and NFTs</CardDescription>
            </CardHeader>
            <CardContent>
              {films.length === 0 ? (
                <div className="text-center py-8">
                  <Film className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">No films uploaded yet</h3>
                  <p className="text-sm text-muted-foreground">Upload your first film to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {films.map((film) => (
                    <Card key={film.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img 
                          src={film.thumbnail || '/placeholder.svg'} 
                          alt={film.title}
                          className="w-full h-full object-cover" 
                        />
                        <Badge 
                          className={`absolute top-2 right-2 ${film.status === 'Minted' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        >
                          {film.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium truncate">{film.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <Coins className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>{film.price} FILM</span>
                          </div>
                          <div className="text-sm text-muted-foreground">{film.date}</div>
                        </div>
                        {film.status === 'Ready to Mint' && (
                          <Button 
                            onClick={() => handleMintNFT(film)} 
                            className="w-full mt-3" 
                            disabled={minting}
                          >
                            {minting ? 'Minting...' : 'Mint as NFT'}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Track your earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your filmmaker profile and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue={user?.displayName || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea id="bio" rows={4} placeholder="Tell us about yourself and your work" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input id="walletAddress" defaultValue={user?.walletAddress || ''} disabled />
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};


export default ArtistDashboard;