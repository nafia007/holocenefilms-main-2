import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Loader } from "lucide-react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import DexPage from "./pages/DexPage";
import MarketInsights from "./pages/MarketInsights";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
});

// ThirdWeb configuration
const thirdwebConfig = {
  clientId: "61c6a87659a28faeff906ed86e7ab9cb",
  activeChain: "polygon",
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26]">
    <div className="flex flex-col items-center space-y-4">
      <Loader className="w-12 h-12 text-purple-500 animate-spin" />
      <p className="text-purple-300">Loading...</p>
    </div>
  </div>
);

// Main App component
const App = () => {
  React.useEffect(() => {
    console.log('App mounted');
    return () => console.log('App unmounted');
  }, []);

  return (
    <ThirdwebProvider {...thirdwebConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Layout>
              <Toaster position="top-right" richColors closeButton />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/community" element={<Community />} />
                <Route path="/dex" element={<DexPage />} />
                <Route path="/market-insights" element={<MarketInsights />} />
              </Routes>
            </Layout>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
};

export default App;