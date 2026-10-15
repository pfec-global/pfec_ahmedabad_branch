import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import AboutAhmedabad from "@/components/AboutAhmedabad";
import Destinations from "@/components/Destinations";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import WhyTrust from "@/components/WhyTrust";
import OfficeGallery from "@/components/OfficeGallery";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-clip">
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <Events />
        </Reveal>
        <Reveal>
          <Testimonials />
        </Reveal>
        <Reveal>
          <Location />
        </Reveal>
        <Reveal>
          <AboutAhmedabad />
        </Reveal>
        <Reveal>
          <Destinations />
        </Reveal>
        <Reveal>
          <Services />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <Team />
        </Reveal>
        <Reveal>
          <WhyTrust />
        </Reveal>
        <Reveal>
          <OfficeGallery />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
      </main>
      <Reveal>
        <Footer />
      </Reveal>
      <BackToTop />
    </>
  );
}
