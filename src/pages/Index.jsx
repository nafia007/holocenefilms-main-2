import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Welcome to Holocene Films IP marketplace
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Revolutionizing film financing through blockchain technology and IP tokenization
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

        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Why Choose Film IP Tokenization?
          </h2>
          <p className="text-purple-200 mb-6">
            Transform your film's intellectual property into digital assets on the blockchain, enabling new ways of fundraising and investment management in the film industry.
          </p>
          <Accordion type="single" collapsible className="w-full">
            {tokenizationSteps.map((step, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-purple-300 hover:text-purple-200">
                  {step.title}
                </AccordionTrigger>
                <AccordionContent className="text-purple-200">
                  {step.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-purple-500/20 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Benefits of Film IP Tokenization
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-purple-800/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Democratized Investment</h3>
              <p className="text-purple-200">Enable broader investor participation in film projects through fractional ownership.</p>
            </div>
            <div className="p-6 bg-purple-800/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Enhanced Liquidity</h3>
              <p className="text-purple-200">Create secondary markets for film IP tokens, providing investors with trading flexibility.</p>
            </div>
            <div className="p-6 bg-purple-800/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Transparent Revenue</h3>
              <p className="text-purple-200">Automated distribution of revenues through smart contracts ensures fairness and transparency.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;