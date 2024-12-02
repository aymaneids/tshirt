import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import type { CheckboxFilterProps } from './types';

export function CheckboxFilter({ label, checked, onChange }: CheckboxFilterProps) {
  return (
    <div className="flex items-center">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onChange}
        className="h-4 w-4 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
      >
        <Checkbox.Indicator>
          <Check className="h-3 w-3 text-amber-600 dark:text-amber-400" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className="ml-2 text-sm text-neutral-600 dark:text-neutral-300">
        {label}
      </label>
    </div>
  );
}