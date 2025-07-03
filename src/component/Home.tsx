"use client";
import React from 'react';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Image from 'next/image';
import '../styles/home-hero.css';

// Enable smooth scrolling for anchor links
if (typeof window !== 'undefined') {
  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
}

export default function HomeHero() {
  return (
    <section id="home" className="relative w-full min-h-[50vh] md:min-h-[650px] md:h-[90vh] flex items-stretch justify-center overflow-hidden">
      <Image
        src="/images/IMG_1050.jpg"
        alt="Joe and Dominic"
        fill
        className="absolute inset-0 w-full h-full z-0 home-hero-img-bg"
        priority
        sizes="100vw"
      />
      <div className="relative z-10 flex flex-col items-center justify-end h-full w-full max-w-6xl mx-auto px-2 py-6 pt-30 md:pt-10">
        <div className="home-hero-box flex flex-col items-center justify-center" style={{ marginTop: '10vh' }}>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-1 md:mb-3 drop-shadow-lg text-center">
            North Shore&apos;s Trusted Electricians
          </h1>
          <p className="text-white text-lg md:text-2xl font-medium mb-0 md:mb-2 drop-shadow-lg text-center" style={{marginTop: 0}}>
            Family-owned and operated for over 60 years. Fast, safe and professional electrical solutions for your home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[260px] sm:max-w-[420px] justify-center items-center mt-1">
            <a
              href="#services"
              className="button flex items-center justify-center gap-1 font-semibold text-[12px] md:text-[14px] lg:text-[18px] w-full max-w-[200px] rounded-lg h-[34px] md:h-[44px] px-2 md:px-4 cursor-pointer text-white hover:bg-[var(--primary)] hover:text-white transition-colors text-center no-underline focus:outline-black focus:outline-2 focus:outline shadow-lg border-2 border-white hover:border-[var(--primary)]"
              tabIndex={0}
              // outline handled in CSS
            >
              <span className="flex items-center justify-center gap-1 w-full">
                <span className="m-0 p-0 font-semibold text-center whitespace-nowrap">Services</span>
                <ElectricalServicesIcon className="icon text-base md:text-xl transition-colors" />
              </span>
            </a>
            <a
              href="#contact"
              className="button flex items-center justify-center gap-1 font-semibold text-[12px] md:text-[14px] lg:text-[18px] w-full max-w-[200px] rounded-lg h-[34px] md:h-[44px] px-2 md:px-4 cursor-pointer text-white hover:bg-[var(--primary)] hover:text-white transition-colors text-center no-underline focus:outline-black focus:outline-2 focus:outline shadow-lg border-2 border-white hover:border-[var(--primary)]"
              tabIndex={0}
              // outline handled in CSS
            >
              <span className="flex items-center justify-center gap-1 w-full">
                <span className="m-0 p-0 font-semibold text-center whitespace-nowrap">Request a Quote</span>
                <SupportAgentIcon className="icon text-base md:text-xl transition-colors pb-[2px]" />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0" />
    </section>
  );
}
