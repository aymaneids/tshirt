import React from 'react';
import { FilterSection } from './FilterSection';
import { PriceRangeFilter } from './PriceRangeFilter';
import { CheckboxFilter } from './CheckboxFilter';
import { ColorFilter } from './ColorFilter';
import { X } from 'lucide-react';
import type { Product } from '../../context/ProductContext';

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

  return (
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

      <FilterSection title="Material">
        <div className="space-y-2">
          {uniqueMaterials.map((material) => (
            <CheckboxFilter
              key={material}
              label={material}
              checked={filters.materials.includes(material)}
              onChange={(checked) => {
                const newMaterials = checked
                  ? [...filters.materials, material]
                  : filters.materials.filter(m => m !== material);
                updateFilters('materials', newMaterials);
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fit">
        <div className="space-y-2">
          {uniqueFits.map((fit) => (
            <CheckboxFilter
              key={fit}
              label={fit}
              checked={filters.fits.includes(fit)}
              onChange={(checked) => {
                const newFits = checked
                  ? [...filters.fits, fit]
                  : filters.fits.filter(f => f !== fit);
                updateFilters('fits', newFits);
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Made In">
        <div className="space-y-2">
          {uniqueMadeIn.map((origin) => (
            <CheckboxFilter
              key={origin}
              label={origin}
              checked={filters.madeIn.includes(origin)}
              onChange={(checked) => {
                const newMadeIn = checked
                  ? [...filters.madeIn, origin]
                  : filters.madeIn.filter(m => m !== origin);
                updateFilters('madeIn', newMadeIn);
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <ColorFilter
          colors={colorOptions}
          selectedColor={filters.colors[0] || null}
          onChange={(color) => updateFilters('colors', [color])}
        />
      </FilterSection>

      <FilterSection title="Sizes">
        <div className="grid grid-cols-4 gap-2">
          {uniqueSizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSizes = filters.sizes.includes(size)
                  ? filters.sizes.filter(s => s !== size)
                  : [...filters.sizes, size];
                updateFilters('sizes', newSizes);
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                filters.sizes.includes(size)
                  ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}