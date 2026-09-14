// Improved catalog-scooters.ts with enhanced type definitions and structure
// Maintains existing data while adding useful metadata for filtering and discovery

export interface ScooterModel {
  id: string;
  name: string;
  model: string;
  category: 'Urban' | 'Sport' | 'Electric' | 'Maxi' | 'Classic' | 'Adventure';
  displacement?: string; // e.g., "125cc", "300cc"
  engine?: string; // e.g., "Single-cylinder 4-stroke"
  price?: number; // Only if verified
  priceDisplay?: string; // e.g., "€3,999" or "On request"
  availability?: 'In Stock' | 'Available' | 'On Request' | 'Coming Soon';
  image?: string;
  images?: string[];
  colors?: string[];
  description?: string;
  shortDescription?: string;
  features?: string[];
  specs?: {
    engine?: string;
    displacement?: string;
    power?: string;
    torque?: string;
    transmission?: string;
    fuelCapacity?: string;
    weight?: string;
    seatHeight?: string;
    battery?: string; // For electric models
    range?: string; // For electric models
  };
  whatsappMessage?: string; // Pre-filled message template
  showroomAvailable?: boolean;
  featured?: boolean;
}

// Helper function to get unique categories for filters
export function getScooterCategories(scooters: ScooterModel[]): string[] {
  return Array.from(new Set(scooters.map(s => s.category)));
}

// Helper function to get unique displacements for filters
export function getScooterDisplacements(scooters: ScooterModel[]): string[] {
  return Array.from(new Set(scooters.map(s => s.displacement).filter(Boolean))) as string[];
}

// Helper function to filter scooters
export function filterScooters(
  scooters: ScooterModel[],
  filters: {
    category?: string;
    displacement?: string;
    availability?: string;
  }
): ScooterModel[] {
  return scooters.filter(scooter => {
    if (filters.category && scooter.category !== filters.category) return false;
    if (filters.displacement && scooter.displacement !== filters.displacement) return false;
    if (filters.availability && scooter.availability !== filters.availability) return false;
    return true;
  });
}

// Helper function to search scooters
export function searchScooters(scooters: ScooterModel[], query: string): ScooterModel[] {
  const searchQuery = query.toLowerCase().trim();
  if (!searchQuery) return scooters;
  
  return scooters.filter(scooter => {
    const searchableText = `${scooter.name} ${scooter.model} ${scooter.category} ${scooter.description || ''} ${scooter.shortDescription || ''}`.toLowerCase();
    return searchableText.includes(searchQuery);
  });
}
