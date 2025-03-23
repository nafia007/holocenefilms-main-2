
import React from 'react';
<<<<<<< HEAD
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ErrorBoundary from "./components/ErrorBoundary";
<<<<<<< HEAD
import { AuthProvider, useAuth } from "./contexts/AuthContext";
=======
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7

const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const ArtistDashboard = React.lazy(() => import("./pages/ArtistDashboard"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Community = React.lazy(() => import("./pages/Community"));
const DexPage = React.lazy(() => import("./pages/DexPage"));
const MarketInsights = React.lazy(() => import("./pages/MarketInsights"));

<<<<<<< HEAD
=======
// Create a client
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
<<<<<<< HEAD
      staleTime: 0, // Set to 0 to always refetch data
      cacheTime: 1 * 60 * 1000, // Reduced to 1 minute
=======
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
<<<<<<< HEAD
    error: import.meta.env.MODE === 'development' ? console.error : () => {},
  },
});

import { Polygon } from "@thirdweb-dev/chains";

const thirdwebConfig = {
  clientId: "61c6a87659a28faeff906ed86e7ab9cb",
  activeChain: Polygon,
=======
    error: process.env.NODE_ENV === 'development' ? console.error : () => {},
  },
});

const thirdwebConfig = {
  clientId: "61c6a87659a28faeff906ed86e7ab9cb",
  activeChain: "polygon",
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
};

const RouteLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-center">
      <p className="text-purple-500">Loading page...</p>
    </div>
  </div>
);

<<<<<<< HEAD
// Protected route component
const ProtectedAdminRoute = ({ children }) => {
  // Move the hook call inside the function body
  const { user, isAdmin } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

=======
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
const App = () => {
  React.useEffect(() => {
    console.log('App component mounted');
    return () => console.log('App component unmounted');
  }, []);

  return (
<<<<<<< HEAD
    <ThirdwebProvider {...thirdwebConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Layout>
                <Toaster position="top-right" richColors closeButton />
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/admin" element={
                      <React.Suspense fallback={<RouteLoadingFallback />}>
                        <ProtectedAdminRoute>
                          <AdminDashboard />
                        </ProtectedAdminRoute>
                      </React.Suspense>
                    } />
=======
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider {...thirdwebConfig}>
        <BrowserRouter>
          <TooltipProvider>
            <Layout>
              <Toaster position="top-right" richColors closeButton />
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <AdminDashboard />
                    </React.Suspense>
                  } />
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
                  <Route path="/artist" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <ArtistDashboard />
                    </React.Suspense>
                  } />
                  <Route path="/marketplace" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <Marketplace />
                    </React.Suspense>
                  } />
                  <Route path="/login" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <Login />
                    </React.Suspense>
                  } />
                  <Route path="/signup" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <SignUp />
                    </React.Suspense>
                  } />
                  <Route path="/community" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <Community />
                    </React.Suspense>
                  } />
                  <Route path="/dex" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <DexPage />
                    </React.Suspense>
                  } />
                  <Route path="/market-insights" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <MarketInsights />
                    </React.Suspense>
                  } />
                </Routes>
              </ErrorBoundary>
            </Layout>
          </TooltipProvider>
<<<<<<< HEAD
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThirdwebProvider>
=======
        </BrowserRouter>
      </ThirdwebProvider>
    </QueryClientProvider>
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7
  );
};

export default App;
