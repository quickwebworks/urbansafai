import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import Providers from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://urbansafai.in";

export const metadata: Metadata = {
  title: "Urban Safai Ludhiana | Home & Office Deep Cleaning Services",
  description:
    "Trusted home & office cleaning services in Ludhiana. Deep cleaning, kitchen, bathroom, sofa, carpet, AC, pest control & more. Book online! Call 072789 22229",
  keywords: [
    "Urban Safai",
    "cleaning services Ludhiana",
    "home cleaning Ludhiana",
    "deep cleaning Ludhiana",
    "office cleaning Ludhiana",
    "kitchen cleaning",
    "bathroom cleaning",
    "sofa cleaning",
    "carpet cleaning",
    "AC cleaning",
    "pest control Ludhiana",
    "water tank cleaning",
    "professional cleaning",
    "cleaning company Ludhiana",
    "Ludhiana cleaning services",
    "Punjab cleaning",
  ],
  authors: [{ name: "Urban Safai" }],
  creator: "Urban Safai",
  publisher: "Urban Safai",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Urban Safai Ludhiana | Home & Office Deep Cleaning Services",
    description:
      "Trusted home & office cleaning services in Ludhiana. Deep cleaning, kitchen, bathroom, sofa, carpet, AC, pest control & more. Book online!",
    url: siteUrl,
    siteName: "Urban Safai",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Safai Ludhiana | Cleaning Services",
    description:
      "Trusted home & office cleaning services in Ludhiana. Book online! Call 072789 22229",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteUrl,
  name: "Urban Safai",
  description:
    "Professional home & office deep cleaning services in Ludhiana, Punjab. Kitchen, bathroom, sofa, carpet, AC cleaning, pest control and more.",
  url: siteUrl,
  telephone: "+917278922229",
  email: "admin@urbansafai.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ludhiana",
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    postalCode: "141001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.901,
    longitude: 75.8573,
  },
  areaServed: {
    "@type": "City",
    name: "Ludhiana",
  },
  priceRange: "₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  sameAs: [
    "https://facebook.com/urbansafai",
    "https://instagram.com/urbansafai",
    "https://twitter.com/urbansafai",
    "https://youtube.com/@urbansafai",
    "https://linkedin.com/company/urbansafai",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1250",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}