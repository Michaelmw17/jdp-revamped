"use client";
import { useState, useEffect, useRef } from "react";
// Add swipe detection

function useSwipe(
  ref: React.RefObject<HTMLDivElement | null>,
  onSwipeLeft: () => void,
  onSwipeRight: () => void
) {
  useEffect(() => {
    if (!ref.current) return;
    let startX: number | null = null;
    let startY: number | null = null;
    let isTouch = false;
    const minDist = 40; // Minimum px for swipe
    function onTouchStart(e: TouchEvent) {
      isTouch = true;
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    }
    function onTouchMove(e: TouchEvent) {
      // Prevent scroll if horizontal swipe
      if (!isTouch || startX === null || startY === null) return;
      const t = e.touches[0];
      if (Math.abs(t.clientX - startX) > Math.abs(t.clientY - startY)) {
        e.preventDefault();
      }
    }
    function onTouchEnd(e: TouchEvent) {
      if (!isTouch || startX === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      if (Math.abs(dx) > minDist) {
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      }
      startX = null;
      startY = null;
      isTouch = false;
    }
    const node = ref.current;
    node.addEventListener('touchstart', onTouchStart, { passive: false });
    node.addEventListener('touchmove', onTouchMove, { passive: false });
    node.addEventListener('touchend', onTouchEnd, { passive: false });
    return () => {
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchmove', onTouchMove);
      node.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onSwipeLeft, onSwipeRight]);
}
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
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  // const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reviewTextRef = useRef<HTMLDivElement | null>(null);
  const reviewBoxRef = useRef<HTMLDivElement>(null);

  const prev = () => {
    setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
    setExpanded(false);
  };
  const next = () => {
    setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
    setExpanded(false);
  };

  // Enable swipe on the main review area
  useSwipe(reviewBoxRef, next, prev);
  const review = reviews[index];

  // Auto-cycle on all devices (best practice: 5s interval, pause on hover/focus for accessibility)
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
        setExpanded(false);
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
      setExpanded(false);
    }, 5000);
  };

  // Truncate logic: use CSS line clamp for visual consistency
  useEffect(() => {
    // Only check for clamp on mobile (smaller than md)
    const checkClamp = () => {
      if (window.innerWidth < 768 && !expanded && reviewTextRef.current) {
        const el = reviewTextRef.current;
        setIsClamped(el.scrollHeight > el.clientHeight + 1);
      } else {
        setIsClamped(false);
      }
    };
    checkClamp();
    window.addEventListener('resize', checkClamp);
    return () => window.removeEventListener('resize', checkClamp);
  }, [expanded, review, index]);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="w-full py-12 bg-red flex flex-col items-center scroll-mt-34 relative"
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
          className={`flex flex-col items-center bg-transparent rounded-xl shadow-none p-2 relative w-full transition-all duration-300 ${expanded ? 'max-h-[340px] overflow-y-auto' : 'h-[340px]'}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Our Reviews</h2>
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`text-2xl ${i < review.rating ? "text-yellow-400" : "text-white/40"}`}
              />
            ))}
          </div>
          <div
            ref={reviewBoxRef}
            className={`flex flex-col items-center w-full mb-4 relative transition-all duration-300 
              ${expanded ? '' : 'h-[100px] overflow-hidden'} 
              md:h-auto md:overflow-visible`}
          >
            <div
              ref={reviewTextRef}
              className={`w-full text-lg md:text-xl text-white text-center leading-relaxed transition-all duration-300 px-10 
                ${!expanded ? 'line-clamp-3' : ''} md:line-clamp-none`}
            >
              <span>“{review.text}”</span>
            </div>
          </div>
          {isClamped && (
            <button
              className="mt-2 mb-6 px-4 py-2 border border-white rounded-full text-white bg-transparent hover:bg-white hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600 md:hidden"
              onClick={() => {
                if (!expanded && reviewBoxRef.current) {
                  reviewBoxRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                }
                setExpanded((v) => !v);
              }}
              aria-label={expanded ? "Show less" : "Read more"}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
          <div className="text-base font-bold text-white mb-4 text-center w-full">- {review.name}</div>
          {/* Mobile dots only, desktop arrows + dots */}
          <div className="flex items-center justify-center gap-2 mt-auto">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => { setIndex(i); setExpanded(false); }}
                className={`w-3 h-3 rounded-full border border-white ${
                  i === index ? "bg-white" : "bg-white/40"}
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
