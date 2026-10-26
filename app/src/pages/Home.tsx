import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Catalog } from '../components/Catalog'
import { PropertyModal } from '../components/PropertyModal'
import { SceneLoader } from '../components/SceneLoader'
import { Contact } from '../components/Contact'
import { categories, properties, regions, type Property } from '../data/properties'
import { siteConfig } from '../data/config'
import '../App.css'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [selected, setSelected] = useState<Property | null>(null)
  const [interest, setInterest] = useState<Property | null>(null)
  const [category, setCategory] = useState('')
  const [region, setRegion] = useState('')

  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro.from('.hero-media', { clipPath: 'inset(0 0 100% 0)', duration: 1.15 })
          .from('.hero-image', { scale: 1.12, duration: 1.8 }, 0)
          .from('.site-header', { y: -24, opacity: 0, duration: 0.6 }, 0.35)
          .from('.hero-kicker', { y: 20, opacity: 0, duration: 0.55 }, 0.45)
          .from('.hero-copy h1', { y: 55, opacity: 0, duration: 0.85 }, 0.5)
          .from('.hero-side', { x: 30, opacity: 0, duration: 0.7 }, 0.75)
          .from('.hero-word', { yPercent: 65, opacity: 0, duration: 1 }, 0.55)
          .from('.scroll-cue, .hero-caption', { opacity: 0, duration: 0.6 }, 1)

        gsap.to('.hero-image', { yPercent: 10, scale: 1.09, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
        gsap.to('.hero-word', { yPercent: -22, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } })
        gsap.to('.hero-copy', { yPercent: 24, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: '25% top', end: 'bottom top', scrub: true } })

        gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
          gsap.from(element, { y: 56, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
        })
        gsap.utils.toArray<HTMLElement>('.mask-image').forEach((element) => {
          gsap.from(element, { clipPath: 'inset(0 0 100% 0)', duration: 1.15, ease: 'power3.inOut', scrollTrigger: { trigger: element, start: 'top 84%', once: true } })
          const image = element.querySelector('img')
          if (image) gsap.fromTo(image, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.7 } })
        })
        gsap.utils.toArray<HTMLElement>('.property-card').forEach((card, index) => {
          gsap.from(card, { y: 70 + (index % 2) * 25, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', once: true } })
        })
      })
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  useEffect(() => {
    if (category || region) ScrollTrigger.refresh()
  }, [category, region])

  const explore = (type: 'category' | 'region', value: string) => {
    if (type === 'category') { setCategory(value); setRegion('') } else { setRegion(value); setCategory('') }
    document.querySelector('#imoveis')?.scrollIntoView({ behavior: 'smooth' })
  }
  const schedule = (property: Property) => {
    setSelected(null)
    setInterest(property)
    window.setTimeout(() => document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <div className="demo-notice">{siteConfig.demonstrationNotice}</div>

        <section className="about section-shell" id="sobre" aria-labelledby="about-title">
          <div className="about-heading reveal">
            <p className="eyebrow">A VÉRTICE</p>
            <h2 id="about-title">Não procuramos apenas<br />imóveis. Procuramos<br /><em>novas perspectivas.</em></h2>
          </div>
          <div className="about-layout">
            <div className="about-image mask-image"><img src="/images/interior-luz.webp" alt="Living contemporâneo com pedra, madeira e luz natural" loading="lazy" /><span>Matéria · Luz · Proporção</span></div>
            <div className="about-copy reveal">
              <p className="lead">Há casas que ocupam um lugar. E há aquelas que transformam a maneira de senti-lo.</p>
              <p>A Vértice é uma marca conceitual dedicada a espaços de arquitetura marcante. Nosso olhar editorial aproxima forma, território e estilo de vida em uma curadoria que valoriza o essencial.</p>
              <ul><li><span>01</span>Arquitetura com autoria</li><li><span>02</span>Localizações com identidade</li><li><span>03</span>Escolhas com intenção</li></ul>
            </div>
          </div>
        </section>

        <section className="categories section-shell" id="categorias" aria-labelledby="categories-title">
          <div className="section-heading compact reveal"><p className="eyebrow">FORMAS DE HABITAR</p><h2 id="categories-title">Explore por <em>tipologia.</em></h2></div>
          <div className="category-grid">
            {categories.map((item, index) => <button className={`category-card category-${index} reveal`} type="button" key={item.name} onClick={() => explore('category', item.name)}>
              <img src={item.image} alt="" loading="lazy" /><span className="category-shade" /><span className="category-number">0{index + 1}</span><span className="category-name">{item.name}</span><MoveUpRight className="category-arrow" />
            </button>)}
          </div>
        </section>

        <Catalog category={category} region={region} onCategory={setCategory} onRegion={setRegion} onOpen={setSelected} />

        <section className="featured" aria-labelledby="featured-title">
          <div className="featured-media"><img src={properties[0].image} alt="Casa Horizonte ao entardecer" loading="lazy" /></div>
          <div className="featured-overlay" />
          <div className="featured-content reveal">
            <p className="eyebrow">PROPRIEDADE EM DESTAQUE · CONCEITUAL</p>
            <h2 id="featured-title">Casa <em>Horizonte</em></h2>
            <div className="featured-bottom"><p>Uma linha contínua entre arquitetura e paisagem.<br />Serra da Cantareira · 680 m²</p><button className="round-link" type="button" onClick={() => setSelected(properties[0])} aria-label="Conhecer Casa Horizonte"><ArrowUpRight /></button></div>
          </div>
        </section>

        <section className="regions section-shell" id="regioes" aria-labelledby="regions-title">
          <div className="regions-intro reveal"><p className="eyebrow">TERRITÓRIOS</p><h2 id="regions-title">O lugar também<br /><em>é arquitetura.</em></h2><p>Explore recortes demonstrativos do acervo pela paisagem que os define.</p></div>
          <div className="region-list">
            {regions.map((item, index) => <button className="region-row reveal" type="button" key={item.name} onClick={() => explore('region', item.name)}>
              <span className="region-index">0{index + 1}</span><span className="region-title">{item.name}</span><span className="region-thumb"><img src={item.image} alt="" loading="lazy" /></span><ArrowUpRight />
            </button>)}
          </div>
        </section>

        <section className="experience section-shell" aria-labelledby="experience-title">
          <div className="scene-wrap reveal"><SceneLoader /><p>Volumes em perspectiva · Mova o cursor</p></div>
          <div className="experience-copy reveal"><p className="eyebrow">A EXPERIÊNCIA VÉRTICE</p><h2 id="experience-title">Ver o espaço.<br /><em>Sentir o lugar.</em></h2><p>Uma apresentação cuidadosa revela o que uma planta não conta: a passagem da luz, a sequência dos ambientes, a textura dos materiais e a relação com a paisagem.</p><a className="text-link" href="#contato">Converse com a Vértice <ArrowUpRight size={18} /></a></div>
        </section>

        <section className="testimonials section-shell" aria-labelledby="testimonials-title">
          <div className="testimonial-label reveal"><p className="eyebrow">NOTAS DE EXPERIÊNCIA</p><h2 id="testimonials-title">O que permanece<br /><em>depois da visita.</em></h2><small>Textos demonstrativos para composição do layout.</small></div>
          <div className="quotes">
            <blockquote className="reveal"><p>“A sensação de atravessar uma casa e descobrir, a cada ambiente, um novo enquadramento.”</p><footer>Exemplo de depoimento · Cliente 01</footer></blockquote>
            <blockquote className="reveal"><p>“Quando arquitetura e paisagem deixam de competir, o espaço finalmente encontra seu ritmo.”</p><footer>Exemplo de depoimento · Cliente 02</footer></blockquote>
          </div>
        </section>

        <Contact key={interest?.id ?? 'geral'} selectedProperty={interest} />
      </main>
      <footer className="footer section-shell">
        <div className="footer-top"><a className="footer-brand" href="#inicio">VÉRTICE<span>IMÓVEIS</span></a><p>Arquitetura para viver<br />novas perspectivas.</p><a className="back-top" href="#inicio">Voltar ao topo <ArrowUpRight /></a></div>
        <div className="footer-bottom"><nav aria-label="Navegação do rodapé"><a href="#imoveis">Imóveis</a><a href="#categorias">Categorias</a><a href="#regioes">Regiões</a><a href="#sobre">Sobre</a></nav><p>© 2026 Vértice Imóveis · Projeto conceitual</p><span>Brasil <ArrowLeft size={12} /><ArrowRight size={12} /></span></div>
      </footer>
      {selected && <PropertyModal property={selected} onClose={() => setSelected(null)} onSchedule={schedule} />}
    </>
  )
}
