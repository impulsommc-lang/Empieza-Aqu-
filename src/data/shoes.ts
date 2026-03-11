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
    price: 350,
    type: 'Estiletos',
    color: 'Crema / Negro',
    material: 'Cuero',
    heelHeight: '4 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
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
    price: 370,
    type: 'Estiletos',
    color: 'Crema',
    material: 'Charol',
    heelHeight: '4 cm',
    sizesAvailable: [35, 36, 37, 38, 39],
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
    name: 'Sandalia Baja Denim',
    slug: 'sandalia-baja-denim',
    price: 280,
    type: 'Sandalias bajas',
    color: 'Azul / Crema',
    material: 'Denim',
    heelHeight: 'Plana',
    sizesAvailable: [35, 36, 37, 38, 39],
    description: 'Mule abierta de denim celeste con tira en V de cuero crema. Fresca y sofisticada, ideal para la temporada cálida.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sand.modelo2%20portada.png-wlLjBmRJV8rXaOwnAPE7MQl39FbNam.jpeg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sand.modelo2%20portada.png-wlLjBmRJV8rXaOwnAPE7MQl39FbNam.jpeg'
    ],
    isAvailable: true,
    tags: ['Día', 'Verano', 'Casual'],
    badge: 'Favorito de clientas'
  },
  {
    id: '3',
    sku: 'SV-001',
    name: 'Charlotte Jeans Celeste',
    slug: 'charlotte-jeans-celeste',
    price: 380,
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
    isAvailable: true,
    tags: ['Noche', 'Elegante', 'Edición limitada'],
    badge: 'Nuevo'
  },
];
