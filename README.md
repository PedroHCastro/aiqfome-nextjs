# 🍱 aiqfome - Next.js

Aplicação web de delivery inspirada em plataformas como iFood e Aiqfome. Desenvolvida com **Next.js 13+ (App Router)** e **TypeScript**, com foco em experiência mobile, performance e boas práticas de front-end.

## 🚀 Como Rodar o Projeto

### 1. Instale as dependências

npm install

### 2. Rode o servidor de desenvolvimento

npm run dev

### 3. Acesse em [http://localhost:3000](http://localhost:3000)

## 📱 Funcionalidades

- Listagem de restaurantes com informações básicas (nome, avaliação, entrega)
- Visualização de cardápio por categoria
- Adição de itens ao carrinho (cart)
- Visualização e edição do pedido
- Persistência dos dados no `localStorage`
- Interface responsiva com foco mobile
- Navegação dinâmica via slugs (`/catalogo/[slug]`)
- Uso de Server Components para otimização

## 🧱 Tecnologias

- [Next.js 13+ (App Router)](https://nextjs.org/docs)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Next/Image](https://nextjs.org/docs/pages/api-reference/components/image)
- [Fontes Locais](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## 📂 Estrutura de Pastas

```bash
src/
  app/              # Páginas do app (App Router)
  components/       # Componentes reutilizáveis (ex: Accordion, RestaurantCard)
  context/          # Context API (ex: TicketContext)
  hooks/            # Custom hooks (ex: useTicket)
  types/            # Tipagens compartilhadas (ex: ProductsModel, RestaurantModel, TicketItemModel)
  styles/           # Estilos globais e variáveis
  data/             # Dados mockados (ex: products.json)
  assets/
    fonts/        # Fontes locais
    icons/        # Icones usados
public/             # Imagens usadas nos mocks
```

## ✅ Boas Práticas Aplicadas

- Componentes funcionais com separação de responsabilidades
- Gerenciamento global de estado com React Context + hooks personalizados
- Tipagem completa com TypeScript
- Server Components para melhorar performance e carregamento
- Acessibilidade básica nos componentes (semântica e alt tags)

## 📝 Futuras Melhorias

- Em futuras melhorias, pretendo finalizar a integração completa com os mocks e implementar todas as regras de negócio da aplicação
- Utilizar o [MSW](https://mswjs.io/docs/getting-started) para mock de dados
- Tela de checkout
- Autenticação de usuário
- Testes com Jest + React Testing Library
