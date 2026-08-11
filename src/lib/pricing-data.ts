// =============================================================================
// Urban Safai - Pricing Data
// =============================================================================

import type { PricingCategory } from "./types";

export const pricingData: PricingCategory[] = [
  {
    category: "Home Cleaning",
    items: [
      {
        service: "Home Deep Cleaning",
        price: "₹2,499",
        note: "2BHK",
      },
      {
        service: "Home Deep Cleaning",
        price: "₹3,499",
        note: "3BHK",
      },
      {
        service: "Kitchen Cleaning (Standard)",
        price: "₹1,099",
      },
      {
        service: "Kitchen Cleaning (Regular)",
        price: "₹1,599",
      },
      {
        service: "Kitchen Cleaning (Detailed)",
        price: "₹2,499",
      },
      {
        service: "Bathroom Cleaning (Standard)",
        price: "₹479",
        note: "per bathroom",
      },
      {
        service: "Bathroom Cleaning (Regular)",
        price: "₹548",
        note: "per bathroom",
      },
      {
        service: "Bathroom Cleaning (Detailed)",
        price: "₹599",
        note: "per bathroom",
      },
    ],
  },
  {
    category: "Upholstery & Furniture",
    items: [
      {
        service: "Sofa Cleaning",
        price: "₹159",
        note: "per seat",
      },
      {
        service: "Carpet Cleaning",
        price: "₹548",
        note: "up to 50 sq ft",
      },
      {
        service: "Mattress Cleaning (Standard)",
        price: "₹599",
      },
      {
        service: "Mattress Cleaning (King)",
        price: "₹899",
      },
    ],
  },
  {
    category: "Appliance Cleaning",
    items: [
      {
        service: "AC Cleaning & Servicing",
        price: "₹499",
        note: "per unit (up to 1.5 ton)",
      },
      {
        service: "Fridge Cleaning (Single Door)",
        price: "₹449",
      },
      {
        service: "Fridge Cleaning (Double Door)",
        price: "₹599",
      },
      {
        service: "Washing Machine Cleaning",
        price: "₹999",
        note: "per machine",
      },
      {
        service: "Water Tank Cleaning",
        price: "₹1",
        note: "per litre capacity",
      },
    ],
  },
  {
    category: "Commercial & Office",
    items: [
      {
        service: "Office Cleaning",
        price: "₹6",
        note: "per sq ft",
      },
      {
        service: "Commercial Cleaning",
        price: "₹5",
        note: "per sq ft",
      },
      {
        service: "Glass & Window Cleaning",
        price: "₹5",
        note: "per sq ft",
      },
    ],
  },
  {
    category: "Specialised Services",
    items: [
      {
        service: "Move In Cleaning",
        price: "₹2,999",
        note: "2BHK",
      },
      {
        service: "Move In Cleaning",
        price: "₹4,999",
        note: "3BHK",
      },
      {
        service: "Move Out Cleaning",
        price: "₹3,499",
        note: "2BHK",
      },
      {
        service: "Move Out Cleaning",
        price: "₹4,499",
        note: "3BHK",
      },
      {
        service: "Post Construction Cleaning",
        price: "₹4,999",
        note: "2BHK",
      },
      {
        service: "Post Construction Cleaning",
        price: "₹6,999",
        note: "3BHK",
      },
      {
        service: "Villa & Bungalow Cleaning",
        price: "₹5,999",
        note: "per session",
      },
      {
        service: "Apartment Cleaning",
        price: "₹2,499",
        note: "2BHK per session",
      },
    ],
  },
  {
    category: "Pest Control & Sanitization",
    items: [
      {
        service: "Pest Control",
        price: "₹2.50",
        note: "per sq yard",
      },
      {
        service: "Sanitization & Disinfection",
        price: "₹3",
        note: "per sq ft",
      },
    ],
  },
  {
    category: "Packages",
    items: [
      {
        service: "Silver Package",
        price: "₹2,999",
        note: "2BHK – Basic home cleaning",
      },
      {
        service: "Gold Package",
        price: "₹4,999",
        note: "2BHK – Comprehensive cleaning",
      },
      {
        service: "Platinum Package",
        price: "₹7,999",
        note: "3BHK – Premium deep clean",
      },
      {
        service: "Villa Package",
        price: "₹12,999",
        note: "Villa – Complete care",
      },
      {
        service: "Annual AMC",
        price: "₹19,999",
        note: "12 visits per year",
      },
    ],
  },
];
