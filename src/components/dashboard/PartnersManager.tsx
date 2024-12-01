import React, { useState } from 'react';
import { usePartners } from '../../context/PartnersContext';
import { Plus, Trash2, ArrowLeft, ExternalLink, X } from 'lucide-react';
import { Link } from '../Link';
import type { Partner, PartnerImage, PartnerVideo } from '../../context/PartnersContext';
import toast from 'react-hot-toast';

const initialPartner: Omit<Partner, 'id'> = {
  name: '',
  logo: '',
  description: '',
  fullDescription: '',
  contactInfo: {
    email: '',
    phone: '',
    address: ''
  },
  socialLinks: {},
  yearsOfExperience: 0,
  establishedYear: new Date().getFullYear(),
  specialties: [],
  images: [],
  videos: [],
  workStyle: '',
  achievements: []
};

export function PartnersManager() {
  const { partners, addPartner, updatePartner, deletePartner } = usePartners();
  const [editingPartner, setEditingPartner] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newImage, setNewImage] = useState<PartnerImage>({ url: '', caption: '' });
  const [newVideo, setNewVideo] = useState<PartnerVideo>({ url: '', title: '', thumbnail: '' });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPartner.id) {
        await updatePartner(editingPartner.id, editingPartner);
      } else {
        await addPartner(editingPartner);
      }
      setEditingPartner(null);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save partner:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        await deletePartner(id);
      } catch (error) {
        console.error('Failed to delete partner:', error);
      }
    }
  };

  const addSpecialty = () => {
    if (newSpecialty && editingPartner) {
      setEditingPartner({
        ...editingPartner,
        specialties: [...editingPartner.specialties, newSpecialty]
      });
      setNewSpecialty('');
    }
  };

  const addAchievement = () => {
    if (newAchievement && editingPartner) {
      setEditingPartner({
        ...editingPartner,
        achievements: [...editingPartner.achievements, newAchievement]
      });
      setNewAchievement('');
    }
  };

  const addImage = () => {
    if (newImage.url && newImage.caption && editingPartner) {
      setEditingPartner({
        ...editingPartner,
        images: [...editingPartner.images, newImage]
      });
      setNewImage({ url: '', caption: '' });
    }
  };

  const addVideo = () => {
    if (newVideo.url && newVideo.title && editingPartner) {
      setEditingPartner({
        ...editingPartner,
        videos: [...editingPartner.videos, newVideo]
      });
      setNewVideo({ url: '', title: '', thumbnail: '' });
    }
  };

  const removeImage = (index: number) => {
    if (editingPartner) {
      const newImages = [...editingPartner.images];
      newImages.splice(index, 1);
      setEditingPartner({ ...editingPartner, images: newImages });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Partners</h2>
        <button
          onClick={() => {
            setEditingPartner(initialPartner);
            setShowForm(true);
          }}
          className="btn btn-primary flex items-center gap-2 ml-auto"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      {showForm && editingPartner && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">
            {editingPartner?.id ? 'Edit Partner' : 'Add New Partner'}
          </h3>
          <form onSubmit={handleSave} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Name</label>
                <input
                  type="text"
                  value={editingPartner?.name || ''}
                  onChange={e => setEditingPartner({ ...editingPartner, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Logo URL</label>
                <input
                  type="url"
                  value={editingPartner?.logo || ''}
                  onChange={e => setEditingPartner({ ...editingPartner, logo: e.target.value })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Short Description</label>
                <input
                  type="text"
                  value={editingPartner?.description || ''}
                  onChange={e => setEditingPartner({ ...editingPartner, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Full Description</label>
                <textarea
                  value={editingPartner?.fullDescription || ''}
                  onChange={e => setEditingPartner({ ...editingPartner, fullDescription: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Contact Information</h4>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Email</label>
                <input
                  type="email"
                  value={editingPartner?.contactInfo.email || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    contactInfo: { ...editingPartner.contactInfo, email: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Phone</label>
                <input
                  type="tel"
                  value={editingPartner?.contactInfo.phone || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    contactInfo: { ...editingPartner.contactInfo, phone: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Address</label>
                <input
                  type="text"
                  value={editingPartner?.contactInfo.address || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    contactInfo: { ...editingPartner.contactInfo, address: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-medium">Social Links</h4>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Facebook</label>
                <input
                  type="url"
                  value={editingPartner?.socialLinks.facebook || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    socialLinks: { ...editingPartner.socialLinks, facebook: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Instagram</label>
                <input
                  type="url"
                  value={editingPartner?.socialLinks.instagram || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    socialLinks: { ...editingPartner.socialLinks, instagram: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Twitter</label>
                <input
                  type="url"
                  value={editingPartner?.socialLinks.twitter || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    socialLinks: { ...editingPartner.socialLinks, twitter: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">LinkedIn</label>
                <input
                  type="url"
                  value={editingPartner?.socialLinks.linkedin || ''}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    socialLinks: { ...editingPartner.socialLinks, linkedin: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h4 className="font-medium">Experience</h4>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Years of Experience</label>
                <input
                  type="number"
                  value={editingPartner?.yearsOfExperience || 0}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    yearsOfExperience: parseInt(e.target.value)
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Established Year</label>
                <input
                  type="number"
                  value={editingPartner?.establishedYear || new Date().getFullYear()}
                  onChange={e => setEditingPartner({
                    ...editingPartner,
                    establishedYear: parseInt(e.target.value)
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            {/* Specialties */}
            <div className="space-y-4">
              <h4 className="font-medium">Specialties</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={e => setNewSpecialty(e.target.value)}
                  placeholder="Add specialty"
                  className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={addSpecialty}
                  className="btn btn-secondary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editingPartner?.specialties.map((specialty: string, index: number) => (
                  <div
                    key={index}
                    className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    <span>{specialty}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newSpecialties = [...editingPartner.specialties];
                        newSpecialties.splice(index, 1);
                        setEditingPartner({ ...editingPartner, specialties: newSpecialties });
                      }}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h4 className="font-medium">Images</h4>
              <div className="space-y-2">
                <input
                  type="url"
                  value={newImage.url}
                  onChange={e => setNewImage({ ...newImage, url: e.target.value })}
                  placeholder="Image URL"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <input
                  type="text"
                  value={newImage.caption}
                  onChange={e => setNewImage({ ...newImage, caption: e.target.value })}
                  placeholder="Image caption"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="btn btn-secondary"
                >
                  Add Image
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {editingPartner?.images.map((image: PartnerImage, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="mt-1 text-sm text-neutral-600">{image.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div className="space-y-4">
              <h4 className="font-medium">Videos</h4>
              <div className="space-y-2">
                <input
                  type="url"
                  value={newVideo.url}
                  onChange={e => setNewVideo({ ...newVideo, url: e.target.value })}
                  placeholder="Video URL (YouTube/Vimeo embed URL)"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
                  placeholder="Video title"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <input
                  type="url"
                  value={newVideo.thumbnail || ''}
                  onChange={e => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                  placeholder="Video thumbnail URL (optional)"
                  className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={addVideo}
                  className="btn btn-secondary"
                >
                  Add Video
                </button>
              </div>
              <div className="space-y-4">
                {editingPartner?.videos.map((video: PartnerVideo, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-neutral-50 p-4 rounded-lg">
                    <div>
                      <h5 className="font-medium">{video.title}</h5>
                      <p className="text-sm text-neutral-600">{video.url}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newVideos = [...editingPartner.videos];
                        newVideos.splice(index, 1);
                        setEditingPartner({ ...editingPartner, videos: newVideos });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Style */}
            <div>
              <label className="block text-sm font-medium text-neutral-700">Work Style</label>
              <textarea
                value={editingPartner?.workStyle || ''}
                onChange={e => setEditingPartner({ ...editingPartner, workStyle: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              <h4 className="font-medium">Achievements</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={e => setNewAchievement(e.target.value)}
                  placeholder="Add achievement"
                  className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={addAchievement}
                  className="btn btn-secondary"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {editingPartner?.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-center justify-between bg-neutral-50 p-3 rounded-lg">
                    <span>{achievement}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newAchievements = [...editingPartner.achievements];
                        newAchievements.splice(index, 1);
                        setEditingPartner({ ...editingPartner, achievements: newAchievements });
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingPartner(null);
                  setShowForm(false);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Partner
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white p-4 rounded-lg shadow-sm">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 object-contain mx-auto mb-4"
            />
            <h3 className="font-medium text-lg text-center">{partner.name}</h3>
            <p className="text-neutral-600 mt-2">{partner.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={`/partners/${partner.id}`}
                className="text-amber-800 hover:text-amber-900 flex items-center gap-1"
              >
                View Details
                <ExternalLink className="w-4 h-4" />
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingPartner(partner);
                    setShowForm(true);
                  }}
                  className="btn btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="btn btn-secondary text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}