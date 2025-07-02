
"use client";
import React, { useEffect, useState } from "react";

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Back to top"
      onClick={handleClick}
      className={`back-to-top-btn${visible ? " show" : ""}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16V8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12L12 8L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
};

export default BackToTopButton;
