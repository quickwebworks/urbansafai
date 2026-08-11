import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ServicesSection from '@/components/sections/services-section';
import StatsSection from '@/components/sections/stats-section';
import CtaSection from '@/components/sections/cta-section';
import PackagesSection from '@/components/sections/packages-section';
import PricingSection from '@/components/sections/pricing-section';
import GallerySection from '@/components/sections/gallery-section';
import ReviewsSection from '@/components/sections/reviews-section';
import BlogSection from '@/components/sections/blog-section';
import ServiceAreasSection from '@/components/sections/service-areas-section';
import BookServiceSection from '@/components/sections/book-service-section';
import ContactSection from '@/components/sections/contact-section';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 lg:pt-18">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <CtaSection />
        <PackagesSection />
        <PricingSection />
        <GallerySection />
        <ReviewsSection />
        <BlogSection />
        <ServiceAreasSection />
        <BookServiceSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}