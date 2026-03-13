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
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [hasSeen, discount]);

  const handleApplyDiscount = () => {
    applyDiscount(10);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-900 transition-colors z-10 p-1"
              aria-label="Cerrar popup"
            >
              <X size={20} />
            </button>

            {/* Drag handle for mobile */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-neutral-200 rounded-full" />
            </div>

            <div className="bg-[#F5F5F0] px-6 py-5 sm:p-8 text-center border-b border-neutral-100">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Gift size={24} className="text-[#D4A373] sm:hidden" />
                <Gift size={32} className="text-[#D4A373] hidden sm:block" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-neutral-900 mb-1.5">
                Un regalo exclusivo para ti
              </h2>
              <p className="text-neutral-500 text-xs sm:text-sm">
                Gracias por visitar AMIRAH. Queremos que des el primer paso con estilo.
              </p>
            </div>

            <div className="px-6 py-5 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-1.5">
                S/ 10 <span className="text-base sm:text-lg font-normal text-neutral-500">de descuento</span>
              </div>
              <p className="text-neutral-600 mb-5 sm:mb-8 text-xs sm:text-sm">
                Aplica este descuento especial en tu primera compra y eleva tu presencia hoy mismo.
              </p>

              <button
                onClick={handleApplyDiscount}
                className="w-full bg-neutral-900 text-white py-3.5 sm:py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors shadow-md text-sm sm:text-base"
              >
                Aplicar Descuento Ahora
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 text-xs sm:text-sm text-neutral-400 hover:text-neutral-600 transition-colors pb-1"
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
