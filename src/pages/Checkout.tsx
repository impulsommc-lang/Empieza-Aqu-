import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Banknote, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getWhatsAppLink } from '@/lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, cartCount, closeCart, discount } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'yape' | 'contra-entrega' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    reference: '',
    region: 'lima',
  });
  
  const shippingCost = cartCount >= 2 ? 0 : formData.region === 'lima' ? 15 : 30;
  const total = Math.max(0, cartTotal - discount) + shippingCost;

  useEffect(() => {
    window.scrollTo(0, 0);
    closeCart(); // Ensure drawer is closed when on checkout page
    if (items.length === 0) {
      navigate('/zapatos');
    }
  }, [items, navigate, closeCart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `*NUEVO PEDIDO*\n\n`;
    
    message += `*Cliente:* ${formData.firstName} ${formData.lastName}\n`;
    if (formData.phone) message += `*Celular:* ${formData.phone}\n`;
    message += `*Direccion de Envio:*\n`;
    message += `${formData.address}, ${formData.district}, ${formData.city} (${formData.region === 'lima' ? 'Lima' : 'Provincia'})\n`;
    if (formData.reference) message += `Ref: ${formData.reference}\n\n`;
    
    message += `*Resumen del Pedido:*\n`;
    items.forEach(item => {
      message += `- ${item.quantity}x [${item.shoe.sku}] ${item.shoe.name} (Talla: ${item.size}) - S/ ${(item.shoe.price * item.quantity).toFixed(2)}\n`;
      if (!item.shoe.isAvailable) {
        message += `  *(Fabricación bajo pedido)*\n`;
      }
    });

    message += `\n*Subtotal:* S/ ${cartTotal.toFixed(2)}\n`;
    if (discount > 0) {
      message += `*Descuento:* -S/ ${discount.toFixed(2)}\n`;
    }
    message += `*Envío:* ${shippingCost === 0 ? 'Gratis' : `S/ ${shippingCost.toFixed(2)}`}\n`;
    message += `*Total a Pagar:* S/ ${total.toFixed(2)}\n\n`;

    message += `*Método de Pago:* ${paymentMethod?.toUpperCase()}\n`;

    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago.');
      return;
    }
    
    const message = generateWhatsAppMessage();
    window.open(getWhatsAppLink(message), '_blank');
  };

  if (items.length === 0) return null;

  return (
    <div className="bg-[#F5F5F0] min-h-screen pb-20">
      {/* Minimal Header for Checkout */}
      <div className="bg-white border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/zapatos" className="text-neutral-500 hover:text-neutral-900 transition-colors flex items-center text-sm">
            <ArrowLeft size={16} className="mr-2" /> Volver a la tienda
          </Link>
          <Link to="/" className="text-2xl font-serif tracking-tighter uppercase font-bold text-neutral-900">
            AMIRAH<span className="text-[#D4A373]">.</span>
          </Link>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Forms */}
          <div className="lg:w-3/5 space-y-10">
            
            {/* Shipping Info */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg font-serif font-medium text-neutral-900 mb-6">Donde enviamos tus AMIRAH?</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                      placeholder=" "
                    />
                    <label htmlFor="firstName" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Tu nombre</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                      placeholder=" "
                    />
                    <label htmlFor="lastName" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Tus apellidos</label>
                  </div>
                </div>

                {/* Phone with icon */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none z-10">
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block pl-10 pr-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                    placeholder=" "
                  />
                  <label htmlFor="phone" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Tu celular para coordinar</label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                    placeholder=" "
                  />
                  <label htmlFor="address" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Calle, numero y urbanizacion</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                    placeholder=" "
                  />
                  <label htmlFor="reference" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Referencia para el delivery (opcional)</label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <select
                      id="region"
                      name="region"
                      required
                      value={formData.region}
                      onChange={handleInputChange}
                      className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                    >
                      <option value="lima">Lima</option>
                      <option value="provincia">Provincia</option>
                    </select>
                    <label htmlFor="region" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Region</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                      placeholder=" "
                    />
                    <label htmlFor="city" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Ciudad / Provincia</label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="district"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="block px-4 pb-2.5 pt-6 w-full text-sm text-neutral-900 bg-transparent rounded-xl border border-neutral-300 appearance-none focus:outline-none focus:ring-0 focus:border-neutral-900 peer"
                    placeholder=" "
                  />
                  <label htmlFor="district" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Distrito</label>
                </div>
              </div>
            </section>

            {/* Payment Method — Radio Cards */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg font-serif font-medium text-neutral-900 mb-2">Como prefieres pagar?</h2>
              <p className="text-xs text-neutral-400 mb-6">Coordinamos los detalles contigo por WhatsApp.</p>
              <div className="grid grid-cols-1 gap-3">
                {/* Yape / Plin — highlighted */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('yape')}
                  className={`relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    paymentMethod === 'yape'
                      ? 'border-[#742384] bg-[#742384]/5 shadow-sm'
                      : 'border-neutral-100 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'yape' ? 'bg-[#742384]' : 'bg-neutral-100'}`}>
                    <span className={`text-sm font-bold ${paymentMethod === 'yape' ? 'text-white' : 'text-neutral-500'}`}>Y</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">Yape / Plin</p>
                    <p className="text-xs text-neutral-500">Pago instantaneo y seguro</p>
                  </div>
                  {paymentMethod === 'yape' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#742384] rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </button>

                {/* Transferencia */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    paymentMethod === 'transferencia'
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-100 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'transferencia' ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                    <Banknote size={18} className={paymentMethod === 'transferencia' ? 'text-white' : 'text-neutral-500'} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">Transferencia</p>
                    <p className="text-xs text-neutral-500">BCP, Interbank, BBVA</p>
                  </div>
                  {paymentMethod === 'transferencia' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </button>

                {/* Contra entrega */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('contra-entrega')}
                  className={`relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    paymentMethod === 'contra-entrega'
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-100 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'contra-entrega' ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                    <Truck size={18} className={paymentMethod === 'contra-entrega' ? 'text-white' : 'text-neutral-500'} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">Pago Contra Entrega</p>
                    <p className="text-xs text-neutral-500">Pagas cuando recibas tu pedido</p>
                  </div>
                  {paymentMethod === 'contra-entrega' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  )}
                </button>
              </div>
              {!paymentMethod && (
                <p className="text-sm text-neutral-400 mt-4 text-center">Selecciona como quieres pagar.</p>
              )}
            </section>

          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:w-2/5">
            <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg font-serif font-medium text-neutral-900 mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto hide-scrollbar pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0 border border-neutral-200">
                      <img src={item.shoe.images[0]} alt={item.shoe.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow py-1">
                      <h3 className="text-sm font-medium text-neutral-900 uppercase tracking-wide">{item.shoe.name}</h3>
                      <p className="text-xs text-neutral-500 mt-1">Talla: {item.size} | Cant: {item.quantity}</p>
                      <p className="text-xs text-neutral-400 mt-1 font-mono">SKU: {item.shoe.sku}</p>
                      {!item.shoe.isAvailable && (
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">Bajo pedido</p>
                      )}
                    </div>
                    <div className="py-1 text-right">
                      <p className="text-sm font-medium text-neutral-900">S/ {(item.shoe.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-100 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span>S/ {cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Descuento</span>
                    <span>- S/ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Envío {cartCount >= 2 ? '(2+ pares)' : formData.region === 'lima' ? '(Lima)' : '(Provincia)'}</span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-medium">Gratis</span>
                  ) : (
                    <span>S/ {shippingCost.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-neutral-900 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-neutral-900 uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-serif font-medium text-neutral-900">S/ {total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-right">Incluye impuestos</p>
              </div>

              {/* Risk Reversal */}
              <p className="text-xs text-neutral-400 text-center mb-4 px-2">
                No realizas ningun pago ahora. Garantizamos tu talla y coordinamos los detalles de forma segura.
              </p>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-8 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageCircle size={20} />
                <span>Confirmar Pedido por WhatsApp</span>
              </button>

              {/* Trust Signals */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-xs text-neutral-500">
                  <ShieldCheck size={16} className="mr-3 text-neutral-400" />
                  <span>Tus datos están protegidos y encriptados.</span>
                </div>
                <div className="flex items-center text-xs text-neutral-500">
                  <Truck size={16} className="mr-3 text-neutral-400" />
                  <span>Envíos seguros a todo el país.</span>
                </div>
                <div className="flex items-center text-xs text-neutral-500">
                  <RotateCcw size={16} className="mr-3 text-neutral-400" />
                  <span>Cambios y devoluciones fáciles.</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
