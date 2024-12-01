import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProductProvider } from './context/ProductContext';
import { ContentProvider } from './context/ContentContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ReviewProvider } from './context/ReviewContext';
import { PartnersProvider } from './context/PartnersContext';
import { LikesProvider } from './context/LikesContext';
import { ThemeProvider } from './context/ThemeContext';
import { SocialPage } from './pages/SocialPage';
import { ProductPage } from './pages/ProductPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductReviewPage } from './pages/ProductReviewPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StoryPage } from './pages/StoryPage';
import { EventsPage } from './pages/EventsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingPage } from './pages/ShippingPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthPage } from './pages/AuthPage';
import { CartPage } from './pages/CartPage';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { PartnerDetailsPage } from './pages/PartnerDetailsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <ContentProvider>
            <OrderProvider>
              <CartProvider>
                <ReviewProvider>
                  <PartnersProvider>
                    <LikesProvider>
                      <Toaster position="top-right" />
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/dashboard/*" element={
                          <PrivateRoute admin>
                            <Dashboard />
                          </PrivateRoute>
                        } />
                        <Route path="/profile" element={
                          <PrivateRoute>
                            <ProfilePage />
                          </PrivateRoute>
                        } />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/products/:productId" element={<ProductDetailsPage />} />
                        <Route path="/products/:productId/review" element={
                          <PrivateRoute>
                            <ProductReviewPage />
                          </PrivateRoute>
                        } />
                        <Route path="/partners/:partnerId" element={<PartnerDetailsPage />} />
                        <Route path="/social" element={<SocialPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/story" element={<StoryPage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/reviews" element={<ReviewsPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/shipping" element={<ShippingPage />} />
                        <Route path="/returns" element={<ReturnsPage />} />
                      </Routes>
                    </LikesProvider>
                  </PartnersProvider>
                </ReviewProvider>
              </CartProvider>
            </OrderProvider>
          </ContentProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}