import React, { useState } from 'react';
import type { ProductImage } from '../context/ProductContext';

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square w-full overflow-hidden rounded-lg ${
              selectedImage.url === image.url ? 'ring-2 ring-amber-500' : ''
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}