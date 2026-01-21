# 🎬 CineNow - Filmes em Cartaz

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Vite-5.0.11-646CFF?style=for-the-badge&logo=vite" />
</div>

<br />

**CineNow** é uma aplicação Front-End moderna e profissional para visualização de filmes em cartaz nos cinemas, desenvolvida com React, TypeScript e Tailwind CSS. O projeto utiliza a API do **The Movie Database (TMDb)** para exibir informações atualizadas sobre os lançamentos.

---

## ✨ Funcionalidades

- ✅ **Listagem de filmes em cartaz** - Grid responsivo com paginação
- ✅ **Detalhes completos do filme** - Sinopse, avaliação, gêneros, duração e data de lançamento
- ✅ **Trailer incorporado** - Assista ao trailer diretamente na página via YouTube embed
- ✅ **Sistema de localização inteligente** - Detecta ou permite escolher manualmente a cidade
- ✅ **Busca de cinemas** - Encontre cinemas próximos com links diretos para horários e ingressos
- ✅ **100% Responsivo** - Design mobile-first otimizado para todos os dispositivos
- ✅ **Dark Mode** - Interface elegante e moderna com tema escuro
- ✅ **Estados visuais** - Loading, error e empty states bem definidos

---

## 🎨 Identidade Visual

### Paleta de Cores

```css
Primária:    #0F172A  /* Azul escuro / Slate 900 - Fundo principal */
Secundária:  #111827  /* Cinza escuro - Cards e seções */
Destaque:    #E50914  /* Vermelho cinema - CTAs e ações */
Texto:       #F9FAFB  /* Branco suave */
Secundário:  #9CA3AF  /* Cinza claro */
```

---

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utility-first
- **React Router DOM** - Roteamento client-side
- **Axios** - Cliente HTTP para requisições à API
- **Vite** - Build tool ultrarrápida
- **TMDb API** - Base de dados de filmes

---

## 📁 Estrutura do Projeto

```
CineNow/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   ├── Modal.tsx
│   │   ├── LocationModal.tsx
│   │   ├── Loader.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── EmptyState.tsx
│   ├── pages/               # Páginas da aplicação
│   │   ├── Home.tsx
│   │   └── MovieDetails.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useMovies.ts
│   │   ├── useMovieDetails.ts
│   │   └── useUserCity.ts
│   ├── services/            # Configuração de APIs
│   │   ├── api.ts
│   │   ├── movies.ts
│   │   └── cinemas.ts
│   ├── types/               # Tipagens TypeScript
│   │   └── index.ts
│   ├── utils/               # Funções utilitárias
│   │   ├── formatters.ts
│   │   └── storage.ts
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globais
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔧 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cinenow.git
cd cinenow
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Obtenha sua chave de API gratuita em [The Movie Database](https://www.themoviedb.org/settings/api) e adicione ao arquivo `.env`:

```env
VITE_TMDB_API_KEY=sua_chave_api_aqui
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### 5. Build para produção

```bash
npm run build
```

---

## 🌍 Deploy na Vercel

### Deploy Automático

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure a variável de ambiente `VITE_TMDB_API_KEY` no painel da Vercel
5. Deploy! 🚀

### Deploy via CLI

```bash
npm install -g vercel
vercel
```

**Importante:** Não esqueça de configurar a variável `VITE_TMDB_API_KEY` nas configurações do projeto na Vercel.

---

## 📍 Sistema de Localização

O CineNow implementa um **fluxo de UX consciente** para localização:

### Como Funciona

1. **Não invasivo** - Não solicita localização ao entrar no site
2. **Contextual** - Solicita localização apenas ao clicar em "Ver horários e cinemas"
3. **Modal informativo** - Explica claramente porque precisa da localização
4. **Dupla opção**:
   - 📍 Usar geolocalização automática
   - 🏙️ Escolher cidade manualmente
5. **Confirmação** - Se automático, confirma a cidade detectada
6. **Persistência** - Salva a cidade escolhida no `localStorage`
7. **Flexibilidade** - Permite trocar de cidade a qualquer momento

### Cinemas Disponíveis

Base local (mock) com cinemas das principais capitais brasileiras:
- São Paulo - SP
- Rio de Janeiro - RJ
- Belo Horizonte - MG
- Brasília - DF
- Salvador - BA
- Curitiba - PR
- Fortaleza - CE
- Porto Alegre - RS

---

## 🔐 Segurança

- ✅ Chave da API armazenada em variáveis de ambiente
- ✅ `.env` incluído no `.gitignore`
- ✅ `.env.example` fornecido como template
- ✅ Validação da presença da API key ao iniciar
- ✅ Nenhuma informação sensível versionada

---

## 🎯 Diferenciais do Projeto

- **Código limpo e organizado** - Arquitetura escalável e bem estruturada
- **TypeScript em 100%** - Tipagem completa para maior segurança
- **Componentização eficiente** - Componentes reutilizáveis e desacoplados
- **Custom Hooks** - Lógica isolada e testável
- **UX excepcional** - Fluxo de localização não invasivo
- **Performance otimizada** - Lazy loading de imagens
- **Acessibilidade** - Semântica HTML correta e ARIA labels
- **SEO friendly** - Meta tags e structured data
- **Design moderno** - Interface inspirada em plataformas de streaming

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.

---

## 👨‍💻 Desenvolvedor

**Ricardo** - [GitHub](https://github.com/seu-usuario) | [LinkedIn](https://linkedin.com/in/seu-perfil)

---

## 🙏 Agradecimentos

- [The Movie Database (TMDb)](https://www.themoviedb.org/) - API de filmes
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vercel](https://vercel.com/) - Plataforma de deploy

---

<div align="center">
  Desenvolvido com ❤️ e ☕ por Ricardo
</div>
