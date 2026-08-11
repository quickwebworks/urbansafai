'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Home,
  ChefHat,
  Bath,
  Sofa,
  Square,
  BedDouble,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Droplets,
  Building2,
  Store,
  LogIn,
  LogOut,
  HardHat,
  Castle,
  Building,
  Bug,
  ShieldCheck,
  ScanSearch,
  Eye,
  CalendarCheck,
  type LucideIcon,
} from 'lucide-react';
import { services } from '@/lib/services-data';
import type { Service } from '@/lib/types';
import ServiceDetailDialog from './service-detail-dialog';

// ── Icon name → Lucide component mapping ──────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Home,
  ChefHat,
  Bath,
  Sofa,
  Square,
  BedDouble,
  Snowflake,
  Refrigerator,
  WashingMachine,
  Droplets,
  Building2,
  Store,
  LogIn,
  LogOut,
  HardHat,
  Castle,
  Building,
  Bug,
  ShieldCheck,
  ScanSearch,
};

/** Renders the correct Lucide icon by its string name from service data */
function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] || Home;
  return <Icon className={className} />;
}

// ── Custom tab filter groups ──────────────────────────────────────────────────
const HOME_CLEANING_IDS = new Set([
  'home-deep-cleaning',
  'kitchen-cleaning',
  'bathroom-cleaning',
  'sofa-cleaning',
  'carpet-cleaning',
  'mattress-cleaning',
  'water-tank-cleaning',
  'office-cleaning',
  'commercial-cleaning',
  'villa-cleaning',
  'apartment-cleaning',
  'glass-cleaning',
]);

const APPLIANCE_CLEANING_IDS = new Set([
  'ac-cleaning',
  'fridge-cleaning',
  'washing-machine-cleaning',
]);

type TabValue = 'all' | 'home' | 'appliance' | 'specialized';

function filterServices(tab: TabValue): Service[] {
  if (tab === 'all') return services;
  if (tab === 'home') return services.filter((s) => HOME_CLEANING_IDS.has(s.id));
  if (tab === 'appliance')
    return services.filter((s) => APPLIANCE_CLEANING_IDS.has(s.id));
  // specialized = not home and not appliance
  return services.filter(
    (s) => !HOME_CLEANING_IDS.has(s.id) && !APPLIANCE_CLEANING_IDS.has(s.id)
  );
}

// ── Animation variants ────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// ── Service Card Component ────────────────────────────────────────────────────
function ServiceCard({
  service,
  onViewDetails,
}: {
  service: Service;
  onViewDetails: (service: Service) => void;
}) {
  return (
    <motion.div variants={cardVariants}>
      <Card className="group relative flex h-full flex-col overflow-hidden border border-emerald-500/25 bg-card transition-all duration-300 hover:border-emerald-400/50 hover:shadow-emerald-500/20 hover:-translate-y-1 hover:scale-[1.02]">
        <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
          {/* Icon + Price row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
              <ServiceIcon name={service.icon} className="size-6" />
            </div>
            <Badge className="shrink-0 bg-emerald-500/15 text-emerald-400 border-emerald-500/25 text-xs font-semibold">
              {service.price}
            </Badge>
          </div>

          {/* Service name */}
          <h3 className="mt-4 text-base font-bold text-foreground leading-snug">
            {service.name}
          </h3>

          {/* Short description (2 lines, truncated) */}
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2 flex-1">
            {service.shortDescription}
          </p>

          {/* Action buttons */}
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-200 text-xs font-semibold h-9"
              onClick={() => onViewDetails(service)}
            >
              <Eye className="size-3.5" />
              View Details
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-semibold h-9"
              asChild
            >
              <a href="#booking">
                <CalendarCheck className="size-3.5" />
                Book Now
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Main Services Section ─────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [detailService, setDetailService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredServices = filterServices(activeTab);

  const handleViewDetails = (service: Service) => {
    setDetailService(service);
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Small delay so dialog close animation completes
      setTimeout(() => setDetailService(null), 200);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-gradient-to-b from-emerald-500/10 to-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ── Section header ──────────────────────────────────────────── */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-block rounded-full bg-emerald-500/15 px-4 py-1 text-xs font-bold uppercase tracking-widest text-emerald-400"
          >
            What We Offer
          </motion.span>
          <motion.h2
            id="services-heading"
            variants={fadeUp}
            className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Our Cleaning Services
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-base text-muted-foreground sm:text-lg"
          >
            Professional cleaning solutions for every corner of your home and
            office
          </motion.p>
        </motion.div>

        {/* ── Category filter tabs ────────────────────────────────────── */}
        <motion.div
          className="mb-10 flex justify-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabValue)}
            className="w-full max-w-2xl"
          >
            <TabsList className="mx-auto flex h-11 w-full flex-wrap justify-center gap-1 rounded-xl bg-muted p-1">
              <TabsTrigger
                value="all"
                className="rounded-lg px-4 py-2 text-sm font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                All Services
              </TabsTrigger>
              <TabsTrigger
                value="home"
                className="rounded-lg px-4 py-2 text-sm font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Home Cleaning
              </TabsTrigger>
              <TabsTrigger
                value="appliance"
                className="rounded-lg px-4 py-2 text-sm font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Appliance Cleaning
              </TabsTrigger>
              <TabsTrigger
                value="specialized"
                className="rounded-lg px-4 py-2 text-sm font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-md"
              >
                Specialized Services
              </TabsTrigger>
            </TabsList>

            {/* Invisible tab contents to satisfy Radix requirement */}
            <TabsContent value="all" className="hidden" />
            <TabsContent value="home" className="hidden" />
            <TabsContent value="appliance" className="hidden" />
            <TabsContent value="specialized" className="hidden" />
          </Tabs>
        </motion.div>

        {/* ── Services grid ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={handleViewDetails}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Empty state ─────────────────────────────────────────────── */}
        {filteredServices.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            No services found in this category.
          </div>
        )}
      </div>

      {/* ── Service Detail Dialog ─────────────────────────────────────── */}
      {detailService && (
        <ServiceDetailDialog
          service={detailService}
          open={dialogOpen}
          onOpenChange={handleDialogChange}
        />
      )}
    </section>
  );
}