import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from "./components/Layout";
import Index from "./pages/Index";

const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Community = React.lazy(() => import("./pages/Community"));
const DexPage = React.lazy(() => import("./pages/DexPage"));
const MarketInsights = React.lazy(() => import("./pages/MarketInsights"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'development' ? console.error : () => {},
  },
});

const thirdwebConfig = {
  clientId: "61c6a87659a28faeff906ed86e7ab9cb",
  activeChain: "polygon",
};

const RouteLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-center">
      <p className="text-purple-500">Loading page...</p>
    </div>
  </div>
);

const App = () => {
  React.useEffect(() => {
    console.log('App component mounted');
    return () => console.log('App component unmounted');
  }, []);

  return (
    <React.Fragment>
      <ThirdwebProvider {...thirdwebConfig}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <TooltipProvider>
              <Layout>
                <Toaster position="top-right" richColors closeButton />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={
                    <React.Suspense fallback={<RouteLoadingFallback />}>
                      <AdminDashboard />
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
              </Layout>
            </TooltipProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ThirdwebProvider>
    </React.Fragment>
  );
};

export default App;
