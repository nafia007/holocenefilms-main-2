import React from 'react';
import Dex from '../components/Dex';

const DexPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">StyleToken Exchange</h1>
      <Dex />
    </div>
  );
};

export default DexPage;