import React from 'react';
import { FiHeart, FiEye } from 'react-icons/fi';
import { Asset } from '../types';
import { formatPrice } from '../utils/format';

interface AssetCardProps {
  asset: Asset;
  onLike?: () => void;
  onClick?: () => void;
}

export default function AssetCard({ asset, onLike, onClick }: AssetCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative aspect-square">
        <img
          src={asset.image}
          alt={asset.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <FiHeart className={`h-5 w-5 ${asset.likes > 0 ? 'text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
          {asset.category}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{asset.title}</h3>
          <span className="text-sm font-medium text-purple-600">
            {formatPrice(asset.price)} ETH
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {asset.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FiEye className="h-4 w-4" />
            {asset.views}
          </span>
          <span>by {asset.creator}</span>
        </div>
      </div>
    </div>
  );
}