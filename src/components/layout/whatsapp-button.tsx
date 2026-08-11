'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { COMPANY_WHATSAPP } from '@/lib/constants';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi Urban Safai! I'd like to book a cleaning service."
  );

  return (
    <motion.a
      href={`https://wa.me/${COMPANY_WHATSAPP}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-colors hover:bg-[#1ebe5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
    >
      <MessageCircle className="size-7 fill-white" />
    </motion.a>
  );
}