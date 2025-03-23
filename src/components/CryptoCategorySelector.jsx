import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bitcoin, Layers, Wallet, Globe, DollarSign, Building, Brain, Gamepad2, Database, Shield } from 'lucide-react';
import { getCryptoCategories } from '../services/cryptoService';

const categoryIcons = {
  defi: <Wallet className="h-4 w-4" />,
  layer1: <Bitcoin className="h-4 w-4" />,
  layer2: <Layers className="h-4 w-4" />,
  ai: <Brain className="h-4 w-4" />,
  gaming: <Gamepad2 className="h-4 w-4" />,
  oracles: <Database className="h-4 w-4" />,
  derivatives: <Shield className="h-4 w-4" />,
  privacy: <Shield className="h-4 w-4" />,
  stablecoins: <DollarSign className="h-4 w-4" />,
  exchange: <Building className="h-4 w-4" />
};

const CryptoCategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const categories = getCryptoCategories();
  
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-purple-500/20">
      <CardContent className="p-4">
        <ScrollArea className="h-[60px]">
          <div className="flex gap-2 pb-1">
            <Button
              key="all"
              variant={selectedCategory === 'all' ? "secondary" : "outline"}
              size="sm"
              onClick={() => onSelectCategory('all')}
              className="whitespace-nowrap"
            >
              All Cryptocurrencies
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "secondary" : "outline"}
                size="sm"
                onClick={() => onSelectCategory(category.id)}
                className="whitespace-nowrap"
              >
                {categoryIcons[category.id]}
                <span className="ml-1">{category.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CryptoCategorySelector;