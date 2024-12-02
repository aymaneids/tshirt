import React from 'react';
import { ChevronDown } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import type { FilterSectionProps } from './types';

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <Collapsible.Root defaultOpen className="border-b border-neutral-200 dark:border-neutral-700 py-4">
      <Collapsible.Trigger className="flex w-full items-center justify-between text-sm font-medium text-neutral-900 dark:text-white">
        {title}
        <ChevronDown className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </Collapsible.Trigger>
      <Collapsible.Content className="pt-4">
        {children}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}