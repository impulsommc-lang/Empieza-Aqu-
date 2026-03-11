import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, CreditCard, Banknote, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getWhatsAppLink } from '@/lib/utils';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, cartCount, closeCart, discount } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<'transferencia' | 'yape' | 'otros' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    district: '',
    reference: '',
    region: 'lima', // Added region
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
    message += `*Dirección de Envío:*\n`;
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
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg font-serif font-medium text-neutral-900 mb-6">Dirección de Envío</h2>
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
                    <label htmlFor="firstName" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Nombre</label>
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
                    <label htmlFor="lastName" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Apellidos</label>
                  </div>
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
                  <label htmlFor="address" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Dirección completa</label>
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
                  <label htmlFor="reference" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Referencia (Opcional)</label>
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
                    <label htmlFor="region" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">Región</label>
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

            {/* Payment Method */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg font-serif font-medium text-neutral-900 mb-6">Método de Pago</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'transferencia' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-100 bg-white hover:border-neutral-300'
                  }`}
                >
                  <Banknote size={24} className={`mb-3 ${paymentMethod === 'transferencia' ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span className="text-sm font-medium text-neutral-900 text-center">Transferencia Bancaria</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('yape')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'yape' ? 'border-[#742384] bg-[#742384]/5' : 'border-neutral-100 bg-white hover:border-neutral-300'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mb-3 ${paymentMethod === 'yape' ? 'bg-[#742384]' : 'bg-neutral-400'}`}>
                    <span className="text-white text-xs font-bold">Y</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-900 text-center">Yape / Plin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('otros')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === 'otros' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-100 bg-white hover:border-neutral-300'
                  }`}
                >
                  <CreditCard size={24} className={`mb-3 ${paymentMethod === 'otros' ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span className="text-sm font-medium text-neutral-900 text-center">Otras Tarjetas</span>
                </button>
              </div>
              {!paymentMethod && (
                <p className="text-sm text-neutral-500 mt-4 text-center">Selecciona un método para continuar con el pago.</p>
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

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-neutral-900 text-white py-4 px-8 rounded-xl text-sm font-medium uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                <span>Confirmar por WhatsApp</span>
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
