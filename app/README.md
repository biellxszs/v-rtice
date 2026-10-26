# Vértice Imóveis

Experiência digital conceitual para uma imobiliária premium, construída com React, TypeScript e Vite. O projeto inclui direção de arte editorial, animações de entrada e scroll com GSAP/ScrollTrigger, cena arquitetônica em Three.js, catálogo filtrável, detalhes com galeria acessível e formulário local de agendamento.

## Executar localmente

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
npm run dev
```

Acesse o endereço exibido pelo Vite.

## Build e verificação

```bash
npm run lint
npm run build
npm run preview
```

## Publicação na Vercel

1. Importe o repositório na Vercel.
2. Use o preset **Vite**.
3. Comando de build: `npm run build`.
4. Diretório de saída: `dist`.
5. Publique. Não há variáveis de ambiente obrigatórias nesta versão frontend.

## Conteúdo e configuração

- **Imóveis, categorias e regiões:** `src/data/properties.ts`.
- **Canais e aviso de conteúdo demonstrativo:** `src/data/config.ts`.
- **Fotografias:** `public/images/`. Substitua mantendo os nomes dos arquivos ou atualize os caminhos no conjunto de dados.
- **Identidade e estilos responsivos:** `src/App.css` e `src/index.css`.
- **Metadados e favicon:** `index.html` e `public/favicon.svg`.

Todos os imóveis, preços, características, regiões e textos de depoimento são demonstrativos. As fotografias foram geradas especificamente para este projeto e estão armazenadas localmente em WebP.

## Agendamento e integrações

O formulário valida os dados e prepara um resumo copiável. **Nenhuma informação é enviada ou persistida.** Esta versão não possui backend, CRM, e-mail transacional ou WhatsApp configurado.

Antes de usar com dados reais:

- Configure canais reais em `src/data/config.ts`.
- Para receber solicitações, conecte o formulário a um backend/CRM e implemente consentimento, política de privacidade e proteção contra spam.
- Substitua todo o acervo demonstrativo e valide disponibilidade, valores e características.
- Inclua URLs de compartilhamento absolutas nos metadados Open Graph após definir o domínio.

## Acessibilidade e desempenho

- Navegação semântica, foco visível, menu mobile e modal operáveis por teclado.
- Galeria com setas, toque e teclas direcionais; Escape fecha o detalhe.
- `prefers-reduced-motion` reduz animações e mantém o conteúdo disponível.
- A cena 3D limita densidade de pixels, pausa fora da viewport e possui fallback visual para falha de WebGL.
- Imagens fora da primeira tela usam carregamento diferido.
