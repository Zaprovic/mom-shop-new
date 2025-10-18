import Footer from "./_components/footer";
import HeroSection from "./_components/sections/hero-section";
import FeaturedProducts from "./_components/sections/featured-products";
import CategoriesSection from "./_components/sections/categories-section";
import BenefitsSection from "./_components/sections/benefits-section";
import CTASection from "./_components/sections/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <BenefitsSection />
        <CTASection />
      </>

      <Footer />
    </div>
  );
}
