import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import type { PriceRangeFilterProps } from './types';

export function PriceRangeFilter({ minPrice, maxPrice, priceRange, onChange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-4">
      <div className="px-2">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={priceRange}
          max={maxPrice}
          min={minPrice}
          step={1}
          onValueChange={(value) => onChange(value as [number, number])}
        >
          <Slider.Track className="bg-neutral-200 dark:bg-neutral-700 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-amber-500 dark:bg-amber-400 rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white dark:bg-neutral-800 border-2 border-amber-500 dark:border-amber-400 rounded-full hover:bg-amber-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
            aria-label="Min price"
          />
          <Slider.Thumb
            className="block w-5 h-5 bg-white dark:bg-neutral-800 border-2 border-amber-500 dark:border-amber-400 rounded-full hover:bg-amber-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400"
            aria-label="Max price"
          />
        </Slider.Root>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">${priceRange[0]}</span>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">${priceRange[1]}</span>
      </div>
    </div>
  );
}