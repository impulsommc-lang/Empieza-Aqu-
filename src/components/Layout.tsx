import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openCart, cartCount } = useCart();

  const isCheckout = location.pathname === '/checkout';

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Colección', path: '/zapatos' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' },
  ];

  if (isCheckout) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F0] font-sans text-neutral-900">
        <main className="flex-grow">{children}</main>
        <CartDrawer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F0] font-sans text-neutral-900">
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-white text-xs py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-4 tracking-wider uppercase">
              Envíos a todo el país | Atención personalizada por WhatsApp
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F5F0]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-neutral-900 hover:text-neutral-600 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link to="/" className="text-2xl font-serif tracking-tighter uppercase font-bold text-neutral-900">
                AMIRAH<span className="text-[#D4A373]">.</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-wide uppercase transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-neutral-900 font-medium border-b-2 border-neutral-900 pb-1'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-2 text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
              >
                <MessageCircle size={16} />
                <span>Asesoría</span>
              </a>
              <button onClick={openCart} className="text-neutral-900 hover:text-neutral-600 relative">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4A373] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#F5F5F0] border-b border-neutral-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-3 py-4 text-base font-medium text-neutral-900 border-b border-neutral-200 uppercase tracking-wider"
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center space-x-2 w-full bg-[#25D366] text-white px-4 py-3 rounded-md font-medium"
                >
                  <MessageCircle size={20} />
                  <span>Comprar por WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="text-2xl font-serif tracking-tighter uppercase font-bold text-white mb-6 block">
                AMIRAH<span className="text-[#D4A373]">.</span>
              </Link>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Zapatos de mujer que combinan elegancia, estilo y comodidad para cada ocasión.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Colección</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><Link to="/zapatos?tipo=Tacones" className="hover:text-white transition-colors">Tacones</Link></li>
                <li><Link to="/zapatos?tipo=Sandalias" className="hover:text-white transition-colors">Sandalias</Link></li>
                <li><Link to="/zapatos?tipo=Botas" className="hover:text-white transition-colors">Botas y Botines</Link></li>
                <li><Link to="/zapatos?tipo=Zapatillas" className="hover:text-white transition-colors">Zapatillas</Link></li>
                <li><Link to="/zapatos" className="hover:text-white transition-colors">Ver todo</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Atención al Cliente</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
                <li><Link to="/nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contacto</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex items-start space-x-3">
                  <MessageCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <span>+51 960 873 225</span>
                </li>
                <li>Lunes a Sábado: 9am - 8pm</li>
                <li>Lima, Perú</li>
              </ul>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center space-x-2 bg-white text-neutral-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                <MessageCircle size={16} />
                <span>Escríbenos</span>
              </a>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
            <p>&copy; {new Date().getFullYear()} AMIRAH. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] hover:scale-105 transition-all duration-300 flex items-center justify-center"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
