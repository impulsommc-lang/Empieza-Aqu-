import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Banknote, Truck, MessageCircle, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getWhatsAppLink } from '@/lib/utils';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type PaymentId = 'contra-entrega' | 'yape' | 'transferencia';

const paymentOptions: { id: PaymentId; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: 'contra-entrega',
    label: 'Contra Entrega',
    sub: 'Pagas al recibir tu pedido',
    icon: <Truck size={16} />,
  },
  {
    id: 'yape',
    label: 'Yape / Plin',
    sub: 'Pago instantaneo y seguro',
    icon: <span className="text-xs font-extrabold leading-none">Y</span>,
  },
  {
    id: 'transferencia',
    label: 'Transferencia',
    sub: 'BCP · Interbank · BBVA',
    icon: <Banknote size={16} />,
  },
];

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, checkoutShoe, discount } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentId | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!checkoutShoe) return null;

  const { shoe, size, quantity } = checkoutShoe;
  const itemTotal = shoe.price * quantity;
  const finalTotal = Math.max(0, itemTotal - discount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Ingresa tu nombre.';
    if (!formData.phone.trim()) newErrors.phone = 'Ingresa tu numero de WhatsApp.';
    if (!formData.address.trim()) newErrors.address = 'Ingresa tu direccion de envio.';
    if (!paymentMethod) newErrors.payment = 'Selecciona un metodo de pago.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let message = `*NUEVO PEDIDO AMIRAH*\n\n`;
    message += `*Cliente:* ${formData.name}\n`;
    message += `*WhatsApp:* ${formData.phone}\n`;
    message += `*Direccion:* ${formData.address}\n\n`;
    message += `*Pedido:*\n`;
    message += `- ${quantity}x ${shoe.name} (Talla ${size}) — S/ ${itemTotal.toFixed(2)}\n`;
    if (discount > 0) message += `*Descuento:* -S/ ${discount.toFixed(2)}\n`;
    message += `*Total:* S/ ${finalTotal.toFixed(2)}\n\n`;
    message += `*Metodo de pago:* ${paymentMethod!.toUpperCase()}\n`;

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

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeCheckout}
          />

          {/* Modal sheet */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '93dvh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-0 sm:hidden flex-shrink-0">
              <div className="w-9 h-1 bg-neutral-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
              <div>
                <h2 className="text-base font-serif font-semibold text-neutral-900 leading-snug">
                  Confirma tu pedido
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  No pagas nada ahora. Solo separas tu par.
                </p>
              </div>
              <button
                onClick={closeCheckout}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors flex-shrink-0 ml-3"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
            </div>

            {/* Order summary card */}
            <div className="mx-4 mb-3 rounded-2xl border border-neutral-100 bg-neutral-50 flex items-center gap-3 p-3 flex-shrink-0">
              <div className="w-16 h-16 rounded-xl border border-neutral-200 bg-white overflow-hidden flex-shrink-0">
                <img
                  src={shoe.images[0]}
                  alt={shoe.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 uppercase tracking-wide leading-tight truncate">
                  {shoe.name}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Talla {size}&nbsp;&bull;&nbsp;Cant. {quantity}
                </p>
                {discount > 0 && (
                  <p className="text-xs text-[#D4A373] font-medium mt-0.5">
                    Descuento aplicado: -S/ {discount.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-base font-bold text-neutral-900">S/ {finalTotal.toFixed(2)}</p>
                {discount > 0 && (
                  <p className="text-xs text-neutral-400 line-through">S/ {itemTotal.toFixed(2)}</p>
                )}
              </div>
            </div>

            {/* Scrollable form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto flex-1 px-4 pb-4 space-y-3"
            >
              {/* Section label */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pt-1">
                Tus datos de envio
              </p>

              {/* Name */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className={`w-full h-12 px-4 text-sm text-neutral-900 bg-white rounded-xl border transition-colors outline-none focus:border-neutral-900 placeholder:text-neutral-400 ${errors.name ? 'border-red-400' : 'border-neutral-200'}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                    <Phone size={15} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Numero de WhatsApp"
                    className={`w-full h-12 pl-10 pr-4 text-sm text-neutral-900 bg-white rounded-xl border transition-colors outline-none focus:border-neutral-900 placeholder:text-neutral-400 ${errors.phone ? 'border-red-400' : 'border-neutral-200'}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                    <MapPin size={15} />
                  </span>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Direccion de envio"
                    className={`w-full h-12 pl-10 pr-4 text-sm text-neutral-900 bg-white rounded-xl border transition-colors outline-none focus:border-neutral-900 placeholder:text-neutral-400 ${errors.address ? 'border-red-400' : 'border-neutral-200'}`}
                  />
                </div>
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1 ml-1">{errors.address}</p>
                )}
              </div>

              {/* Payment section */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pt-2">
                Metodo de pago
              </p>
              {errors.payment && (
                <p className="text-xs text-red-500 -mt-1 ml-1">{errors.payment}</p>
              )}
              <div className="space-y-2">
                {paymentOptions.map(opt => {
                  const active = paymentMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(opt.id);
                        if (errors.payment) setErrors(prev => ({ ...prev, payment: '' }));
                      }}
                      className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-150 text-left ${
                        active
                          ? 'border-neutral-900 bg-neutral-50'
                          : 'border-neutral-100 bg-white hover:border-neutral-200'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${active ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                        {opt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold leading-none ${active ? 'text-neutral-900' : 'text-neutral-700'}`}>
                          {opt.label}
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5">{opt.sub}</p>
                      </div>
                      {active && (
                        <CheckCircle2 size={18} className="text-neutral-900 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Extra bottom space so last item isn't hidden behind footer */}
              <div className="h-2" />
            </form>

            {/* Sticky footer */}
            <div className="px-4 pb-5 pt-3 border-t border-neutral-100 flex-shrink-0 bg-white">
              {/* Total recap */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs text-neutral-500 uppercase tracking-widest">Total a pagar</span>
                <span className="text-base font-bold text-neutral-900">S/ {finalTotal.toFixed(2)}</span>
              </div>

              {/* WhatsApp CTA */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-4 rounded-2xl text-sm font-bold uppercase tracking-wider hover:bg-[#1fb85a] active:bg-[#1aa650] transition-all duration-200 shadow-lg shadow-green-200"
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                Confirmar Pedido por WhatsApp
              </button>

              {/* Trust note */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                <ShieldCheck size={12} className="text-neutral-400 flex-shrink-0" />
                <p className="text-[11px] text-neutral-400 text-center leading-snug">
                  No pagas en esta pantalla. Coordinas con nosotros por WhatsApp.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
