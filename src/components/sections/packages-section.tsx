'use client';

import { motion } from 'framer-motion';
import { Check, Crown, Star, ArrowRight, Phone, IndianRupee } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { packages } from '@/lib/packages-data';
import { COMPANY_PHONE } from '@/lib/constants';
import type { Package } from '@/lib/types';

// Color theme mapping for each package
const colorThemes: Record<
  string,
  {
    border: string;
    badge: string;
    badgeText: string;
    button: string;
    buttonHover: string;
    buttonText: string;
    icon: string;
    ring: string;
    shadow: string;
    ribbonBg: string;
    ribbonText: string;
  }
> = {
  slate: {
    border: 'border-surface',
    badge: 'bg-surface/20 text-sage',
    badgeText: 'border-surface',
    button: 'bg-surface hover:bg-surface/80 text-white',
    buttonHover: 'hover:shadow-surface/20',
    buttonText: 'text-sage',
    icon: 'text-sage-dim',
    ring: 'ring-surface',
    shadow: 'hover:shadow-black/20',
    ribbonBg: '',
    ribbonText: '',
  },
  amber: {
    border: 'border-amber-600',
    badge: 'bg-amber-900/30 text-amber-400',
    badgeText: 'border-amber-700',
    button: 'bg-amber-600 hover:bg-amber-700 text-white',
    buttonHover: 'hover:shadow-amber-500/20',
    buttonText: 'text-amber-400',
    icon: 'text-amber-400',
    ring: 'ring-amber-700',
    shadow: 'hover:shadow-black/20',
    ribbonBg: 'bg-amber-500',
    ribbonText: 'text-white',
  },
  violet: {
    border: 'border-emerald-500',
    badge: 'bg-emerald-500/15 text-emerald-400',
    badgeText: 'border-emerald-500',
    button: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    buttonHover: 'hover:shadow-emerald-500/20',
    buttonText: 'text-emerald-400',
    icon: 'text-emerald-400',
    ring: 'ring-emerald-500',
    shadow: 'hover:shadow-emerald-500/20',
    ribbonBg: '',
    ribbonText: '',
  },
  rose: {
    border: 'border-rose-600',
    badge: 'bg-rose-900/30 text-rose-400',
    badgeText: 'border-rose-700',
    button: 'bg-rose-600 hover:bg-rose-700 text-white',
    buttonHover: 'hover:shadow-rose-500/20',
    buttonText: 'text-rose-400',
    icon: 'text-rose-400',
    ring: 'ring-rose-700',
    shadow: 'hover:shadow-black/20',
    ribbonBg: '',
    ribbonText: '',
  },
  sky: {
    border: 'border-sage-dim/50',
    badge: 'bg-sage/10 text-sage',
    badgeText: 'border-sage-dim/40',
    button: 'bg-sage-dim hover:bg-sage-dim/80 text-white',
    buttonHover: 'hover:shadow-sage/10',
    buttonText: 'text-sage',
    icon: 'text-sage',
    ring: 'ring-sage-dim/50',
    shadow: 'hover:shadow-black/20',
    ribbonBg: '',
    ribbonText: '',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  const theme = colorThemes[pkg.color] || colorThemes.slate;
  const isPopular = pkg.popular;

  return (
    <motion.div variants={cardVariants} className="w-full">
      <Card
        className={`
          relative overflow-hidden transition-all duration-300
          hover:-translate-y-2 hover:shadow-xl ${theme.shadow}
          ${isPopular ? 'border-emerald-400/60 shadow-emerald-500/20 sm:scale-105 sm:z-10' : ''}
          ${theme.border}
          h-full flex flex-col
        `}
      >
        {/* Popular ribbon */}
        {isPopular && (
          <div className="absolute top-0 right-0 z-10">
            <div className={`${theme.ribbonBg} ${theme.ribbonText} px-3 py-1 text-xs font-bold rounded-bl-lg shadow-sm flex items-center gap-1`}>
              <Star className="size-3 fill-current" />
              MOST POPULAR
            </div>
          </div>
        )}

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-1">
            <div className={`p-2 rounded-lg bg-muted ${theme.icon}`}>
              {isPopular ? (
                <Crown className="size-5" />
              ) : (
                <Star className="size-5" />
              )}
            </div>
            <CardTitle className="text-lg font-bold">{pkg.name}</CardTitle>
          </div>
          <CardDescription className="text-xs leading-relaxed mt-1">
            {pkg.description.length > 100
              ? `${pkg.description.substring(0, 100)}...`
              : pkg.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <IndianRupee className="size-4 text-emerald-400" />
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {pkg.price.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{pkg.priceNote}</p>
          </div>

          {/* Features list */}
          <div className="space-y-2.5">
            {pkg.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <Button
            className={`w-full gap-2 transition-all duration-200 ${theme.button} ${theme.buttonHover} hover:shadow-md`}
          >
            Choose Plan
            <ArrowRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function PackagesSection() {
  return (
    <section id="packages" className="py-16 md:py-24 bg-base">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs font-medium">
            <Crown className="size-3 mr-1" />
            Our Packages
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Cleaning Packages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Choose the perfect package for your cleaning needs
          </p>
        </motion.div>

        {/* Package cards - scrollable on mobile, grid on desktop */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6
          "
        >
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        {/* CTA below packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Need a custom package? We&apos;ll tailor one for you.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`}>
              <Phone className="size-4" />
              Call Us for Custom Quote
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
