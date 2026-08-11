'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { reviews } from '@/lib/reviews-data';

// ── Avatar colour palette (warm rose brand shades) ────────────────────────
const avatarColors = [
  'bg-emerald-500',
  'bg-emerald-400',
  'bg-emerald-600',
  'bg-emerald-700',
  'bg-emerald-500/80',
  'bg-emerald-400/80',
  'bg-emerald-600/80',
  'bg-emerald-700/80',
  'bg-emerald-500/60',
  'bg-emerald-400/60',
  'bg-emerald-600/60',
  'bg-emerald-700/60',
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function Stars({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'lg';
}) {
  const iconSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted-foreground/20 text-muted-foreground/20'
          }`}
        />
      ))}
    </div>
  );
}

// ── Card animation variants ──────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.07,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// ── Review Card Component (Desktop) ─────────────────────────────────────────
function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[0];
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <Card className="h-full rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
        <CardContent className="p-5 sm:p-6 flex flex-col gap-3.5">
          {/* Top: avatar + name + date + stars */}
          <div className="flex items-start gap-3">
            {/* Colored avatar circle with initials */}
            <div
              className={`w-10 h-10 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center shrink-0 text-white text-sm font-bold shadow-sm`}
              aria-hidden="true"
            >
              {review.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-foreground text-sm truncate">
                {review.name}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {formatDate(review.date)}
              </div>
            </div>
          </div>

          {/* Star rating */}
          <Stars rating={review.rating} />

          {/* Review text with quote icon */}
          <div className="relative flex-1 min-h-0">
            <Quote className="absolute -top-0.5 -left-0.5 w-5 h-5 text-emerald-400 fill-emerald-400 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed pl-5 line-clamp-4">
              {review.comment}
            </p>
          </div>

          {/* Service badge */}
          <div className="mt-auto pt-2.5 border-t border-border/50">
            <Badge
              variant="secondary"
              className="text-xs font-medium bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/25"
            >
              {review.service}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Dot Indicators Component ────────────────────────────────────────────────
function DotIndicators({
  total,
  activeIndex,
  onSelect,
}: {
  total: number;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-5" role="tablist">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Review ${i + 1}`}
          className={`rounded-full transition-all duration-300 ${
            i === activeIndex
              ? 'w-7 h-2.5 bg-emerald-500'
              : 'w-2.5 h-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40'
          }`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}

// ── Rating Summary Component (Desktop) ──────────────────────────────────────
function RatingSummary() {
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-6 lg:p-8 flex flex-col items-center text-center lg:sticky lg:top-24">
      {/* Big rating number */}
      <div className="text-5xl sm:text-6xl font-extrabold text-foreground leading-none tracking-tight">
        {avgRating.toFixed(1)}
      </div>
      <div className="text-muted-foreground text-base font-medium mt-1">
        out of 5
      </div>

      {/* Large stars */}
      <div className="mt-3">
        <Stars rating={Math.round(avgRating)} size="lg" />
      </div>

      <p className="text-sm text-muted-foreground mt-3">
        Based on{' '}
        <span className="font-bold text-foreground">500+</span> reviews
      </p>

      {/* Distribution bar chart */}
      <div className="w-full mt-6 space-y-2.5">
        {distribution.map(({ star, count }) => {
          const pct = (count / maxCount) * 100;
          return (
            <div key={star} className="flex items-center gap-2.5 text-sm">
              <span className="w-3.5 text-right text-muted-foreground font-medium tabular-nums">
                {star}
              </span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-400 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: star === 5 ? 0.2 : 0, ease: 'easeOut' }}
                />
              </div>
              <span className="w-5 text-right text-muted-foreground text-xs font-medium tabular-nums">
                {count}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <Button
        className="mt-6 w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium"
        onClick={() =>
          document
            .getElementById('contact')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Submit a Review
      </Button>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Compute how many "pages" the mobile carousel has
  const totalPages = reviews.length;

  // Track scroll position to update dot indicators (mobile only)
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.9 + 16;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveDot(Math.min(Math.max(index, 0), totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Scroll to a specific review card (for dot click)
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth * 0.9;
    const gap = 16;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });
    setActiveDot(index);
  };

  // Chevron navigation
  const scrollPrev = () => {
    scrollToCard(Math.max(activeDot - 1, 0));
  };
  const scrollNext = () => {
    scrollToCard(Math.min(activeDot + 1, totalPages - 1));
  };

  return (
    <section id="reviews" className="py-14 sm:py-20 lg:py-24 bg-base">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 tracking-wider uppercase mb-3">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Real reviews from real customers in Ludhiana
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            MOBILE LAYOUT (< 768px)
            Horizontal scroll-snap carousel with dot indicators
            Mobile-native app-like review cards
        ══════════════════════════════════════════════════════════════ */}
        <div className="md:hidden">
          {/* Mobile: compact rating strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 mb-5 bg-card rounded-2xl border border-border/50 shadow-black/20 px-5 py-3.5"
          >
            <div className="text-3xl font-extrabold text-foreground leading-none">
              4.8
            </div>
            <div className="flex flex-col">
              <div className="scale-110 origin-left">
                <Stars rating={5} />
              </div>
              <span className="text-xs text-muted-foreground mt-0.5">
                500+ reviews
              </span>
            </div>
          </motion.div>

          {/* Scroll-snap container */}
          <div className="relative">
            {/* Scroll container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[5%] py-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-[90%] snap-center"
                >
                  <Card className="h-full rounded-2xl bg-card shadow-black/20 border-0 border-l-2 border-l-emerald-400">
                    <CardContent className="p-5 sm:p-6 flex flex-col gap-3">
                      {/* Avatar + name + date row */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-11 h-11 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center shrink-0 text-white text-sm font-bold shadow-sm`}
                          aria-hidden="true"
                        >
                          {review.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground text-sm truncate">
                            {review.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(review.date)}
                          </div>
                        </div>
                      </div>

                      {/* Star rating (slightly larger on mobile) */}
                      <div className="scale-110 origin-left">
                        <Stars rating={review.rating} />
                      </div>

                      {/* Quote + text */}
                      <div className="relative flex-1">
                        <Quote className="absolute -top-0.5 -left-0.5 w-4 h-4 text-emerald-400 fill-emerald-400" />
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4 line-clamp-5">
                          {review.comment}
                        </p>
                      </div>

                      {/* Service badge (pill shape) */}
                      <div className="pt-2.5 border-t border-border/40 mt-auto">
                        <Badge
                          variant="secondary"
                          className="text-xs font-medium bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/25 rounded-full px-3 py-1"
                        >
                          {review.service}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Chevron nav buttons overlaid */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-8 h-8 rounded-full bg-card/90 border border-border/50 shadow-black/20 opacity-90"
              onClick={scrollPrev}
              disabled={activeDot === 0}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-8 h-8 rounded-full bg-card/90 border border-border/50 shadow-black/20 opacity-90"
              onClick={scrollNext}
              disabled={activeDot === totalPages - 1}
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Dot indicators */}
          <DotIndicators
            total={totalPages}
            activeIndex={activeDot}
            onSelect={scrollToCard}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (>= 768px)
            Left sticky rating summary + 2-col grid of cards
        ══════════════════════════════════════════════════════════════ */}
        <div className="hidden md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr] gap-8 lg:gap-10 items-start">
          {/* Left: Rating Summary */}
          <RatingSummary />

          {/* Right: 2-column review card grid */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Global style for hiding scrollbar in mobile carousel */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
