'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  GraduationCap,
  Leaf,
  BadgeDollarSign,
  ThumbsUp,
  Shield,
  Clock,
  ArrowRight,
} from 'lucide-react';

// ── Feature cards data ────────────────────────────────────────────────────────
const features = [
  {
    icon: GraduationCap,
    title: 'Trained Professionals',
    description:
      'Every team member is rigorously trained and background-verified for your peace of mind.',
    color: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description:
      'We use safe, non-toxic, and biodegradable cleaning solutions — gentle on your home and the planet.',
    color: 'bg-emerald-500/15 text-emerald-400',
  },
  {
    icon: BadgeDollarSign,
    title: 'Affordable Pricing',
    description:
      'Transparent pricing with no hidden charges. Plans to suit every budget starting from ₹199.',
    color: 'bg-amber-500/15 text-amber-400',
  },
  {
    icon: ThumbsUp,
    title: '100% Satisfaction Guarantee',
    description:
      'Not happy? We will re-clean your space at no extra cost. Your satisfaction is our promise.',
    color: 'bg-rose-500/15 text-rose-400',
  },
];

// ── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-card py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ── Section header ────────────────────────────────────────────── */}
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-block rounded-full bg-emerald-500/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400"
          >
            Who We Are
          </motion.span>
          <motion.h2
            id="about-heading"
            variants={fadeUp}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            About Urban Safai
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-lg text-muted-foreground"
          >
            Ludhiana&apos;s Most Trusted Cleaning Service Provider
          </motion.p>
        </motion.div>

        {/* ── Two-column layout ─────────────────────────────────────────── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Team photo with overlay */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={scaleUp}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/team/urban-safari-team.jpg"
                alt="Urban Safai professional cleaning team"
                width={600}
                height={480}
                className="h-auto w-full object-cover"
                priority
              />
              {/* Dark overlay gradient - stronger at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
              {/* Overlay text content - positioned at bottom */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 pt-20 text-center">
                <Sparkles className="size-8 text-emerald-400" />
                <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  Since 2020
                </p>
                <p className="mt-1.5 text-sm font-medium text-sage">
                  Serving the city of Ludhiana with care and commitment
                </p>

                {/* Small floating badges */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Shield className="size-3.5" /> Verified Team
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Clock className="size-3.5" /> On-Time Service
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <Leaf className="size-3.5" /> Green Products
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text + feature cards */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.p variants={fadeUp} className="text-base leading-relaxed text-muted-foreground">
              At Urban Safai, we believe a clean space is a happy space. Founded in
              Ludhiana, we&apos;ve grown to become the city&apos;s most trusted cleaning
              service provider. Our team of 50+ trained professionals uses eco-friendly
              products and modern equipment to deliver spotless results every single time
              — whether it&apos;s your home, office, or commercial space.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted-foreground">
              From routine deep cleaning to specialised services like AC servicing, water
              tank sanitisation, and pest control, we cover every corner of your property.
              With over 5,000 happy customers and counting, we take pride in bringing
              cleanliness, hygiene, and peace of mind right to your doorstep.
            </motion.p>

            {/* Feature cards 2x2 */}
            <motion.div
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              variants={containerVariants}
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={fadeUp}>
                  <Card className="border-emerald-500/20 bg-emerald-500/5 transition-all duration-200 hover:border-emerald-400/40 hover:shadow-sm py-4 px-4 gap-3">
                    <CardContent className="flex items-start gap-3 p-0">
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${feature.color}`}
                      >
                        <feature.icon className="size-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {feature.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Learn more link */}
            <motion.div variants={fadeUp} className="mt-6">
              <a
                href="#services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Explore our services
                <ArrowRight className="size-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
