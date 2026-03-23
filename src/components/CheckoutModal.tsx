import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Banknote, Truck, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getWhatsAppLink } from '@/lib/utils';

// Facebook Pixel type shim
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, checkoutShoe, discount } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'contra-entrega' | 'yape' | 'transferencia' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  if (!checkoutShoe) return null;

  const { shoe, size, quantity } = checkoutShoe;
  const itemTotal = shoe.price * quantity;
  const finalTotal = Math.max(0, itemTotal - discount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Por favor selecciona un metodo de pago.');
      return;
    }
    let message = `*NUEVO PEDIDO AMIRAH*\n\n`;
    message += `*Cliente:* ${formData.name}\n`;
    message += `*WhatsApp:* ${formData.phone}\n`;
    message += `*Direccion:* ${formData.address}\n\n`;
    message += `*Pedido:*\n`;
    message += `- ${quantity}x ${shoe.name} (Talla ${size}) — S/ ${itemTotal.toFixed(2)}\n`;
    if (discount > 0) message += `*Descuento:* -S/ ${discount.toFixed(2)}\n`;
    message += `*Total:* S/ ${finalTotal.toFixed(2)}\n\n`;
    message += `*Metodo de pago:* ${paymentMethod.toUpperCase()}\n`;

    // Facebook Pixel — Purchase (fires when user taps the WhatsApp confirm button)
    window.fbq?.('track', 'Purchase', {
      content_name: shoe.name,
      content_ids: [shoe.sku],
      content_type: 'product',
      num_items: quantity,
      value: finalTotal,
      currency: 'PEN',
    });

    window.open(getWhatsAppLink(message), '_blank');
    closeCheckout();
  };

  const paymentOptions: { id: 'contra-entrega' | 'yape' | 'transferencia'; label: string; sub: string }[] = [
    { id: 'contra-entrega', label: 'Contra Entrega', sub: 'Pagas al recibir tu pedido' },
    { id: 'yape', label: 'Yape / Plin', sub: 'Pago instantaneo y seguro' },
    { id: 'transferencia', label: 'Transferencia', sub: 'BCP, Interbank, BBVA' },
  ];

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeCheckout}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Drag handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
              <div className="w-10 h-1 bg-neutral-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-neutral-100 flex-shrink-0">
              <div>
                <h2 className="text-lg font-serif font-medium text-neutral-900">Dinos donde enviar tus AMIRAH</h2>
                <p className="text-xs text-neutral-400 mt-0.5">Solo separas tu stock. No pagas nada ahora.</p>
              </div>
              <button onClick={closeCheckout} className="text-neutral-400 hover:text-neutral-900 transition-colors p-1 -mr-1 flex-shrink-0 ml-4" aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>

            {/* Order preview */}
            <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-3 flex-shrink-0">
              <img
                src={shoe.images[0]}
                alt={shoe.name}
                className="w-12 h-14 object-cover rounded-lg border border-neutral-200 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate uppercase tracking-wide">{shoe.name}</p>
                <p className="text-xs text-neutral-500">Talla {size} &bull; Cant. {quantity}</p>
              </div>
              <p className="text-sm font-semibold text-neutral-900 flex-shrink-0">S/ {finalTotal.toFixed(2)}</p>
            </div>

            {/* Scrollable form body */}
            <form id="checkout-form" onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">

              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                />
                <label htmlFor="name" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                  Tu nombre completo
                </label>
              </div>

              {/* WhatsApp */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
                  <Phone size={15} />
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  className="block pl-10 pr-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                />
                <label htmlFor="phone" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                  Tu WhatsApp
                </label>
              </div>

              {/* Address */}
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder=" "
                  className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                />
                <label htmlFor="address" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                  Direccion de envio
                </label>
              </div>

              {/* Payment options */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-3">Metodo de pago</p>
                {paymentOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPaymentMethod(opt.id)}
                    className={`relative w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-150 text-left ${
                      paymentMethod === opt.id
                        ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                        : 'border-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === opt.id ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                      {opt.id === 'yape' ? (
                        <span className={`text-xs font-bold ${paymentMethod === opt.id ? 'text-white' : 'text-neutral-500'}`}>Y</span>
                      ) : opt.id === 'transferencia' ? (
                        <Banknote size={16} className={paymentMethod === opt.id ? 'text-white' : 'text-neutral-500'} />
                      ) : (
                        <Truck size={16} className={paymentMethod === opt.id ? 'text-white' : 'text-neutral-500'} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{opt.label}</p>
                      <p className="text-xs text-neutral-500">{opt.sub}</p>
                    </div>
                    {paymentMethod === opt.id && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </form>

            {/* Fixed footer */}
            <div className="px-6 pb-6 pt-4 border-t border-neutral-100 flex-shrink-0 bg-white">
              <button
                type="submit"
                form="checkout-form"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all duration-200 shadow-md"
              >
                <MessageCircle size={18} />
                Confirmar Pedido por WhatsApp
              </button>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <ShieldCheck size={13} className="text-neutral-400" />
                <p className="text-xs text-neutral-400 text-center">No pagas nada en esta pantalla. Solo separas tu stock.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
