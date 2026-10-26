import { ArrowDown, ArrowUpRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img className="hero-image" src="/images/vertice-hero.webp" alt="" fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-kicker">CURADORIA DE ESPAÇOS SINGULARES</p>
        <h1 id="hero-title">O extraordinário<br /><em>tem um endereço.</em></h1>
      </div>
      <div className="hero-side">
        <p>Arquitetura autoral, localizações raras e uma nova forma de descobrir o lugar onde a vida acontece.</p>
        <a className="text-link light" href="#imoveis">Explorar imóveis <ArrowUpRight size={18} /></a>
      </div>
      <div className="hero-word" aria-hidden="true">VÉRTICE</div>
      <a className="scroll-cue" href="#sobre" aria-label="Rolar para conhecer a Vértice"><ArrowDown size={16} /><span>DESCUBRA</span></a>
      <p className="hero-caption">Casa Horizonte · Acervo conceitual</p>
    </section>
  )
}
