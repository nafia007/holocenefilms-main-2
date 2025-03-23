import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { ethers } from 'ethers';
import { useToast } from "@/components/ui/use-toast";

const NFTPurchaseModal = ({ isOpen, onClose, artStyle }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('idle'); // idle, processing, success, error
  const [transactionHash, setTransactionHash] = useState('');
  const { toast } = useToast();

  const validateWalletAddress = (address) => {
    try {
      return ethers.utils.isAddress(address);
    } catch (error) {
      return false;
    }
  };

  const handlePurchase = async () => {
    if (!validateWalletAddress(walletAddress)) {
      toast({
        variant: "destructive",
        title: "Invalid wallet address",
        description: "Please enter a valid Ethereum wallet address"
      });
      return;
    }

    setTransactionStatus('processing');

    try {
      // Connect to provider and contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create transaction
      const transaction = {
        to: walletAddress,
        value: ethers.utils.parseEther(artStyle.price.toString()),
        data: ethers.utils.id(`purchase:${artStyle.id}`)
      };

      // Send transaction
      const tx = await signer.sendTransaction(transaction);
      setTransactionHash(tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();

      if (receipt.status === 1) {
        setTransactionStatus('success');
        toast({
          title: "Purchase successful!",
          description: `Transaction hash: ${tx.hash}`,
        });
        setTimeout(() => onClose(), 2000);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      setTransactionStatus('error');
      toast({
        variant: "destructive",
        title: "Purchase failed",
        description: error.message || "Failed to complete the purchase"
      });
    }
  };

  const renderPurchaseButton = () => {
    switch (transactionStatus) {
      case 'processing':
        return (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing
          </Button>
        );
      case 'success':
        return (
          <Button disabled className="bg-green-500">
            <CheckCircle className="mr-2 h-4 w-4" />
            Success
          </Button>
        );
      case 'error':
        return (
          <Button onClick={handlePurchase} className="bg-red-500">
            <AlertCircle className="mr-2 h-4 w-4" />
            Retry
          </Button>
        );
      default:
        return <Button onClick={handlePurchase}>Confirm Purchase</Button>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase NFT</DialogTitle>
          <DialogDescription>
            You are about to purchase the art style "{artStyle?.title}" for {artStyle?.price} ETH.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wallet" className="text-right">
              Wallet Address
            </Label>
            <Input
              id="wallet"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="col-span-3"
              disabled={transactionStatus === 'processing'}
            />
          </div>
          {transactionHash && (
            <div className="text-sm text-gray-500 break-all">
              Transaction: {transactionHash}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={transactionStatus === 'processing'}>
            Cancel
          </Button>
          {renderPurchaseButton()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NFTPurchaseModal;