import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePartners } from '../context/PartnersContext';
import { Facebook, Instagram, Twitter, Linkedin, Globe, Mail, Phone, MapPin, Calendar, Award, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export function PartnerDetailsPage() {
  const { partnerId } = useParams();
  const { partners } = usePartners();
  const partner = partners.find(p => p.id === partnerId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!partner) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-xl">Partner not found</p>
            <Link
              to="/"
              className="mt-4 mx-auto block btn btn-primary"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === partner.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? partner.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center gap-8 mb-12">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-32 h-32 object-contain"
            />
            <div>
              <h1 className="text-4xl font-bold text-neutral-900">{partner.name}</h1>
              <p className="text-lg text-neutral-600 mt-2">{partner.description}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="relative aspect-square bg-neutral-100 rounded-xl overflow-hidden">
                {partner.images.length > 0 && (
                  <>
                    <img
                      src={partner.images[selectedImageIndex].url}
                      alt={partner.images[selectedImageIndex].caption}
                      className="w-full h-full object-cover"
                    />
                    {partner.images.length > 1 && (
                      <>
                        <button
                          onClick={previousImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
                      {partner.images[selectedImageIndex].caption}
                    </p>
                  </>
                )}
              </div>
              
              {/* Thumbnail Grid */}
              {partner.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {partner.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden ${
                        index === selectedImageIndex ? 'ring-2 ring-amber-500' : ''
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* About Section */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">About</h2>
                <div className="prose max-w-none">
                  <p>{partner.fullDescription}</p>
                </div>
              </div>

              {/* Work Style */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Work Style</h2>
                <div className="prose max-w-none">
                  <p>{partner.workStyle}</p>
                </div>
              </div>

              {/* Achievements */}
              {partner.achievements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Achievements</h2>
                  <ul className="space-y-3">
                    {partner.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                        <span className="text-neutral-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="bg-amber-50 p-6 rounded-xl">
              <div className="flex items-center gap-2 text-amber-800 mb-4">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Experience & Expertise</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-amber-900">{partner.yearsOfExperience} Years</p>
                  <p className="text-amber-700">Est. {partner.establishedYear}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {partner.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-neutral-50 p-6 rounded-xl">
              <h3 className="font-medium text-neutral-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${partner.contactInfo.email}`}
                  className="flex items-center gap-3 text-neutral-700 hover:text-amber-800"
                >
                  <Mail className="w-5 h-5" />
                  <span>{partner.contactInfo.email}</span>
                </a>
                <a
                  href={`tel:${partner.contactInfo.phone}`}
                  className="flex items-center gap-3 text-neutral-700 hover:text-amber-800"
                >
                  <Phone className="w-5 h-5" />
                  <span>{partner.contactInfo.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-neutral-700">
                  <MapPin className="w-5 h-5 mt-1" />
                  <span>{partner.contactInfo.address}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-neutral-50 p-6 rounded-xl">
              <h3 className="font-medium text-neutral-900 mb-4">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {partner.socialLinks.facebook && (
                  <a
                    href={partner.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-amber-800"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {partner.socialLinks.instagram && (
                  <a
                    href={partner.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-amber-800"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {partner.socialLinks.twitter && (
                  <a
                    href={partner.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-amber-800"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
                {partner.socialLinks.linkedin && (
                  <a
                    href={partner.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-amber-800"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Videos Section */}
          {partner.videos.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">Featured Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {partner.videos.map((video, index) => (
                  <div key={index}>
                    <div className="aspect-video rounded-xl overflow-hidden bg-neutral-100">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-neutral-900">{video.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}