import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from '../Link';
import type { Event } from '../../context/ContentContext';

export function EventsEditor() {
  const { events, setEvents } = useContent();
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  const initialEvent = {
    id: '',
    title: '',
    date: '',
    location: '',
    description: '',
    image: ''
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      if (editingEvent.id) {
        setEvents(events.map(evt => evt.id === editingEvent.id ? editingEvent : evt));
      } else {
        const newEvent = {
          ...editingEvent,
          id: Date.now().toString()
        };
        setEvents([...events, newEvent]);
      }
      setEditingEvent(null);
      setShowForm(false);
    }
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(evt => evt.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Events</h2>
        <button
          onClick={() => {
            setEditingEvent(initialEvent);
            setShowForm(true);
          }}
          className="btn btn-primary flex items-center gap-2 ml-auto"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            {editingEvent?.id ? 'Edit Event' : 'Add New Event'}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Title</label>
              <input
                type="text"
                value={editingEvent?.title || ''}
                onChange={e => setEditingEvent({ ...editingEvent!, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Date</label>
              <input
                type="date"
                value={editingEvent?.date || ''}
                onChange={e => setEditingEvent({ ...editingEvent!, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Location</label>
              <input
                type="text"
                value={editingEvent?.location || ''}
                onChange={e => setEditingEvent({ ...editingEvent!, location: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Description</label>
              <textarea
                value={editingEvent?.description || ''}
                onChange={e => setEditingEvent({ ...editingEvent!, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Image URL</label>
              <input
                type="url"
                value={editingEvent?.image || ''}
                onChange={e => setEditingEvent({ ...editingEvent!, image: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingEvent(null);
                  setShowForm(false);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-medium text-lg">{event.title}</h3>
            <p className="text-amber-800 text-sm mt-1">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-neutral-600 text-sm mt-1">{event.location}</p>
            <p className="text-neutral-600 mt-2">{event.description}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowForm(true);
                }}
                className="btn btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="btn btn-secondary text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}