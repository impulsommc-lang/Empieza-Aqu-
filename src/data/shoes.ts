export interface Shoe {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  type: 'Estiletos' | 'Sandalias bajas' | 'Botas' | 'Balerinas' | 'Plataforma';
  color: string;
  material: string;
  heelHeight: string;
  sizesAvailable: number[];
  description: string;
  images: string[];
  isAvailable: boolean;
  tags: string[];
  badge?: string;
}

export const shoes: Shoe[] = [
  {
    id: '1',
    sku: 'ST-001',
    name: 'Estileto Clásico Noir',
    slug: 'estileto-clasico-noir',
    price: 350,
    type: 'Estiletos',
    color: 'Negro',
    material: 'Cuero',
    heelHeight: '10 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
    description: 'La definición de elegancia atemporal. Un diseño que alarga la silueta y aporta una seguridad inquebrantable a cada paso.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop'
    ],
    isAvailable: true,
    tags: ['Elegante', 'Noche', 'Clásico'],
    badge: 'Bestseller'
  },
  {
    id: '2',
    sku: 'SD-014',
    name: 'Sandalia Baja Minimalista',
    slug: 'sandalia-baja-minimalista',
    price: 280,
    type: 'Sandalias bajas',
    color: 'Nude',
    material: 'Gamuza',
    heelHeight: 'Plana',
    sizesAvailable: [36, 37, 38],
    description: 'Líneas puras y comodidad absoluta. El complemento perfecto para un look de día sofisticado y sin esfuerzo.',
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=800&auto=format&fit=crop'
    ],
    isAvailable: true,
    tags: ['Día', 'Minimalista', 'Casual'],
    badge: 'Favorito de clientas'
  },
  {
    id: '3',
    sku: 'BT-021',
    name: 'Bota Alta de Cuero',
    slug: 'bota-alta-cuero',
    price: 550,
    type: 'Botas',
    color: 'Negro',
    material: 'Cuero',
    heelHeight: '5 cm',
    sizesAvailable: [37, 38, 39],
    description: 'Estructura impecable y presencia imponente. Diseñadas para dominar la temporada con estilo y carácter.',
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop'
    ],
    isAvailable: false,
    tags: ['Invierno', 'Elegante', 'Premium']
  },
  {
    id: '4',
    sku: 'BL-004',
    name: 'Balerina Clásica Beige',
    slug: 'balerina-clasica-beige',
    price: 290,
    type: 'Balerinas',
    color: 'Beige',
    material: 'Cuero',
    heelHeight: '1 cm',
    sizesAvailable: [36, 37, 38, 39],
    description: 'La gracia y delicadeza en su máxima expresión. Un básico indispensable que eleva cualquier conjunto casual.',
    images: [
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop'
    ],
    isAvailable: false,
    tags: ['Oficina', 'Clásico', 'Cómodo']
  },
  {
    id: '5',
    sku: 'PL-005',
    name: 'Sandalia Plataforma Yute',
    slug: 'sandalia-plataforma-yute',
    price: 320,
    type: 'Plataforma',
    color: 'Blanco',
    material: 'Tela y Yute',
    heelHeight: '8 cm',
    sizesAvailable: [36, 37, 38, 39],
    description: 'Altura y comodidad en perfecta armonía. El toque de distinción para tus escapadas de fin de semana.',
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800&auto=format&fit=crop'
    ],
    isAvailable: false,
    tags: ['Verano', 'Playa', 'Casual']
  },
  {
    id: '6',
    sku: 'ST-002',
    name: 'Estileto Rojo Carmesí',
    slug: 'estileto-rojo-carmesi',
    price: 380,
    type: 'Estiletos',
    color: 'Rojo',
    material: 'Gamuza',
    heelHeight: '9 cm',
    sizesAvailable: [35, 36, 37, 38],
    description: 'Audacia y sofisticación. Un par diseñado para ser el centro de todas las miradas.',
    images: [
      'https://images.unsplash.com/photo-1568306360432-5201460391db?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568306360432-5201460391db?q=80&w=800&auto=format&fit=crop'
    ],
    isAvailable: true,
    tags: ['Audaz', 'Noche', 'Elegante'],
    badge: 'Nuevo'
  }
];
