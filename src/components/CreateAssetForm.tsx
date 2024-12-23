import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useAssetsStore } from '../store/assetsStore';
import { useWalletStore } from '../store/walletStore';

export default function CreateAssetForm() {
  const { isConnected } = useWalletStore();
  const { addAsset } = useAssetsStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'NFT' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    addAsset({
      ...formData,
      price: parseFloat(formData.price),
      creator: 'Aryan Acharya',
    });

    setFormData({
      title: '',
      description: '',
      price: '',
      image: '',
      category: 'NFT',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Create New Asset</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (ETH)
          </label>
          <input
            type="number"
            step="0.0001"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as 'NFT' | 'Data' | 'Service' })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="NFT">NFT</option>
            <option value="Data">Data</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <FiUpload className="h-5 w-5" />
          Create Asset
        </button>
      </div>
    </form>
  );
}