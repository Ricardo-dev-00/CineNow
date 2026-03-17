# 🎬 CineNow - Filmes em Cartaz

<div align="center">
  
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Vite-5.0.11-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
  
  <br />
  <br />
  
  **🚀 [Ver Demo ao Vivo](https://ricardo-dev-00.github.io/CineNow/)**
</div>

<br />

## 📖 Sobre o Projeto

**CineNow** é uma aplicação web moderna e profissional para descobrir e explorar filmes em cartaz nos cinemas. Desenvolvida com as mais recentes tecnologias do ecossistema React, o projeto oferece uma experiência de usuário fluida e elegante, similar às grandes plataformas de streaming.

O projeto consome dados em tempo real da **API do The Movie Database (TMDb)**, garantindo informações sempre atualizadas sobre lançamentos, trailers, avaliações e muito mais.

---

## ✨ Funcionalidades

### 🎯 Principais Features

- ✅ **Catálogo de Filmes** - Listagem completa de filmes em cartaz e em breve
- ✅ **Carrosséis Interativos** - Navegação fluida com autoplay e indicadores
- ✅ **Detalhes Completos** - Sinopse, avaliação, gêneros, duração, elenco e data de lançamento
- ✅ **Trailers Integrados** - Reprodução de trailers diretamente no site via YouTube
- ✅ **Sistema de Localização** - Geolocalização automática ou escolha manual de cidade
- ✅ **Busca de Cinemas** - Encontre cinemas próximos com informações e horários
- ✅ **Compartilhamento Social** - Compartilhe filmes via WhatsApp
- ✅ **Open Graph Completo** - Previews otimizados para redes sociais
- ✅ **100% Responsivo** - Design adaptável para mobile, tablet e desktop
- ✅ **Dark Mode** - Interface elegante com tema escuro cinematográfico

### 🎨 Experiência do Usuário

- **Design Streaming-Quality** - Inspirado em Netflix, Disney+ e Prime Video
- **Loading States** - Feedback visual durante carregamento de dados
- **Error Handling** - Tratamento elegante de erros com opções de retry
- **Empty States** - Mensagens amigáveis quando não há dados
- **Scroll to Top** - Navegação otimizada entre páginas
- **Mobile-First** - Otimizado prioritariamente para dispositivos móveis

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

### Core
- **[React 18](https://react.dev/)** - Biblioteca JavaScript para interfaces de usuário
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite 5](https://vitejs.dev/)** - Build tool ultrarrápida para desenvolvimento moderno

### Estilização
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Framework CSS utility-first
- **Design System Customizado** - Paleta de cores e componentes próprios

### Roteamento & HTTP
- **[React Router DOM 6](https://reactrouter.com/)** - Roteamento declarativo para React
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições à API

### Integração
- **[TMDb API](https://www.themoviedb.org/documentation/api)** - The Movie Database API v3

### Deploy
- **[GitHub Pages](https://pages.github.com/)** - Deploy estático via GitHub Actions

---

## 📁 Estrutura do Projeto

```
CineNow/
├── public/                  # Arquivos públicos estáticos
│   ├── favicon.svg         # Ícone do site
│   └── og-image.jpg        # Imagem para Open Graph
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.tsx      # Cabeçalho com navegação
│   │   ├── Footer.tsx      # Rodapé com links e créditos
│   │   ├── MovieCard.tsx   # Card de filme para listagens
│   │   ├── Modal.tsx       # Modal genérico reutilizável
│   │   ├── LocationModal.tsx # Modal de seleção de localização
│   │   ├── Loader.tsx      # Componente de loading
│   │   ├── ErrorMessage.tsx # Mensagem de erro
│   │   └── EmptyState.tsx  # Estado vazio
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.tsx        # Página inicial com carrosséis
│   │   └── MovieDetails.tsx # Página de detalhes do filme
│   ├── hooks/              # Custom React Hooks
│   │   ├── useMovies.ts    # Hook para filmes em cartaz
│   │   ├── useUpcomingMovies.ts # Hook para próximos lançamentos
│   │   ├── useMovieDetails.ts # Hook para detalhes do filme
│   │   └── useUserCity.ts  # Hook para gerenciar cidade do usuário
│   ├── services/           # Camada de serviços e APIs
│   │   ├── api.ts          # Configuração base do Axios
│   │   ├── movies.ts       # Serviço de filmes (TMDb)
│   │   └── cinemas.ts      # Base de dados de cinemas
│   ├── types/              # Definições de tipos TypeScript
│   │   └── index.ts        # Tipos globais e interfaces
│   ├── utils/              # Funções utilitárias
│   │   ├── formatters.ts   # Formatação de datas, moedas, etc
│   │   └── storage.ts      # Wrapper para localStorage
│   ├── App.tsx             # Componente raiz da aplicação
│   ├── main.tsx            # Entry point - renderiza o App
│   └── index.css           # Estilos globais e Tailwind
├── .env.example            # Template de variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── index.html              # HTML base com Open Graph
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Configuração do Tailwind CSS
├── tsconfig.json           # Configuração do TypeScript
└── vite.config.ts          # Configuração do Vite
```

---

## 🔧 Como Rodar Localmente

### Pré-requisitos

- **Node.js 18+** instalado ([Download](https://nodejs.org/))
- **npm** ou **yarn** como gerenciador de pacotes
- **Chave de API do TMDb** ([Obter gratuitamente](https://www.themoviedb.org/settings/api))

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Ricardo-dev-00/CineNow.git
cd CineNow
```

### 2️⃣ Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave de API do TMDb:

```env
VITE_TMDB_API_KEY=sua_chave_api_aqui
```

### 4️⃣ Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em **`http://localhost:5173`**

### 5️⃣ Build para produção

```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### 6️⃣ Preview do build de produção

```bash
npm run preview
# ou
yarn preview
```

---

## 🌍 Deploy

### Deploy Automático no GitHub Pages (GitHub Actions)

O projeto possui o workflow [`.github/workflows/main.yml`](.github/workflows/main.yml) com pipeline completo de **CI/CD**:

- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- Deploy no GitHub Pages em push para `main`

#### Como habilitar

1. No GitHub, vá em **Settings > Pages**
2. Em **Build and deployment**, selecione **Source: GitHub Actions**
3. Garanta que a branch principal seja `main`
4. Faça push para `main` e acompanhe em **Actions**

#### Variáveis e Segredos

- `GITHUB_TOKEN`: já é fornecido automaticamente pelo GitHub Actions
- `VITE_TMDB_API_KEY`: configure em **Settings > Secrets and variables > Actions** para o build de produção

### Outras Plataformas

O projeto é compatível com:
- **[Netlify](https://www.netlify.com/)**
- **[GitHub Pages](https://pages.github.com/)**
- **[Railway](https://railway.app/)**
- Qualquer serviço que suporte builds estáticos

⚠️ **Importante:** Sempre configure a variável `VITE_TMDB_API_KEY` nas configurações da plataforma escolhida.

---

## 📍 Sistema de Localização

O CineNow implementa um **fluxo de UX não invasivo e inteligente** para localização do usuário:

### 🎯 Como Funciona

1. **Contextual** - A localização só é solicitada quando o usuário clica em "Ver horários e cinemas"
2. **Modal Informativo** - Explica claramente o motivo da solicitação
3. **Dupla Opção**:
   - 📍 **Geolocalização Automática** - Usa a API do navegador para detectar
   - 🏙️ **Escolha Manual** - Lista de cidades disponíveis
4. **Confirmação** - Se automático, permite confirmar ou trocar a cidade detectada
5. **Persistência** - Salva a escolha no `localStorage` para próximas visitas
6. **Flexibilidade** - Permite trocar de cidade a qualquer momento
7. **Fallback** - Se o usuário negar acesso, oferece seleção manual

### 🌆 Cidades Disponíveis

Base de dados com **69 cinemas** em **23 cidades** brasileiras:

| Região | Cidades |
|--------|---------|
| **Sudeste** | São Paulo, Rio de Janeiro, Belo Horizonte, Vitória, Campinas |
| **Sul** | Porto Alegre, Curitiba, Florianópolis |
| **Nordeste** | Salvador, Fortaleza, Recife, Natal, João Pessoa |
| **Centro-Oeste** | Brasília, Goiânia, Campo Grande, Cuiabá |
| **Norte** | Manaus, Belém |

---

## 🔐 Segurança e Boas Práticas

- ✅ **Variáveis de Ambiente** - Chave da API armazenada de forma segura
- ✅ **Git Ignore** - `.env` incluído no `.gitignore`
- ✅ **Template Público** - `.env.example` fornecido como referência
- ✅ **Validação** - Checagem da presença da API key ao iniciar
- ✅ **HTTPS** - Deploy com certificado SSL automático
- ✅ **TypeScript** - Tipagem estática previne erros em runtime
- ✅ **Error Boundaries** - Tratamento robusto de erros
- ✅ **Code Splitting** - Carregamento otimizado de componentes

---

## 🎯 Diferenciais do Projeto

### 💎 Qualidade de Código
- **Arquitetura Limpa** - Separação de responsabilidades (components, hooks, services, utils)
- **TypeScript 100%** - Tipagem completa em todo o projeto
- **Custom Hooks** - Lógica reutilizável e isolada
- **Componentização** - Componentes pequenos, reutilizáveis e desacoplados
- **Convenções** - Seguindo padrões da comunidade React

### 🎨 Design & UX
- **Streaming-Quality UI** - Interface premium inspirada em plataformas líderes
- **Micro-interações** - Hover states, transições suaves e feedbacks visuais
- **Responsividade Total** - Breakpoints otimizados (mobile, tablet, desktop)
- **Acessibilidade** - ARIA labels e navegação por teclado
- **Performance** - Lazy loading, otimização de imagens

### 🚀 Funcionalidades Avançadas
- **Carrosséis Automáticos** - Com controles manuais e indicadores
- **Open Graph Meta Tags** - Previews bonitos ao compartilhar
- **Geolocalização** - Integração com API do navegador
- **Persistência Local** - localStorage para preferências do usuário
- **SEO Otimizado** - Meta tags e structured data

---

## 📊 Estrutura de Dados

### Movie (Filme)

```typescript
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
}
```

### MovieDetails (Detalhes do Filme)

```typescript
interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  tagline: string;
  videos?: {
    results: Video[];
  };
}
```

### Cinema

```typescript
interface Cinema {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  ticketUrl: string;
}
```

---

## 🛠️ Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Compila o TypeScript e gera build de produção
npm run build

# Faz preview do build de produção localmente
npm run preview

# Compila apenas o TypeScript (verificação de tipos)
npm run tsc

# Lint do código
npm run lint
```

---

## � Screenshots

### 🏠 Home Page
Carrosséis de filmes em cartaz e próximos lançamentos com navegação automática

### 🎬 Detalhes do Filme
Página completa com banner hero, trailer, informações e carrossel de filmes relacionados

### 📱 Mobile Responsivo
Interface otimizada para todos os tamanhos de tela

### 📍 Modal de Localização
Sistema inteligente de seleção de cidade com geolocalização

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você quer contribuir com o projeto:

1. Faça um **Fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/NovaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add: Nova feature incrível'`)
4. Faça **Push** para a branch (`git push origin feature/NovaFeature`)
5. Abra um **Pull Request**

### Sugestões de Melhorias

- [ ] Sistema de favoritos com localStorage
- [ ] Filtros por gênero e avaliação
- [ ] Busca de filmes por título
- [ ] Integração com API de cinemas real (Ingresso.com)
- [ ] Sistema de review e comentários
- [ ] Modo claro (Light mode)
- [ ] Testes unitários e E2E
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Isso significa que você pode:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Desde que mantenha o aviso de copyright e a licença.

---

## 👨‍💻 Desenvolvedor

<div align="center">
  <img src="https://github.com/Ricardo-dev-00.png" width="150" style="border-radius: 50%;" alt="Ricardo Vieira"/>
  <br />
  <br />
  
  **Ricardo Vieira**
  
  Desenvolvedor Full Stack apaixonado por criar experiências web incríveis
  
  <br />
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ricardo-vieira-dev/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ricardo-dev-00)
  [![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://github.com/Ricardo-dev-00)
  
</div>

---

## 🙏 Agradecimentos

- **[The Movie Database (TMDb)](https://www.themoviedb.org/)** - Por fornecer uma API incrível e gratuita
- **[Tailwind CSS](https://tailwindcss.com/)** - Pelo framework CSS que torna estilização um prazer
- **[GitHub Pages](https://pages.github.com/)** - Pela hospedagem estática integrada ao GitHub Actions
- **[React Community](https://react.dev/community)** - Por todo o suporte e recursos educacionais

---

<div align="center">
  
  ### ⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela!
  
  <br />
  
  **Desenvolvido com ❤️, ☕ e muito 🎬 por [Ricardo Vieira](https://github.com/Ricardo-dev-00)**
  
  <br />
  
  ---
  
  **🚀 [Ver Projeto ao Vivo](https://ricardo-dev-00.github.io/CineNow/)** | **📂 [Código Fonte](https://github.com/Ricardo-dev-00/CineNow)**
  
</div>
