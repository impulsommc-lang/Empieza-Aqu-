import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { shoes, Shoe } from '@/data/shoes';
import ProductCard from '@/components/ProductCard';

export default function Catalog() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('tipo') || '';

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recientes');

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedType) params.set('tipo', selectedType);
    if (selectedSize) params.set('talla', selectedSize.toString());
    if (selectedColor) params.set('color', selectedColor);
    if (sortBy !== 'recientes') params.set('orden', sortBy);
    
    navigate({ search: params.toString() }, { replace: true });
  }, [selectedType, selectedSize, selectedColor, sortBy, navigate]);

  // Sync state with URL on mount or URL change (e.g. back button)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedType(params.get('tipo') || '');
    setSelectedSize(params.get('talla') ? parseInt(params.get('talla')!) : null);
    setSelectedColor(params.get('color') || '');
    setSortBy(params.get('orden') || 'recientes');
  }, [location.search]);

  // Extract unique values for filters
  const types = Array.from(new Set(shoes.map(s => s.type)));
  const sizes = Array.from(new Set(shoes.flatMap(s => s.sizesAvailable)) as Set<number>).sort((a, b) => a - b);
  const colors = Array.from(new Set(shoes.map(s => s.color)));

  // Filter and sort logic
  const filteredShoes = useMemo(() => {
    let result = [...shoes];

    if (selectedType) {
      result = result.filter(s => s.type === selectedType);
    }
    if (selectedSize) {
      result = result.filter(s => s.sizesAvailable.includes(selectedSize));
    }
    if (selectedColor) {
      result = result.filter(s => s.color === selectedColor);
    }

    switch (sortBy) {
      case 'precio-menor':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'precio-mayor':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'recientes':
      default:
        // Assuming the array order is chronological for 'recientes'
        break;
    }

    return result;
  }, [selectedType, selectedSize, selectedColor, sortBy]);

  const clearFilters = () => {
    setSelectedType('');
    setSelectedSize(null);
    setSelectedColor('');
    setSortBy('recientes');
  };

  const activeFilterCount = [selectedType, selectedSize, selectedColor].filter(Boolean).length;

  return (
    <div className="bg-[#F5F5F0] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
            Nuestra Colección
          </h1>
          <div className="w-16 h-0.5 bg-[#D4A373] mx-auto mb-6" />
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Explora nuestra selección completa de zapatos diseñados para destacar tu estilo.
          </p>
        </div>

        {/* Mobile Filter Toggle & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden w-full sm:w-auto flex items-center justify-center space-x-2 bg-white px-6 py-3 rounded-full shadow-sm border border-neutral-200 text-neutral-900 font-medium"
          >
            <Filter size={18} />
            <span>Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <span className="text-sm text-neutral-500 hidden sm:inline-block">Ordenar por:</span>
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white border border-neutral-200 text-neutral-900 text-sm rounded-full px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="recientes">Más recientes</option>
                <option value="precio-menor">Precio: Menor a Mayor</option>
                <option value="precio-mayor">Precio: Mayor a Menor</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`
            lg:w-1/4 flex-shrink-0 
            ${isFilterOpen ? 'block' : 'hidden lg:block'}
          `}>
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-28">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-neutral-900 flex items-center">
                  <Filter size={18} className="mr-2" /> Filtros
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-neutral-500 hover:text-neutral-900 underline"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden text-neutral-500 hover:text-neutral-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tipo */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">Tipo de Zapato</h3>
                <div className="space-y-3">
                  {types.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 mr-3 border rounded border-neutral-300 group-hover:border-neutral-900 transition-colors">
                        <input
                          type="checkbox"
                          className="absolute opacity-0 w-full h-full cursor-pointer"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(selectedType === type ? '' : type)}
                        />
                        {selectedType === type && (
                          <div className="w-3 h-3 bg-neutral-900 rounded-sm" />
                        )}
                      </div>
                      <span className={`text-sm ${selectedType === type ? 'text-neutral-900 font-medium' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Talla */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">Talla</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={`
                        w-10 h-10 rounded-full text-sm font-medium transition-all duration-200
                        ${selectedSize === size 
                          ? 'bg-neutral-900 text-white shadow-md' 
                          : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                        ${selectedColor === color 
                          ? 'bg-neutral-900 text-white shadow-md' 
                          : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                        }
                      `}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 text-sm text-neutral-500">
              Mostrando {filteredShoes.length} {filteredShoes.length === 1 ? 'producto' : 'productos'}
            </div>

            {filteredShoes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredShoes.map((shoe, index) => (
                  <motion.div
                    key={shoe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <ProductCard shoe={shoe} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                  <Filter size={24} />
                </div>
                <h3 className="text-xl font-medium text-neutral-900 mb-2">No se encontraron productos</h3>
                <p className="text-neutral-500 mb-6">
                  Intenta ajustar o eliminar algunos filtros para ver más resultados.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
