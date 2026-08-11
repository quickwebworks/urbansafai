'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// ── Gallery items with real images ─────────────────────────────────────────
interface GalleryItem {
  src: string;
  alt: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  { src: '/gallery/kitchen-cleaning.jpg', alt: 'Kitchen Cleaning Service', title: 'Kitchen Cleaning' },
  { src: '/gallery/bathroom-cleaning.jpg', alt: 'Bathroom Cleaning Service', title: 'Bathroom Cleaning' },
  { src: '/gallery/ac-service-and-repair.jpg', alt: 'AC Service and Repair', title: 'AC Service & Repair' },
  { src: '/gallery/water-tank-cleaning.jpg', alt: 'Water Tank Cleaning Service', title: 'Water Tank Cleaning' },
  { src: '/gallery/ro-services.jpg', alt: 'RO Services', title: 'RO Services' },
  { src: '/gallery/fridge-cleaning.jpg', alt: 'Fridge Cleaning Service', title: 'Fridge Cleaning' },
  { src: '/gallery/microwave-cleaning.jpg', alt: 'Microwave Cleaning Service', title: 'Microwave Cleaning' },
  { src: '/gallery/mattress-cleaning.jpg', alt: 'Mattress Cleaning Service', title: 'Mattress Cleaning' },
  { src: '/gallery/chimmney-services.jpg', alt: 'Chimney Cleaning Service', title: 'Chimney Services' },
  { src: '/gallery/electricity-solutions.jpg', alt: 'Electricity Solutions', title: 'Electricity Solutions' },
  { src: '/gallery/beauty-salon.jpg', alt: 'Beauty Salon Service', title: 'Beauty Salon' },
  { src: '/gallery/ac-repair.jpg', alt: 'AC Repair Service', title: 'AC Repair' },
];

// ── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 lg:py-24 bg-base"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Our Work Gallery
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See the transformation our professional cleaning brings
          </p>
        </motion.div>

        {/* ── Gallery Grid ────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
        >
          {galleryItems.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative aspect-[4/3] sm:aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300"
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Default subtle gradient at bottom for readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

              {/* Hover Overlay with Title Sliding Up */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-emerald-950/45 transition-colors duration-300 flex items-end">
                <div className="w-full p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <span className="block text-white font-semibold text-sm sm:text-base drop-shadow-md">
                    {item.title}
                  </span>
                  <span className="block text-white/70 text-xs sm:text-sm mt-0.5">
                    Professional Results
                  </span>
                </div>
              </div>

              {/* Subtle border highlight on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-emerald-400/30 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
