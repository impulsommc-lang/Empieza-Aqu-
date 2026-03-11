import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const { applyDiscount, discount } = useCart();

  useEffect(() => {
    // Check if user has already seen the popup or has a discount applied
    const seen = localStorage.getItem('hasSeenDiscountPopup');
    if (seen || discount > 0) {
      setHasSeen(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!hasSeen) {
        setIsOpen(true);
        localStorage.setItem('hasSeenDiscountPopup', 'true');
        setHasSeen(true);
      }
    }, 40000); // 40 seconds

    return () => clearTimeout(timer);
  }, [hasSeen, discount]);

  const handleApplyDiscount = () => {
    applyDiscount(10);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors z-10"
              aria-label="Cerrar popup"
            >
              <X size={20} />
            </button>
            
            <div className="bg-[#F5F5F0] p-8 text-center border-b border-neutral-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Gift size={32} className="text-[#D4A373]" />
              </div>
              <h2 className="text-2xl font-serif font-medium text-neutral-900 mb-2">
                Un regalo exclusivo para ti
              </h2>
              <p className="text-neutral-500 text-sm">
                Gracias por visitar AMIRAH. Queremos que des el primer paso con estilo.
              </p>
            </div>
            
            <div className="p-8 text-center">
              <div className="text-4xl font-bold text-neutral-900 mb-2">
                S/ 10 <span className="text-lg font-normal text-neutral-500">de descuento</span>
              </div>
              <p className="text-neutral-600 mb-8 text-sm">
                Aplica este descuento especial en tu primera compra y eleva tu presencia hoy mismo.
              </p>
              
              <button
                onClick={handleApplyDiscount}
                className="w-full bg-neutral-900 text-white py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors shadow-md"
              >
                Aplicar Descuento Ahora
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                No gracias, prefiero pagar el precio completo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
