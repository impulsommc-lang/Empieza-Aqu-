import { Star } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: 'Valeria M.',
    text: 'Me siento mucho más elegante y segura al caminar. ¡Recibo cumplidos todo el tiempo!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carolina S.',
    text: 'Complementan mis outfits de oficina perfectamente. La calidad es increíble.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Andrea P.',
    text: 'Nunca pensé que unos tacones pudieran ser tan cómodos y a la vez tan sofisticados.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Lucía G.',
    text: 'El diseño es hermoso, elevan cualquier look básico al instante.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Mariana R.',
    text: 'Se nota la exclusividad en cada detalle. Definitivamente mi nueva marca favorita.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl font-serif text-neutral-900 mb-4">Lo que dicen nuestras clientas</h2>
        <p className="text-neutral-500 max-w-2xl mx-auto">
          Descubre cómo nuestros zapatos están elevando el estilo y la confianza de mujeres en todo el país.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient overlays for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        <motion.div
          className="flex space-x-6 px-6"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
          style={{ width: 'max-content' }}
        >
          {/* Duplicate the array to create a seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="w-80 md:w-96 flex-shrink-0 bg-[#F5F5F0] rounded-2xl p-8 border border-neutral-100 shadow-sm"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#D4A373] text-[#D4A373]" />
                ))}
              </div>
              <p className="text-neutral-700 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-serif font-medium mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{testimonial.name}</p>
                  <p className="text-xs text-neutral-500">Clienta Verificada</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
