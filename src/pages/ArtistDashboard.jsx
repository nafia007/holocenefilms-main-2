
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UploadCloud, Image, Eye, DollarSign, Paintbrush, Crop } from 'lucide-react';

const ArtistDashboard = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [artworks, setArtworks] = useState([]);
  
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

  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">Artist Dashboard</h1>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Art</TabsTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="title">Artwork Title</Label>
                  <Input id="title" name="title" placeholder="Enter the title of your artwork" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Describe your artwork, including style, medium, and any other relevant details"
                    rows={4}
                  />
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
        
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>My Portfolio</CardTitle>
              <CardDescription>
                Manage your uploaded artworks and tokenized styles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {artworks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artworks.map(artwork => (
                    <Card key={artwork.id}>
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={artwork.thumbnail} 
                          alt={artwork.title}
                          className="object-cover w-full h-full" 
                        />
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {artwork.status}
                          </span>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-medium text-lg">{artwork.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {artwork.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Uploaded on {artwork.date}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" /> View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Crop className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No artworks yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Upload your first artwork to get started
                  </p>
                  <Button className="mt-4" variant="outline" onClick={() => document.querySelector('[value="upload"]').click()}>
                    Go to Upload
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Track usage and revenue from your tokenized art styles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your payout and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payout-wallet">Payout Wallet Address</Label>
                <Input id="payout-wallet" placeholder="Enter your wallet address" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payout-method">Payout Method</Label>
                <select 
                  id="payout-method" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="crypto">Cryptocurrency</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="email-notifications" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="email-notifications">Email notifications for new uses of your style</Label>
              </div>
              
              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistDashboard;
