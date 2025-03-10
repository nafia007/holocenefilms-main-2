import React from 'react';
import Dex from '../components/Dex';

const DexPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Holocene Token Exchange
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Exchange ETH for HoloceneTokens to participate in our film IP marketplace.
          Your gateway to owning and trading unique artistic styles.
        </p>
        <Dex />
      </div>
    </div>
  );
};

export default DexPage;