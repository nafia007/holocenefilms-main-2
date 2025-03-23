import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Coins, FileCheck, Globe, Lock, Scale } from "lucide-react";

const Index = () => {
  console.log('Index component rendering');

  const tokenizationSteps = [
    {
      title: "Defining the Asset",
      content: "We help define your film IP for tokenization, including distribution rights, streaming rights, and merchandising opportunities."
    },
    {
      title: "Legal Framework",
      content: "Our platform ensures compliance with securities laws and regulations across multiple jurisdictions."
    },
    {
      title: "Blockchain Integration",
      content: "We utilize advanced blockchain technology for secure, transparent token creation and management."
    },
    {
      title: "Token Creation & Distribution",
      content: "Create and distribute digital tokens representing shares in your film's IP and future revenue."
    },
    {
      title: "Revenue Management",
      content: "Automated smart contracts handle revenue distribution to token holders based on predefined terms."
    }
  ];

  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with Kaleido blockchain integration"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Regulatory Compliance",
      description: "ERC-3643 T-REX standard ensures full regulatory compliance"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Access",
      description: "Break down geographical barriers for worldwide investment"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Smart Revenue Distribution",
      description: "Automated revenue sharing through smart contracts"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Institutional Grade",
      description: "Built for both individual and institutional investors"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Transparent Operations",
      description: "Full transparency in fund usage and revenue distribution"
    }
  ];

  React.useEffect(() => {
    console.log('Index component mounted');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Welcome to Holocene Films IP marketplace
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Transform your film's intellectual property into digital assets, enabling new ways 
            of fundraising and investment management.
          </p>
          <div className="space-x-4 mb-12">
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none">
              <Link to="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              <Link to="/signup">Join as Filmmaker</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <div className="mb-2 text-purple-400">{feature.icon}</div>
                <CardTitle className="text-purple-200">{feature.title}</CardTitle>
                <CardDescription className="text-purple-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Tokenization Process */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Film IP Tokenization Process
          </h2>
          <ScrollArea className="h-[400px] rounded-md border border-purple-500/20 p-4">
            <Accordion type="single" collapsible className="w-full">
              {tokenizationSteps.map((step, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-purple-500/20">
                  <AccordionTrigger className="text-purple-300 hover:text-purple-200">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-purple-200">
                    {step.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </div>

        {/* Real World Assets Section */}
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            The Future of Film Investment
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Real World Assets (RWA)</CardTitle>
                <CardDescription className="text-purple-300">
                  Transform your film IP into tradable digital assets, increasing market 
                  accessibility and liquidity through blockchain technology.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-200">Institutional Integration</CardTitle>
                <CardDescription className="text-purple-300">
                  Built for both individual and institutional investors, with robust 
                  compliance mechanisms and transparent operations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;