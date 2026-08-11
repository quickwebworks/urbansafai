'use client';

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
  CheckCircle,
  Phone,
  CalendarCheck,
  type LucideIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { Service } from '@/lib/types';
import { COMPANY_PHONE } from '@/lib/constants';

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

// ── Component ─────────────────────────────────────────────────────────────────
interface ServiceDetailDialogProps {
  service: Service;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ServiceDetailDialog({
  service,
  open,
  onOpenChange,
}: ServiceDetailDialogProps) {
  const Icon = iconMap[service.icon] || Home;

  const handleBookNow = () => {
    onOpenChange(false);
    // Small delay for dialog close animation, then scroll
    setTimeout(() => {
      const el = document.getElementById('book-service');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 250);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg p-0 gap-0 rounded-xl">
        {/* ── Header with icon background ──────────────────────────────── */}
        <div className="relative bg-gradient-to-br from-emerald-700 to-emerald-500 px-6 pt-6 pb-5 rounded-t-xl">
          {/* Decorative circle */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white">
              <Icon className="size-7" />
            </div>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-xl font-bold text-white leading-snug pr-6">
                {service.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-emerald-200">
                {service.shortDescription}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="px-6 py-5 space-y-5">
          {/* Price info */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-emerald-500/15 text-emerald-200 border-emerald-500/25 text-sm font-bold px-3 py-1">
              {service.price}
            </Badge>
            <span className="text-sm text-muted-foreground">{service.priceUnit}</span>
          </div>

          <Separator />

          {/* Full description */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
              About This Service
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </div>

          <Separator />

          {/* Features list */}
          <div>
            <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
              What&apos;s Included
            </h4>
            <ul className="space-y-2.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* FAQ Section */}
          {service.faq.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                Frequently Asked Questions
              </h4>
              <Accordion type="single" collapsible className="w-full">
                {service.faq.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:text-emerald-400 hover:no-underline py-3">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <Separator />

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-1 pb-1">
            <Button
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600 font-semibold h-11"
              onClick={handleBookNow}
            >
              <CalendarCheck className="size-4" />
              Book This Service
            </Button>
            <Button
              variant="outline"
              className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-200 font-semibold h-11"
              asChild
            >
              <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`}>
                <Phone className="size-4" />
                Call Us: {COMPANY_PHONE}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}