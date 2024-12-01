import React, { useState } from 'react';
import { Plus, ArrowLeft, X } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { Link } from '../Link';
import type { Product } from '../../context/ProductContext';

const initialProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: '',
  image: '',
  images: [],
  modelUrl: '',
  details: {
    type: 'T-Shirt',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [],
    material: '',
    careInstructions: [],
    features: [],
    fit: '',
    printTechnique: '',
    designInspiration: '',
    sustainability: '',
    madeIn: ''
  }
};

export function ProductEditor() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState<(Product | Omit<Product, 'id'>) | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newColor, setNewColor] = useState({ name: '', hex: '' });
  const [newFeature, setNewFeature] = useState('');
  const [newCareInstruction, setNewCareInstruction] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      try {
        // Ensure the main image is set if there are images
        const updatedProduct = {
          ...editingProduct,
          image: editingProduct.images.length > 0 ? editingProduct.images[0].url : editingProduct.image
        };
        
        if ('id' in updatedProduct) {
          await updateProduct(updatedProduct.id, updatedProduct);
        } else {
          await addProduct(updatedProduct);
        }
        setEditingProduct(null);
        setShowForm(false);
      } catch (error) {
        console.error('Failed to save product:', error);
      }
    }
  };

  const addImage = () => {
    if (newImageUrl && editingProduct) {
      const newImage = {
        url: newImageUrl,
        alt: newImageAlt || editingProduct.name
      };
      
      setEditingProduct({
        ...editingProduct,
        images: [...editingProduct.images, newImage],
        // Set as main image if it's the first one
        image: editingProduct.images.length === 0 ? newImageUrl : editingProduct.image
      });
      
      setNewImageUrl('');
      setNewImageAlt('');
    }
  };

  const removeImage = (index: number) => {
    if (editingProduct) {
      const newImages = [...editingProduct.images];
      newImages.splice(index, 1);
      
      setEditingProduct({
        ...editingProduct,
        images: newImages,
        // Update main image if we removed the first image
        image: newImages.length > 0 ? newImages[0].url : ''
      });
    }
  };

  const addColor = () => {
    if (newColor.name && newColor.hex && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        details: {
          ...editingProduct.details,
          colors: [...editingProduct.details.colors, newColor]
        }
      });
      setNewColor({ name: '', hex: '' });
    }
  };

  const addFeature = () => {
    if (newFeature && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        details: {
          ...editingProduct.details,
          features: [...editingProduct.details.features, newFeature]
        }
      });
      setNewFeature('');
    }
  };

  const addCareInstruction = () => {
    if (newCareInstruction && editingProduct) {
      setEditingProduct({
        ...editingProduct,
        details: {
          ...editingProduct.details,
          careInstructions: [...editingProduct.details.careInstructions, newCareInstruction]
        }
      });
      setNewCareInstruction('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" className="p-2 hover:bg-amber-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-amber-800" />
        </Link>
        <h2 className="text-2xl font-bold text-neutral-900">Products</h2>
        <button
          onClick={() => {
            setEditingProduct(initialProduct);
            setShowForm(true);
          }}
          className="btn btn-primary flex items-center gap-2 ml-auto"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {showForm && editingProduct && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Product Images</label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {editingProduct.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    value={newImageAlt}
                    onChange={e => setNewImageAlt(e.target.value)}
                    placeholder="Image description (alt text)"
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
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Product Type</label>
                <select
                  value={editingProduct.details.type}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, type: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Hoodie">Hoodie</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Price</label>
                <input
                  type="text"
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Material</label>
                <input
                  type="text"
                  value={editingProduct.details.material}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, material: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="e.g., 100% Organic Cotton"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Colors</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Color name"
                    value={newColor.name}
                    onChange={e => setNewColor({ ...newColor, name: e.target.value })}
                    className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  />
                  <input
                    type="color"
                    value={newColor.hex}
                    onChange={e => setNewColor({ ...newColor, hex: e.target.value })}
                    className="w-12 h-10 rounded-md border-neutral-300"
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="btn btn-secondary"
                  >
                    Add Color
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingProduct.details.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-neutral-100 rounded-full px-3 py-1"
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newColors = [...editingProduct.details.colors];
                          newColors.splice(index, 1);
                          setEditingProduct({
                            ...editingProduct,
                            details: { ...editingProduct.details, colors: newColors }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Add a product feature"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="btn btn-secondary"
                  >
                    Add Feature
                  </button>
                </div>
                <ul className="space-y-2">
                  {editingProduct.details.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-2">
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newFeatures = [...editingProduct.details.features];
                          newFeatures.splice(index, 1);
                          setEditingProduct({
                            ...editingProduct,
                            details: { ...editingProduct.details, features: newFeatures }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Care Instructions</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCareInstruction}
                    onChange={e => setNewCareInstruction(e.target.value)}
                    className="flex-1 rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Add care instruction"
                  />
                  <button
                    type="button"
                    onClick={addCareInstruction}
                    className="btn btn-secondary"
                  >
                    Add
                  </button>
                </div>
                <ul className="space-y-2">
                  {editingProduct.details.careInstructions.map((instruction, index) => (
                    <li key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-2">
                      <span>{instruction}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newInstructions = [...editingProduct.details.careInstructions];
                          newInstructions.splice(index, 1);
                          setEditingProduct({
                            ...editingProduct,
                            details: { ...editingProduct.details, careInstructions: newInstructions }
                          });
                        }}
                        className="text-neutral-500 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Fit</label>
                <select
                  value={editingProduct.details.fit}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, fit: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="">Select fit type</option>
                  <option value="Regular">Regular Fit</option>
                  <option value="Slim">Slim Fit</option>
                  <option value="Relaxed">Relaxed Fit</option>
                  <option value="Oversized">Oversized</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Print Technique</label>
                <input
                  type="text"
                  value={editingProduct.details.printTechnique}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, printTechnique: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="e.g., Screen Printing, DTG, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Design Inspiration</label>
                <textarea
                  value={editingProduct.details.designInspiration}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, designInspiration: e.target.value }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Tell the story behind the design..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Sustainability</label>
                <textarea
                  value={editingProduct.details.sustainability}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, sustainability: e.target.value }
                  })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Sustainability features and practices..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Made In</label>
                <input
                  type="text"
                  value={editingProduct.details.madeIn}
                  onChange={e => setEditingProduct({
                    ...editingProduct,
                    details: { ...editingProduct.details, madeIn: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder="Country of manufacture"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(false);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
              {product.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 h-full">
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="grid grid-rows-2 gap-2">
                    {product.images.slice(1, 3).map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                  {product.images.length > 3 && (
                    <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded-full text-sm">
                      +{product.images.length - 3} more
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>
            <h3 className="font-medium text-lg">{product.name}</h3>
            <p className="text-amber-800 font-medium mt-1">${product.price}</p>
            <p className="text-neutral-600 mt-2">{product.description}</p>
            <div className="mt-2">
              <span className="inline-block bg-amber-100 text-amber-800 text-sm px-2 py-1 rounded-full">
                {product.details.type}
              </span>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingProduct(product);
                  setShowForm(true);
                }}
                className="btn btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
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