import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, Film, Award, Tag, Users, DollarSign, Percent, Eye, MessageSquare } from "lucide-react";
import SocialChatAndRating from './SocialChatAndRating';

const FilmDetailsModal = ({ isOpen, onClose, film }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!film) return null;

  // Extract metadata from film object
  const metadata = film.metadata || {};
  const attributes = metadata.properties?.attributes || [];
  const releaseDate = metadata.properties?.createdAt 
    ? new Date(metadata.properties.createdAt).toLocaleDateString() 
    : 'Not specified';
  
  // Format price with commas for thousands
  const formattedPrice = film.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900/95 border-purple-500/30 shadow-xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-purple-100">{film.title}</DialogTitle>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-200 border-purple-500/30">
              {film.tokenId ? `Token ID: ${film.tokenId}` : 'New Film'}
            </Badge>
          </div>
          <DialogDescription className="text-purple-200">
            by {film.filmmaker}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-3 bg-gray-800/50">
              <TabsTrigger value="details" className="data-[state=active]:bg-purple-500/20">
                <Film className="h-4 w-4 mr-2" />
                Film Details
              </TabsTrigger>
              <TabsTrigger value="ownership" className="data-[state=active]:bg-purple-500/20">
                <DollarSign className="h-4 w-4 mr-2" />
                Ownership & Royalties
              </TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-purple-500/20">
                <MessageSquare className="h-4 w-4 mr-2" />
                Social & Reviews
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="max-h-[70vh]">
            <TabsContent value="details" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-purple-500/30 shadow-md">
                    <img 
                      src={film.imageUrl || metadata.image || '/placeholder.svg'} 
                      alt={film.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-2 px-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{film.title}</span>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-purple-300 mr-1" />
                          <span className="text-purple-300 text-xs">{Math.floor(Math.random() * 1000) + 100} views</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-purple-200">
                      <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">Released: {releaseDate}</span>
                    </div>
                    <div className="flex items-center text-purple-200">
                      <Clock className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">Duration: {metadata.properties?.duration || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center text-purple-200">
                      <Tag className="h-4 w-4 mr-2 text-purple-400" />
                      <span className="text-sm">Category: {metadata.properties?.category || film.category || 'Not specified'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Description</h3>
                    <p className="text-sm text-purple-200">{film.description || metadata.description || 'No description available.'}</p>
                  </div>

                  {attributes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-purple-100 mb-2">Attributes</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {attributes.map((attr, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-purple-200">
                            <span className="font-medium">{attr.trait_type}:</span>
                            <span>{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {metadata.properties?.awards && (
                    <div>
                      <h3 className="text-lg font-medium text-purple-100 mb-2">Awards & Recognition</h3>
                      <ul className="space-y-1">
                        {metadata.properties.awards.map((award, index) => (
                          <li key={index} className="flex items-center text-sm text-purple-200">
                            <Award className="h-4 w-4 mr-2 text-yellow-400" />
                            {award}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ownership" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Ownership Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-200">Creator:</span>
                        <span className="text-sm font-medium text-purple-100">{film.filmmaker}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-200">Current Owner:</span>
                        <span className="text-sm font-medium text-purple-100">{metadata.properties?.currentOwner || film.filmmaker}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-200">Minted:</span>
                        <span className="text-sm font-medium text-purple-100">{releaseDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Transaction History</h3>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 rounded-md bg-purple-500/10 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-purple-100">Minted</span>
                          <span className="text-purple-200">{releaseDate}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-purple-300">
                          <span>By: {film.filmmaker}</span>
                          <span>Token ID: {film.tokenId || 'Pending'}</span>
                        </div>
                      </div>
                      {/* We could add more transaction history items here */}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Pricing & Royalties</h3>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-200">Current Price:</span>
                        <span className="text-xl font-bold text-purple-100">{formattedPrice} FILM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-200">Royalty Percentage:</span>
                        <div className="flex items-center">
                          <Percent className="h-4 w-4 mr-1 text-purple-400" />
                          <span className="text-md font-medium text-purple-100">{film.royaltyPercentage || 0}%</span>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-purple-500/20">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-200">Creator Earnings (est.):</span>
                          <span className="font-medium text-purple-100">
                            {((film.price || 0) * (film.royaltyPercentage || 0) / 100).toFixed(2)} FILM per sale
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-purple-100 mb-2">Purchase Options</h3>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Purchase for {formattedPrice} FILM
                      </Button>
                      <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                        <Users className="h-4 w-4 mr-2" />
                        Make Offer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social" className="p-6">
              <SocialChatAndRating styleId={film.tokenId} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FilmDetailsModal;