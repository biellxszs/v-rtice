import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { properties, type Property } from '../data/properties'
import { PropertyCard } from './PropertyCard'

export type CatalogProps = {
  category: string
  region: string
  onCategory: (value: string) => void
  onRegion: (value: string) => void
  onOpen: (property: Property) => void
}

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export function Catalog({ category, region, onCategory, onRegion, onOpen }: CatalogProps) {
  const [query, setQuery] = useState('')
  const [purpose, setPurpose] = useState('')
  const [price, setPrice] = useState('')
  const [bedrooms, setBedrooms] = useState('')

  const filtered = useMemo(() => properties.filter((property) => {
    const matchQuery = normalize(`${property.name} ${property.location}`).includes(normalize(query))
    const matchPrice = !price || (price === 'entry' && property.price <= 8000000) || (price === 'mid' && property.price > 8000000 && property.price <= 12000000) || (price === 'high' && property.price > 12000000)
    return matchQuery && (!purpose || property.purpose === purpose) && (!category || property.category === category) && (!region || property.region === region) && matchPrice && (!bedrooms || property.bedrooms >= Number(bedrooms))
  }), [query, purpose, category, region, price, bedrooms])

  const reset = () => { setQuery(''); setPurpose(''); setPrice(''); setBedrooms(''); onCategory(''); onRegion('') }
  const hasFilters = query || purpose || category || region || price || bedrooms

  return (
    <section className="catalog section-shell" id="imoveis" aria-labelledby="catalog-title">
      <div className="section-heading reveal">
        <p className="eyebrow">ACERVO SELECIONADO</p>
        <h2 id="catalog-title">Espaços com<br /><em>identidade própria.</em></h2>
        <p>Uma seleção conceitual de propriedades onde arquitetura, matéria e paisagem ocupam o mesmo plano.</p>
      </div>
      <div className="filter-bar reveal" aria-label="Filtros de imóveis">
        <label className="search-field"><span className="sr-only">Buscar por nome ou localização</span><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar nome ou localização" /></label>
        <label><span>Finalidade</span><select value={purpose} onChange={(e) => setPurpose(e.target.value)}><option value="">Todas</option><option>Venda</option><option>Locação</option></select></label>
        <label><span>Categoria</span><select value={category} onChange={(e) => onCategory(e.target.value)}><option value="">Todas</option>{[...new Set(properties.map((p) => p.category))].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Região</span><select value={region} onChange={(e) => onRegion(e.target.value)}><option value="">Todas</option>{[...new Set(properties.map((p) => p.region))].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Valor</span><select value={price} onChange={(e) => setPrice(e.target.value)}><option value="">Qualquer valor</option><option value="entry">Até R$ 8 mi</option><option value="mid">R$ 8 mi — R$ 12 mi</option><option value="high">Acima de R$ 12 mi</option></select></label>
        <label><span>Dormitórios</span><select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}><option value="">Qualquer</option><option value="3">3 ou mais</option><option value="4">4 ou mais</option><option value="5">5 ou mais</option></select></label>
      </div>
      <div className="catalog-status" aria-live="polite">
        <span><SlidersHorizontal size={15} /> {filtered.length} {filtered.length === 1 ? 'propriedade' : 'propriedades'}</span>
        {hasFilters && <button type="button" onClick={reset}>Limpar filtros <X size={14} /></button>}
      </div>
      {filtered.length ? <div className="property-grid">{filtered.map((property, index) => <PropertyCard key={property.id} property={property} index={index} onOpen={onOpen} />)}</div> : (
        <div className="empty-state"><h3>Nenhum espaço neste recorte.</h3><p>Amplie os filtros para descobrir outras propriedades do acervo demonstrativo.</p><button className="outline-button" type="button" onClick={reset}>Ver todos os imóveis</button></div>
      )}
    </section>
  )
}
