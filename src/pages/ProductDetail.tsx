import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check, AlertCircle, ArrowLeft, Clock, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { shoes } from '@/data/shoes';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);

  const shoe = shoes.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
    setSelectedSize(null);
    setQuantity(1);
  }, [slug]);

  if (!shoe) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F5F5F0] px-4">
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Producto no encontrado</h1>
        <p className="text-neutral-500 mb-8 text-center max-w-md">Lo sentimos, el modelo que buscas no existe o ha sido retirado de nuestro catálogo.</p>
        <Link to="/zapatos" className="bg-neutral-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
          Volver a la colección
        </Link>
      </div>
    );
  }

  const relatedShoes = shoes
    .filter(s => s.id !== shoe.id && (s.type === shoe.type || s.tags.some(t => shoe.tags.includes(t))))
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shoe.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shoe.images.length) % shoe.images.length);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla antes de añadir al carrito.');
      return;
    }
    addToCart(shoe, selectedSize, quantity);
  };

  return (
    <div className="bg-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Back */}
        <div className="mb-8 flex items-center text-sm text-neutral-500">
          <button onClick={() => navigate(-1)} className="flex items-center hover:text-neutral-900 transition-colors mr-4">
            <ArrowLeft size={16} className="mr-1" /> Volver
          </button>
          <span className="mx-2">/</span>
          <Link to="/zapatos" className="hover:text-neutral-900 transition-colors">Colección</Link>
          <span className="mx-2">/</span>
          <Link to={`/zapatos?tipo=${shoe.type}`} className="hover:text-neutral-900 transition-colors">{shoe.type}</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-900 font-medium truncate">{shoe.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          
          {/* Image Gallery (Left Column) */}
          <div className="lg:w-3/5 relative">
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

                {/* Navigation Arrows */}
                {shoe.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 shadow-sm hover:bg-white transition-colors z-10"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-900 shadow-sm hover:bg-white transition-colors z-10"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {shoe.badge && (
                    <span className="bg-[#D4A373] text-white text-xs font-medium px-3 py-1.5 uppercase tracking-widest shadow-sm">
                      {shoe.badge}
                    </span>
                  )}
                  {!shoe.isAvailable && (
                    <span className="bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 uppercase tracking-widest shadow-sm">
                      Bajo Pedido
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {shoe.images.length > 1 && (
                <div className="flex gap-4 mt-4 overflow-x-auto hide-scrollbar">
                  {shoe.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-24 flex-shrink-0 bg-neutral-50 overflow-hidden transition-all duration-200 ${
                        currentImageIndex === idx ? 'ring-1 ring-neutral-900 opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info (Right Column) */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="mb-2 flex justify-between items-start">
              <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">{shoe.type}</p>
              <p className="text-xs text-neutral-400 font-mono">SKU: {shoe.sku}</p>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-serif font-light text-neutral-900 mb-4 tracking-tight uppercase">
              {shoe.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-medium text-neutral-900">S/ {shoe.price.toFixed(2)}</span>
            </div>

            <div className="mb-6 flex items-center text-xs text-[#D4A373] uppercase tracking-widest font-medium">
              <Clock size={14} className="mr-1" /> Alta demanda esta semana
            </div>

            <p className="text-neutral-600 leading-relaxed mb-8 text-sm font-light">
              {shoe.description}
            </p>

            {/* Made to Order Info */}
            {!shoe.isAvailable && (
              <div className="mb-8 p-5 bg-[#F5F5F0] border border-neutral-200 rounded-xl">
                <div className="flex items-start mb-3">
                  <AlertCircle size={18} className="text-neutral-900 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block text-sm uppercase tracking-wider mb-1">Agotado — Disponible bajo pedido</strong>
                    <p className="text-sm text-neutral-600 font-light">Este modelo puede solicitarse bajo pedido. Reserva tu par y lo preparamos especialmente para ti.</p>
                  </div>
                </div>
                <div className="pl-6 space-y-2 text-sm text-neutral-600 font-light">
                  <p>• Tiempo estimado de entrega: 10-15 días hábiles.</p>
                  <p>• La reserva asegura tu talla.</p>
                  <p className="font-medium text-neutral-900 mt-3">Reserva tu par con solo S/ 20 y asegúrate de no quedarte sin tu talla.</p>
                </div>
              </div>
            )}

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-900">Talla</h3>
                <button className="text-xs text-neutral-500 underline hover:text-neutral-900 transition-colors">Guía de tallas</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {shoe.sizesAvailable.map((size) => {
                  const isSoldOut = shoe.soldOutSizes?.includes(size);
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => !isSoldOut && setSelectedSize(size)}
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
              {!selectedSize && (
                <p className="text-xs text-red-500 mt-2 opacity-0 transition-opacity" id="size-error">Selecciona una talla</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-900 mb-4">Cantidad</h3>
              <div className="inline-flex items-center border border-neutral-300 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-medium text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center bg-neutral-900 text-white py-4 px-8 text-sm font-medium uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 rounded-xl"
              >
                Añadir al carrito • S/ {(shoe.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* AOV Incentive */}
            <div className="mb-8 p-4 bg-neutral-50 border border-neutral-100 rounded-xl text-center">
              <p className="text-sm text-neutral-700 italic">
                "Muchas clientas aprovechan y llevan 2 pares para obtener envío gratis."
              </p>
            </div>

            {/* Trust Badges & Shipping Info */}
            <div className="grid grid-cols-1 gap-4 py-6 border-t border-neutral-100">
              <div className="flex items-start text-sm text-neutral-600">
                <Truck size={18} className="mr-3 text-neutral-400 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="block font-medium text-neutral-900 mb-1">Compra 2 pares o más y recibe envío gratis.</span>
                  <span className="block text-xs font-light">Envío 1 par: Lima S/ 15 | Provincia S/ 30</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <ShieldCheck size={18} className="mr-3 text-neutral-400" strokeWidth={1.5} />
                <span>Pago 100% seguro y encriptado</span>
              </div>
            </div>

            {/* Details Accordion (Simplified) */}
            <div className="border-t border-neutral-100 pt-6 mt-2">
              <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-900 mb-4">Detalles del Producto</h3>
              <ul className="space-y-2 text-sm text-neutral-600 font-light">
                <li><span className="font-medium text-neutral-900">Color:</span> {shoe.color}</li>
                <li><span className="font-medium text-neutral-900">Material:</span> {shoe.material}</li>
                <li><span className="font-medium text-neutral-900">Altura del tacón:</span> {shoe.heelHeight}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedShoes.length > 0 && (
          <div className="mt-32 border-t border-neutral-100 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif font-light text-neutral-900 mb-4 uppercase tracking-widest">También podría gustarte</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedShoes.map((relatedShoe, index) => (
                <motion.div
                  key={relatedShoe.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard shoe={relatedShoe} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
