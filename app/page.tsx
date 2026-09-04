import BestsellersCarousel from "@/components/BestsellersCarousel";
import TrustStrip from "@/components/TrustStrip";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-brand-cream flex flex-col items-center pt-24 pb-32">

        {/* The New Premium Carousel */}
        <div className="w-full">
          <BestsellersCarousel />
        </div>

        {/* Premium Trust Strip */}
        <TrustStrip />

        {/* All Products Section */}
        <ProductsSection />

        {/* Testimonials Section */}
        <div className="w-full">
          <TestimonialsSection />
        </div>

      </main>
    </>
  );
}
