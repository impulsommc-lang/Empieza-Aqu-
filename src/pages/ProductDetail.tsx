import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, AlertCircle, ArrowLeft, Check, ShieldCheck, Truck, PackageOpen } from 'lucide-react';
import { shoes } from '@/data/shoes';
import ProductCard from '@/components/ProductCard';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import { useCart } from '@/context/CartContext';

// Facebook Pixel type shim
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openCheckout, setCheckoutShoe } = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const shoe = shoes.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
    setSelectedSize(null);
    setQuantity(1);
    setSizeError(false);
  }, [slug]);

  // Facebook Pixel — ViewContent when product page loads
  useEffect(() => {
    if (!shoe) return;
    window.fbq?.('track', 'ViewContent', {
      content_name: shoe.name,
      content_ids: [shoe.sku],
      content_type: 'product',
      value: shoe.price,
      currency: 'PEN',
    });
  }, [shoe]);

  if (!shoe) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F5F5F0] px-4">
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Producto no encontrado</h1>
        <p className="text-neutral-500 mb-8 text-center max-w-md">Lo sentimos, el modelo que buscas no existe o ha sido retirado de nuestro catalogo.</p>
        <Link to="/zapatos" className="bg-neutral-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
          Volver a la coleccion
        </Link>
      </div>
    );
  }

  const relatedShoes = shoes
    .filter(s => s.id !== shoe.id && (s.type === shoe.type || s.tags.some(t => shoe.tags.includes(t))))
    .slice(0, 4);

  const benefitBullets: Record<string, string[]> = {
    'Estiletos': [
      'Taco que estiliza la figura y alarga la pierna visualmente.',
      'Material premium que se moldea al pie desde el primer uso.',
      'Diseno de edicion limitada — pocas mujeres lo tendran.',
    ],
    'Sandalias bajas': [
      'Comodidad real: puedes usarlas horas sin que los pies protesten.',
      'Combina con jeans, vestidos o faldas sin pensar dos veces.',
      'Frescura garantizada para el clima calido peruano.',
    ],
    'Sandalias de vestir': [
      'Presencia inmediata: el tipo de sandalia que genera comentarios.',
      'Materiales seleccionados que se ven caros porque lo son.',
      'Unica en su diseno — hecha para mujeres que no siguen tendencias, las marcan.',
    ],
  };

  const bullets = benefitBullets[shoe.type] ?? [
    'Disenado para estilizar tu figura sin sacrificar comodidad.',
    'Materiales premium que se adaptan a tu pie desde el primer uso.',
    'El toque de exclusividad que tu outfit necesita.',
  ];

  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % shoe.images.length);
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + shoe.images.length) % shoe.images.length);

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      document.getElementById('size-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSizeError(false);
    // Facebook Pixel — InitiateCheckout
    window.fbq?.('track', 'InitiateCheckout', {
      content_name: shoe.name,
      content_ids: [shoe.sku],
      content_type: 'product',
      num_items: quantity,
      value: shoe.price * quantity,
      currency: 'PEN',
    });
    setCheckoutShoe({ shoe, size: selectedSize, quantity });
    openCheckout();
  };

  return (
    <>
      <div className="bg-white min-h-screen pb-28 lg:pb-12">

        {/* ── MOBILE PRODUCT SECTION ───────────────────────────────── */}
        <div className="lg:hidden w-full bg-[#F5F5F0] pb-6">

          {/* Image */}
          <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={shoe.images[currentImageIndex]}
                alt={`${shoe.name} - Vista ${currentImageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Badges overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Alta demanda
              </span>
              {shoe.badge && (
                <span className="bg-[#D4A373] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {shoe.badge}
                </span>
              )}
            </div>

            {shoe.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm z-10" aria-label="Imagen anterior">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm z-10" aria-label="Siguiente imagen">
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            {/* Image dots */}
            {shoe.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {shoe.images.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentImageIndex(idx)} aria-label={`Imagen ${idx + 1}`}
                    className={`rounded-full transition-all duration-200 ${idx === currentImageIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product info block */}
          <div className="px-4 pt-5">

            {/* Category + SKU */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">{shoe.type}</p>
              <p className="text-xs text-neutral-400 font-mono">SKU: {shoe.sku}</p>
            </div>

            {/* Name */}
            <h1 className="text-2xl font-serif font-light text-neutral-900 leading-tight tracking-tight uppercase text-balance mb-3">
              {shoe.name}
            </h1>

            {/* Price row */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-medium text-neutral-900">S/ {shoe.price.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[#D4A373] font-medium mb-5">Solo quedan 2 pares en tu talla.</p>

            {/* Benefit bullets */}
            <ul className="space-y-2.5 mb-6">
              {bullets.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <Check size={15} className="text-[#D4A373] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {point}
                </li>
              ))}
            </ul>

            {/* Testimonials slider — horizontal, mobile-optimized */}
            <div className="mb-6">
              <TestimonialsSlider compact />
            </div>

            {/* Grand Slam Offer */}
            <div className="bg-white border border-[#D4A373]/30 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4A373] mb-2">Oferta de Hoy</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Asegura tu par ahora y llevate <strong className="text-neutral-900">envio GRATIS a todo el Peru</strong> por la compra de 2 pares.
              </p>
              <div className="flex items-start gap-2">
                <ShieldCheck size={15} className="text-neutral-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-xs text-neutral-600">
                  <strong className="text-neutral-800">Garantia AMIRAH:</strong> Si la talla no te queda perfecta, el primer cambio es 100% GRATIS. Cero riesgos para ti.
                </p>
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-neutral-200 mb-6">
              <div className="flex flex-col items-center text-center gap-1.5">
                <Truck size={18} className="text-neutral-400" strokeWidth={1.5} />
                <span className="text-[10px] text-neutral-500 leading-tight">Envio a todo el pais</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <ShieldCheck size={18} className="text-neutral-400" strokeWidth={1.5} />
                <span className="text-[10px] text-neutral-500 leading-tight">Pago 100% seguro</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5">
                <PackageOpen size={18} className="text-neutral-400" strokeWidth={1.5} />
                <span className="text-[10px] text-neutral-500 leading-tight">Cambio de talla GRATIS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT (shared desktop + mobile remainder) ─────── */}
        <div className="py-6 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb & Back */}
            <div className="mb-6 flex items-center text-sm text-neutral-500">
              <button onClick={() => navigate(-1)} className="flex items-center hover:text-neutral-900 transition-colors mr-4">
                <ArrowLeft size={16} className="mr-1" /> Volver
              </button>
              <span className="mx-2">/</span>
              <Link to="/zapatos" className="hover:text-neutral-900 transition-colors">Coleccion</Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-900 font-medium truncate">{shoe.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 mb-24">

              {/* Image Gallery — DESKTOP only (hidden on mobile, shown in hero strip above) */}
              <div className="hidden lg:block lg:w-3/5 relative">
                <div className="sticky top-24">
                  <div
                    className="relative aspect-[4/5] overflow-hidden bg-neutral-50 cursor-zoom-in"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={shoe.images[currentImageIndex]}
                        alt={`${shoe.name} - Vista ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'cursor-zoom-out' : 'hover:scale-105'}`}
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>

                    {shoe.images.length > 1 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 shadow-sm hover:bg-white transition-colors z-10" aria-label="Imagen anterior">
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 shadow-sm hover:bg-white transition-colors z-10" aria-label="Siguiente imagen">
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                      {shoe.badge && (
                        <span className="bg-[#D4A373] text-white text-xs font-medium px-3 py-1.5 uppercase tracking-widest shadow-sm">{shoe.badge}</span>
                      )}
                      {!shoe.isAvailable && (
                        <span className="bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 uppercase tracking-widest shadow-sm">Bajo Pedido</span>
                      )}
                    </div>
                  </div>

                  {shoe.images.length > 1 && (
                    <div className="flex gap-4 mt-4 overflow-x-auto hide-scrollbar">
                      {shoe.images.map((img, idx) => (
                        <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`relative w-20 h-24 flex-shrink-0 bg-neutral-50 overflow-hidden transition-all duration-200 ${currentImageIndex === idx ? 'ring-1 ring-neutral-900 opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                          <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-2/5 flex flex-col">
                {/* Desktop-only header */}
                <div className="hidden lg:block mb-2">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">{shoe.type}</p>
                    <p className="text-xs text-neutral-400 font-mono">SKU: {shoe.sku}</p>
                  </div>
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      Alta demanda — Edicion Limitada
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-serif font-light text-neutral-900 mb-2 tracking-tight uppercase text-balance">
                    {shoe.name}
                  </h1>
                  <div className="flex items-center mb-1">
                    <span className="text-2xl font-medium text-neutral-900">S/ {shoe.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-[#D4A373] font-medium mb-6">Solo quedan 2 pares en tu talla.</p>
                </div>

                {/* Benefit bullets — desktop only */}
                <ul className="hidden lg:block space-y-2.5 mb-6">
                  {bullets.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                      <Check size={15} className="text-[#D4A373] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Grand Slam Offer box — desktop only */}
                <div className="hidden lg:block bg-[#FAFAF7] border border-[#D4A373]/30 rounded-xl p-5 mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#D4A373] mb-2">Oferta de Hoy</p>
                  <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                    Asegura tu par ahora y llevate <strong className="text-neutral-900">envio GRATIS a todo el Peru</strong> por la compra de 2 pares.
                  </p>
                  <div className="flex items-start gap-2">
                    <ShieldCheck size={15} className="text-neutral-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-xs text-neutral-600">
                      <strong className="text-neutral-800">Garantia AMIRAH:</strong> Si la talla no te queda perfecta, el primer cambio es 100% GRATIS. Cero riesgos para ti.
                    </p>
                  </div>
                </div>

                {/* Made to Order */}
                {!shoe.isAvailable && (
                  <div className="mb-8 p-5 bg-[#F5F5F0] border border-neutral-200 rounded-xl">
                    <div className="flex items-start mb-3">
                      <AlertCircle size={18} className="text-neutral-900 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-neutral-900 block text-sm uppercase tracking-wider mb-1">Agotado — Disponible bajo pedido</strong>
                        <p className="text-sm text-neutral-600 font-light">Reserva tu par y lo preparamos especialmente para ti.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Size selector */}
                <div className="mb-8" id="size-section">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Cual es tu talla ideal?</p>
                      <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-900">Talla</h3>
                    </div>
                    <button className="text-xs text-neutral-500 underline hover:text-neutral-900 transition-colors">Guia de tallas</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {shoe.sizesAvailable.map((size) => {
                      const isSoldOut = shoe.soldOutSizes?.includes(size);
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => { if (!isSoldOut) { setSelectedSize(size); setSizeError(false); } }}
                          disabled={isSoldOut}
                          aria-label={isSoldOut ? `Talla ${size} agotada` : `Talla ${size}`}
                          className={`relative w-12 h-12 flex items-center justify-center rounded-full border text-sm transition-all duration-200 ${
                            isSoldOut
                              ? 'border-neutral-200 text-neutral-300 bg-neutral-50 cursor-not-allowed'
                              : isSelected
                              ? 'border-neutral-900 bg-neutral-900 text-white'
                              : 'border-neutral-300 text-neutral-900 bg-white hover:border-neutral-900'
                          }`}
                        >
                          {size}
                          {isSoldOut && (
                            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="block w-8 h-px bg-neutral-300 rotate-45 absolute" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {sizeError && (
                    <p className="text-xs text-red-500 mt-2">Por favor selecciona una talla antes de continuar.</p>
                  )}
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-900 mb-4">Cantidad</h3>
                  <div className="inline-flex items-center border border-neutral-300 rounded-full">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors">-</button>
                    <span className="w-8 text-center text-sm font-medium text-neutral-900">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors">+</button>
                  </div>
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex flex-col gap-4 mb-8">
                  <button
                    onClick={handleBuyNow}
                    className={`w-full flex items-center justify-center bg-neutral-900 text-white py-4 px-8 text-sm font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 rounded-xl ${selectedSize ? 'animate-pulse-once' : ''}`}
                  >
                    Comprar Ahora &bull; S/ {(shoe.price * quantity).toFixed(2)}
                  </button>
                </div>

                {/* Trust Signals — desktop only */}
                <div className="hidden lg:grid grid-cols-1 gap-3 py-6 border-t border-neutral-100 mb-8">
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <Truck size={18} className="text-neutral-400 flex-shrink-0" strokeWidth={1.5} />
                    <span>Envio a todo el pais.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <ShieldCheck size={18} className="text-neutral-400 flex-shrink-0" strokeWidth={1.5} />
                    <span>Pago 100% seguro al coordinar.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600">
                    <PackageOpen size={18} className="text-neutral-400 flex-shrink-0" strokeWidth={1.5} />
                    <span>Primer cambio de talla GRATIS.</span>
                  </div>
                </div>

                {/* Product details */}
                <div className="border-t border-neutral-100 pt-6 mt-2">
                  <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-900 mb-4">Detalles del Producto</h3>
                  <ul className="space-y-2 text-sm text-neutral-600 font-light">
                    <li><span className="font-medium text-neutral-900">Color:</span> {shoe.color}</li>
                    <li><span className="font-medium text-neutral-900">Material:</span> {shoe.material}</li>
                    <li><span className="font-medium text-neutral-900">Altura del tacon:</span> {shoe.heelHeight}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedShoes.length > 0 && (
              <div className="mt-16 md:mt-32 border-t border-neutral-100 pt-16">
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-serif font-light text-neutral-900 mb-4 uppercase tracking-widest">Tambien podria gustarte</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {relatedShoes.map((relatedShoe, index) => (
                    <motion.div key={relatedShoe.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                      <ProductCard shoe={relatedShoe} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky CTA — mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleBuyNow}
          className={`w-full flex items-center justify-center bg-[#7C3A2A] text-white py-4 rounded-xl text-sm font-semibold uppercase tracking-widest hover:bg-[#6a3122] transition-all duration-300 ${selectedSize ? 'animate-[pulse_1.5s_ease-in-out_3]' : ''}`}
        >
          Comprar Ahora &bull; S/ {(shoe.price * quantity).toFixed(2)}
        </button>
      </div>
    </>
  );
}
