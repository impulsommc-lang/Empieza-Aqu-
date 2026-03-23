import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Truck, HeartHandshake, ArrowRight, Lock, RotateCcw, BadgeCheck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { shoes } from '@/data/shoes';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import DiscountPopup from '@/components/DiscountPopup';

export default function Home() {
  const featuredShoes = shoes.slice(0, 4);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — video will show poster until user interacts
      });
    }
  }, []);

  const categories = [
    { 
      name: 'Estiletos', 
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto%20porttada1.png-A6tRhz5zyvIbYOLxzzhFeJxrCfdr7h.jpeg',
      available: true
    },
    { 
      name: 'Sandalias bajas', 
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sand.modelo2%20portada.png-wlLjBmRJV8rXaOwnAPE7MQl39FbNam.jpeg',
      available: true
    },
    { 
      name: 'Sandalias de vestir', 
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_3yl1463yl1463yl1.png-uBnWczAR9IAbOUkCWEkUdLgQcMmlTG.jpeg',
      available: true
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DiscountPopup />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          >
            <source src="/bubcle.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6 leading-tight tracking-tight drop-shadow-lg text-balance"
          >
            El par que te hace <br className="hidden md:block" />
            <span className="italic font-normal">sentir irresistible</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light tracking-wide drop-shadow-md text-balance"
          >
            Zapatos que combinan con todo, duran mas y elevan cualquier look. Ediciones limitadas para mujeres que saben lo que quieren.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              to="/zapatos"
              className="w-full sm:w-auto px-10 py-4 bg-white/90 backdrop-blur-sm text-neutral-900 font-medium uppercase tracking-widest text-xs hover:bg-white transition-all duration-300"
            >
              Explorar Colección
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-3 bg-neutral-900 text-white overflow-hidden">
        <div className="flex items-center gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
          {[
            'Mas de 500 clientas felices en Peru',
            'Envio a todo el pais',
            'Primer cambio de talla GRATIS',
            'Pago seguro por WhatsApp',
            'Ediciones limitadas — stocks reducidos',
            'Mas de 500 clientas felices en Peru',
            'Envio a todo el pais',
            'Primer cambio de talla GRATIS',
            'Pago seguro por WhatsApp',
            'Ediciones limitadas — stocks reducidos',
          ].map((text, i) => (
            <span key={i} className="text-xs uppercase tracking-widest font-light flex items-center gap-4">
              {text} <span className="text-[#D4A373]">&#9679;</span>
            </span>
          ))}
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 mb-6 tracking-tight text-balance">
              Disena tu presencia
            </h2>
            <p className="text-neutral-500 font-light text-lg leading-relaxed">
              Cada silueta esta pensada para una mujer que quiere verse increible sin complicarse. Elige el estilo que habla por ti.
            </p>
          </div>
          <Link
            to="/zapatos"
            className="hidden md:inline-flex items-center text-xs font-medium text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
          >
            Ver todos los estilos <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group flex flex-col"
            >
              <Link
                to={`/zapatos?tipo=${category.name}`}
                className="block relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {!category.available && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-500">
                    <span className="bg-white text-neutral-900 text-xs font-medium px-4 py-2 uppercase tracking-widest shadow-sm">
                      Bajo Pedido
                    </span>
                  </div>
                )}
              </Link>
              <div className="text-center">
                <h3 className="text-neutral-900 font-serif text-xl mb-2">{category.name}</h3>
                {!category.available && (
                  <p className="text-neutral-400 text-xs uppercase tracking-widest">Bajo Pedido</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
          <Link
            to="/zapatos"
            className="inline-flex items-center text-xs font-medium text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1"
          >
            Ver todos los estilos
          </Link>
        </div>
      </section>

      {/* Nuevos Modelos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4 text-balance">Lo que todas quieren</h2>
              <div className="w-16 h-0.5 bg-[#D4A373]" />
            </div>
            <Link
              to="/zapatos"
              className="hidden md:flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wider"
            >
              Ver todos <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredShoes.map((shoe) => (
              <ProductCard key={shoe.id} shoe={shoe} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/zapatos"
              className="inline-flex items-center text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-1 uppercase tracking-wider"
            >
              Ver todos los modelos
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 bg-[#F5F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <Star size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Modelos que no ves en otro lado</h3>
              <p className="text-sm text-neutral-500">Ediciones limitadas, pensadas para destacar</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <Lock size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Compra 100% segura</h3>
              <p className="text-sm text-neutral-500">Coordinas directo con nosotras. Sin apps, sin riesgo</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <RotateCcw size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Primer cambio GRATIS</h3>
              <p className="text-sm text-neutral-500">Si la talla no es la correcta, lo cambiamos sin costo</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <Truck size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Envio a todo el Peru</h3>
              <p className="text-sm text-neutral-500">Lima y provincias. Gratis comprando 2 pares o mas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Comprar */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Tan facil como elegir tu talla</h2>
              <div className="w-16 h-0.5 bg-[#D4A373] mx-auto mb-6" />
              <p className="text-neutral-500 max-w-2xl mx-auto">
                Sin complicaciones. Sin apps. Sin sorpresas. Solo tu par favorito llegando a tu puerta.
              </p>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-neutral-100 -z-10" />
            
            <div className="flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 shadow-md">
                1
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Elige tu modelo favorito</h3>
              <p className="text-neutral-500">Explora el catalogo, revisa los detalles y elige la talla que mas te favorece.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 shadow-md">
                2
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Haz tu pedido en segundos</h3>
              <p className="text-neutral-500">Haz clic en "Comprar Ahora", completa tus datos y te llegara un mensaje directo por WhatsApp.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-[#D4A373] text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 shadow-md">
                3
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Recibe y luce tus AMIRAH</h3>
              <p className="text-neutral-500">Coordinamos el pago y el envio. Tu par llega embalado con cuidado, listo para usarse.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <Testimonials />

      {/* Risk reversal strip */}
      <section className="py-12 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <BadgeCheck size={28} className="text-[#D4A373]" />
              <p className="text-sm font-medium uppercase tracking-widest">Primer cambio de talla gratis</p>
              <p className="text-xs text-neutral-400">Sin costos escondidos, sin burocracia</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Lock size={28} className="text-[#D4A373]" />
              <p className="text-sm font-medium uppercase tracking-widest">No pagas nada hasta confirmar</p>
              <p className="text-xs text-neutral-400">Coordinas todo por WhatsApp antes de pagar</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <HeartHandshake size={28} className="text-[#D4A373]" />
              <p className="text-sm font-medium uppercase tracking-widest">Atencion humana, siempre</p>
              <p className="text-xs text-neutral-400">Una persona real responde tus dudas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Resolvemos tus dudas</h2>
            <div className="w-16 h-0.5 bg-[#D4A373] mx-auto" />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Las tallas son exactas o debo pedir una mas grande?</h3>
              <p className="text-neutral-600">Nuestros modelos calzan a talla exacta. Si estas entre dos tallas, te recomendamos la mas grande. Puedes escribirnos por WhatsApp y te asesoramos segun el modelo que hayas elegido.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Llegan a mi ciudad?</h3>
              <p className="text-neutral-600">Si, enviamos a todo el Peru. Costo de envio: S/ 15 Lima, S/ 30 Provincias. Si llevas 2 pares o mas, el envio es completamente gratis. Trabajamos con courier confiable con seguimiento.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Puedo pagar contra entrega?</h3>
              <p className="text-neutral-600">Si. Ofrecemos pago contra entrega, Yape/Plin y transferencia bancaria. Tu eliges como te resulta mas comodo. No pagas nada hasta que confirmemos tu pedido juntas.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Que pasa si el modelo que quiero dice "Bajo pedido"?</h3>
              <p className="text-neutral-600">Puedes reservarlo con un adelanto de S/ 20 y lo fabricamos especialmente para ti en 10 a 15 dias habiles. Es la unica forma de conseguir esos modelos exclusivos que no encontraras en ningun otro lugar.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
