import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Truck, HeartHandshake, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { shoes } from '@/data/shoes';
import ProductCard from '@/components/ProductCard';
import Testimonials from '@/components/Testimonials';
import DiscountPopup from '@/components/DiscountPopup';

export default function Home() {
  const featuredShoes = shoes.slice(0, 4);

  const categories = [
    { 
      name: 'Estiletos', 
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    { 
      name: 'Sandalias bajas', 
      image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    { 
      name: 'Botas', 
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      available: false
    },
    { 
      name: 'Balerinas', 
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop',
      available: false
    },
    { 
      name: 'Plataforma', 
      image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop',
      available: false
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DiscountPopup />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            poster="https://images.unsplash.com/photo-1515347619362-7164bf45830c?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-woman-walking-in-high-heels-2631/1080p.mp4" type="video/mp4" />
            {/* Fallback image if video fails */}
            <img src="https://images.unsplash.com/photo-1515347619362-7164bf45830c?q=80&w=2000&auto=format&fit=crop" alt="Mujer caminando con estilo" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
          >
            Eleva tu estilo <br className="hidden md:block" />
            <span className="italic font-normal">sin esfuerzo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light tracking-wide drop-shadow-md"
          >
            Siente que tu outfit está completo. Camina con la seguridad y elegancia que te mereces cada día.
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

      {/* Categorías Destacadas */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 mb-6 tracking-tight">
              Nuestras Siluetas
            </h2>
            <p className="text-neutral-500 font-light text-lg leading-relaxed">
              Diseños atemporales creados para realzar tu feminidad. Descubre las piezas que definirán tu estilo esta temporada.
            </p>
          </div>
          <Link
            to="/zapatos"
            className="hidden md:inline-flex items-center text-xs font-medium text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
          >
            Ver todos los estilos <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
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
              <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Nuevos Modelos</h2>
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
              <h3 className="font-medium text-neutral-900 mb-2">Diseños modernos</h3>
              <p className="text-sm text-neutral-500">A la vanguardia de la moda actual</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Selección exclusiva</h3>
              <p className="text-sm text-neutral-500">Materiales de primera calidad</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <HeartHandshake size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Atención personalizada</h3>
              <p className="text-sm text-neutral-500">Asesoría directa por WhatsApp</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#D4A373]">
                <Truck size={28} />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Envíos rápidos</h3>
              <p className="text-sm text-neutral-500">Entregas seguras a todo el país</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Comprar */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Cómo Comprar</h2>
            <div className="w-16 h-0.5 bg-[#D4A373] mx-auto mb-6" />
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Un proceso simple y directo para que tengas tus zapatos favoritos en casa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-neutral-100 -z-10" />
            
            <div className="flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 shadow-md">
                1
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Elige tu modelo</h3>
              <p className="text-neutral-500">Explora nuestro catálogo y selecciona el zapato que más te guste.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-neutral-900 text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 shadow-md">
                2
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Escríbenos</h3>
              <p className="text-neutral-500">Haz clic en el botón de WhatsApp desde la página del producto.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-[#D4A373] text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mb-6 shadow-md">
                3
              </div>
              <h3 className="text-xl font-medium text-neutral-900 mb-3">Confirma y recibe</h3>
              <p className="text-neutral-500">Coordinamos la disponibilidad, el pago y el envío directamente contigo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <Testimonials />

      {/* Preguntas Frecuentes */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-4">Preguntas Frecuentes</h2>
            <div className="w-16 h-0.5 bg-[#D4A373] mx-auto" />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Tienen todas las tallas?</h3>
              <p className="text-neutral-600">Trabajamos con tallas desde la 35 hasta la 40 en la mayoría de nuestros modelos. La disponibilidad exacta se muestra en cada producto y se confirma por WhatsApp.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Realizan envíos?</h3>
              <p className="text-neutral-600">Sí, realizamos envíos a todo el país. El costo de envío es de S/ 15 para Lima y S/ 30 para Provincias. ¡Además, si compras 2 pares o más, el envío es totalmente gratis!</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Cómo puedo comprar?</h3>
              <p className="text-neutral-600">Puedes agregar los productos que desees a tu carrito de compras y luego proceder al checkout. Allí llenarás tus datos de envío y se generará un mensaje automático de WhatsApp para confirmar tu pedido y coordinar el pago.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">¿Qué pasa si un modelo está agotado?</h3>
              <p className="text-neutral-600">Muchos de nuestros modelos pueden solicitarse bajo pedido. Puedes reservar tu par con un adelanto de solo S/ 20 y nosotros lo fabricaremos especialmente para ti. El tiempo estimado de entrega es de 10 a 15 días hábiles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
