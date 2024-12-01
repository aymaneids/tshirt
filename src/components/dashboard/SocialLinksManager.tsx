import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ArrowLeft, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from '../Link';
import toast from 'react-hot-toast';

interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
}

export function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    instagram: '',
    facebook: '',
    twitter: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const docRef = doc(db, 'settings', 'socialLinks');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSocialLinks(docSnap.data() as SocialLinks);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
        toast.error('Failed to load social links');
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(doc(db, 'settings', 'socialLinks'), socialLinks);
      toast.success('Social links updated successfully');
    } catch (error) {
      console.error('Error saving social links:', error);
      toast.error('Failed to update social links');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-neutral-600">Loading social links...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Social Media Links</h2>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              Instagram Profile URL
            </div>
          </label>
          <input
            type="url"
            value={socialLinks.instagram}
            onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
            placeholder="https://instagram.com/youraccount"
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <div className="flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              Facebook Page URL
            </div>
          </label>
          <input
            type="url"
            value={socialLinks.facebook}
            onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
            placeholder="https://facebook.com/yourpage"
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            <div className="flex items-center gap-2">
              <Twitter className="w-5 h-5" />
              Twitter Profile URL
            </div>
          </label>
          <input
            type="url"
            value={socialLinks.twitter}
            onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
            placeholder="https://twitter.com/youraccount"
            className="w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}