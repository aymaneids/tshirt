import React, { useState } from 'react';
import { FilterSection } from './filters/FilterSection';
import { PriceRangeFilter } from './filters/PriceRangeFilter';
import { CheckboxFilter } from './filters/CheckboxFilter';
import { ColorFilter } from './filters/ColorFilter';
import { X, Filter } from 'lucide-react';
import type { Product } from '../context/ProductContext';

interface Filters {
  priceRange: [number, number];
  types: string[];
  materials: string[];
  fits: string[];
  madeIn: string[];
  colors: string[];
  sizes: string[];
}

interface ProductFiltersProps {
  products: Product[];
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export function ProductFilters({ products, filters, onChange, onReset }: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const prices = products.map(p => parseFloat(p.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const uniqueTypes = Array.from(new Set(products.map(p => p.details.type)));
  const uniqueMaterials = Array.from(new Set(products.map(p => p.details.material)));
  const uniqueFits = Array.from(new Set(products.map(p => p.details.fit)));
  const uniqueMadeIn = Array.from(new Set(products.map(p => p.details.madeIn)));
  const uniqueColors = Array.from(new Set(products.flatMap(p => p.details.colors.map(c => c.name))));
  const uniqueSizes = Array.from(new Set(products.flatMap(p => p.details.sizes)));

  const colorOptions = Array.from(new Set(products.flatMap(p => p.details.colors)))
    .reduce((acc, color) => {
      if (!acc.some(c => c.name === color.name)) {
        acc.push(color);
      }
      return acc;
    }, [] as { name: string; hex: string }[]);

  const updateFilters = (key: keyof Filters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(filter => {
    if (Array.isArray(filter) && filter.length > 0) return true;
    return false;
  });

  const FiltersContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Reset all
          </button>
        )}
      </div>

      <FilterSection title="Price">
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          priceRange={filters.priceRange}
          onChange={(range) => updateFilters('priceRange', range)}
        />
      </FilterSection>

      <FilterSection title="Type">
        <div className="space-y-2">
          {uniqueTypes.map((type) => (
            <CheckboxFilter
              key={type}
              label={type}
              checked={filters.types.includes(type)}
              onChange={(checked) => {
                const newTypes = checked
                  ? [...filters.types, type]
                  : filters.types.filter(t => t !== type);
                updateFilters('types', newTypes);
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Other filter sections remain the same */}
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 px-4 py-2 rounded-lg"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <FiltersContent />
      </div>

      {/* Mobile filters modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-neutral-900 shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-neutral-900 dark:text-white">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FiltersContent />
          </div>
        </div>
      )}
    </>
  );
}