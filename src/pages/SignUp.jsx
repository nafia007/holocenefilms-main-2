<<<<<<< HEAD
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';

const SignUp = () => {
  const [isFilmmaker, setIsFilmmaker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match."
      });
      setIsLoading(false);
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long."
      });
      setIsLoading(false);
      return;
    }
    
    // Create user data object
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      isFilmmaker: isFilmmaker
    };
    
    // Add filmmaker-specific data if the user is a filmmaker
    if (isFilmmaker) {
      userData.filmmakerProfile = {
        bio: formData.get('bio'),
        location: formData.get('location'),
        website: formData.get('website'),
        twitter: formData.get('twitter'),
        instagram: formData.get('instagram'),
        specialties: formData.get('specialties')?.split(',').map(s => s.trim()) || []
      };
    }
    
    try {
      // Call the signup function from AuthContext
      const success = signup(userData, password);
      
      if (success) {
        // Redirect to home page after successful signup
        navigate('/');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign-up failed",
        description: error.message || "An error occurred during sign-up. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
=======
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement sign-up logic
    console.log('Sign-up submitted');
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sign Up for Holocene Films IP marketplace</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <Input type="text" id="name" name="name" required placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" id="email" name="email" required placeholder="your@email.com" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Input type="password" id="password" name="password" required placeholder="••••••••" />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <Input type="password" id="confirmPassword" name="confirmPassword" required placeholder="••••••••" />
        </div>
<<<<<<< HEAD
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isFilmmaker" 
            checked={isFilmmaker} 
            onCheckedChange={setIsFilmmaker} 
          />
          <label
            htmlFor="isFilmmaker"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I am a filmmaker and want to sell my films
          </label>
        </div>
        
        {isFilmmaker && (
          <div className="space-y-4 border border-purple-300/20 rounded-md p-4 bg-purple-50/5">
            <h3 className="text-lg font-medium text-purple-700">Filmmaker Profile</h3>
            <p className="text-sm text-gray-500">This information will be displayed to potential buyers in the marketplace.</p>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <Textarea 
                id="bio" 
                name="bio" 
                placeholder="Tell us about yourself and your filmmaking experience" 
                className="min-h-[100px]" 
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Input type="text" id="location" name="location" placeholder="City, Country" />
            </div>
            
            <div>
              <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">Specialties</label>
              <Input 
                type="text" 
                id="specialties" 
                name="specialties" 
                placeholder="Documentary, Horror, Animation (comma separated)" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                <Input type="url" id="website" name="website" placeholder="https://yourwebsite.com" />
              </div>
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter</label>
                <Input type="text" id="twitter" name="twitter" placeholder="username (without @)" />
              </div>
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</label>
                <Input type="text" id="instagram" name="instagram" placeholder="username (without @)" />
              </div>
            </div>
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
=======
        <Button type="submit" className="w-full">Sign Up</Button>
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;