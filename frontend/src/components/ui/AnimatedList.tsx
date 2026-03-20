import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEventHandler,
  type UIEvent,
} from 'react';
import { motion, useInView } from 'motion/react';

/* ------------------------------------------------------------------ */
/*  AnimatedItem — individual row with scroll-triggered entrance       */
/* ------------------------------------------------------------------ */

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

function AnimatedItem({ children, delay = 0, index, onMouseEnter, onClick }: AnimatedItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-2 cursor-pointer"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedList                                                       */
/* ------------------------------------------------------------------ */

export interface AnimatedListProps<T> {
  /** Data items to render */
  items: T[];
  /** Render function — receives the item, its index, and whether it's selected */
  renderItem: (item: T, index: number, isSelected: boolean) => ReactNode;
  /** Called when an item is clicked */
  onItemSelect?: (item: T, index: number) => void;
  /** Called when the hovered/selected index changes (hover or keyboard) */
  onActiveIndexChange?: (index: number | null) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  className?: string;
}

export function AnimatedList<T>({
  items,
  renderItem,
  onItemSelect,
  onActiveIndexChange,
  showGradients = true,
  enableArrowNavigation = true,
  displayScrollbar = true,
  initialSelectedIndex = -1,
  className = '',
}: AnimatedListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const keyboardNavRef = useRef(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  /* --- hover / click handlers --- */

  const handleMouseEnter = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onActiveIndexChange?.(index);
    },
    [onActiveIndexChange],
  );

  const handleMouseLeave = useCallback(() => {
    setSelectedIndex(-1);
    onActiveIndexChange?.(null);
  }, [onActiveIndexChange]);

  const handleClick = useCallback(
    (item: T, index: number) => {
      setSelectedIndex(index);
      onItemSelect?.(item, index);
    },
    [onItemSelect],
  );

  /* --- scroll gradients --- */

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDist = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDist / 50, 1));
  };

  /* --- keyboard navigation --- */

  useEffect(() => {
    if (!enableArrowNavigation) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        keyboardNavRef.current = true;
        setSelectedIndex((prev) => {
          const next = Math.min(prev + 1, items.length - 1);
          onActiveIndexChange?.(next);
          return next;
        });
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        keyboardNavRef.current = true;
        setSelectedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          onActiveIndexChange?.(next);
          return next;
        });
      } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        onItemSelect?.(items[selectedIndex], selectedIndex);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [items, selectedIndex, onItemSelect, onActiveIndexChange, enableArrowNavigation]);

  /* --- scroll selected into view on keyboard nav --- */

  useEffect(() => {
    if (!keyboardNavRef.current || selectedIndex < 0 || !listRef.current) return;
    keyboardNavRef.current = false;
    const container = listRef.current;
    const el = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
    if (el) {
      const margin = 50;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (top < container.scrollTop + margin) {
        container.scrollTo({ top: top - margin, behavior: 'smooth' });
      } else if (bottom > container.scrollTop + container.clientHeight - margin) {
        container.scrollTo({ top: bottom - container.clientHeight + margin, behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  /* --- gradient colors that respect the current theme --- */
  const gradientFrom = 'var(--gradient-bg, rgb(250 250 249))';

  return (
    <div className={`relative ${className}`} onMouseLeave={handleMouseLeave}>
      <div
        ref={listRef}
        className={`max-h-full overflow-y-auto ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-thumb]:bg-stone-700 [&::-webkit-scrollbar-thumb]:rounded-full'
            : 'scrollbar-hide'
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
          scrollbarColor: 'var(--scrollbar-thumb, #ccc) transparent',
        }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.05}
            index={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(item, index)}
          >
            {renderItem(item, index, selectedIndex === index)}
          </AnimatedItem>
        ))}
      </div>

      {showGradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-[40px] pointer-events-none transition-opacity duration-300"
            style={{
              opacity: topGradientOpacity,
              background: `linear-gradient(to bottom, ${gradientFrom}, transparent)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none transition-opacity duration-300"
            style={{
              opacity: bottomGradientOpacity,
              background: `linear-gradient(to top, ${gradientFrom}, transparent)`,
            }}
          />
        </>
      )}
    </div>
  );
}
