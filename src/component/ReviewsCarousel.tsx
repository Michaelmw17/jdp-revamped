"use client";
import { useState, useEffect, useRef } from "react";
import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const reviews = [
  {
    name: "Mary (Mosman)",
    text:
      "Joe and Dominic have been our electricians for over 12 years, delivering high quality service including major electrical renovations and outdoor lighting. Joe and Dominic are a pleasure to have working in our home and we highly recommend their services.",
    rating: 5,
  },
  {
    name: "Alex (Chatswood)",
    text:
      "JDP Electrical provided prompt and professional service for our office fit-out. Highly recommended!",
    rating: 5,
  },
  {
    name: "Sophie (Lane Cove)",
    text:
      "Very reliable and friendly team. They explained everything clearly and did a great job with our lighting upgrade.",
    rating: 5,
  },
];

export default function ReviewsCarousel() {

  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
  const review = reviews[index];

  // Auto-cycle on all devices (best practice: 5s interval, pause on hover/focus for accessibility)
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
      }, 5000);
    };
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Pause auto-scroll on hover/focus for accessibility
  const pauseAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const resumeAutoScroll = () => {
    // Always clear any existing interval before starting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
    }, 5000);
  };

  return (
    <section
      id="reviews"
      className="w-full py-12 bg-red flex flex-col items-center scroll-mt-34"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
      onFocus={pauseAutoScroll}
      onBlur={resumeAutoScroll}
      tabIndex={0}
    >
      <div className="max-w-4xl w-full mx-auto px-4 flex items-center relative">
        {/* Desktop arrows */}
        <button
          aria-label="Previous review"
          onClick={prev}
          className="hidden md:flex absolute left-0 z-10 items-center justify-center h-full px-2"
        >
          <ChevronLeftIcon className="text-4xl text-white" />
        </button>
        <div
          className="flex flex-col items-center bg-transparent rounded-xl shadow-none p-8 relative min-h-[220px] w-full"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-white">Our Reviews</h2>
          <div className="flex items-center justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`text-2xl ${i < review.rating ? "text-yellow-400" : "text-white/40"}`}
              />
            ))}
          </div>
          <p className="text-lg md:text-xl text-white text-center mb-4 min-h-[96px] flex items-center justify-center">“{review.text}”</p>
          <div className="text-base font-semibold text-white mb-2">- {review.name}</div>
          {/* Mobile dots only, desktop arrows + dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full border border-white ${
                  i === index ? "bg-white" : "bg-white/40"
                } transition-colors`}
              />
            ))}
          </div>
        </div>
        <button
          aria-label="Next review"
          onClick={next}
          className="hidden md:flex absolute right-0 z-10 items-center justify-center h-full px-2"
        >
          <ChevronRightIcon className="text-4xl text-white" />
        </button>
      </div>
    </section>
  );
}
