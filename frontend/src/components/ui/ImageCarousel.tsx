import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ImageCarouselProps {
  images: string[];
  alt?: string;
  height?: string;
  fallback?: React.ReactNode;
  className?: string;
}

export function ImageCarousel({
  images,
  alt = '',
  height = '16rem',
  fallback,
  className = '',
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length],
  );

  if (!hasImages) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ height }}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden group ${className}`} style={{ height }}>
      {/* Image */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          custom={direction}
          initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {hasMultiple && (
        <>
          {/* Prev / Next arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-stone-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-stone-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-1.5 h-1.5 transition-colors ${
                  i === index
                    ? 'bg-white'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wider text-white/70 bg-stone-900/50 px-2 py-0.5">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
