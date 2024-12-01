import React from 'react';
import { Package, Calendar, MessageSquare, TrendingUp, ShoppingBag } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useContent } from '../../context/ContentContext';
import { useOrders } from '../../context/OrderContext';

export function DashboardOverview() {
  const { products } = useProducts();
  const { events, reviews } = useContent();
  const { orders } = useOrders();

  const stats = [
    { 
      label: 'Total Products', 
      value: products.length.toString(), 
      icon: Package, 
      change: `${products.length > 0 ? '+1' : '0'} this month` 
    },
    { 
      label: 'Upcoming Events', 
      value: events.filter(e => new Date(e.date) > new Date()).length.toString(), 
      icon: Calendar, 
      change: 'Next 30 days' 
    },
    { 
      label: 'Total Reviews', 
      value: reviews.length.toString(), 
      icon: MessageSquare, 
      change: `${reviews.length > 0 ? '+' + reviews.filter(r => new Date(r.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length : '0'} this month` 
    },
    {
      label: 'Total Orders',
      value: orders.length.toString(),
      icon: ShoppingBag,
      change: `${orders.length > 0 ? '+' + orders.filter(o => new Date(o.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length : '0'} today`
    },
    { 
      label: 'Growth Rate', 
      value: '24%', 
      icon: TrendingUp, 
      change: '+5% from last month' 
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900">Dashboard Overview</h2>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white overflow-hidden rounded-lg shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-amber-800" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-neutral-500 truncate">
                        {stat.label}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-neutral-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-neutral-50 px-5 py-3">
                <div className="text-sm text-neutral-500">
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}