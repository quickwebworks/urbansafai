'use client';

import { motion } from 'framer-motion';
import { IndianRupee, ChevronDown, Phone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { pricingData } from '@/lib/pricing-data';
import { COMPANY_PHONE } from '@/lib/constants';
import type { PricingCategory } from '@/lib/types';

// Category icon mapping
const categoryIcons: Record<string, string> = {
  'Home Cleaning': '🏠',
  'Upholstery & Furniture': '🛋️',
  'Appliance Cleaning': '🔧',
  'Commercial & Office': '🏢',
  'Specialised Services': '✨',
  'Pest Control & Sanitization': '🛡️',
  'Packages': '📦',
};

// Category accent colors (vivid emerald brand palette)
const categoryColors: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  'Home Cleaning': {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  'Upholstery & Furniture': {
    border: 'border-amber-800/30',
    bg: 'bg-amber-950/30',
    text: 'text-amber-400',
    badge: 'bg-amber-900/30 text-amber-400 border-amber-800/30',
  },
  'Appliance Cleaning': {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  'Commercial & Office': {
    border: 'border-violet-800/30',
    bg: 'bg-violet-950/30',
    text: 'text-violet-400',
    badge: 'bg-violet-900/30 text-violet-400 border-violet-800/30',
  },
  'Specialised Services': {
    border: 'border-rose-800/30',
    bg: 'bg-rose-950/30',
    text: 'text-rose-400',
    badge: 'bg-rose-900/30 text-rose-400 border-rose-800/30',
  },
  'Pest Control & Sanitization': {
    border: 'border-orange-800/30',
    bg: 'bg-orange-950/30',
    text: 'text-orange-400',
    badge: 'bg-orange-900/30 text-orange-400 border-orange-800/30',
  },
  'Packages': {
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-400/15',
    text: 'text-emerald-400',
    badge: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/30',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

function PricingCategoryCard({ category, index }: { category: PricingCategory; index: number }) {
  const colors = categoryColors[category.category] || {
    border: 'border-slate-700',
    bg: 'bg-slate-950/30',
    text: 'text-slate-400',
    badge: 'bg-slate-900/30 text-slate-400 border-slate-700',
  };
  const icon = categoryIcons[category.category] || '📋';

  return (
    <motion.div variants={itemVariants}>
      <Card className={`overflow-hidden border ${colors.border} hover:shadow-black/20 transition-shadow duration-300`}>
        <CardHeader className={`${colors.bg} pb-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <CardTitle className="text-base md:text-lg font-bold">{category.category}</CardTitle>
            </div>
            <Badge variant="outline" className={`${colors.badge} text-xs`}>
              {category.items.length} service{category.items.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop: Table view */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-muted-foreground">Service</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground w-[120px] text-right">Price</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground">Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm py-2.5">
                      {item.service}
                    </TableCell>
                    <TableCell className="text-right font-bold text-sm py-2.5 whitespace-nowrap text-emerald-300">
                      {item.price}
                    </TableCell>
                    <TableCell className="text-xs text-emerald-200/70 py-2.5">
                      {item.note || '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile: Card list view */}
          <div className="md:hidden px-4 pb-4 space-y-2">
            {category.items.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg border p-3 ${colors.bg} border-opacity-50`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.service}</p>
                  {item.note && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{item.note}</p>
                  )}
                </div>
                <span className="text-sm font-bold ml-3 whitespace-nowrap text-emerald-300">{item.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24">
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
            <IndianRupee className="size-3 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            No hidden charges. What you see is what you pay.
          </p>
        </motion.div>

        {/* Accordion layout for all categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="multiple" defaultValue={['Home Cleaning']} className="space-y-3">
            {pricingData.map((category, index) => {
              const colors = categoryColors[category.category] || {
                border: 'border-slate-700',
                bg: 'bg-slate-950/30',
                text: 'text-slate-400',
                badge: 'bg-slate-900/30 text-slate-400 border-slate-700',
              };
              const icon = categoryIcons[category.category] || '📋';

              return (
                <AccordionItem
                  key={category.category}
                  value={category.category}
                  className={`border rounded-xl px-4 md:px-6 ${colors.border} bg-card shadow-black/20`}
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{icon}</span>
                      <div className="text-left">
                        <span className="font-bold text-sm md:text-base">{category.category}</span>
                        <div className="flex gap-2 mt-0.5">
                          <Badge variant="outline" className={`${colors.badge} text-[10px] px-1.5 py-0`}>
                            {category.items.length} service{category.items.length > 1 ? 's' : ''}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground hidden sm:inline-flex items-center gap-0.5">
                            Starting from{' '}
                            <span className="font-semibold text-emerald-300">{category.items[0]?.price}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Desktop table */}
                    <div className="hidden md:block pb-2">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-transparent border-b border-dashed">
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              Service
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground w-[120px] text-right">
                              Price
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              Note
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.items.map((item, i) => (
                            <TableRow key={i}>
                              <TableCell className="font-medium text-sm py-2.5">
                                {item.service}
                              </TableCell>
                              <TableCell className="text-right font-bold text-sm py-2.5 whitespace-nowrap text-emerald-300">
                                {item.price}
                              </TableCell>
                              <TableCell className="text-xs text-emerald-200/70 py-2.5">
                                {item.note || '—'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile card list */}
                    <div className="md:hidden space-y-2 pb-2">
                      {category.items.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between rounded-lg border p-3 ${colors.bg} border-opacity-50`}
                        >
                          <div className="flex-1 min-w-0 mr-3">
                            <p className="text-sm font-medium truncate">{item.service}</p>
                            {item.note && (
                              <p className="text-xs text-muted-foreground truncate mt-0.5">
                                {item.note}
                              </p>
                            )}
                          </div>
                          <span className="text-sm font-bold whitespace-nowrap text-emerald-300">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-8 md:mt-10"
        >
          <Card className="bg-emerald-500/5 border border-emerald-500/20 border-dashed">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 md:p-6">
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <IndianRupee className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-emerald-200/80">
                      <span className="font-semibold text-emerald-300">Note:</span> Prices may vary
                      based on area and specific requirements. Contact us for an accurate quote.
                    </p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 shrink-0" asChild>
                <a href={`tel:+91${COMPANY_PHONE.replace(/\s/g, '')}`}>
                  <Phone className="size-3.5" />
                  Get Quote
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
