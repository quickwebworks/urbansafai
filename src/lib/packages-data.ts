// =============================================================================
// Urban Safai - Cleaning Packages Data
// =============================================================================

import type { Package } from "./types";

export const packages: Package[] = [
  {
    id: "silver-package",
    name: "Silver Package",
    slug: "silver-package",
    description:
      "Our Silver Package covers all the essentials for a thorough home cleaning session. Ideal for regular deep cleaning of a 2BHK apartment, this package ensures every room is spotless and sanitised — giving you a clean, fresh home without any add-on hassle.",
    price: 2999,
    priceNote: "One-time | 2BHK",
    features: [
      "Deep cleaning of 1 kitchen — degreasing, sanitisation, and appliance exterior wipe",
      "Deep cleaning of 2 bathrooms — descaling, anti-fungal treatment, and deodorising",
      "Deep cleaning of 2 bedrooms — dusting, vacuuming, and floor mopping",
      "Living and dining area complete deep clean",
      "Sweeping and mopping of entire home flooring",
      "Ceiling fan and light fixture dusting and wiping",
      "Door and window cleaning including frames and grills",
      "Cobweb removal from all rooms and corners",
      "All cleaning supplies and equipment included",
      "Trained and background-verified cleaning staff",
    ],
    popular: false,
    color: "slate",
  },
  {
    id: "gold-package",
    name: "Gold Package",
    slug: "gold-package",
    description:
      "Our most popular Gold Package includes everything in Silver plus premium add-ons like sofa cleaning, carpet cleaning, window cleaning, and balcony cleaning. Perfect for a comprehensive seasonal deep clean or pre-festival preparation, this package delivers exceptional value for a complete home refresh.",
    price: 4999,
    priceNote: "One-time | 2BHK",
    features: [
      "Everything included in the Silver Package",
      "Professional sofa cleaning for 1 sofa (up to 3 seats)",
      "Carpet cleaning for 1 room carpet (up to 50 sq ft)",
      "Interior and exterior window glass cleaning",
      "Balcony deep clean — floor scrubbing and railing polishing",
      "Kitchen chimney and exhaust fan degreasing",
      "Bathroom tile grout deep scrubbing",
      "All curtain and drape dusting",
      "Electrical switchboard and socket sanitisation",
      "Wardrobe and shelf interior cleaning",
      "Fresh room deodoriser treatment throughout home",
    ],
    popular: true,
    color: "amber",
  },
  {
    id: "platinum-package",
    name: "Platinum Package",
    slug: "platinum-package",
    description:
      "The Platinum Package is our premium offering for a 3BHK home, combining deep cleaning with appliance servicing and specialised treatments. Get everything in Gold plus mattress cleaning, AC servicing, fridge cleaning, and water tank sanitisation — a truly comprehensive home care experience.",
    price: 7999,
    priceNote: "One-time | 3BHK",
    features: [
      "Everything included in the Gold Package",
      "Professional mattress cleaning for 2 mattresses",
      "AC deep cleaning and servicing for 2 units",
      "Complete fridge interior and exterior deep clean",
      "Overhead water tank cleaning and sanitisation",
      "Washing machine drum deep cleaning and descaling",
      "All bathroom fixtures polished and sealed",
      "Hard floor polishing and crystallisation",
      "Main door and safety door polish and cleaning",
      "Pooja room deep cleaning and sanitisation",
      "Post-cleaning sanitisation spray throughout the home",
    ],
    popular: false,
    color: "violet",
  },
  {
    id: "villa-package",
    name: "Villa Package",
    slug: "villa-package",
    description:
      "Designed specifically for villa and bungalow owners, this all-inclusive package covers everything in Platinum plus outdoor areas, garden cleaning, glass cleaning, pest control, and full-home sanitisation. A complete home care solution for premium residences that demand the highest standard of cleanliness.",
    price: 12999,
    priceNote: "One-time | Villa",
    features: [
      "Everything included in the Platinum Package",
      "Garden area cleaning and pathway sweeping",
      "Outdoor glass facade and window cleaning",
      "Driveway and parking area pressure washing",
      "Full-home pest control treatment (cockroach, ant, and spider)",
      "Complete home fogging sanitisation and disinfection",
      "Terrace and rooftop deep cleaning",
      "Boundary wall exterior cleaning",
      "Pool surround cleaning and sanitisation",
      "Main gate and entrance area cleaning",
      "Dedicated team of 5–6 professionals for efficient completion",
      "Priority scheduling and supervisor-assigned service",
    ],
    popular: false,
    color: "rose",
  },
  {
    id: "annual-amc",
    name: "Annual AMC",
    slug: "annual-amc",
    description:
      "Our Annual Maintenance Contract gives you 12 professional cleaning visits per year at a heavily discounted rate. Enjoy priority booking, discounted add-on services, and the peace of mind of a consistently clean home — all year round. The best value for families who value regular home hygiene.",
    price: 19999,
    priceNote: "Per year | 12 visits",
    features: [
      "12 home cleaning sessions per year (monthly)",
      "Each session equivalent to Gold Package coverage",
      "Priority booking — same-day or next-day slots guaranteed",
      "25% discount on all add-on services",
      "Free pest control treatment twice a year",
      "Free home sanitisation once every quarter",
      "Dedicated account manager for scheduling",
      "Flexible scheduling — choose your preferred date and time",
      "Free rescheduling without any cancellation charges",
      "Emergency cleaning service at special AMC rates",
      "Detailed cleaning report after each session",
      "Annual deep-cleaning bonus session free",
    ],
    popular: false,
    color: "sky",
  },
];

/** Get a package by its slug */
export function getPackageBySlug(slug: string): Package | undefined {
  return packages.find((p) => p.slug === slug);
}

/** Get the popular package */
export function getPopularPackage(): Package | undefined {
  return packages.find((p) => p.popular);
}
