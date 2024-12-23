import React from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';
import { useWalletStore } from '../store/walletStore';

export default function Header() {
  const { isConnected, address, balance, connect, disconnect } = useWalletStore();
  const currentYear = new Date().getFullYear();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              DecentraMarket
            </h1>
            <span className="text-xs text-gray-500">© {currentYear} Aryan Acharya</span>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search assets..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiBell className="h-6 w-6 text-gray-600" />
            </button>
            {isConnected ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{balance} ETH</span>
                <button
                  onClick={disconnect}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FiUser className="h-5 w-5" />
                  <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <FiUser className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}