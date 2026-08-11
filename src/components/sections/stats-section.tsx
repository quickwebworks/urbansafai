'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Users, UserCheck, ClipboardCheck, Star } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Customers', target: 5000, suffix: '+', prefix: '' },
  { icon: UserCheck, label: 'Staff Members', target: 50, suffix: '+', prefix: '' },
  { icon: ClipboardCheck, label: 'Services Completed', target: 20000, suffix: '+', prefix: '' },
  { icon: Star, label: 'Average Rating', target: 4.8, suffix: '/5', prefix: '', isDecimal: true },
];

function useCounter(inView: boolean, target: number, isDecimal = false, duration = 2) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        setCount(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [inView, target, isDecimal, duration]);

  return count;
}

function StatCard({ stat, inView }: { stat: (typeof stats)[number]; inView: boolean }) {
  const count = useCounter(inView, stat.target, stat.isDecimal);
  const formatted = stat.isDecimal ? count.toFixed(1) : count.toLocaleString('en-IN');

  return (
    <motion.div
      className="flex flex-col items-center gap-2 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
        <stat.icon className="size-7 text-white" />
      </div>
      <p className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
        {stat.prefix}{formatted}{stat.suffix}
      </p>
      <p className="text-sm font-medium text-white/80">{stat.label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700 py-16 sm:py-20"
      aria-label="Company statistics"
    >
      <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full bg-emerald-400/5" />
      <div className="pointer-events-none absolute -bottom-8 right-[10%] size-32 rounded-full bg-emerald-400/5" />
      <div className="pointer-events-none absolute left-1/3 top-4 size-16 rounded-full bg-emerald-400/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-10 sm:gap-8 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
