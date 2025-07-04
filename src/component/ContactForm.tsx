"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';

type FormData = {
  firstName: string;
  email: string;
  number: string;
  suburb: string;
  menu: string;
  subject: string;
  message: string;
};

export default function GetInTouch() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { menu: "" } });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { firstName, email, subject, message, menu, suburb, number } = data;
    try {
      setDisabled(true);
      const templateParams = {
        firstName,
        email,
        subject,
        message,
        menu,
        suburb,
        number,
      };
      await emailjs.send(
        'service_a9ktqlp',
        'template_l0mglga',
        templateParams,
        'user_yw3a8DYtaKOIm8KcBtk2L'
      );
      reset();
      setDisabled(false);
      // Optionally, show a simple alert or message here
      alert("Form sent! Thank you for your enquiry.");
    } catch (e) {
      setDisabled(false);
      alert("There was an error sending the form.");
      console.log(e);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto p-6 rounded-xl mt-8 scroll-mt-22" id="contact">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Get in Touch Form */}
        <div className="md:w-1/2 w-full">
          <h3 className="text-3xl font-bold mb-4 text-center md:text-left">Get in Touch</h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
            <div className="mb-4">
              <input
                {...register("firstName", { required: true })}
                type="text"
                id="firstName"
                placeholder="Name *"
                className="w-full border rounded px-3 py-2"
                disabled={disabled}
              />
              {errors.firstName && <span className="text-red-600 text-sm">Name is required</span>}
            </div>
            <div className="mb-4">
              <input
                {...register("email", { required: true })}
                type="email"
                id="inputEmail"
                placeholder="Email *"
                className="w-full border rounded px-3 py-2"
                disabled={disabled}
              />
              {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
            </div>
            <div className="mb-4">
              <input
                {...register("number", {
                  required: true,
                  pattern: { value: /^\d+$/, message: "Only numbers allowed" },
                  minLength: { value: 8, message: "Must be at least 8 digits" },
                  maxLength: { value: 15, message: "Must be at most 15 digits" }
                })}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                id="number"
                placeholder="Phone Number *"
                className="w-full border rounded px-3 py-2"
                disabled={disabled}
                autoComplete="tel"
              />
              {errors.number && <span className="text-red-600 text-sm">{errors.number.message || "Phone number is required and must contain only digits"}</span>}
            </div>
            <div className="mb-4">
              <input
                {...register("suburb", { required: true })}
                type="text"
                id="suburb"
                placeholder="Suburb Name *"
                className="w-full border rounded px-3 py-2"
                disabled={disabled}
              />
              {errors.suburb && <span className="text-red-600 text-sm">Suburb is required</span>}
            </div>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <label htmlFor="menu" className="sr-only">What can we help you with?</label>
              <div className="relative w-full">
                <select
                  {...register("menu", { required: true })}
                  id="menu"
                  className="w-full border rounded px-4 py-2 pr-10 appearance-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition-all"
                  disabled={disabled}
                  title="What can we help you with?"
                  aria-label="What can we help you with?"
                >
                  <option value="" disabled>Please select...</option>
                  <option value="Residential">Residential</option>
                  <option value="Strata / Property Maintenance">Strata / Property Maintenance</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 111.02 1.1l-4.25 3.84a.75.75 0 01-1.02 0l-4.25-3.84a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.menu && <span className="text-red-600 text-sm">Please select an option</span>}
              <input
                {...register("subject", { required: true })}
                type="text"
                id="subject"
                placeholder="Subject *"
                className="w-full border rounded px-3 py-2"
                disabled={disabled}
              />
              {errors.subject && <span className="text-red-600 text-sm">Subject is required</span>}
            </div>
            <div className="mb-4">
              <textarea
                {...register("message", {
                  required: true,
                  minLength: { value: 10, message: "Message must be at least 10 characters" },
                  maxLength: { value: 500, message: "Message must be at most 500 characters" }
                })}
                rows={3}
                placeholder="Message *"
                className="w-full border rounded px-3 py-2"
                disabled={disabled}
              />
              {errors.message && <span className="text-red-600 text-sm">{errors.message.message || "Message is required"}</span>}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-full shadow-sm transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 hover:bg-white hover:text-black hover:outline hover:outline-2 hover:outline-[var(--primary)]"
              disabled={disabled}
            >
              {disabled ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        {/* Right: Get in Touch Info and Map */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-6">
          <div className="text-center md:text-left">
            <div className="mb-2">
              <a href="tel:02-9419-7947" className="blue-link text-lg font-semibold">Ph: (02) 9419 7947</a>
            </div>
            <div className="mb-2">
              <a href="https://goo.gl/maps/hrBNba4G8a1EbgFg6" className="blue-link text-lg font-semibold">
                Unit 17, 4-6 Chaplin Drive Lane Cove West NSW 2066
              </a>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <AnimatedMapReveal />
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated map reveal for Get in Touch section
function AnimatedMapReveal() {
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
      className="w-full aspect-square md:aspect-[4/3] max-w-full rounded-lg overflow-hidden relative group"
      style={{ minHeight: '300px', height: '100%' }}
    >
      <iframe
        title="JDP Electrical Map"
        width="100%"
        height="100%"
        style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.openstreetmap.org/export/embed.html?bbox=151.1425%2C-33.8185%2C151.1645%2C-33.8055&amp;layer=mapnik&amp;marker=-33.8120%2C151.1535"
      ></iframe>
      <a
        href="https://goo.gl/maps/hrBNba4G8a1EbgFg6"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open location in Google Maps"
        className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer z-10"
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        <span className="sr-only">Open location in Google Maps</span>
      </a>
    </motion.div>
  );
}
