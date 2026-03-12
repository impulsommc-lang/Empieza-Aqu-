export interface Shoe {
  id: string;
  sku: string;
  name: string;
  slug: string;
  price: number;
  type: 'Estiletos' | 'Sandalias bajas' | 'Sandalias de vestir';
  color: string;
  material: string;
  heelHeight: string;
  sizesAvailable: number[];
  soldOutSizes?: number[];
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
    name: 'Estileto Doble Tira',
    slug: 'estileto-doble-tira',
    price: 99.90,
    type: 'Estiletos',
    color: 'Crema / Negro',
    material: 'Cuero',
    heelHeight: '4 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
    soldOutSizes: [37],
    description: 'Mule de punta fina con doble tira de charol negro y taco bloque bajo. Elegancia discreta para el día a día.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto%20porttada1.png-jBFGzBp3VYqIKYqNLCbwa9i2vP79Uw.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto%202.png-Dc1DARZsqVW9boIqgupC0pg5sUoPTA.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto2%20portada.png-rqIUGtMz7I5hnEzeqC1fgHsyfldOWP.jpeg'
    ],
    isAvailable: true,
    tags: ['Elegante', 'Día', 'Clásico'],
    badge: 'Bestseller'
  },
  {
    id: '4',
    sku: 'ST-002',
    name: 'Estileto Cruzado',
    slug: 'estileto-cruzado',
    price: 99.90,
    type: 'Estiletos',
    color: 'Crema',
    material: 'Charol',
    heelHeight: '4 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
    soldOutSizes: [37],
    description: 'Slingback de punta fina con múltiples tiras cruzadas y hebillas plateadas. Un diseño estructurado que combina modernidad y feminidad.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto%202.2.png-XmCdQHzucR2hDZ1xL6BWXzY8kV7Xh0.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto%203.3.png-gSOOsVeQkNjvTLjjYz0M3g2qVhvQ6Y.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/estileto%203-ztEBUQfO2FBXZwIGzAxfGYCegEKqAm.jpeg'
    ],
    isAvailable: true,
    tags: ['Elegante', 'Noche', 'Moderno'],
    badge: 'Nuevo'
  },
  {
    id: '2',
    sku: 'SD-001',
    name: 'Sandalia Blanca Cruzada',
    slug: 'sandalia-blanca-cruzada',
    price: 99.90,
    type: 'Sandalias bajas',
    color: 'Blanco / Negro',
    material: 'Cuero',
    heelHeight: 'Plana',
    sizesAvailable: [35, 36, 37, 38, 39],
    description: 'Mule plana de punta cuadrada en blanco con tiras cruzadas en negro. Fresca, cómoda y perfecta para cualquier look de verano.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sandalias%20portada.png-aMIKE3lJv9UmLAIovjsPkY3HCeywHs.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandalias%201-ht9pYCrYQNTUcJp42H8xoLbEcOwFw0.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandalias%202-52wsZqTi7aqIfv8RdTTyrPjKXA0fec.jpeg'
    ],
    isAvailable: true,
    tags: ['Día', 'Verano', 'Casual'],
    badge: 'Favorito de clientas'
  },
  {
    id: '5',
    sku: 'SD-002',
    name: 'Sandalia Denim Baja',
    slug: 'sandalia-denim-baja',
    price: 99.90,
    type: 'Sandalias bajas',
    color: 'Azul / Crema',
    material: 'Denim',
    heelHeight: 'Plana',
    sizesAvailable: [35, 36, 37, 38, 39],
    soldOutSizes: [35],
    description: 'Mule abierta de denim celeste con tira en V de cuero crema. Fresca y sofisticada, ideal para la temporada cálida.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sand.modelo2%20portada.png-MabSIIgItDeTYtpVIhIUwgeQtC0UPh.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sanda%20modelo%202%20.2.png-lK5hga42LE0s5hHQJ1jCPsNe13zoWW.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sanda%20modelo%202.3-kGTeTqPHyh1uZPFTHFUUxq099KRRL0.jpeg'
    ],
    isAvailable: true,
    tags: ['Día', 'Verano', 'Casual'],
    badge: 'Nuevo'
  },
  {
    id: '3',
    sku: 'SV-001',
    name: 'Charlotte Jeans Celeste',
    slug: 'charlotte-jeans-celeste',
    price: 190,
    type: 'Sandalias de vestir',
    color: 'Azul celeste',
    material: 'Denim',
    heelHeight: '9 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
    description: 'Sandalia slingback de taco aguja en denim celeste con gran lazo en el empeine. Edición limitada, hecha a mano con materiales seleccionados.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_3yl1463yl1463yl1.png-uBnWczAR9IAbOUkCWEkUdLgQcMmlTG.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandaliasde%20vestir.png-G4RWxFJZp9xravgugRhjXOdlsUHR0r.jpeg'
    ],
    isAvailable: false,
    tags: ['Noche', 'Elegante', 'Edición limitada'],
    badge: 'Bajo pedido'
  },
  {
    id: '6',
    sku: 'SV-002',
    name: 'Sandalia Plateada Espiral',
    slug: 'sandalia-plateada-espiral',
    price: 190,
    type: 'Sandalias de vestir',
    color: 'Plateado',
    material: 'Cuero colombiano',
    heelHeight: '7 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
    description: 'Sandalia de taco bloque plateado con tiras de strass en espiral que envuelven el tobillo. Cuero colombiano, suela noeli grabado antideslizante, forro y plantilla de polibadana.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandalia%20de%20vestir%202.png-F7Rwm7RUoBzWEIIqTaodTHtX9pj6l7.jpeg'
    ],
    isAvailable: false,
    tags: ['Noche', 'Elegante', 'Fiesta'],
    badge: 'Bajo pedido'
  },
  {
    id: '7',
    sku: 'SV-003',
    name: 'Mule Croco Negra',
    slug: 'mule-croco-negra',
    price: 190,
    type: 'Sandalias de vestir',
    color: 'Negro',
    material: 'Cuero grabado crocco',
    heelHeight: '6 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
    description: 'Mule de punta cuadrada en cuero grabado negro con taco escultórico de silueta curva. Un diseño sofisticado y atemporal para ocasiones especiales.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandalia%20de%20vestir%201.png-mU6gEc4dHsvP4PeFZfpkxfDHG1wOAW.jpeg'
    ],
    isAvailable: false,
    tags: ['Noche', 'Elegante', 'Clásico'],
    badge: 'Bajo pedido'
  },
];
