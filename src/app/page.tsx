import HomeHero from "../component/Home";
import FlippingCards from "@/component/FlippingCards";
import AboutSection from "../component/About";
import ReviewsCarousel from "../component/ReviewsCarousel";
import RequestAQuote from "../component/ContactForm";
import Footer from "../component/Footer";

export default function Home() {
  return (
    <>
      <HomeHero />
      <FlippingCards />
      <AboutSection />
      <ReviewsCarousel />
      <RequestAQuote />
      <Footer />
    </>
  );
}
