import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ArtistProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Artist Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input type="text" id="name" name="name" placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" id="email" name="email" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <Textarea id="bio" name="bio" placeholder="Tell us about yourself and your art..." />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Upload Artwork</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="artworkTitle" className="block text-sm font-medium text-gray-700">Artwork Title</label>
              <Input type="text" id="artworkTitle" name="artworkTitle" placeholder="Title of your artwork" />
            </div>
            <div>
              <label htmlFor="artworkDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea id="artworkDescription" name="artworkDescription" placeholder="Describe your artwork..." />
            </div>
            <div>
              <label htmlFor="artworkFile" className="block text-sm font-medium text-gray-700">Upload Image</label>
              <Input type="file" id="artworkFile" name="artworkFile" accept="image/*" />
            </div>
            <Button type="submit">Upload Artwork</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;