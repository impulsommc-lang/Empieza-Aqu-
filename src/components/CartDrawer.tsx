import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, cartTotal, cartCount, discount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-2xl font-serif font-medium text-neutral-900 flex items-center">
                Tu Selección <span className="ml-2 text-sm text-neutral-400 font-sans">({items.length})</span>
              </h2>
              <button
                onClick={closeCart}
                className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Upsell header with progress bar */}
            <div className="p-5 bg-neutral-50/50 border-b border-neutral-100">
              <p className="text-sm text-neutral-700 font-medium mb-3 text-center">
                Te faltan solo <span className="font-bold text-neutral-900">S/ 99.90</span> para desbloquear ENVIO GRATIS a todo el Peru.
              </p>
              <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="h-full bg-[#D4A373] rounded-full"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-neutral-400 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-lg font-serif">Tu selección está vacía</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 text-sm font-medium text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1"
                  >
                    Descubrir Colección
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.shoe.images[0]}
                          alt={item.shoe.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-grow justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wide pr-4">
                              {item.shoe.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-neutral-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                            >
                              Quitar
                            </button>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">Talla: {item.size}</p>
                          <p className="text-xs text-neutral-500 mt-1">Color: {item.shoe.color}</p>
                          <p className="text-xs text-neutral-400 mt-1 font-mono">SKU: {item.shoe.sku}</p>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-neutral-200 rounded-full">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <p className="text-sm font-medium text-neutral-900">
                            S/ {(item.shoe.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-neutral-100">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-sm uppercase tracking-widest">Subtotal</span>
                    <span className="text-lg font-serif font-medium text-neutral-900">
                      S/ {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600">
                      <span className="text-sm uppercase tracking-widest">Descuento</span>
                      <span className="text-lg font-serif font-medium">
                        - S/ {discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-100">
                    <span className="text-neutral-900 font-medium text-sm uppercase tracking-widest">Total Estimado</span>
                    <span className="text-xl font-serif font-bold text-neutral-900">
                      S/ {Math.max(0, cartTotal - discount).toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-400 text-center mb-6">
                  {cartCount >= 2 ? '¡Envío gratis aplicado!' : 'Envío Lima: S/ 15 | Provincia: S/ 30'}
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-neutral-900 text-white py-4 rounded-xl text-sm font-medium uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Ir al Checkout Seguro
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
