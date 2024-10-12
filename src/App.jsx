import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ArtistProfile from "./pages/ArtistProfile";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Community from "./pages/Community";
import DexPage from "./pages/DexPage";

const queryClient = new QueryClient();

const App = () => (
  <ThirdwebProvider clientId="61c6a87659a28faeff906ed86e7ab9cb">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/artist-profile" element={<ArtistProfile />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/community" element={<Community />} />
              <Route path="/dex" element={<DexPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThirdwebProvider>
);

export default App;