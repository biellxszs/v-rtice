import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import type { Property } from '../data/properties'

export function PropertyModal({ property, onClose, onSchedule }: { property: Property; onClose: () => void; onSchedule: (property: Property) => void }) {
  const [slide, setSlide] = useState(0)
  const [touchX, setTouchX] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const next = () => setSlide((slide + 1) % property.gallery.length)
  const previous = () => setSlide((slide - 1 + property.gallery.length) % property.gallery.length)

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setSlide((value) => (value + 1) % property.gallery.length)
      if (event.key === 'ArrowLeft') setSlide((value) => (value - 1 + property.gallery.length) % property.gallery.length)
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = oldOverflow
      window.removeEventListener('keydown', onKey)
      previousFocus.current?.focus()
    }
  }, [onClose, property.gallery.length])

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="property-modal" role="dialog" aria-modal="true" aria-labelledby="property-modal-title" ref={dialogRef}>
        <button className="modal-close" type="button" onClick={onClose} ref={closeRef} aria-label="Fechar detalhes"><X /></button>
        <div className="modal-gallery" onTouchStart={(e) => setTouchX(e.touches[0].clientX)} onTouchEnd={(e) => {
          if (touchX === null) return
          const delta = e.changedTouches[0].clientX - touchX
          if (Math.abs(delta) > 45) {
            if (delta < 0) next()
            else previous()
          }
          setTouchX(null)
        }}>
          {property.gallery.map((image, index) => <img key={image} className={index === slide ? 'active' : ''} src={image} alt={`${property.name}, fotografia ${index + 1}`} />)}
          <div className="gallery-controls">
            <button type="button" onClick={previous} aria-label="Fotografia anterior"><ArrowLeft /></button>
            <span>{String(slide + 1).padStart(2, '0')} / {String(property.gallery.length).padStart(2, '0')}</span>
            <button type="button" onClick={next} aria-label="Próxima fotografia"><ArrowRight /></button>
          </div>
        </div>
        <div className="modal-content">
          <p className="eyebrow">{property.category} · {property.purpose}</p>
          <h2 id="property-modal-title">{property.name}</h2>
          <p className="modal-location">{property.location}</p>
          <p className="modal-description">{property.description}</p>
          <dl className="property-specs">
            <div><dt>Área</dt><dd>{property.area} m²</dd></div>
            <div><dt>Dormitórios</dt><dd>{property.bedrooms}</dd></div>
            <div><dt>Suítes</dt><dd>{property.suites}</dd></div>
            <div><dt>Valor demonstrativo</dt><dd>{property.priceLabel}</dd></div>
          </dl>
          <ul className="feature-list">{property.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          <button className="primary-button" type="button" onClick={() => onSchedule(property)}>Agendar uma visita <ArrowUpRight size={18} /></button>
          <small>Imóvel conceitual. Informações e disponibilidade são demonstrativas.</small>
        </div>
      </div>
    </div>
  )
}
