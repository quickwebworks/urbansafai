// =============================================================================
// Urban Safai - Service Areas Data (Ludhiana)
// =============================================================================

import type { ServiceArea } from "./types";

export const serviceAreas: ServiceArea[] = [
  {
    id: "central-ludhiana",
    name: "Central Ludhiana",
    areas: [
      "Civil Lines",
      "Model Town",
      "Model Town Extension",
      "Mall Road",
      "Ghumar Mandi",
      "Brown Road",
      "Chaura Bazaar",
      "Sarafa Bazaar",
      "Clock Tower",
      "Jalandhar Road",
    ],
  },
  {
    id: "south-ludhiana",
    name: "South Ludhiana",
    areas: [
      "Dugri",
      "Dugri Phase 1",
      "Dugri Phase 2",
      "Pakhowal Road",
      "BRS Nagar",
      "BRS Nagar Extension",
      "Agar Nagar",
      "Agar Nagar Extension",
      "Rajguru Nagar",
      "Haibowal",
      "Haibowal Kalan",
      "Daad Colony",
      "Basant Nagar",
      "Guru Teg Bahadur Nagar",
      "Field Ganj",
      "Field Ganj Extension",
    ],
  },
  {
    id: "east-ludhiana",
    name: "East Ludhiana",
    areas: [
      "Sarabha Nagar",
      "Sarabha Nagar Extension",
      "Gill Road",
      "Gill Colony",
      "Kitchlu Nagar",
      "Kitchlu Nagar Extension",
      "Patiala Road",
      "GT Road",
      "Lakkar Bazaar",
      "Khanna Road",
    ],
  },
  {
    id: "north-ludhiana",
    name: "North Ludhiana",
    areas: [
      "Jamalpur",
      "Jamalpur Colony",
      "Lohara",
      "Tibba Road",
      "Bhamian Kalan",
      "Bhamian Khurd",
      "Ayali Kalan",
      "Ayali Khurd",
      "Neelon",
      "Gill Village",
      "Vardhman Nagar",
    ],
  },
  {
    id: "west-ludhiana",
    name: "West Ludhiana",
    areas: [
      "Miller Ganj",
      "Shimlapuri",
      "Shimlapuri Extension",
      "New Shimlapuri",
      "Jawahar Nagar",
      "Jawahar Nagar Camp",
      "Deep Nagar",
      "Industrial Area A",
      "Industrial Area B",
      "Focal Point",
      "Gill Road Industrial Area",
    ],
  },
  {
    id: "new-ludhiana",
    name: "New Ludhiana & Suburbs",
    areas: [
      "Vikas Nagar",
      "Sunder Nagar",
      "Shakti Nagar",
      "Urban Estate Phase 1",
      "Urban Estate Phase 2",
      "Ludhiana City",
      "Old Ludhiana",
      "Vardhman Premium Flats",
      "Omaxe Plaza",
      "Aerocity",
      "South City",
      "Royal City",
      "Green City",
      "Dream City",
      "Punjab Avenue",
    ],
  },
];

/** Get all areas as a flat array */
export function getAllAreas(): string[] {
  return serviceAreas.flatMap((area) => area.areas);
}

/** Check if a specific area is in our service coverage */
export function isAreaServed(area: string): boolean {
  return getAllAreas().some(
    (served) => served.toLowerCase() === area.toLowerCase()
  );
}

/** Get total number of areas served */
export function getTotalAreasCount(): number {
  return getAllAreas().length;
}
