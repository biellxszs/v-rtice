import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { properties, type Property } from '../data/properties'
import { siteConfig } from '../data/config'

type FormData = { name: string; email: string; phone: string; date: string; property: string; message: string }
const initial: FormData = { name: '', email: '', phone: '', date: '', property: '', message: '' }

export function Contact({ selectedProperty }: { selectedProperty: Property | null }) {
  const [form, setForm] = useState<FormData>({ ...initial, property: selectedProperty?.id ?? '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [summary, setSummary] = useState('')
  const [copied, setCopied] = useState(false)

  const update = (field: keyof FormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSummary('')
  }
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (form.name.trim().length < 2) nextErrors.name = 'Informe seu nome.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Informe um e-mail válido.'
    if (form.phone && form.phone.replace(/\D/g, '').length < 8) nextErrors.phone = 'Revise o telefone informado.'
    if (!form.date) nextErrors.date = 'Escolha uma data preferida.'
    if (!form.property) nextErrors.property = 'Selecione um imóvel.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    const property = properties.find((item) => item.id === form.property)
    const text = `Solicitação de visita — Vértice Imóveis\nNome: ${form.name}\nE-mail: ${form.email}\nTelefone: ${form.phone || 'Não informado'}\nImóvel: ${property?.name}\nData preferida: ${form.date.split('-').reverse().join('/')}\nMensagem: ${form.message || 'Nenhuma'}\n\nConteúdo demonstrativo — nenhum dado foi enviado a um servidor.`
    setSummary(text)
    setCopied(false)
  }
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true) } catch { setCopied(false) }
  }

  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact-image"><img src="/images/casa-litoral.webp" alt="Casa contemporânea integrada à paisagem litorânea" loading="lazy" /></div>
      <div className="contact-panel">
        <p className="eyebrow">UMA NOVA PERSPECTIVA COMEÇA AQUI</p>
        <h2 id="contact-title">Vamos conhecer<br /><em>o seu próximo lugar?</em></h2>
        <p className="contact-intro">Prepare uma solicitação de visita. Neste projeto conceitual, os dados permanecem no navegador e podem ser copiados por você.</p>
        <form onSubmit={submit} noValidate>
          <div className="form-row">
            <label><span>Nome *</span><input value={form.name} onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby="name-error" placeholder="Como podemos chamar você?" />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</label>
            <label><span>E-mail *</span><input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby="email-error" placeholder="seu@email.com" />{errors.email && <small id="email-error" className="field-error">{errors.email}</small>}</label>
          </div>
          <div className="form-row">
            <label><span>Telefone</span><input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} placeholder="(00) 00000-0000" />{errors.phone && <small className="field-error">{errors.phone}</small>}</label>
            <label><span>Data preferida *</span><input type="date" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={(e) => update('date', e.target.value)} aria-invalid={!!errors.date} />{errors.date && <small className="field-error">{errors.date}</small>}</label>
          </div>
          <label><span>Imóvel de interesse *</span><select value={form.property} onChange={(e) => update('property', e.target.value)} aria-invalid={!!errors.property}><option value="">Selecione uma propriedade</option>{properties.map((property) => <option key={property.id} value={property.id}>{property.name} — {property.location}</option>)}</select>{errors.property && <small className="field-error">{errors.property}</small>}</label>
          <label><span>Mensagem</span><textarea rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Conte-nos o que você procura." /></label>
          <button className="primary-button" type="submit">Preparar solicitação <ArrowUpRight size={18} /></button>
        </form>
        {summary && <div className="form-success" role="status"><Check size={20} /><div><strong>Solicitação preparada.</strong><p>Nada foi enviado. Copie o resumo para compartilhar pelo canal de sua preferência.</p><pre>{summary}</pre><button type="button" onClick={copy}><Copy size={15} />{copied ? 'Copiado' : 'Copiar solicitação'}</button></div></div>}
        {(siteConfig.email || siteConfig.whatsapp) && <div className="configured-channels">{siteConfig.email && <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}{siteConfig.whatsapp && <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>}</div>}
      </div>
    </section>
  )
}
