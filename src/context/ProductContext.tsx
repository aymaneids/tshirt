import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

export interface ProductImage {
  url: string;
  alt: string;
}

interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  images: ProductImage[];
  modelUrl?: string;
  details: {
    type: 'T-Shirt' | 'Hoodie';
    sizes: string[];
    colors: ProductColor[];
    material: string;
    careInstructions: string[];
    features: string[];
    fit: string;
    printTechnique: string;
    designInspiration: string;
    sustainability: string;
    madeIn: string;
  };
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newDocRef = doc(collection(db, 'products'));
      await setDoc(newDocRef, {
        ...product,
        createdAt: new Date().toISOString()
      });
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      throw error;
    }
  };

  const updateProduct = async (id: string, product: Omit<Product, 'id'>) => {
    try {
      await setDoc(doc(db, 'products', id), {
        ...product,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      loading
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}