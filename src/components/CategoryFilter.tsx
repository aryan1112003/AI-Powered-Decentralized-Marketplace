import React from 'react';
import { FiGrid, FiDatabase, FiTool } from 'react-icons/fi';
import clsx from 'clsx';

const categories = [
  { id: 'all', label: 'All', icon: FiGrid },
  { id: 'NFT', label: 'NFTs', icon: FiGrid },
  { id: 'Data', label: 'Datasets', icon: FiDatabase },
  { id: 'Service', label: 'Services', icon: FiTool },
] as const;

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
            selected === id
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}