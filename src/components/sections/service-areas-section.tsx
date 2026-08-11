'use client';

import { motion } from 'framer-motion';
import { MapPin, Check, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { serviceAreas, getTotalAreasCount } from '@/lib/service-areas-data';

// ── Region icon accents (gradient pairs) ─────────────────────────────────────
const regionAccents = [
  { border: 'border-l-emerald-500', bg: 'bg-emerald-500/15' },
  { border: 'border-l-emerald-400', bg: 'bg-emerald-500/20' },
  { border: 'border-l-emerald-500', bg: 'bg-emerald-500/20' },
  { border: 'border-l-emerald-600', bg: 'bg-emerald-500/15' },
  { border: 'border-l-emerald-400', bg: 'bg-emerald-500/20' },
  { border: 'border-l-emerald-600', bg: 'bg-emerald-500/15' },
];

// ── Map pin location dots — purely decorative ─────────────────────────────────
function LocationDots({ count }: { count: number }) {
  return (
    <svg
      viewBox="0 0 100 60"
      className="w-full h-auto max-w-[160px] opacity-20"
      aria-hidden="true"
    >
      {Array.from({ length: Math.min(count, 18) }).map((_, i) => {
        const cx = 10 + (i * 80) / (count - 1 || 1);
        const cy = 10 + Math.sin(i * 1.3) * 18 + 20;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill="currentColor"
            className="text-emerald-400"
          />
        );
      })}
    </svg>
  );
}

// ── Animation ────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function ServiceAreasSection() {
  const totalAreas = getTotalAreasCount();

  return (
    <section
      id="service-areas"
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
            Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Service Areas
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We serve across Ludhiana and surrounding areas
          </p>

          {/* Stats pill */}
          <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>
              Covering <span className="font-bold">{totalAreas}+</span> areas
              across Ludhiana
            </span>
          </div>
        </motion.div>

        {/* ── Region Cards Grid ──────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {serviceAreas.map((region, idx) => {
            const accent = regionAccents[idx % regionAccents.length];
            return (
              <motion.div key={region.id} variants={cardVariants}>
                <Card
                  className={`h-full border-l-4 ${accent.border} hover:shadow-black/20 transition-shadow duration-200`}
                >
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {region.name}
                      </h3>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {region.areas.length} areas covered
                    </span>
                  </CardHeader>

                  <CardContent className="pt-2">
                    {/* Decorative dots */}
                    <div className="mb-3">
                      <LocationDots count={region.areas.length} />
                    </div>

                    {/* Area badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {region.areas.map((area) => (
                        <Badge
                          key={area}
                          variant="outline"
                          className={`text-xs font-normal ${accent.bg} border-transparent`}
                        >
                          <Check className="w-3 h-3 mr-1 text-emerald-400" />
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── CTA: Don't see your area? ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block border-dashed border-2 border-muted-foreground/20 bg-background">
            <CardContent className="py-6 px-8 sm:px-12 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="font-semibold text-foreground">
                  Don&apos;t see your area listed?
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  We&apos;re expanding fast! Contact us and we&apos;ll try our best
                  to serve you.
                </p>
              </div>
              <Button
                className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0"
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
