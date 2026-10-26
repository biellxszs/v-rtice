export type Property = {
  id: string
  name: string
  location: string
  region: string
  category: string
  purpose: 'Venda' | 'Locação'
  price: number
  priceLabel: string
  bedrooms: number
  suites: number
  area: number
  image: string
  gallery: string[]
  description: string
  features: string[]
}

// Acervo conceitual: todos os imóveis, valores e características são demonstrativos.
export const properties: Property[] = [
  {
    id: 'casa-horizonte', name: 'Casa Horizonte', location: 'Serra da Cantareira, SP', region: 'Serra da Cantareira',
    category: 'Casas', purpose: 'Venda', price: 8900000, priceLabel: 'R$ 8.900.000', bedrooms: 4, suites: 4, area: 680,
    image: '/images/casa-horizonte.webp', gallery: ['/images/casa-horizonte.webp', '/images/interior-luz.webp', '/images/vertice-hero.webp'],
    description: 'Planos horizontais, transparência e uma relação contínua com a paisagem. Uma residência conceitual desenhada para acompanhar o ritmo da luz.',
    features: ['Piscina com borda infinita', 'Living integrado à paisagem', 'Esquadrias do piso ao teto', 'Paisagismo naturalista'],
  },
  {
    id: 'pavilhao-mata', name: 'Pavilhão Mata', location: 'Itatiba, SP', region: 'Itatiba',
    category: 'Residências contemporâneas', purpose: 'Venda', price: 6400000, priceLabel: 'R$ 6.400.000', bedrooms: 3, suites: 3, area: 420,
    image: '/images/pavilhao-mata.webp', gallery: ['/images/pavilhao-mata.webp', '/images/interior-luz.webp', '/images/casa-horizonte.webp'],
    description: 'Um pavilhão de concreto e madeira inserido com discrição na mata. A arquitetura reduz excessos e amplia silêncio, textura e profundidade.',
    features: ['Brises de madeira', 'Espelho d’água', 'Ventilação cruzada', 'Implantação preservada'],
  },
  {
    id: 'cobertura-alameda', name: 'Cobertura Alameda', location: 'Jardins, São Paulo, SP', region: 'Jardins',
    category: 'Coberturas', purpose: 'Venda', price: 12800000, priceLabel: 'R$ 12.800.000', bedrooms: 4, suites: 4, area: 510,
    image: '/images/cobertura-alameda.webp', gallery: ['/images/cobertura-alameda.webp', '/images/apartamento-studio.webp', '/images/interior-luz.webp'],
    description: 'Uma cobertura conceitual onde o horizonte urbano se torna parte do living. Pedra, luz indireta e grandes planos de vidro definem a atmosfera.',
    features: ['Terraço panorâmico', 'Piscina privativa', 'Living com pé-direito duplo', 'Vista permanente'],
  },
  {
    id: 'apartamento-studio', name: 'Apartamento Studio', location: 'Vila Nova Conceição, SP', region: 'Vila Nova Conceição',
    category: 'Apartamentos', purpose: 'Locação', price: 28000, priceLabel: 'R$ 28.000 / mês', bedrooms: 3, suites: 2, area: 240,
    image: '/images/apartamento-studio.webp', gallery: ['/images/apartamento-studio.webp', '/images/interior-luz.webp', '/images/cobertura-alameda.webp'],
    description: 'Luz difusa, mobiliário de desenho brasileiro e uma planta fluida. Um apartamento conceitual de atmosfera serena e materialidade precisa.',
    features: ['Plantas integradas', 'Marcenaria sob medida', 'Cortinas motorizadas', 'Iluminação cênica'],
  },
  {
    id: 'casa-litoral', name: 'Casa Litoral', location: 'Litoral Norte, SP', region: 'Litoral Norte',
    category: 'Casas', purpose: 'Venda', price: 10500000, priceLabel: 'R$ 10.500.000', bedrooms: 5, suites: 5, area: 590,
    image: '/images/casa-litoral.webp', gallery: ['/images/casa-litoral.webp', '/images/vertice-hero.webp', '/images/interior-luz.webp'],
    description: 'Pedra, madeira e o Atlântico no enquadramento. Uma casa conceitual de linhas baixas que acompanha a topografia e o movimento das dunas.',
    features: ['Acesso à praia', 'Deck de madeira', 'Suítes independentes', 'Estar com vista para o mar'],
  },
  {
    id: 'reserva-vista', name: 'Reserva Vista', location: 'Nova Lima, MG', region: 'Nova Lima',
    category: 'Alto padrão', purpose: 'Venda', price: 9700000, priceLabel: 'R$ 9.700.000', bedrooms: 4, suites: 4, area: 720,
    image: '/images/reserva-vista.webp', gallery: ['/images/reserva-vista.webp', '/images/casa-horizonte.webp', '/images/interior-luz.webp'],
    description: 'Volumes de pedra emergem na encosta e enquadram a serra. Uma composição conceitual de escala generosa e presença contida.',
    features: ['Vista para a serra', 'Piscina aquecida', 'Adega subterrânea', 'Espaço wellness'],
  },
]

export const categories = [
  { name: 'Casas', image: '/images/casa-litoral.webp' },
  { name: 'Apartamentos', image: '/images/apartamento-studio.webp' },
  { name: 'Coberturas', image: '/images/cobertura-alameda.webp' },
  { name: 'Residências contemporâneas', image: '/images/pavilhao-mata.webp' },
  { name: 'Alto padrão', image: '/images/reserva-vista.webp' },
]

export const regions = [
  { name: 'Jardins', image: '/images/cobertura-alameda.webp' },
  { name: 'Litoral Norte', image: '/images/casa-litoral.webp' },
  { name: 'Serra da Cantareira', image: '/images/casa-horizonte.webp' },
  { name: 'Nova Lima', image: '/images/reserva-vista.webp' },
]
