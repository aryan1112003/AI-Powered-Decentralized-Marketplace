import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';
import AssetGrid from './components/AssetGrid';
import CreateAssetForm from './components/CreateAssetForm';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Assets</h2>
              <CategoryFilter
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />
              <AssetGrid category={selectedCategory} />
            </section>
          </div>
          
          <div className="lg:col-span-1">
            <CreateAssetForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;