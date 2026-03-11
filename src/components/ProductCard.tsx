import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shoe } from '@/data/shoes';

interface ProductCardProps {
  shoe: Shoe;
}

export default function ProductCard({ shoe }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/zapatos/${shoe.slug}`} className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <img
          src={shoe.images[0]}
          alt={shoe.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Hover Image (if available) */}
        {shoe.images[1] && (
          <img
            src={shoe.images[1]}
            alt={`${shoe.name} vista alternativa`}
            className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {shoe.badge && (
            <span className="bg-[#D4A373] text-white text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {shoe.badge}
            </span>
          )}
          {!shoe.isAvailable && (
            <span className="bg-neutral-900 text-white text-xs font-medium px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Bajo Pedido
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/zapatos/${shoe.slug}`} className="flex-grow">
            <h3 className="text-lg font-medium text-neutral-900 leading-tight group-hover:text-[#D4A373] transition-colors">
              {shoe.name}
            </h3>
          </Link>
          <span className="text-lg font-semibold text-neutral-900 ml-4">
            S/ {shoe.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-neutral-500 mb-4">{shoe.color}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {shoe.sizesAvailable.map((size) => (
              <span
                key={size}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 bg-neutral-50"
              >
                {size}
              </span>
            ))}
          </div>
          
          <Link
            to={`/zapatos/${shoe.slug}`}
            className="block w-full text-center bg-neutral-900 text-white py-3 rounded-xl text-sm font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
