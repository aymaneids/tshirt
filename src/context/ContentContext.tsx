import React, { createContext, useContext, useState } from 'react';

export interface Story {
  title: string;
  content: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  avatar: string;
}

export interface ContentPage {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
}

interface ContentContextType {
  story: Story;
  setStory: React.Dispatch<React.SetStateAction<Story>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  pages: ContentPage[];
  setPages: React.Dispatch<React.SetStateAction<ContentPage[]>>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [story, setStory] = useState<Story>({
    title: 'Our Moroccan Journey',
    content: 'Founded in the heart of Morocco, our journey began with a simple mission: to bring authentic flavors and natural energy to health-conscious consumers worldwide.',
    image: 'https://images.unsplash.com/photo-1531837763904-5d3cb2632ea3?auto=format&fit=crop&q=80'
  });

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tasting Workshop',
      date: '2024-04-15',
      location: 'Marrakech Wellness Center',
      description: 'Join us for a special tasting session of our new flavors.',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80'
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Sarah M.',
      rating: 5,
      content: 'These energy balls are amazing! Perfect for my morning workout.',
      date: '2024-03-10',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    }
  ]);

  const [pages, setPages] = useState<ContentPage[]>([
    {
      id: 'contact',
      title: 'Contact Us',
      content: '# Contact Information\n\nGet in touch with us for any questions or concerns.\n\n## Email\ncontact@moroccanenergyballs.com\n\n## Phone\n+1 (555) 123-4567\n\n## Address\n123 Energy Street\nMarrakech, Morocco',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      content: '# FAQ\n\n## What are energy balls?\nEnergy balls are nutrient-dense snacks made from natural ingredients like dates, nuts, and superfoods.\n\n## Are your products organic?\nYes, we use certified organic ingredients sourced directly from Moroccan farmers.\n\n## How long do they last?\nOur energy balls stay fresh for up to 2 weeks when stored properly in a cool, dry place.',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'shipping',
      title: 'Shipping Information',
      content: '# Shipping Policy\n\n## Delivery Times\n- Domestic: 2-3 business days\n- International: 5-7 business days\n\n## Shipping Costs\n- Free shipping on orders over $50\n- Standard shipping: $5.99\n- Express shipping: $12.99',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'returns',
      title: 'Returns Policy',
      content: '# Returns Policy\n\n## Return Window\nWe accept returns within 14 days of delivery.\n\n## Conditions\n- Product must be unopened\n- Original packaging required\n- Return shipping cost covered by customer\n\n## Refund Process\nRefunds are processed within 5 business days of receiving the return.',
      lastUpdated: new Date().toISOString()
    }
  ]);

  return (
    <ContentContext.Provider value={{ story, setStory, events, setEvents, reviews, setReviews, pages, setPages }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}