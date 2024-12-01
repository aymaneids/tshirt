import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../Link';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

interface Settings {
  heroBackgroundImage: string;
  logo: {
    url: string;
    darkUrl: string;
  };
  heritage: {
    title: string;
    description: string;
    image1: string;
    image2: string;
  };
  newsletter: {
    subscriberCount: number;
  };
}

const defaultSettings: Settings = {
  heroBackgroundImage: '',
  logo: {
    url: '',
    darkUrl: ''
  },
  heritage: {
    title: 'Moroccan Heritage in Every Thread',
    description: 'Each design tells a story, inspired by centuries of Moroccan craftsmanship and artistry. Our patterns and motifs are drawn from traditional zellige tiles, ancient textiles, and the vibrant colors of Morocco\'s imperial cities.',
    image1: '',
    image2: ''
  },
  newsletter: {
    subscriberCount: 500
  }
};

export function DashboardSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'general');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({
            heroBackgroundImage: data.heroBackgroundImage || defaultSettings.heroBackgroundImage,
            logo: {
              url: data.logo?.url || defaultSettings.logo.url,
              darkUrl: data.logo?.darkUrl || defaultSettings.logo.darkUrl
            },
            heritage: {
              title: data.heritage?.title || defaultSettings.heritage.title,
              description: data.heritage?.description || defaultSettings.heritage.description,
              image1: data.heritage?.image1 || defaultSettings.heritage.image1,
              image2: data.heritage?.image2 || defaultSettings.heritage.image2
            },
            newsletter: {
              subscriberCount: data.newsletter?.subscriberCount || defaultSettings.newsletter.subscriberCount
            }
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-neutral-600">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Settings</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Logo Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Logo Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Light Logo URL (PNG)
              </label>
              <input
                type="url"
                value={settings.logo.url}
                onChange={(e) => setSettings({
                  ...settings,
                  logo: { ...settings.logo, url: e.target.value }
                })}
                placeholder="https://example.com/logo-light.png"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {settings.logo.url && (
                <div className="mt-2 p-4 bg-white border rounded-lg">
                  <img
                    src={settings.logo.url}
                    alt="Light logo preview"
                    className="h-8 object-contain"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Dark Logo URL (PNG)
              </label>
              <input
                type="url"
                value={settings.logo.darkUrl}
                onChange={(e) => setSettings({
                  ...settings,
                  logo: { ...settings.logo, darkUrl: e.target.value }
                })}
                placeholder="https://example.com/logo-dark.png"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {settings.logo.darkUrl && (
                <div className="mt-2 p-4 bg-neutral-900 border rounded-lg">
                  <img
                    src={settings.logo.darkUrl}
                    alt="Dark logo preview"
                    className="h-8 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Newsletter Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Community Subscriber Count
            </label>
            <input
              type="number"
              min="0"
              value={settings.newsletter.subscriberCount}
              onChange={(e) => setSettings({
                ...settings,
                newsletter: { ...settings.newsletter, subscriberCount: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
            <p className="mt-1 text-sm text-neutral-500">
              This number will be displayed in the newsletter section as "Join our community of X+ subscribers"
            </p>
          </div>
        </div>

        {/* Hero Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Homepage Hero Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Hero Background Image URL
              </label>
              <input
                type="url"
                value={settings.heroBackgroundImage}
                onChange={(e) => setSettings({ ...settings, heroBackgroundImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              <p className="mt-1 text-sm text-neutral-500">
                Recommended size: 1920x1080px. Use a high-quality image for best results.
              </p>
            </div>

            {settings.heroBackgroundImage && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Preview
                </label>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={settings.heroBackgroundImage}
                    alt="Hero background preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Heritage Section Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Heritage Section Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Section Title
              </label>
              <input
                type="text"
                value={settings.heritage.title}
                onChange={(e) => setSettings({
                  ...settings,
                  heritage: { ...settings.heritage, title: e.target.value }
                })}
                placeholder="Moroccan Heritage in Every Thread"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Section Description
              </label>
              <textarea
                value={settings.heritage.description}
                onChange={(e) => setSettings({
                  ...settings,
                  heritage: { ...settings.heritage, description: e.target.value }
                })}
                rows={4}
                placeholder="Each design tells a story..."
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                First Image URL
              </label>
              <input
                type="url"
                value={settings.heritage.image1}
                onChange={(e) => setSettings({
                  ...settings,
                  heritage: { ...settings.heritage, image1: e.target.value }
                })}
                placeholder="https://example.com/heritage1.jpg"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {settings.heritage.image1 && (
                <div className="mt-2 aspect-square w-40 rounded-lg overflow-hidden">
                  <img
                    src={settings.heritage.image1}
                    alt="Heritage preview 1"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Second Image URL
              </label>
              <input
                type="url"
                value={settings.heritage.image2}
                onChange={(e) => setSettings({
                  ...settings,
                  heritage: { ...settings.heritage, image2: e.target.value }
                })}
                placeholder="https://example.com/heritage2.jpg"
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              />
              {settings.heritage.image2 && (
                <div className="mt-2 aspect-square w-40 rounded-lg overflow-hidden">
                  <img
                    src={settings.heritage.image2}
                    alt="Heritage preview 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
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