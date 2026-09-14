import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ScooterDetailPage from '../../../components/catalog/ScooterDetailPage';
import { catalogScooters, type ScooterModel } from '../../../data/catalog-scooters';

// Generate static params for all scooters
export async function generateStaticParams() {
  return catalogScooters.map((scooter) => ({
    scooterId: scooter.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { scooterId: string } }): Promise<Metadata> {
  const scooter = catalogScooters.find((s) => s.id === params.scooterId);
  
  if (!scooter) {
    return {
      title: 'Scooter Not Found | Grossi Moto',
    };
  }

  return {
    title: `${scooter.name} | Grossi Moto - KYMCO Dealer Rome`,
    description: scooter.description || `Discover the KYMCO ${scooter.name} at Grossi Moto, your official KYMCO dealer in Rome.`,
  };
}

// Page component
export default async function ScooterPage({ params }: { params: { scooterId: string } }) {
  // Find the scooter in the catalog
  const scooter: ScooterModel | undefined = catalogScooters.find(
    (s) => s.id === params.scooterId
  );

  // If scooter not found, show 404
  if (!scooter) {
    notFound();
  }

  return <ScooterDetailPage scooter={scooter} />;
}
