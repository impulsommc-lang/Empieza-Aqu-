import { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Valeria M.', text: 'Me siento mucho más elegante y segura al caminar. ¡Recibo cumplidos todo el tiempo!', rating: 5 },
  { id: 2, name: 'Carolina S.', text: 'Complementan mis outfits de oficina perfectamente. La calidad es increíble.', rating: 5 },
  { id: 3, name: 'Andrea P.', text: 'Nunca pensé que unos tacones pudieran ser tan cómodos y a la vez tan sofisticados.', rating: 5 },
  { id: 4, name: 'Lucía G.', text: 'El diseño es hermoso, elevan cualquier look básico al instante.', rating: 5 },
  { id: 5, name: 'Mariana R.', text: 'Se nota la exclusividad en cada detalle. Definitivamente mi nueva marca favorita.', rating: 5 },
  { id: 6, name: 'Sofía T.', text: 'Los recibí en 3 días y el empaque es precioso. Calidad de lujo a precio justo.', rating: 5 },
];

interface TestimonialsSliderProps {
  /** Compact variant used inside product detail mobile strip */
  compact?: boolean;
}

export default function TestimonialsSlider({ compact = false }: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
    sliderRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const delta = startX.current - e.clientX;
    sliderRef.current.scrollLeft = scrollLeft.current + delta;
  };

  const onPointerUp = () => { isDragging.current = false; };

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, testimonials.length - 1));
    setActiveIndex(clamped);
    const card = sliderRef.current?.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`flex items-end justify-between ${compact ? 'mb-3' : 'mb-5'} px-1`}>
        <div>
          <h3 className={`font-serif font-bold text-neutral-900 text-balance ${compact ? 'text-sm' : 'text-lg'}`}>
            Lo que dicen nuestras clientas
          </h3>
          {!compact && (
            <p className="text-xs text-neutral-500 mt-1">+500 mujeres satisfechas en todo el Peru</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Anterior testimonio"
            className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 disabled:opacity-30 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Siguiente testimonio"
            className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 disabled:opacity-30 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Draggable slider */}
      <div
        ref={sliderRef}
        className="flex gap-3 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing select-none pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            onClick={() => setActiveIndex(i)}
            style={{ scrollSnapAlign: 'start' }}
            className={`flex-shrink-0 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow ${
              compact ? 'w-52 p-3.5' : 'w-64 sm:w-72 p-5'
            }`}
          >
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={compact ? 11 : 13} className="fill-[#D4A373] text-[#D4A373]" />
              ))}
            </div>
            <p className={`text-neutral-700 italic leading-relaxed mb-3 ${compact ? 'text-[11px]' : 'text-sm'}`}>
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className={`rounded-full bg-[#f5ede4] flex items-center justify-center text-[#B5824A] font-serif font-bold flex-shrink-0 ${compact ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                {t.name.charAt(0)}
              </div>
              <div>
                <p className={`font-semibold text-neutral-900 ${compact ? 'text-[10px]' : 'text-xs'}`}>{t.name}</p>
                <p className="text-[9px] text-neutral-400">Clienta Verificada</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Testimonio ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-4 h-1.5 bg-[#D4A373]'
                : 'w-1.5 h-1.5 bg-neutral-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
