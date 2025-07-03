"use client";
import React from 'react';
import Image from 'next/image';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-8 md:py-16 bg-white scroll-mt-2">
      <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-4 gap-8 about-responsive">
        {/* Left: Text (always left on large screens) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left px-4 sm:px-8 md:px-4 order-1 about-text-responsive">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About us</h3>
           <p className="mb-2 text-lg md:text-xl text-black-700">JDP Electrical has been providing Electrical Services throughout Sydney, North Shore Region and surrounding areas for over 30 years</p>
          <p className="mb-2 text-lg md:text-xl text-black-700">Brothers Dominic and Joseph Panetta have built a reputable electrical contracting business specialising in all electrical installations and repairs for Residential and Commercial sectors.</p>
          <p className="mb-2 text-lg md:text-xl text-black-700">We offer expert advice to customers, and assist them with design and implementation solutions providing them with lasting, efficient and practical lighting designs. We ensure all your electrical needs are met.</p>
          <p className="mb-4 text-lg md:text-xl text-black-700">Our guarantee of quality work and our commitment to providing the best and most cost-effective solutions to your electrical needs, is why JDP Electrical are known as trusted electrical contractors.</p>
          <blockquote className="border-l-4 border-red-600 pl-4 pr-2 py-2 mb-6 mt-2 bg-red-50 w-full rounded-md">
            <span className="block text-center text-lg sm:text-xl md:text-2xl font-semibold text-[var(--primary)]">&ldquo;Our approach is simple – we treat your home like our own.&rdquo;</span>
          </blockquote>
          <div className="flex justify-center w-full">
           <button
             type="button"
             className="button flex items-center justify-center gap-2 font-semibold text-[14px] w-full max-w-[150px] rounded-lg h-[40px] cursor-pointer"
             style={{ right: 0, padding: '0 10px' }}
             onClick={() => { window.location.href = 'tel:02-9419-7947'; }}
             aria-label="Call our office at 02 9419 7947"
           >
             <span className="flex items-center justify-center w-full gap-2">
               <span className="m-0 p-0 font-semibold text-[14px] flex-1 text-center">02 9419 7947</span>
               <PhoneInTalkIcon className="icon text-xl transition-colors" />
             </span>
           </button>
          </div>
        </div>
        {/* Right: Image (fixed size on large screens) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center order-2 about-img-responsive">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex items-center justify-center w-full"
          >
            <Image
              src="/images/light3.jpg"
              alt="Lighting image JDP Electrical Services"
              width={724}
              height={562}
              className="rounded-lg shadow-lg object-cover w-full max-w-[724px] h-auto"
              priority={false}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 991px) {
          .tablet-stack {
            flex-direction: column;
          }
          .tablet-stack > .order-1 {
            order: 1;
          }
          .tablet-stack > .order-2 {
            order: 2;
          }
        }
        @media (max-width: 767px) {
          .about-responsive {
            max-width: 100%;
            padding-left: 0;
            padding-right: 0;
          }
          .about-text-responsive {
            width: 100%;
            max-width: 100%;
            align-items: flex-start;
            text-align: left;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .about-text-responsive h3,
          .about-text-responsive p,
          .about-text-responsive blockquote,
          .about-text-responsive div {
            width: 100%;
            max-width: 100%;
            text-align: left;
            margin-left: 0;
            margin-right: 0;
          }
          .about-img-responsive {
            justify-content: center;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        @media (min-width: 768px) and (max-width: 991px) {
          .about-text-responsive {
            width: 100%;
            max-width: 100%;
            align-items: flex-start;
            text-align: left;
            padding-left: 2rem;
            padding-right: 2rem;
          }
          .about-text-responsive h3,
          .about-text-responsive p,
          .about-text-responsive blockquote,
          .about-text-responsive div {
            width: 100%;
            max-width: 100%;
            text-align: left;
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </section>

  );
}
