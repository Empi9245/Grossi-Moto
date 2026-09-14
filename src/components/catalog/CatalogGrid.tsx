// Enhanced CatalogGrid.tsx
// Improved grid layout with better mobile responsiveness and filtering

'use client';

import React, { useState, useMemo } from 'react';
import CatalogProductCard from './CatalogProductCard';
import type { ScooterModel } from '../../data/catalog-scooters';

interface CatalogGridProps {
  scooters: ScooterModel[];
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ scooters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDisplacement, setSelectedDisplacement] = useState<string>('all');

  // Get unique categories and displacements for filters
  const categories = useMemo(() => {
    const cats = Array.from(new Set(scooters.map(s => s.category)));
    return ['all', ...cats];
  }, [scooters]);

  const displacements = useMemo(() => {
    const disps = Array.from(new Set(scooters.map(s => s.displacement).filter(Boolean)));
    return ['all', ...disps as string[]];
  }, [scooters]);

  // Filter scooters based on search and filters
  const filteredScooters = useMemo(() => {
    return scooters.filter(scooter => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const searchableText = `${scooter.name} ${scooter.model} ${scooter.category} ${scooter.shortDescription || ''} ${scooter.description || ''}`.toLowerCase();
        if (!searchableText.includes(searchLower)) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && scooter.category !== selectedCategory) return false;

      // Displacement filter
      if (selectedDisplacement !== 'all' && scooter.displacement !== selectedDisplacement) return false;

      return true;
    });
  }, [scooters, searchQuery, selectedCategory, selectedDisplacement]);

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search scooters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          {/* Displacement Filter */}
          {displacements.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {displacements.map((disp) => (
                <button
                  key={disp}
                  onClick={() => setSelectedDisplacement(disp)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    selectedDisplacement === disp
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {disp === 'all' ? 'All' : disp}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          Showing {filteredScooters.length} of {scooters.length} scooters
        </div>
      </div>

      {/* Grid */}
      {filteredScooters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredScooters.map((scooter) => (
            <CatalogProductCard
              key={scooter.id}
              id={scooter.id}
              name={scooter.name}
              model={scooter.model}
              category={scooter.category}
              displacement={scooter.displacement}
              priceDisplay={scooter.priceDisplay}
              availability={scooter.availability}
              image={scooter.image}
              shortDescription={scooter.shortDescription}
              whatsappMessage={scooter.whatsappMessage}
              showroomAvailable={scooter.showroomAvailable}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No scooters found</h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDisplacement('all');
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogGrid;
