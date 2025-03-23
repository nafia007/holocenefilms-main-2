<<<<<<< HEAD
=======

>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
=======
import { toast } from "sonner";
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
=======
  const navigate = useNavigate();
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
<<<<<<< HEAD
    
    try {
      const success = login(email, password);
      if (success) {
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
=======

    // Check if credentials match the admin credentials
    if (email === 'nafiakocks76@gmail.com' && password === 'TheMasteradmin101###') {
      // Store user info in localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      
      toast.success("Login successful!");
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      // For demo purposes, allow any login
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      
      toast.success("Login successful!");
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }

    setIsLoading(false);
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
  };

  return (
    <div className="container mx-auto px-4 py-8">
<<<<<<< HEAD
      <h1 className="text-4xl font-bold mb-8 text-center">Login to Holocene Films IP marketplace</h1>
=======
      <h1 className="text-4xl font-bold mb-8 text-center">Login to ArtStyleAI</h1>
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
<<<<<<< HEAD
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="your@email.com" 
=======
            required 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Input 
            type="password" 
            id="password" 
            name="password" 
<<<<<<< HEAD
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="••••••••" 
=======
            required 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
