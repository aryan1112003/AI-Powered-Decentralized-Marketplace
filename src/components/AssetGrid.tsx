import React from 'react';
import AssetCard from './AssetCard';
import { useAssetsStore } from '../store/assetsStore';

interface AssetGridProps {
  category: string;
}

export default function AssetGrid({ category }: AssetGridProps) {
  const { assets, likeAsset, incrementViews } = useAssetsStore();

  const filteredAssets = category === 'all'
    ? assets
    : assets.filter(asset => asset.category === category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAssets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onLike={() => likeAsset(asset.id)}
          onClick={() => incrementViews(asset.id)}
        />
      ))}
    </div>
  );
}