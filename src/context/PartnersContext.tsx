import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

export interface PartnerSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface PartnerImage {
  url: string;
  caption: string;
}

export interface PartnerVideo {
  url: string;
  title: string;
  thumbnail?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  fullDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialLinks: PartnerSocialLinks;
  yearsOfExperience: number;
  establishedYear: number;
  specialties: string[];
  images: PartnerImage[];
  videos: PartnerVideo[];
  workStyle: string;
  achievements: string[];
}

interface PartnersContextType {
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  updatePartner: (id: string, partner: Omit<Partner, 'id'>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
  loading: boolean;
}

const PartnersContext = createContext<PartnersContextType | undefined>(undefined);

export function PartnersProvider({ children }: { children: React.ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'partners'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const partnersData: Partner[] = [];
      snapshot.forEach((doc) => {
        partnersData.push({ id: doc.id, ...doc.data() } as Partner);
      });
      setPartners(partnersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addPartner = async (partner: Omit<Partner, 'id'>) => {
    try {
      const newDocRef = doc(collection(db, 'partners'));
      await setDoc(newDocRef, partner);
      toast.success('Partner added successfully');
    } catch (error) {
      console.error('Error adding partner:', error);
      toast.error('Failed to add partner');
      throw error;
    }
  };

  const updatePartner = async (id: string, partner: Omit<Partner, 'id'>) => {
    try {
      await setDoc(doc(db, 'partners', id), partner, { merge: true });
      toast.success('Partner updated successfully');
    } catch (error) {
      console.error('Error updating partner:', error);
      toast.error('Failed to update partner');
      throw error;
    }
  };

  const deletePartner = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'partners', id));
      toast.success('Partner deleted successfully');
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error('Failed to delete partner');
      throw error;
    }
  };

  return (
    <PartnersContext.Provider value={{
      partners,
      addPartner,
      updatePartner,
      deletePartner,
      loading
    }}>
      {children}
    </PartnersContext.Provider>
  );
}

export function usePartners() {
  const context = useContext(PartnersContext);
  if (context === undefined) {
    throw new Error('usePartners must be used within a PartnersProvider');
  }
  return context;
}