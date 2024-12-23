import { create } from 'zustand';
import { Asset } from '../types';

interface AssetsState {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'id' | 'createdAt' | 'likes' | 'views'>) => void;
  likeAsset: (id: string) => void;
  incrementViews: (id: string) => void;
}

export const useAssetsStore = create<AssetsState>((set) => ({
  assets: [
    {
      id: '1',
      title: 'Digital Art Collection #1',
      description: 'A unique collection of digital art pieces powered by AI.',
      price: 0.5,
      image: 'https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=800',
      creator: 'Aryan Acharya',
      category: 'NFT',
      createdAt: new Date().toISOString(),
      likes: 24,
      views: 156
    },
    {
      id: '2',
      title: 'AI Training Dataset',
      description: 'High-quality labeled dataset for machine learning models.',
      price: 1.2,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800',
      creator: 'DataLab',
      category: 'Data',
      createdAt: new Date().toISOString(),
      likes: 15,
      views: 89
    },
    {
      id: '3',
      title: 'Smart Contract Service',
      description: 'Custom smart contract development and auditing service.',
      price: 2.0,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800',
      creator: 'BlockTech',
      category: 'Service',
      createdAt: new Date().toISOString(),
      likes: 32,
      views: 245
    }
  ],
  addAsset: (newAsset) =>
    set((state) => ({
      assets: [
        ...state.assets,
        {
          ...newAsset,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          likes: 0,
          views: 0,
        },
      ],
    })),
  likeAsset: (id) =>
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, likes: asset.likes + 1 } : asset
      ),
    })),
  incrementViews: (id) =>
    set((state) => ({
      assets: state.assets.map((asset) =>
        asset.id === id ? { ...asset, views: asset.views + 1 } : asset
      ),
    })),
}));