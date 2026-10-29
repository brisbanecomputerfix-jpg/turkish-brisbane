export interface LatLng {
  lat: number;
  lng: number;
}

export const SUBURB_COORDINATES: Record<string, LatLng> = {
  "South Bank": { lat: -27.4810, lng: 153.0234 },
  "Indooroopilly": { lat: -27.4984, lng: 152.9733 },
  "Sunnybank": { lat: -27.5794, lng: 153.0583 },
  "Brisbane CBD": { lat: -27.4698, lng: 153.0251 },
  "Chermside": { lat: -27.3872, lng: 153.0315 },
  "Toowong": { lat: -27.4851, lng: 152.9926 },
  "Fortitude Valley": { lat: -27.4568, lng: 153.0345 },
  "Mount Gravatt": { lat: -27.5338, lng: 153.0768 },
  "New Farm": { lat: -27.4680, lng: 153.0494 },
  "Carindale": { lat: -27.5050, lng: 153.1020 },
  "Springfield": { lat: -27.6530, lng: 152.9150 },
  "Logan": { lat: -27.6400, lng: 153.1080 },
  "Gold Coast": { lat: -28.0024, lng: 153.4146 },
  "Sunshine Coast": { lat: -26.6534, lng: 153.0886 },
};

/**
 * Returns exact coordinates or generates deterministic jitter for matching suburb
 */
export function getBusinessCoordinates(suburb: string, businessId: string): LatLng {
  const base = SUBURB_COORDINATES[suburb] || SUBURB_COORDINATES["Brisbane CBD"];
  
  // Deterministic tiny offset based on ID string to avoid exact marker overlaps
  let hash = 0;
  for (let i = 0; i < businessId.length; i++) {
    hash = (hash << 5) - hash + businessId.charCodeAt(i);
    hash |= 0;
  }
  const latOffset = ((Math.abs(hash) % 100) - 50) * 0.00018;
  const lngOffset = ((Math.abs(hash >> 3) % 100) - 50) * 0.00018;

  return {
    lat: base.lat + latOffset,
    lng: base.lng + lngOffset,
  };
}

