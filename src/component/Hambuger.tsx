"use client";

import React, { useState } from "react";
import Image from "next/image";
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

const menuItems = [
  { icon: <HomeOutlinedIcon />, label: "Home", anchor: "home" },
  { icon: <ElectricalServicesIcon />, label: "Services", anchor: "services" },
  { icon: <InfoOutlinedIcon />, label: "About", anchor: "about" },
  { icon: <StarBorderIcon />, label: "Reviews", anchor: "reviews" },
  { icon: <SupportAgentIcon />, label: "Contact", anchor: "contact" },
];

const callButton = (
  <a href="tel:02-9419-7947" className="flex justify-center w-full">
    <button
      type="button"
      className="button flex items-center justify-center gap-2 font-semibold text-[14px] w-full max-w-[180px] rounded-lg h-[40px] cursor-pointer"
      style={{ right: 0, padding: '0 10px' }}
    >
      <span className="flex items-center justify-center w-full gap-2">
        <span className="m-0 p-0 font-semibold text-[14px] flex-1 text-center">Call Our Office</span>
        <PhoneInTalkIcon className="icon text-xl transition-colors" />
      </span>
    </button>
  </a>
);

export default function Hamburger() {
  const [open, setOpen] = useState(false);

  // Close mobile menu if screen is resized above mobile breakpoint
  React.useEffect(() => {
  function handleResize() {
    // 992px is the lg992 breakpoint (custom), adjust if needed
    if (window.innerWidth >= 992 && open) {
    setOpen(false);
    }
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, [open]);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      {/* Desktop/Tablet: Logo left, menu right */}
      <div className="hidden my-desktop-class items-center justify-between py-2 w-full max-w-5xl mx-auto">
        <div className="items-center flex">
          <a href="#home" aria-label="Go to top of page">
            <Image
              src="/images/jdp-logo.png"
              alt="Logo"
              width={210}
              height={30}
              className="h-10 w-auto mr-4 cursor-pointer"
              priority
            />
          </a>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <div className="flex gap-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.anchor}`}
                className="flex flex-col items-center group cursor-pointer menu-hover-parent scroll-smooth"
              >
                <span className="menu-icon-hover icon text-2xl mb-1">
                  {item.icon}
                </span>
                <span className="text-xs mt-0.5 menu-label">{item.label}</span>
              </a>
            ))}
          </div>
          {/* Desktop call button on the right, reduced margin */}
          <div className="ml-4 flex items-center">{callButton}</div>
        </div>
      </div>

      {/* Mobile: Logo left, hamburger right */}
      <div className="flex items-center justify-between px-6 py-2 my-mobile-class">
        <div className="flex items-center">
          <a href="#home" aria-label="Go to top of page">
            <Image
              src="/images/jdp-logo.png"
              alt="Logo"
              width={228}
              height={32}
              className="max-w-[220px] min-w-[140px] w-full h-auto cursor-pointer"
              priority
              style={{ objectFit: 'contain' }}
            />
          </a>
        </div>
        <div className="flex items-center ml-auto">
          <button
            type="button"
            tabIndex={0}
            className="icon text-2xl w-12 h-12 flex items-center justify-center rounded-lg border-2 border-[var(--primary)] bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors focus:outline-black focus:outline-2 focus-visible:outline-black focus-visible:outline-2 ml-2 p-0"
            aria-label="Call us now"
            onClick={() => { window.location.href = 'tel:02-9419-7947'; }}
            style={{ outlineOffset: 2 }}
          >
            <PhoneInTalkIcon fontSize="inherit" className="transition-colors" />
          </button>
          <button
            tabIndex={0}
            className="icon text-2xl w-12 h-12 flex items-center justify-center rounded-lg border-2 border-[var(--primary)] bg-white text-[var(--primary)] focus:outline-black focus:outline-2 focus-visible:outline-black focus-visible:outline-2 relative group ml-2 p-0"
            aria-label="Toggle menu"
            aria-haspopup="true"
            aria-expanded={open}
            aria-controls="mobile-menu-list"
            onClick={() => setOpen((v) => !v)}
            onKeyDown={e => {
              if ((e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                setOpen((prev) => {
                  const willOpen = !prev;
                  if (willOpen) {
                    setTimeout(() => {
                      const firstMenu = document.querySelector('#mobile-menu-list [tabindex="0"]');
                      if (firstMenu && 'focus' in firstMenu && typeof (firstMenu as HTMLElement).focus === 'function') {
                        (firstMenu as HTMLElement).focus();
                      }
                    }, 0);
                  }
                  return willOpen;
                });
              }
            }}
            style={{ outlineOffset: 2 }}
          >
            {/* Hamburger icon with animated lines */}
            <span className="sr-only">Menu</span>
            <span
              className={`hamburger-line absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--primary)] rounded transition-all duration-300 ease-in-out
${open ? 'rotate-45 top-5' : 'top-3'}`}
            ></span>
            <span
              className={`hamburger-line absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--primary)] rounded transition-all duration-300 ease-in-out
${open ? 'opacity-0' : 'top-5'}`}
            ></span>
            <span
              className={`hamburger-line absolute left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--primary)] rounded transition-all duration-300 ease-in-out
${open ? '-rotate-45 top-5' : 'top-7'}`}
            ></span>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        id="mobile-menu-list"
        className={`lg992:hidden transition-all duration-200 bg-white ${open ? "block" : "hidden"}`}
        role="menu"
        aria-label="Mobile menu"
      >
        <ul className="flex flex-col items-start gap-4 py-4 w-full">
          {menuItems.map((item, idx) => (
            <li key={item.label} className="flex flex-row items-center gap-3 w-full px-6 py-1">
              <a
                href={`#${item.anchor}`}
                tabIndex={0}
                role="menuitem"
                onClick={() => setOpen(false)}
                onKeyDown={e => {
                  if (e.key === 'Tab' && idx === menuItems.length - 1 && !e.shiftKey) {
                    setOpen(false);
                    // Move focus to the next focusable element after menu
                    setTimeout(() => {
                      const nav = document.querySelector('nav');
                      if (nav) {
                        const focusables = nav.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');
                        let foundMenu = false;
                        for (let i = 0; i < focusables.length; i++) {
                          if (focusables[i] === e.target) {
                            foundMenu = true;
                          } else if (foundMenu) {
                            const el = focusables[i];
                            if ('focus' in el && typeof (el as HTMLElement).focus === 'function') {
                              (el as HTMLElement).focus();
                              break;
                            }
                          }
                        }
                      }
                    }, 0);
                  }
                }}
              >
                <span className="icon text-2xl mr-2">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}