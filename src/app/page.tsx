import ParticleBackground from "@/components/ParticleBackground";
import SiteBackground from "@/components/SiteBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TokenSection from "@/components/TokenSection";
import MemeGallery from "@/components/MemeGallery";
import FanArtSection from "@/components/FanArtSection";
import EventSection from "@/components/EventSection";
import DonationReport from "@/components/DonationReport";
import RoadmapSection from "@/components/RoadmapSection";
import CommunitySection from "@/components/CommunitySection";
import DocsSection from "@/components/DocsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import CursorTrail from "@/components/CursorTrail";
import PriceAlertToast from "@/components/PriceAlertToast";
import PumpMeter from "@/components/PumpMeter";
import WenMoonCalculator from "@/components/WenMoonCalculator";

export default function Home() {
  return (
    <>
      <SiteBackground />
      <ParticleBackground />
      <CursorTrail />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TokenSection />
        <PumpMeter />
        <MemeGallery />
        <FanArtSection />
        <EventSection />
        <DonationReport />
        <WenMoonCalculator />
        <RoadmapSection />
        <CommunitySection />
        <DocsSection />
        <FAQSection />
      </main>
      <Footer />
      <MusicPlayer />
      <PriceAlertToast />
    </>
  );
}
