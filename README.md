# Allu Shop

## Requisitos

- Node.js (v18+)
- Docker e Docker Compose

## Como rodar o projeto

### 1. Iniciar a infraestrutura

Primeiro, inicie os serviços de infraestrutura necessários:

```bash
npm run setup:infra-only
```

### 2. Iniciar os microserviços

Para iniciar todos os serviços backend (gateway, catalog e order):

```bash
npm run start:services
```

Alternativamente, você pode iniciar os serviços individualmente:

```bash
npm run start:gateway  # Inicia apenas o serviço de gateway (porta 3330)
npm run start:catalog  # Inicia apenas o serviço de catálogo (porta 3001)
npm run start:order    # Inicia apenas o serviço de pedidos (porta 3002)
```

### 3. Iniciar a aplicação web

Para iniciar a aplicação frontend:

```bash
npm run start:web
```

A aplicação web estará disponível em `http://localhost:3000`.

## Comandos adicionais

```bash
npm run shutdown:infra-only  # Desliga os serviços de infraestrutura
npm run test:all             # Executa todos os testes
```

## Estrutura do projeto

- **apps/web** - Frontend Next.js
- **apps/gateway** - API Gateway
- **apps/catalog** - Serviço de catálogo de produtos
- **apps/order** - Serviço de carrinho e pedidos
