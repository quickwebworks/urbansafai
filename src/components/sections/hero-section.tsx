'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Home,
  ChefHat,
  Bath,
  Sofa,
  Snowflake,
  Droplets,
  Phone,
  ArrowRight,
  Users,
  Star,
  Zap,
} from 'lucide-react';
import { COMPANY_PHONE } from '@/lib/constants';

// ── Popular services shown in the hero grid ──────────────────────────────────
const popularServices = [
  { name: 'Home Deep Cleaning', icon: Home, price: '₹2,499+' },
  { name: 'Kitchen Cleaning', icon: ChefHat, price: '₹999+' },
  { name: 'Bathroom Cleaning', icon: Bath, price: '₹799+' },
  { name: 'Sofa Cleaning', icon: Sofa, price: '₹1,499+' },
  { name: 'AC Servicing', icon: Snowflake, price: '₹599+' },
  { name: 'Water Tank Cleaning', icon: Droplets, price: '₹1,299+' },
];

// ── Stats row below CTAs ─────────────────────────────────────────────────────
const heroStats = [
  { label: 'Happy Customers', value: '5,000+', icon: Users },
  { label: 'Trained Staff', value: '50+', icon: Zap },
  { label: 'Services Daily', value: '200+', icon: Home },
  { label: 'Rating', value: '4.8★', icon: Star },
];

// ── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const serviceCardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background"
      aria-label="Hero section"
    >
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* ─── Left Column: Warm rose gradient ─── */}
        <div className="relative flex flex-1 flex-col justify-center px-6 py-16 sm:px-10 md:px-16 lg:px-20 lg:py-24">
          {/* Background gradient - vivid emerald with glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-500 to-emerald-600 opacity-90" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(52,211,153,0.35)_0%,transparent_70%)]" />
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10" />

          <motion.div
            className="relative z-10 flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <Badge className="bg-white/20 text-sm font-semibold text-white backdrop-blur-sm border-none px-4 py-1.5">
                <Star className="mr-1 size-3.5 fill-emerald-400 text-emerald-400" />
                Ludhiana&apos;s #1 Cleaning Service
              </Badge>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]"
            >
              Reliable, Daily Cleaning –{' '}
              <span className="text-emerald-300">Right to Your Door!</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-base leading-relaxed text-emerald-200 md:text-lg"
            >
              Professional home &amp; office cleaning services starting from ₹199.
              Trusted by 5,000+ happy customers in Ludhiana.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:text-white transition-colors duration-200 px-8 h-12 text-base"
                asChild
              >
                <a href="#booking">
                  Book Now
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/60 bg-transparent font-semibold text-white hover:bg-white/10 hover:text-white h-12 text-base px-6"
                asChild
              >
                <a href={`tel:+91${COMPANY_PHONE.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 size-4" />
                  Call: {COMPANY_PHONE}
                </a>
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-5"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <stat.icon className="size-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">
                    {stat.value}{' '}
                    <span className="font-normal text-emerald-200">
                      {stat.label}
                    </span>
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Right Column: Service cards grid ─── */}
        <div className="relative flex flex-1 flex-col justify-center bg-surface px-6 py-16 sm:px-10 md:px-12 lg:px-16 lg:py-24">
          {/* Subtle pattern overlay */}
          <div className="pointer-events-none absolute inset-0 right-0 top-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.08)_0%,transparent_50%)]" />

          <motion.div
            className="relative z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.p
              variants={fadeUp}
              className="mb-6 text-sm font-semibold uppercase tracking-wider text-emerald-400"
            >
              Popular Services
            </motion.p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {popularServices.map((service) => (
                <motion.div
                  key={service.name}
                  variants={serviceCardVariants}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-card p-5 text-center shadow-sm transition-all duration-200 hover:border-emerald-400/60 hover:shadow-emerald-500/10 hover:-translate-y-0.5"
                >
                  <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                    <service.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {service.name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-emerald-400">
                      From {service.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
