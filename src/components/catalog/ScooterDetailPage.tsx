// Scooter detail page component
// Shows detailed information about a specific scooter model

'use client';

import React from 'react';
import Link from 'next/link';
import type { ScooterModel } from '../../../data/catalog-scooters';

interface ScooterDetailPageProps {
  scooter: ScooterModel;
}

// WhatsApp phone number (replace with actual Grossi Moto number)
const WHATSAPP_NUMBER = '393331234567';
const PHONE_NUMBER = '+390612345678';

const ScooterDetailPage: React.FC<ScooterDetailPageProps> = ({ scooter }) => {
  // Create WhatsApp link with pre-filled message
  const getWhatsAppLink = () => {
    const message =
      scooter.whatsappMessage ||
      `Hi, I'd like more information about the KYMCO ${scooter.name}. Is it available to see or test at your showroom?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Link href="/scooters" className="hover:text-gray-900 transition-colors">
              Scooters
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-900 font-medium">{scooter.name}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden">
              {scooter.image ? (
                <img
                  src={scooter.image}
                  alt={scooter.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-gray-400">Image coming soon</span>
                </div>
              )}
            </div>

            {/* Additional Images (if available) */}
            {scooter.images && scooter.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {scooter.images.map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                    <img src={img} alt={`${scooter.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {scooter.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {scooter.name}
              </h1>
              {scooter.priceDisplay && (
                <p className="text-2xl font-semibold text-gray-900">{scooter.priceDisplay}</p>
              )}
            </div>

            {/* Availability */}
            {scooter.availability && (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                    scooter.availability === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : scooter.availability === 'Available'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <span className="w-2 h-2 mr-2 rounded-full bg-current" />
                  {scooter.availability}
                </span>
                {scooter.showroomAvailable && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Available in showroom
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            {scooter.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Overview</h2>
                <p className="text-gray-600 leading-relaxed">{scooter.description}</p>
              </div>
            )}

            {/* Key Specs */}
            {scooter.specs && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {scooter.specs.displacement && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Displacement</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.displacement}</div>
                    </div>
                  )}
                  {scooter.specs.engine && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Engine</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.engine}</div>
                    </div>
                  )}
                  {scooter.specs.transmission && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Transmission</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.transmission}</div>
                    </div>
                  )}
                  {scooter.specs.weight && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Weight</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.weight}</div>
                    </div>
                  )}
                  {scooter.specs.seatHeight && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Seat Height</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.seatHeight}</div>
                    </div>
                  )}
                  {scooter.specs.battery && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Battery</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.battery}</div>
                    </div>
                  )}
                  {scooter.specs.range && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-500 mb-1">Range</div>
                      <div className="text-lg font-semibold text-gray-900">{scooter.specs.range}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {scooter.features && scooter.features.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Features</h2>
                <ul className="space-y-2">
                  {scooter.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Interested?</h2>
              
              {/* WhatsApp */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Chat on WhatsApp
              </a>

              {/* Phone */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-gray-900 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call us
              </a>

              {/* Showroom CTA */}
              {scooter.showroomAvailable && (
                <Link
                  href="/contatti"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Visit the showroom
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScooterDetailPage;
