import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import type { ColorFilterProps } from './types';

export function ColorFilter({ colors, selectedColor, onChange }: ColorFilterProps) {
  return (
    <RadioGroup.Root
      value={selectedColor || ''}
      onValueChange={onChange}
      className="grid grid-cols-6 gap-2"
    >
      {colors.map((color) => (
        <RadioGroup.Item
          key={color.name}
          value={color.name}
          className="relative w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          style={{ backgroundColor: color.hex }}
        >
          <RadioGroup.Indicator className="absolute inset-0 flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </RadioGroup.Indicator>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}