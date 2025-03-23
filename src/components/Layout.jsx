
import React from 'react';
import Navigation from './Navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ErrorFallback = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          {error.message}
          <br />
          Please try refreshing the page or contact support if the problem persists.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">
                  Holocene Films IP Marketplace is revolutionizing film intellectual property through blockchain technology and digital assets.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                  <li><a href="/community" className="hover:text-white transition-colors">Community</a></li>
                  <li><a href="/dex" className="hover:text-white transition-colors">DEX</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">
                  Email: support@holocenefilms.com<br />
                  Follow us on Twitter @HoloceneFilms
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Holocene Films IP Marketplace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
