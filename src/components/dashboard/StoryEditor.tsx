import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../Link';

export function StoryEditor() {
  const { story, setStory } = useContent();
  const [editedStory, setEditedStory] = useState(story);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStory(editedStory);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Edit Our Story</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Title</label>
          <input
            type="text"
            value={editedStory.title}
            onChange={e => setEditedStory({ ...editedStory, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Content</label>
          <textarea
            value={editedStory.content}
            onChange={e => setEditedStory({ ...editedStory, content: e.target.value })}
            rows={6}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Image URL</label>
          <input
            type="url"
            value={editedStory.image}
            onChange={e => setEditedStory({ ...editedStory, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="prose max-w-none">
          <img
            src={editedStory.image}
            alt="Our Story"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1>{editedStory.title}</h1>
          <p>{editedStory.content}</p>
        </div>
      </div>
    </div>
  );
}