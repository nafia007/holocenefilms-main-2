import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Info, ArrowRightLeft } from "lucide-react";

const Dex = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [holoceneTokenAmount, setHoloceneTokenAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleExchange = async () => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      toast.error("Please enter a valid ETH amount");
      return;
    }

    setIsLoading(true);
    try {
      // Mock exchange rate: 1 ETH = 100 HoloceneTokens
      const exchangeRate = 100;
      const calculatedHoloceneTokens = parseFloat(ethAmount) * exchangeRate;
      setHoloceneTokenAmount(calculatedHoloceneTokens.toFixed(2));
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Successfully exchanged ${ethAmount} ETH for ${calculatedHoloceneTokens.toFixed(2)} HoloceneTokens`, {
        description: "Transaction completed successfully",
      });
    } catch (error) {
      toast.error("Exchange failed. Please try again.");
      console.error("Exchange error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEthInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      setEthAmount(value);
      // Auto calculate HoloceneTokens
      const exchangeRate = 100;
      const calculatedTokens = value ? (parseFloat(value) * exchangeRate).toFixed(2) : '';
      setHoloceneTokenAmount(calculatedTokens);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-purple-500" />
          Buy HoloceneTokens
        </CardTitle>
        <CardDescription>
          Exchange ETH for HoloceneTokens to participate in the marketplace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="ethAmount" className="block text-sm font-medium text-gray-700">
            ETH Amount
          </label>
          <Input
            type="text"
            id="ethAmount"
            value={ethAmount}
            onChange={handleEthInputChange}
            placeholder="Enter ETH amount"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="holoceneTokenAmount" className="block text-sm font-medium text-gray-700">
            HoloceneTokens to Receive
          </label>
          <Input
            type="text"
            id="holoceneTokenAmount"
            value={holoceneTokenAmount}
            readOnly
            placeholder="HoloceneTokens you'll receive"
            className="w-full bg-gray-50"
          />
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p>
            Current Exchange Rate: 1 ETH = 100 HoloceneTokens
            <br />
            Minimum exchange amount: 0.01 ETH
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleExchange} 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          disabled={isLoading || !ethAmount || parseFloat(ethAmount) <= 0}
        >
          {isLoading ? "Processing..." : "Exchange"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dex;