'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { COMPANY_NAME, COMPANY_PHONE } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

const menuVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: 'easeOut' },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Deferring Sheet mount to client avoids Radix SSR hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl shadow-emerald-500/5 border-b border-emerald-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-18">
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Sparkles className="size-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Urban{' '}
              <span className="text-primary">Safai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-accent"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <a
              href={`tel:+91${COMPANY_PHONE.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="size-4" />
              <span>{COMPANY_PHONE}</span>
            </a>
            <Button
              onClick={() => handleNavClick('#booking')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:+91${COMPANY_PHONE.replace(/\s/g, '')}`}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="Call us"
            >
              <Phone className="size-5" />
            </a>
            {isMounted ? (
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 p-0">
                  <SheetHeader className="border-b border-border px-4 py-4">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Sparkles className="size-4" />
                      </div>
                      <span className="font-heading text-lg font-bold">
                        {COMPANY_NAME}
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col p-4 gap-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <AnimatePresence mode="wait">
                      {NAV_LINKS.map((link, i) => (
                        <motion.div
                          key={link.href}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={menuVariants}
                        >
                          <SheetClose asChild>
                            <button
                              onClick={() => handleNavClick(link.href)}
                              className="flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
                            >
                              {link.label}
                            </button>
                          </SheetClose>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </nav>
                  <div className="mt-auto border-t border-border p-4">
                    <Button
                      onClick={() => handleNavClick('#booking')}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Book Now
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}