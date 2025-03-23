import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Globe, Twitter, Instagram, Award, Film, Star } from "lucide-react";

const FilmmakerProfile = ({ filmmaker }) => {
  // If no filmmaker data is provided, show a placeholder
  if (!filmmaker) {
    return (
      <Card className="w-full shadow-md border-purple-500/20 bg-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-purple-100">Filmmaker Profile</CardTitle>
          <CardDescription className="text-purple-200">Profile data not available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Extract filmmaker data with defaults for missing fields
  const {
    name = 'Unknown Filmmaker',
    avatarUrl = '/placeholder.svg',
    bio = 'No biography available',
    location = 'Location not specified',
    website = '',
    email = '',
    twitter = '',
    instagram = '',
    awards = [],
    specialties = [],
    featuredWorks = [],
    joinedDate = new Date().toLocaleDateString(),
    rating = 0,
    totalSales = 0
  } = filmmaker;

  // Format rating to one decimal place
  const formattedRating = parseFloat(rating).toFixed(1);

  return (
    <Card className="w-full shadow-md border-purple-500/30 bg-gray-900/95">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-purple-500">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-purple-800 text-white">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl text-purple-100">{name}</CardTitle>
              <CardDescription className="text-purple-200">
                {location} • Joined {joinedDate}
              </CardDescription>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400 font-medium">{formattedRating}</span>
                <span className="text-purple-300 text-sm ml-2">{totalSales} sales</span>
              </div>
            </div>
          </div>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio section */}
        <div>
          <h3 className="text-sm font-medium text-purple-300 mb-1">About</h3>
          <p className="text-sm text-purple-200">{bio}</p>
        </div>

        {/* Specialties section */}
        {specialties && specialties.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-purple-300 mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="bg-purple-500/10 text-purple-200 border-purple-500/30">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Awards section */}
        {awards && awards.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-purple-300 mb-2">Awards & Recognition</h3>
            <ul className="space-y-1">
              {awards.map((award, index) => (
                <li key={index} className="flex items-center text-sm text-purple-200">
                  <Award className="h-4 w-4 mr-2 text-yellow-400" />
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Featured works section */}
        {featuredWorks && featuredWorks.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-purple-300 mb-2">Featured Works</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {featuredWorks.map((work, index) => (
                <div key={index} className="relative group rounded-md overflow-hidden border border-purple-500/30 shadow-md">
                  <img 
                    src={work.imageUrl || '/placeholder.svg'} 
                    alt={work.title} 
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium p-2 text-center">{work.title}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 px-2">
                    <span className="text-white text-xs truncate block">{work.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact links */}
        <div>
          <h3 className="text-sm font-medium text-purple-300 mb-2">Connect</h3>
          <div className="flex space-x-3">
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Globe className="h-5 w-5" />
              </a>
            )}
            {twitter && (
              <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {instagram && (
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                <Instagram className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilmmakerProfile;