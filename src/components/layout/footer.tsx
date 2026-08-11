'use client';

import { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  COMPANY_PHONE,
  COMPANY_WHATSAPP,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  SOCIAL_LINKS,
} from '@/lib/constants';

const QUICK_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Book Service', href: '#booking' },
  { label: 'Pricing', href: '#pricing' },
];

const TOP_AREAS = [
  'Model Town',
  'Dugri',
  'Sarabha Nagar',
  'BRS Nagar',
  'Civil Lines',
  'Pakhowal Road',
  'Haibowal',
  'Kitchlu Nagar',
  'Miller Ganj',
  'Rajguru Nagar',
];

const SOCIAL_ICONS = [
  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: Twitter, href: SOCIAL_LINKS.twitter, label: 'Twitter' },
  { icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0f0d] text-sage">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {/* Company Info */}
          <div className="xl:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Sparkles className="size-5" />
              </div>
              <span className="font-heading text-xl font-bold text-white">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4 text-sage-dim">
              {COMPANY_TAGLINE} We provide professional home &amp; office deep
              cleaning services across Ludhiana with 8+ years of trusted
              experience and 10,000+ happy customers.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500 hover:text-white"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-sage-dim transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading text-base font-semibold text-white mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2.5">
              {TOP_AREAS.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-sm text-sage-dim"
                >
                  <MapPin className="size-3 shrink-0 text-emerald-400" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-heading text-base font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`tel:+91${COMPANY_PHONE.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 text-sm text-sage-dim transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 shrink-0 text-emerald-400" />
                  {COMPANY_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="flex items-center gap-2.5 text-sm text-sage-dim transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 shrink-0 text-emerald-400" />
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-sage-dim transition-colors hover:text-foreground"
                >
                  <Send className="size-4 shrink-0 text-emerald-400" />
                  WhatsApp Us
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-sage-dim">
                <MapPin className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <span>{COMPANY_ADDRESS}</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-xs text-sage-dim mb-3">
                Get cleaning tips &amp; exclusive offers.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail('');
                }}
                className="flex gap-2"
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 bg-emerald-500/10 border-emerald-500/30 text-sm text-white placeholder:text-muted-foreground focus-visible:ring-emerald-500"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="h-9 bg-emerald-500 hover:bg-emerald-400 text-white shrink-0"
                >
                  <Send className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-border" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </button>
            <Separator orientation="vertical" className="h-3 bg-border" />
            <button className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
