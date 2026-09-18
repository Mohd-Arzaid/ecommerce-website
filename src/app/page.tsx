import BestSellers from "@/components/home/best-sellers";
import HeroSection from "@/components/home/hero-section";
import LatestCollections from "@/components/home/latest-collections";
import ShopWithUs from "@/components/home/shop-with-us";
import FrontendLayout from "@/components/layouts/frontend-layout";

export default function Home() {
  return (
    <FrontendLayout>
      <HeroSection />
      <LatestCollections />
      <BestSellers />
      <ShopWithUs />
    </FrontendLayout>
  );
}
