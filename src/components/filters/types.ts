import type { Product } from '../../context/ProductContext';

export interface Filters {
  priceRange: [number, number];
  types: string[];
  materials: string[];
  fits: string[];
  madeIn: string[];
  colors: string[];
  sizes: string[];
}

export interface ProductFiltersProps {
  products: Product[];
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  onClose?: () => void;
}

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export interface CheckboxFilterProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface ColorFilterProps {
  colors: ColorOption[];
  selectedColor: string | null;
  onChange: (color: string) => void;
}