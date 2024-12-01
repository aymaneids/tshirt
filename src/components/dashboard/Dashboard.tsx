import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { ProductEditor } from './ProductEditor';
import { DashboardOverview } from './DashboardOverview';
import { EventsEditor } from './EventsEditor';
import { ReviewsEditor } from './ReviewsEditor';
import { StoryEditor } from './StoryEditor';
import { DashboardSettings } from './DashboardSettings';
import { ContentEditor } from './ContentEditor';
import { OrdersManager } from './OrdersManager';
import { SubscribersManager } from './SubscribersManager';
import { SocialLinksManager } from './SocialLinksManager';
import { MessagesManager } from './MessagesManager';
import { PartnersManager } from './PartnersManager';

export function Dashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/products" element={<ProductEditor />} />
        <Route path="/events" element={<EventsEditor />} />
        <Route path="/reviews" element={<ReviewsEditor />} />
        <Route path="/story" element={<StoryEditor />} />
        <Route path="/settings" element={<DashboardSettings />} />
        <Route path="/contact" element={<ContentEditor pageId="contact" />} />
        <Route path="/faq" element={<ContentEditor pageId="faq" />} />
        <Route path="/shipping" element={<ContentEditor pageId="shipping" />} />
        <Route path="/returns" element={<ContentEditor pageId="returns" />} />
        <Route path="/orders" element={<OrdersManager />} />
        <Route path="/subscribers" element={<SubscribersManager />} />
        <Route path="/social" element={<SocialLinksManager />} />
        <Route path="/messages" element={<MessagesManager />} />
        <Route path="/partners" element={<PartnersManager />} />
      </Routes>
    </DashboardLayout>
  );
}