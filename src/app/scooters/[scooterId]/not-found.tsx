import React from 'react';
import Link from 'next/link';

export default function ScooterNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-20 w-20 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scooter not found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the scooter you're looking for. It might have been removed or the link is incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/scooters"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Browse all scooters
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
