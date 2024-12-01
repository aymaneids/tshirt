import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product } from './ProductContext';
import toast from 'react-hot-toast';

export type OrderStatus = 'pending' | 'confirmed' | 'not_confirmed' | 'shipping' | 'successful' | 'returned';

export interface Order {
  id: string;
  product: Product;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  total: number;
  userId: string;
  quantity: number;
  hasReviewed?: boolean;
  details?: {
    color: string;
    size: string;
    paymentMethod: 'cod';
  };
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'updatedAt' | 'hasReviewed'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  markAsReviewed: (orderId: string) => Promise<void>;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addOrder = async (orderData: Omit<Order, 'updatedAt' | 'hasReviewed'>) => {
    try {
      const newOrderRef = doc(collection(db, 'orders'), orderData.id);
      const now = new Date().toISOString();
      const newOrder: Order = {
        ...orderData,
        updatedAt: now,
        hasReviewed: false
      };

      await setDoc(newOrderRef, {
        ...newOrder,
        createdAt: now,
        updatedAt: now
      });
      
      toast.success('Order placed successfully');
      return newOrder;
    } catch (error) {
      console.error('Error adding order:', error);
      toast.error('Failed to place order');
      throw error;
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  const markAsReviewed = async (orderId: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        hasReviewed: true,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error marking order as reviewed:', error);
      throw error;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      deleteOrder,
      getOrderById,
      markAsReviewed,
      loading
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}