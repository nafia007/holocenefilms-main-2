import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        toast.success('Wallet connected successfully!');
      } else {
        // If MetaMask is not installed, generate a smart wallet
        const generatedAddress = await generateSmartWallet();
        setWalletAddress(generatedAddress);
        setIsConnected(true);
        toast.success('Smart wallet generated successfully!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    }
  };

  const generateSmartWallet = async () => {
    // This is a placeholder function. In a real application, you would integrate
    // with a smart wallet provider API to generate a new wallet.
    return '0x' + Math.random().toString(16).substr(2, 40);
  };

  return (
    <div>
      {!isConnected ? (
        <Button onClick={connectWallet} variant="outline" className="bg-purple-600 text-white hover:bg-purple-700">
          Connect Wallet
        </Button>
      ) : (
        <div className="text-sm">
          Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;