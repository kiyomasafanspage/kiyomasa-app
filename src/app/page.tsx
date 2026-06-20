import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TokenSection from "@/components/TokenSection";
import MemeGallery from "@/components/MemeGallery";
import RoadmapSection from "@/components/RoadmapSection";
import CommunitySection from "@/components/CommunitySection";
import DocsSection from "@/components/DocsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TokenSection />
        <MemeGallery />
        <RoadmapSection />
        <CommunitySection />
        <DocsSection />
        <FAQSection />
      </main>
      <Footer />
      <MusicPlayer />
    </>
  );
}
