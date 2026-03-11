import { motion } from 'motion/react';
import { MessageCircle, MapPin, Clock, Instagram, Mail } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function Contact() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            Contacto
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-0.5 bg-[#D4A373] mx-auto" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-neutral-500 max-w-2xl mx-auto mt-6"
          >
            Estamos aquí para ayudarte. Contáctanos por WhatsApp para una atención rápida y personalizada.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 flex flex-col items-start">
              <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6">
                <MessageCircle size={24} />
              </div>
              <h2 className="text-xl font-medium text-neutral-900 mb-2">Atención por WhatsApp</h2>
              <p className="text-neutral-500 mb-6">La forma más rápida de comunicarte con nosotros. Resolvemos dudas sobre tallas, modelos y envíos.</p>
              <a
                href={getWhatsAppLink("Hola, quisiera hacer una consulta general.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#20bd5a] transition-colors"
              >
                <MessageCircle size={20} />
                <span>Escríbenos ahora</span>
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center text-neutral-900 mb-4">
                  <Clock size={20} className="mr-3 text-[#D4A373]" />
                  <h3 className="font-medium">Horario de Atención</h3>
                </div>
                <ul className="text-sm text-neutral-500 space-y-2">
                  <li>Lunes a Viernes: 9:00 am - 8:00 pm</li>
                  <li>Sábados: 10:00 am - 6:00 pm</li>
                  <li>Domingos: Cerrado</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center text-neutral-900 mb-4">
                  <MapPin size={20} className="mr-3 text-[#D4A373]" />
                  <h3 className="font-medium">Ubicación</h3>
                </div>
                <p className="text-sm text-neutral-500">
                  Lima, Perú<br />
                  (Solo tienda online, envíos a todo el país)
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social & Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div className="relative h-64 md:h-auto md:flex-grow rounded-3xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop" 
                alt="Zapatos elegantes" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-6 sm:mb-0 text-center sm:text-left">
                <h3 className="text-xl font-serif font-bold mb-2">Síguenos en redes</h3>
                <p className="text-neutral-400 text-sm">Descubre nuevos modelos y promociones exclusivas.</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
