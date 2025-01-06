import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const Dex = () => {
  const [ethAmount, setEthAmount] = useState('');
  const [holoceneTokenAmount, setHoloceneTokenAmount] = useState('');

  const handleExchange = () => {
    // Mock exchange rate: 1 ETH = 100 HoloceneTokens
    const exchangeRate = 100;
    const calculatedHoloceneTokens = parseFloat(ethAmount) * exchangeRate;
    setHoloceneTokenAmount(calculatedHoloceneTokens.toFixed(2));
    toast.success(`Successfully exchanged ${ethAmount} ETH for ${calculatedHoloceneTokens.toFixed(2)} HoloceneTokens`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Buy HoloceneTokens</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="ethAmount" className="block text-sm font-medium text-gray-700">ETH Amount</label>
          <Input
            type="number"
            id="ethAmount"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            placeholder="Enter ETH amount"
          />
        </div>
        <div>
          <label htmlFor="holoceneTokenAmount" className="block text-sm font-medium text-gray-700">HoloceneTokens to Receive</label>
          <Input
            type="text"
            id="holoceneTokenAmount"
            value={holoceneTokenAmount}
            readOnly
            placeholder="HoloceneTokens you'll receive"
          />
        </div>
        <Button onClick={handleExchange} className="w-full">
          Exchange
        </Button>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Exchange Rate: 1 ETH = 100 HoloceneTokens
      </p>
    </div>
  );
};

export default Dex;