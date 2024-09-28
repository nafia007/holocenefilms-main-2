import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-100 py-4 text-center">
        <p>&copy; 2023 ArtStyleAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;