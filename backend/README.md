# MesaFlow - SaaS para Gestão de Restaurantes 🍽️

MesaFlow é uma solução SaaS robusta e escalável projetada para modernizar a operação de restaurantes. O sistema oferece uma arquitetura multi-tenant, permitindo que múltiplos estabelecimentos operem de forma isolada e segura em uma única infraestrutura.

## 🚀 Tecnologias Core

O projeto foi construído utilizando as melhores práticas de engenharia de software, garantindo performance e facilidade de manutenção.

### Backend (Node.js)
- **Node.js & Express**: Base sólida para APIs RESTful de alta performance.
- **TypeScript**: Tipagem estática para maior segurança durante o desenvolvimento.
- **PostgreSQL (Neon DB)**: Banco de dados relacional poderoso com suporte a Serverless.
- **Node-Postgres (pg)**: Driver nativo para interações SQL otimizadas e controle total sobre as queries.
- **JWT (JSON Web Token)**: Autenticação segura e escalável (Sem estado/Stateless).
- **Zod**: Validação de esquemas e tipos em tempo de execução.
- **Helmet & CORS**: Camadas de segurança essenciais para proteção da API.

### Frontend (React)
- **React 18+ & Vite**: Interface moderna, rápida e responsiva.
- **Tailwind CSS**: Design system utilitário para uma UI premium e consistente.
- **Lucide React**: Biblioteca de ícones moderna e leve.

## 🏗️ Arquitetura e Decisões de Design

### Multi-Tenancy (Isolamento de Dados)
O sistema utiliza uma estratégia de **Shared Database, Separate Schema (by ID)**. Cada recurso no banco de dados (usuários, pedidos, produtos) é vinculado a um `restaurant_id`, garantindo que um restaurante nunca acesse os dados de outro.

### Database First (SQL Puro)
Optamos pelo uso de **SQL Puro com node-postgres** em vez de ORMs pesados como Prisma ou TypeORM para:
1.  **Performance Máxima**: Sem overhead de tradução de objetos para SQL.
2.  **Controle Total**: Queries complexas e transações ACID gerenciadas manualmente.
3.  **Deploy Facilitado**: Sem necessidade de processos complexos de geração de clientes ou migrações de ORM proprietárias.

### Camada de Serviços (Service Layer)
A lógica de negócio é isolada em **Services**, mantendo os **Controllers** enxutos e focados apenas na manipulação de requests e responses.

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- Instância PostgreSQL (Recomendado: [Neon DB](https://neon.tech))

### Passos
1. Clone o repositório.
2. Configure o arquivo `.env` no diretório `backend`:
   ```env
   DATABASE_URL=seu_link_do_neon
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```
3. Instale as dependências:
   ```bash
   # No diretório /backend
   npm install
   ```
4. Inicie o servidor em modo desenvolvimento:
   ```bash
   npm run dev
   ```
   *O banco de dados será inicializado automaticamente no primeiro boot.*

## 🚢 Deploy (Vercel)

Este projeto está configurado para ser implantado na **Vercel**.

### Backend
- O backend Express é adaptado como Serverless Functions.
- Consulte o arquivo `vercel.json` para detalhes de roteamento.

### Frontend
- O frontend Vite é servido como um site estático de alto desempenho através da CDN global da Vercel.

---

Desenvolvido com ❤️ por João Ryan.
