import Footer from "@/components/Footer";
import { PhotoGrid } from "@/components/PhotoGrid";
import { AboutSection } from "@/components/AboutSection";
import HeroSection from "@/components/layouts/home/HeroSection";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <AboutSection bucket="photos" folder="photos" />
      <div className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
        <PhotoGrid bucket="photos" folder="photos" />
      </div>
      <div className="container mx-auto pt-5">
        <Footer />
      </div>
    </main>
  );
}
