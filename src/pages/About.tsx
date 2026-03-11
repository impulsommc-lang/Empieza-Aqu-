import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-[#F5F5F0] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            Nuestra Historia
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-0.5 bg-[#D4A373] mx-auto" 
          />
        </div>

        <div className="space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=1000&auto=format&fit=crop" 
                alt="Taller de zapatos" 
                className="rounded-2xl shadow-lg object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Pasión por la moda y el detalle</h2>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                Nacimos con una visión clara: ofrecer calzado que no solo complemente un atuendo, sino que lo eleve. Creemos que cada paso debe darse con confianza, y para ello, la comodidad y el diseño deben ir de la mano.
              </p>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                Nuestra boutique es el resultado de años de búsqueda de la perfección en cada costura, en cada textura y en cada silueta.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row-reverse gap-12 items-center"
          >
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000&auto=format&fit=crop" 
                alt="Selección de zapatos" 
                className="rounded-2xl shadow-lg object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Selección cuidadosa y calidad</h2>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                Cada modelo en nuestro catálogo ha sido rigurosamente seleccionado. Trabajamos con materiales de primera calidad, desde cueros suaves hasta gamuzas delicadas, asegurando durabilidad sin sacrificar la estética.
              </p>
              <p className="text-neutral-600 leading-relaxed font-light text-lg">
                No seguimos tendencias efímeras; curamos colecciones atemporales con toques modernos que perduran temporada tras temporada.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-10 md:p-16 text-center shadow-sm border border-neutral-100"
          >
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Atención personalizada</h2>
            <p className="text-neutral-600 leading-relaxed font-light text-lg max-w-2xl mx-auto">
              Entendemos que comprar zapatos es una experiencia personal. Por eso, hemos optado por un modelo de atención directa vía WhatsApp. Queremos escucharte, asesorarte sobre tallas y calces, y asegurarnos de que el par que elijas sea exactamente lo que necesitas.
            </p>
            <p className="text-neutral-900 font-medium mt-8 text-xl font-serif italic">
              "Tu estilo es único, y nuestra atención también lo es."
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
