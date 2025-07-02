"use client";
import React from 'react';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './home-hero.css';

// Enable smooth scrolling for anchor links
if (typeof window !== 'undefined') {
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}

// Animated image reveal for hero section
function AnimatedHeroImage() {
  // Detect screen size for animation direction
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 60 } : { opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <Image
        src="/images/light3.jpg"
        alt="Lighting JDP Electrical Services"
        width={500}
        height={400}
        className="w-full max-w-md rounded-lg shadow-lg object-cover home-hero-img"
        priority
      />
    </motion.div>
  );
}

export default function HomeHero() {
  return (
    <section id="home" className="w-full pt-8 pb-2 md:py-12 bg-white mt-16 scroll-mt-22">
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 gap-8">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col items-center lg:items-start justify-center text-center  px-4 sm:px-[7.5rem] md:px-[1.5rem] lg:px-[1.5rem]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-4 lg:text-center lg:px-12">
            Welcome to
            <span className="block lg:text-left whitespace-nowrap"> JDP Electrical Services</span>
          </h3>
          <p className="mb-2 text-lg lg:text-xl text-black-700">
            &#39;North Shore&rsquo;s most trusted and experienced family electrical contractors, with over 60 years combined experience.&#39;
          </p>
          <p className="mb-6 text-lg lg:text-xl text-black-700">
            JDP Electrical Services offer a complete range of electrical installations and services throughout Sydney, North Shore Region and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-10 items-center sm:items-start justify-center sm:justify-start lg:items-center lg:justify-center mx-auto">
            <a
              href="#services"
              className="button flex items-center justify-center gap-2 font-semibold text-[14px] w-full max-w-[180px] rounded-lg h-[50px] px-6 cursor-pointer bg-[var(--primary)] text-white hover:bg-red-700 transition-colors text-center no-underline focus:outline-black focus:outline-2 focus:outline"
              tabIndex={0}
            >
              <span className="flex items-center justify-center w-full gap-2">
                <span className="m-0 p-0 font-semibold text-[16px] md:text-[18px] flex-1 text-center whitespace-nowrap">Services</span>
                <ElectricalServicesIcon className="icon text-xl transition-colors" />
              </span>
            </a>
            <a
              href="#contact"
              className="button flex items-center justify-center gap-2 font-semibold text-[14px] w-full max-w-[180px] rounded-lg h-[50px] px-6 cursor-pointer bg-gray-800 text-white hover:bg-gray-900 transition-colors text-center no-underline focus:outline-black focus:outline-2 focus:outline"
              tabIndex={0}
            >
              <span className="flex items-center justify-center w-full gap-2">
                <span className="m-0 p-0 font-semibold text-[16px] md:text-[18px] flex-1 text-center">Contact</span>
                <SupportAgentIcon className="icon text-xl transition-colors pb-[2px]" />
              </span>
            </a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center">
          {/* Animate image: slide in from right on desktop/tablet, from bottom on mobile */}
          <div
            className="w-full max-w-md"
            style={{ position: 'relative' }}
          >
            <AnimatedHeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}
