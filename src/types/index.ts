export interface Asset {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  creator: string;
  category: 'NFT' | 'Data' | 'Service';
  createdAt: string;
  likes: number;
  views: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  balance: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export interface MarketplaceStats {
  totalVolume: number;
  totalAssets: number;
  activeUsers: number;
}