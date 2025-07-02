"use client";
import React from "react";
import { motion } from "framer-motion";
import "./flipping-cards-outline.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

const cardData = [
  {
    title: "Residential",
    icon: <HomeOutlinedIcon style={{ fontSize: 150 }} />,
    items: [
      "Repairs & Maintenance",
      "Renovations & New Builds",
      "Clipsal Cbus Automation",
      "Switchboard Upgrades",
      "Safety Switch protection",
      "Smoke Detectors",
      "General Power Outlets",
      "LED Lighting upgrade",
      "Security & Garden Lighting",
      "Ceiling Sweep Fans",
      "Appliance installations & Repairs",
      "TV – DATA – Communications",
    ],
  },
  {
    title: "Strata / Property Maintenance",
    icon: <ElectricalServicesIcon style={{ fontSize: 160 }} />,
    items: [
      "Maintenance and repairs",
      "General power outlets",
      "Lighting control systems",
      "Main switchboards upgrades",
      "Switches and circuit breakers",
      "Light and power points",
      "Appliance installations and repairs",
      "Hot water repairs",
      "Preventative maintenance",
    ],
  },
  {
    title: "Commercial",
    icon: <BusinessIcon style={{ fontSize: 150 }} />,
    items: [
      "Maintenance and repairs",
      "Lighting and power",
      "Testing and tagging",
      "Data points",
      "Smoke detectors",
      "Emergency lighting",
    ],
  },
];


export default function FlippingCards() {
  // For mobile click-to-flip and debug force flip
  const [flippedIdx, setFlippedIdx] = React.useState<number | null>(null);
  const [screen, setScreen] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 640) setScreen('mobile');
      else if (width < 1024) setScreen('tablet');
      else setScreen('desktop');
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-8 bg-gray-50 px-2 sm:px-4" >
      <h2 id="services" className="text-3xl font-bold mb-2 text-center w-full scroll-mt-24">Services</h2>
      <p className="text-lg sm:text-xl text-center max-w-2xl mb-8">JDP Electrical Services offer a complete range of electrical installations and services throughout Sydney, North Shore Region and surrounding areas.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-start w-full max-w-5xl mb-8">
        {cardData.map((card, idx) => {
          // For tablet: center the 3rd card on a new row
          const isThirdCard = idx === 2;
          const tabletCenter = screen === 'tablet' && isThirdCard ? 'sm:col-span-2 sm:col-start-1 sm:justify-self-center' : '';
          // Flip if clicked or hovered (always allow both)
          const isFlipped = flippedIdx === idx;
          return (
            <motion.div
              key={card.title}
              className={`group [perspective:1000px] w-[300px] h-[380px] relative mx-auto cursor-pointer focus:outline-none ${tabletCenter}`}
              tabIndex={0}
              role="button"
              aria-pressed={isFlipped}
              onClick={() => setFlippedIdx(flippedIdx === idx ? null : idx)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setFlippedIdx(flippedIdx === idx ? null : idx);
                }
              }}
              onMouseEnter={() => setFlippedIdx(idx)}
              onMouseLeave={() => flippedIdx === idx && setFlippedIdx(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: 'easeOut' }}
            >
              <div
                className={`relative w-full h-full duration-700 preserve-3d ${isFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'}`}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-red rounded-2xl shadow-lg flex flex-col items-center justify-center text-white [backface-visibility:hidden] p-4 custom-red-shadow card-face-front focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  tabIndex={-1}
                  data-front
                >
                  <h3 className="text-xl font-bold uppercase mb-2 text-center">{card.title}</h3>
                  <div className="flex-1 flex items-center justify-center">{card.icon}</div>
                </div>
                {/* Back */}
                <div
                  className="absolute w-full h-full bg-red rounded-2xl shadow-lg flex flex-col items-center justify-start text-white [backface-visibility:hidden] [transform:rotateY(180deg)] p-4 overflow-y-auto card-back custom-red-shadow card-face-back focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  tabIndex={0}
                  data-back
                >
                  <h3 className="text-lg font-bold uppercase mb-2 text-center w-full">{card.title}</h3>
                  <ul className="list-disc list-inside text-left text-sm sm:text-[15px] space-y-1 w-full pl-2">
                    {card.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

        <p className="text-lg sm:text-xl text-center max-w-2xl mb-4">Our highly skilled and experienced team will provide professional and personable advice and recommendations to ensure all your electrical needs are met.</p>
        <blockquote className="border-l-4 border-red-600 pl-4 pr-2 py-2 mb-6 mt-2 bg-red-50 inline-block max-w-full rounded-md">
            <span className="block text-center text-lg sm:text-xl md:text-2xl font-semibold text-[var(--primary)] whitespace-normal">&ldquo;Our approach is simple – we treat your home like our own.&rdquo;</span>
        </blockquote>      
        <p className="text-lg sm:text-xl text-center max-w-2xl">Call JDP Electrical now on <a href="tel:0294197947" className="blue-link font-semibold">02 9419 7947</a></p>
    </div>
  );
}
