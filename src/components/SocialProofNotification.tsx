import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

interface Notification {
  name: string;
  product: string;
  location: string;
  time: string;
}

const notifications: Notification[] = [
  { name: 'Andrea', product: 'Estileto Doble Tira', location: 'Lima', time: 'hace 2 min' },
  { name: 'Valeria', product: 'Sandalia Denim Baja', location: 'Miraflores', time: 'hace 5 min' },
  { name: 'Camila', product: 'Charlotte Jeans Celeste', location: 'San Isidro', time: 'hace 8 min' },
  { name: 'Luciana', product: 'Estileto Cruzado', location: 'Surco', time: 'hace 11 min' },
  { name: 'Sofía', product: 'Sandalia Blanca Cruzada', location: 'La Molina', time: 'hace 14 min' },
  { name: 'Daniela', product: 'Mule Croco Negra', location: 'Barranco', time: 'hace 18 min' },
  { name: 'Fernanda', product: 'Sandalia Plateada Espiral', location: 'Jesús María', time: 'hace 22 min' },
  { name: 'Isabela', product: 'Estileto Doble Tira', location: 'Pueblo Libre', time: 'hace 25 min' },
];

export default function SocialProofNotification() {
  const [current, setCurrent] = useState<Notification | null>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const showNext = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % notifications.length);
      setCurrent(notifications[(index + 1) % notifications.length]);
      setVisible(true);
    }, 400);
  }, [index]);

  useEffect(() => {
    // First notification appears after 8 seconds
    const initialDelay = setTimeout(() => {
      setCurrent(notifications[0]);
      setVisible(true);
    }, 8000);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Hide after 5 seconds, then show next after 20 seconds
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    const nextTimer = setTimeout(() => {
      showNext();
    }, 25000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [visible, showNext]);

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -80, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -80, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-4 z-50 max-w-[280px] sm:max-w-[300px]"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 bg-white border border-neutral-100 rounded-xl shadow-lg px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0">
              <ShoppingBag size={16} className="text-[#C8963E]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-900 leading-tight">
                {current.name} de {current.location}
              </p>
              <p className="text-xs text-neutral-500 leading-tight truncate">
                acaba de pedir <span className="text-neutral-700 font-medium">{current.product}</span>
              </p>
              <p className="text-[10px] text-neutral-400 mt-0.5">{current.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
