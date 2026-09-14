import React from 'react';
import type { Metadata } from 'next';
import CatalogGrid from '../../components/catalog/CatalogGrid';
import { catalogScooters } from '../../data/catalog-scooters';

export const metadata: Metadata = {
  title: 'Scooter Catalog | Grossi Moto - KYMCO Dealer Rome',
  description: 'Browse our complete KYMCO scooter catalog. Find the perfect scooter for your needs with detailed specifications and availability information. Visit our Rome showroom.',
};

export default function ScootersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              KYMCO Scooter Catalog
            </h1>
            <p className="text-lg text-gray-600">
              Discover our complete range of KYMCO scooters. From urban commuters to maxi scooters, 
              find the perfect model for your lifestyle. All models available to view and test at our Rome showroom.
            </p>
          </div>
        </div>
      </header>

      {/* Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CatalogGrid scooters={catalogScooters} />
      </main>

      {/* Showroom CTA Section */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Want to see them in person?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Visit our showroom in Rome to explore the full KYMCO range. Our team is ready to help you find the perfect scooter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contatti"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Contact us
              </a>
              <a
                href="https://wa.me/393331234567?text=Hi,%20I'd%20like%20to%20know%20more%20about%20your%20scooter%20showroom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-green-700 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
