import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  ['Imóveis', '#imoveis'], ['Categorias', '#categorias'], ['Regiões', '#regioes'], ['Sobre', '#sobre'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <a className="brand" href="#inicio" aria-label="Vértice Imóveis — início" onClick={() => setOpen(false)}>
        <span>VÉRTICE</span><small>IMÓVEIS</small>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="header-cta" href="#contato">Agendar visita <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Navegação mobile">
          {links.map(([label, href], index) => (
            <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
          ))}
          <a href="#contato" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>Agendar visita <ArrowUpRight /></a>
        </nav>
        <p>Arquitetura, território e novas perspectivas.</p>
      </div>
    </header>
  )
}
