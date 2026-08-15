'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';
import { COMPANY_PHONE } from '@/lib/constants';

// ── Animation ───────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ── Component ────────────────────────────────────────────────────────────────
export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 py-16 sm:py-20 lg:py-24"
      aria-label="Call to action"
    >
      {/* Decorative pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wOCkiLz48L3N2Zz4=')] bg-repeat" />
      {/* Large blurred circles */}
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Icon */}
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-400/20 backdrop-blur-sm">
              <Sparkles className="size-8 text-emerald-300" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Ready for a{' '}
            <span className="text-white">Spotless Home</span>?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-emerald-100 md:text-lg"
          >
            Book your cleaning service today and get{' '}
            <span className="font-bold text-white">10% off</span> on your
            first booking!
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="bg-white font-bold text-black shadow-lg hover:bg-emerald-100 hover:text-black transition-colors duration-200 px-10 h-14 text-base"
              asChild
            >
              <a href="#booking">
                Book Now
                <ArrowRight className="ml-2 size-5" />
              </a>
            </Button>

            <a
              href={`tel:+91${COMPANY_PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-base font-semibold text-white transition-colors hover:text-emerald-200"
            >
              <Phone className="size-5" />
              Call Us: {COMPANY_PHONE}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
