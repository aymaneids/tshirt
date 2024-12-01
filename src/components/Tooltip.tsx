import React from 'react';

interface TooltipProps {
  content: React.ReactNode;
}

export function Tooltip({ content }: TooltipProps) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
      {content}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white transform rotate-45"></div>
    </div>
  );
}