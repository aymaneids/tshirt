import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useProducts } from '../context/ProductContext';
import { CheckoutForm } from '../components/CheckoutForm';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInfo } from '../components/ProductInfo';
import { ProductReviews } from '../components/ProductReviews';
import { ProductModel } from '../components/ProductModel';
import { useAuth } from '../context/AuthContext';

export function ProductDetailsPage() {
  const { productId } = useParams();
  const { products } = useProducts();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | '3d'>('details');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  const handleBuyNow = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setShowCheckout(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Navbar />
        <main className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-xl text-neutral-600 dark:text-neutral-400">Product not found</p>
            <button
              onClick={() => navigate('/products')}
              className="mt-4 mx-auto block btn btn-primary"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {product.images && product.images.length > 0 ? (
              <ProductGallery images={product.images} />
            ) : (
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            )}
            <ProductInfo
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onBuyNow={handleBuyNow}
            />
          </div>

          <div className="mt-16">
            <div className="border-b border-neutral-200 dark:border-neutral-700">
              <nav className="flex gap-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 text-sm font-medium border-b-2 ${
                    activeTab === 'details'
                      ? 'border-amber-500 text-amber-800 dark:text-amber-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 text-sm font-medium border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-amber-500 text-amber-800 dark:text-amber-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                >
                  Reviews
                </button>
                {product.modelUrl && (
                  <button
                    onClick={() => setActiveTab('3d')}
                    className={`pb-4 text-sm font-medium border-b-2 ${
                      activeTab === '3d'
                        ? 'border-amber-500 text-amber-800 dark:text-amber-400'
                        : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                    }`}
                  >
                    3D View
                  </button>
                )}
              </nav>
            </div>

            <div className="mt-8">
              {activeTab === 'details' && product.details && (
                <div className="prose prose-amber prose-lg dark:prose-invert max-w-none">
                  <h3 className="text-neutral-900 dark:text-white">Product Details</h3>
                  <ul className="text-neutral-700 dark:text-neutral-300">
                    <li><strong>Type:</strong> {product.details.type}</li>
                    <li><strong>Material:</strong> {product.details.material}</li>
                    <li><strong>Fit:</strong> {product.details.fit}</li>
                    <li><strong>Made In:</strong> {product.details.madeIn}</li>
                  </ul>

                  {product.details.features && product.details.features.length > 0 && (
                    <>
                      <h3 className="text-neutral-900 dark:text-white">Features</h3>
                      <ul className="text-neutral-700 dark:text-neutral-300">
                        {product.details.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {product.details.careInstructions && product.details.careInstructions.length > 0 && (
                    <>
                      <h3 className="text-neutral-900 dark:text-white">Care Instructions</h3>
                      <ul className="text-neutral-700 dark:text-neutral-300">
                        {product.details.careInstructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {product.details.designInspiration && (
                    <>
                      <h3 className="text-neutral-900 dark:text-white">Design Inspiration</h3>
                      <p className="text-neutral-700 dark:text-neutral-300">{product.details.designInspiration}</p>
                    </>
                  )}

                  {product.details.sustainability && (
                    <>
                      <h3 className="text-neutral-900 dark:text-white">Sustainability</h3>
                      <p className="text-neutral-700 dark:text-neutral-300">{product.details.sustainability}</p>
                    </>
                  )}
                </div>
              )}
              {activeTab === 'reviews' && (
                <ProductReviews productId={product.id} />
              )}
              {activeTab === '3d' && product.modelUrl && (
                <ProductModel modelUrl={product.modelUrl} />
              )}
            </div>
          </div>
          
          {showCheckout && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <CheckoutForm
                  product={product}
                  quantity={quantity}
                  onClose={() => setShowCheckout(false)}
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}