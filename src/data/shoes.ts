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
    description: 'El look de oficina que se convierte en salida de noche sin cambiar el par. Tira doble de charol negro con taco bloque bajo: porte, comodidad y esa cuota de sofisticacion que te hace notar desde que entras.',
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
    description: 'Tiras cruzadas y hebillas plateadas que estilizan el empeine y alargan la pierna. Un diseno estructurado que dice "moda" sin decir una sola palabra. Perfecto para la mujer que no quiere pasar desapercibida.',
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
    description: 'La sandalia que resuelve cualquier look: jeans, vestido o falda. Punta cuadrada con tiras cruzadas blancas y negras que combinan con todo lo que ya tienes en el closet. Plana, fresca y comoda de verdad.',
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
    description: 'El denim que se usa en los pies. Tira en V de cuero crema sobre tela denim celeste: una combinacion que poca gente se atreve a usar y que genera miradas donde vayas. Perfecta para el calor peruano.',
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
    description: 'El par que transforma un vestido sencillo en un atuendo de gala. Taco aguja de 9 cm en denim celeste con lazo de autor en el empeine. Hecha a mano, edicion limitada. Solo para quienes saben que los detalles lo cambian todo.',
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
    description: 'El strass que brilla, el cuero colombiano que dura y la suela antideslizante que te da seguridad en cada paso. La sandalia de fiesta que recibe cumplidos antes de que llegues a la pista.',
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
    description: 'Cuero grabado en negro que nunca pasa de moda. Taco escultórico de silueta curva que eleva y estiliza sin sacrificar la postura. El modelo que funciona para una reunion de trabajo, una cena o cualquier ocasion que merezca verse bien.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sandalia%20de%20vestir%201.png-mU6gEc4dHsvP4PeFZfpkxfDHG1wOAW.jpeg'
    ],
    isAvailable: false,
    tags: ['Noche', 'Elegante', 'Clásico'],
    badge: 'Bajo pedido'
  },
];
