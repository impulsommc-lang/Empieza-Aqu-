import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Instagram, Facebook } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import CheckoutModal from './CheckoutModal';
import SocialProofNotification from './SocialProofNotification';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  useCart(); // keep context alive

  const isCheckout = location.pathname === '/checkout';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isCheckout) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F0] font-sans text-neutral-900">
        <main className="flex-grow">{children}</main>
        <CheckoutModal />
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

      {/* Header — ultra minimal sticky glassmorphism */}
      <header className="sticky top-0 z-50 bg-[#F5F5F0]/80 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            {/* Logo — centered */}
            <Link to="/" className="text-2xl font-serif tracking-tighter uppercase font-bold text-neutral-900">
              AMIRAH<span className="text-[#D4A373]">.</span>
            </Link>
          </div>
        </div>
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

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Social Proof Notification */}
      <SocialProofNotification />
    </div>
  );
}
