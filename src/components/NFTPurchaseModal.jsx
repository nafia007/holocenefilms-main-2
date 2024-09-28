import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NFTPurchaseModal = ({ isOpen, onClose, artStyle }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const handlePurchase = () => {
    // Here you would integrate with a blockchain wallet and handle the actual purchase
    console.log(`Purchasing ${artStyle.title} for ${artStyle.price} crypto`);
    console.log(`Sending to wallet: ${walletAddress}`);
    // After successful purchase:
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase NFT</DialogTitle>
          <DialogDescription>
            You are about to purchase the art style "{artStyle?.title}" for {artStyle?.price} crypto.
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Cancel</Button>
          <Button onClick={handlePurchase}>Confirm Purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NFTPurchaseModal;