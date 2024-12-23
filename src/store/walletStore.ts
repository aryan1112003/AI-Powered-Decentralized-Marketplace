import { create } from 'zustand';
import { WalletState } from '../types';

export const useWalletStore = create<WalletState>((set) => ({
  isConnected: false,
  address: null,
  balance: 0,
  connect: async () => {
    // Simulated wallet connection
    set({
      isConnected: true,
      address: '0x' + Math.random().toString(16).slice(2, 42),
      balance: parseFloat((Math.random() * 10).toFixed(4))
    });
  },
  disconnect: () => {
    set({
      isConnected: false,
      address: null,
      balance: 0
    });
  }
}));