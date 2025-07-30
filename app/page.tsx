import { AboutSection } from "@/components/AboutSection";
import FloatingSymbols from "@/components/elements/FloatingSymbols";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { PhotoGrid } from "@/components/PhotoGrid";

// export default function Home() {
//   return (
//     <main className="mx-auto flex flex-col items-center justify-between min-h-screen w-full">
//       <FloatingSymbols />
//       {/* <ReactiveParticles></ReactiveParticles> */}
//       {/* Navbar Section */}
//       <section className="w-full">
//         <Navbar />
//       </section>

//       {/* Main Content Section */}
//       <section className="flex-grow pt-[30px] md:pt-0 w-full">
//         <section className="text-center py-12">
//           <h2 className="text-3xl md:text-5xl font-bold mb-4">
//             The <span className="text-primary">Struggle</span> Behind The Code
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">Every developer's journey is paved with late nights, failed builds, and triumphant breakthroughs.</p>
//         </section>
//         {/* <MotivationalFloat /> */}
//       </section>

//       {/* Footer Section */}
//       <section className="w-full">
//         <Footer />
//       </section>
//     </main>
//   );
// }

export default function Home() {
  return (
    <main className="mx-auto flex flex-col items-center justify-between min-h-screen w-full">
      <FloatingSymbols />
      <main className="bg-background text-foreground">
        <HeroSection bucket="photos" folder="photos" />
        <AboutSection bucket="photos" folder="photos" />
        <div className="container mx-auto py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
          <PhotoGrid bucket="photos" folder="photos" />
        </div>
        <div className="container mx-auto pt-5">
          <Footer />
        </div>
      </main>
    </main>
  );
}
