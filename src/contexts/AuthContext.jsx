import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Create the authentication context
const AuthContext = createContext();

// Admin credentials
const ADMIN_EMAIL = 'nafiakocks76@gmail.com';
const ADMIN_PASSWORD = 'TheMasteradmin101###';

// Mock filmmaker profiles for demonstration
const MOCK_FILMMAKER_PROFILES = {
  'John Doe': {
    name: 'John Doe',
    avatarUrl: '/placeholder.svg',
    bio: 'Award-winning documentary filmmaker with over 10 years of experience.',
    location: 'Los Angeles, CA',
    website: 'https://johndoe-films.com',
    twitter: 'johndoefilms',
    instagram: 'johndoefilms',
    awards: ['Sundance Film Festival Winner 2019', 'Emmy Nomination 2020'],
    specialties: ['Documentary', 'Short Film', 'Drama'],
    featuredWorks: [
      { title: 'The Last Frontier', imageUrl: '/placeholder.svg' },
      { title: 'Urban Legends', imageUrl: '/placeholder.svg' },
      { title: 'Beyond the Horizon', imageUrl: '/placeholder.svg' }
    ],
    joinedDate: '01/15/2022',
    rating: 4.8,
    totalSales: 24
  }
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filmmakerProfiles, setFilmmakerProfiles] = useState(MOCK_FILMMAKER_PROFILES);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // Check if credentials match admin credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const userData = {
        email,
        isAdmin: true,
        name: 'Admin User'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin!",
      });
      return true;
    } else {
      // For non-admin users, we would typically validate against a backend
      // For now, just create a regular user account
      const userData = {
        email,
        isAdmin: false,
        name: 'Regular User',
        isFilmmaker: email.includes('filmmaker') // Simple check for demonstration
      };
      
      // If user is a filmmaker, add filmmaker profile data
      if (userData.isFilmmaker) {
        userData.filmmakerProfile = {
          bio: '',
          location: '',
          website: '',
          twitter: '',
          instagram: '',
          specialties: [],
          awards: [],
          featuredWorks: [],
          joinedDate: new Date().toLocaleDateString(),
          rating: 0,
          totalSales: 0
        };
      }
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      return true;
    }
  };

  // Signup function
  const signup = (userData, password) => {
    try {
      // In a real app, we would send this data to a backend API
      // For now, we'll just store it in localStorage
      
      // Create the user object
      const newUser = {
        email: userData.email,
        name: userData.name,
        isAdmin: false,
        isFilmmaker: userData.isFilmmaker || false,
        password: password, // In a real app, this would be hashed on the server
      };
      
      // If user is a filmmaker, add filmmaker profile data
      if (newUser.isFilmmaker) {
        newUser.filmmakerProfile = {
          ...userData.filmmakerProfile,
          joinedDate: new Date().toLocaleDateString(),
          rating: 0,
          totalSales: 0,
          awards: [],
          featuredWorks: []
        };
        
        // Update the filmmaker profiles collection
        setFilmmakerProfiles({
          ...filmmakerProfiles,
          [newUser.name]: newUser.filmmakerProfile
        });
      }
      
      // Set the user in state and localStorage
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.isAdmin === true;
  };
  
  // Check if user is a filmmaker
  const isFilmmaker = () => {
    return user?.isFilmmaker === true;
  };
  
  // Update filmmaker profile
  const updateFilmmakerProfile = (profileData) => {
    if (!user || !user.isFilmmaker) {
      toast({
        variant: "destructive",
        title: "Not authorized",
        description: "Only filmmakers can update their profile."
      });
      return false;
    }
    
    const updatedUser = {
      ...user,
      filmmakerProfile: {
        ...user.filmmakerProfile,
        ...profileData
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update the filmmaker profiles collection
    setFilmmakerProfiles({
      ...filmmakerProfiles,
      [user.name]: updatedUser.filmmakerProfile
    });
    
    toast({
      title: "Profile Updated",
      description: "Your filmmaker profile has been updated successfully."
    });
    
    return true;
  };
  
  // Get filmmaker profile by name
  const getFilmmakerProfile = (name) => {
    return filmmakerProfiles[name] || null;
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAdmin,
    isFilmmaker,
    updateFilmmakerProfile,
    getFilmmakerProfile,
    filmmakerProfiles,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}