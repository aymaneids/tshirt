import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from '../Link';
import type { ContentPage } from '../../context/ContentContext';

interface ContentEditorProps {
  pageId: string;
}

export function ContentEditor({ pageId }: ContentEditorProps) {
  const { pages, setPages } = useContent();
  const page = pages.find(p => p.id === pageId);
  const [content, setContent] = useState(page?.content || '');

  if (!page) {
    return <div>Page not found</div>;
  }

  const handleSave = () => {
    setPages(pages.map(p => 
      p.id === pageId 
        ? { ...p, content, lastUpdated: new Date().toISOString() }
        : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Edit {page.title}</h2>
        <button
          onClick={handleSave}
          className="btn btn-primary flex items-center gap-2 ml-auto"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Content (Markdown supported)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 font-mono"
          />
        </div>
        <div className="text-sm text-neutral-500">
          Last updated: {new Date(page.lastUpdated).toLocaleString()}
        </div>
      </div>
    </div>
  );
}