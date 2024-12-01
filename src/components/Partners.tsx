import React from 'react';
import { usePartners } from '../context/PartnersContext';
import { motion } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { Link } from 'react-router-dom';

export function Partners() {
  const { partners } = usePartners();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">Our Partners</h2>
        
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center space-x-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="flex-shrink-0 relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/partners/${partner.id}`}>
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                  <Tooltip content={
                    <div className="text-center">
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm">{partner.description}</p>
                    </div>
                  } />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}