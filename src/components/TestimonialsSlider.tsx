import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Valeria M.',
    text: 'Me siento mucho más elegante y segura al caminar. Recibo cumplidos todo el tiempo.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=1',
  },
  {
    id: 2,
    name: 'Carolina S.',
    text: 'Complementan mis outfits de oficina perfectamente. La calidad es increíble.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=5',
  },
  {
    id: 3,
    name: 'Andrea P.',
    text: 'Son increíblemente cómodas y a la vez tan sofisticadas. Las uso todo el día sin problema.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=9',
  },
  {
    id: 4,
    name: 'Lucía G.',
    text: 'El diseño es hermoso, elevan cualquier look básico al instante. Son mi par favorito.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=16',
  },
  {
    id: 5,
    name: 'Mariana R.',
    text: 'Se nota la exclusividad en cada detalle. Definitivamente mi nueva marca favorita.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=25',
  },
  {
    id: 6,
    name: 'Sofía T.',
    text: 'Llegaron rapidísimo y la atención fue excelente. Calidad de lujo a precio justo.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
];

// Duplicate for seamless infinite loop
const loopedTestimonials = [...testimonials, ...testimonials];

interface TestimonialsSliderProps {
  compact?: boolean;
}

export default function TestimonialsSlider({ compact = false }: TestimonialsSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);

  // Pointer drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);

  const CARD_W = compact ? 208 : 272; // w-52 or w-68
  const GAP = compact ? 12 : 16;
  const SPEED = compact ? 0.5 : 0.6; // px per frame
  const HALF = (CARD_W + GAP) * testimonials.length;

  // Active dot index (0..5)
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    const step = () => {
      if (!isPausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= HALF) {
          posRef.current -= HALF;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        }
        // Update dot
        const idx = Math.round(posRef.current / (CARD_W + GAP)) % testimonials.length;
        setDotIndex(idx);
      }
      animFrameRef.current = requestAnimationFrame(step);
    };
    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [HALF, CARD_W, GAP, SPEED]);

  const pause = () => { isPausedRef.current = true; };
  const resume = () => { isPausedRef.current = false; };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    isPausedRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.clientX;
    let next = dragStartPos.current + delta;
    // Wrap around
    if (next < 0) next += HALF;
    if (next >= HALF) next -= HALF;
    posRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
    isPausedRef.current = false;
  };

  return (
    <div className="w-full select-none">
      {/* Header */}
      <div className={`px-1 ${compact ? 'mb-3' : 'mb-5'}`}>
        <h3 className={`font-serif font-bold text-neutral-900 text-balance ${compact ? 'text-sm' : 'text-lg'}`}>
          Lo que dicen nuestras clientas
        </h3>
        {!compact && (
          <p className="text-xs text-neutral-500 mt-1">+500 mujeres satisfechas en todo el Peru</p>
        )}
      </div>

      {/* Overflow mask */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Moving track — no scroll, driven by rAF transform */}
        <div
          ref={trackRef}
          className={`flex will-change-transform ${compact ? 'gap-3 pb-2' : 'gap-4 pb-3'}`}
          style={{ width: 'max-content' }}
        >
          {loopedTestimonials.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className={`flex-shrink-0 bg-white rounded-2xl border border-neutral-100 shadow-sm ${
                compact ? 'w-52 p-3.5' : 'w-68 p-5'
              }`}
              style={{ width: CARD_W }}
            >
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={compact ? 11 : 13} className="fill-[#D4A373] text-[#D4A373]" />
                ))}
              </div>
              <p className={`text-neutral-700 italic leading-relaxed mb-3 ${compact ? 'text-[11px]' : 'text-sm'}`}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={compact ? 26 : 34}
                  height={compact ? 26 : 34}
                  className="rounded-full object-cover flex-shrink-0 ring-1 ring-[#D4A373]/40"
                  style={{ width: compact ? 26 : 34, height: compact ? 26 : 34 }}
                />
                <div>
                  <p className={`font-semibold text-neutral-900 ${compact ? 'text-[10px]' : 'text-xs'}`}>{t.name}</p>
                  <p className="text-[9px] text-neutral-400">Clienta Verificada</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === dotIndex ? 'w-4 h-1.5 bg-[#D4A373]' : 'w-1.5 h-1.5 bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
