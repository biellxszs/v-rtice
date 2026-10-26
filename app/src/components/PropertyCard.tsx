import { ArrowUpRight } from 'lucide-react'
import type { Property } from '../data/properties'

export function PropertyCard({ property, index, onOpen }: { property: Property; index: number; onOpen: (property: Property) => void }) {
  return (
    <article className={`property-card property-card-${index % 6}`}>
      <button className="property-image" type="button" onClick={() => onOpen(property)} aria-label={`Ver detalhes de ${property.name}`}>
        <img src={property.image} alt={`Arquitetura de ${property.name}`} loading="lazy" />
        <span className="property-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="property-open"><ArrowUpRight /></span>
      </button>
      <div className="property-info">
        <div>
          <p className="property-meta">{property.category} · {property.purpose}</p>
          <h3><button type="button" onClick={() => onOpen(property)}>{property.name}</button></h3>
          <p className="property-location">{property.location}</p>
        </div>
        <div className="property-numbers">
          <p>{property.priceLabel}</p>
          <span>{property.bedrooms} dorm. · {property.suites} suítes · {property.area} m²</span>
        </div>
      </div>
    </article>
  )
}
