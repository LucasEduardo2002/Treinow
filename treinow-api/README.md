# Treinow API

## 📋 Descrição da Aplicação

A aplicação **Treinow** é um sistema de gerenciamento de treinos, desenvolvido utilizando o framework **NestJS**. O objetivo principal é permitir que os usuários possam criar, gerenciar e acompanhar seus treinos de forma eficiente e escalável.

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Um framework para construir aplicações Node.js escaláveis e eficientes com arquitetura modular
- **TypeScript**: Linguagem de programação que oferece tipagem estática para JavaScript
- **Prisma**: Um ORM (Object-Relational Mapping) que facilita a interação com o banco de dados
- **SQLite**: Um banco de dados leve e fácil de usar, ideal para desenvolvimento e testes
- **Passport & JWT**: Autenticação e geração de tokens JWT para segurança

## 📁 Estrutura do Projeto

A estrutura do projeto é organizada em módulos, onde cada módulo é responsável por uma parte específica da aplicação:

```
treinow-api/
├── src/
│   ├── auth/              # Módulo de autenticação (login, JWT, estratégias)
│   ├── users/             # Módulo de usuários (CRUD de usuários)
│   ├── workouts/          # Módulo de treinos (criação e gerenciamento de treinos)
│   ├── prisma/            # Configuração do Prisma e banco de dados
│   ├── app.module.ts      # Módulo principal da aplicação
│   └── main.ts            # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma      # Definição do schema do banco de dados
│   └── migrations/        # Histórico de migrações do banco de dados
└── package.json           # Dependências e scripts do projeto
```

## 🏗️ Arquitetura e Componentes Principais

### 1. **Auth Module** (`src/auth/`)
- **Responsabilidade**: Gerenciar autenticação de usuários
- **Componentes**:
  - `auth.service.ts`: Lógica de autenticação
  - `auth.controller.ts`: Endpoints de autenticação
  - `jwt.strategy.ts`: Estratégia JWT para Passport
  - `jwt-auth.guard.ts`: Guard para proteger rotas autenticadas

### 2. **Users Module** (`src/users/`)
- **Responsabilidade**: Gerenciar dados de usuários
- **Componentes**:
  - `users.service.ts`: Lógica de CRUD de usuários
  - `users.controller.ts`: Endpoints de usuários
  - DTOs para validação de dados

### 3. **Workouts Module** (`src/workouts/`)
- **Responsabilidade**: Gerenciar treinos e histórico de treinos
- **Componentes**:
  - `workouts.service.ts`: Lógica de criação e gerenciamento de treinos
  - `workouts.controller.ts`: Endpoints de treinos
  - DTOs para validação de dados de treinos

### 4. **Prisma Module** (`src/prisma/`)
- **Responsabilidade**: Configuração e conexão com o banco de dados
- **Componentes**:
  - `prisma.service.ts`: Instância global do PrismaClient
  - Gerenciamento de conexões com SQLite

## 🔄 Fluxo de Dados

1. **Requisição**: Chega ao Controller
2. **Validação**: DTO valida os dados de entrada
3. **Processamento**: Service executa a lógica de negócio
4. **Banco de Dados**: Prisma interage com SQLite
5. **Resposta**: Controller retorna o resultado

## 🚀 Como Executar a Aplicação

### Pré-requisitos
- Node.js (v16 ou superior)
- npm ou yarn

### Passos

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd treinow-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto
   - Defina `DATABASE_URL="file:./dev.db"`

4. **Execute as migrações do banco de dados**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```bash
   npm run start:dev
   ```

6. **Acesse a aplicação**
   - A aplicação estará disponível em `http://localhost:3000`
   - Swagger UI (se configurado): `http://localhost:3000/api`

## 📝 Endpoints Principais

### Autenticação
- `GET /auth` - Verifica status de autenticação
- `POST /auth/login` - Realiza login de usuário

### Usuários
- `POST /users` - Cria novo usuário
- `GET /users/:id` - Obtém dados de um usuário
- `DELETE /account/delete` - Deleta conta do usuário

### Treinos
- `POST /store/workout` - Registra início de treino
- `POST /personal/workout` - Cria novo treino (Personal Trainer)
- `GET /personal/workout` - Lista treinos do Personal Trainer
- `POST /personal/:personal_id/rating` - Avalia um Personal Trainer

## 🔐 Segurança

- **JWT (JSON Web Tokens)**: Implementado para autenticação segura
- **Guards**: Protegem rotas que requerem autenticação
- **Validação**: DTOs validam dados de entrada
- **Senha**: (Configurar hash de senha com bcrypt)

## 🧪 Testes

Para executar testes:
```bash
npm run test
```

Para testes e2e:
```bash
npm run test:e2e
```

## 📦 Dependências Principais

- `@nestjs/common`: Decoradores e utilitários NestJS
- `@nestjs/core`: Core do NestJS
- `@nestjs/jwt`: Módulo JWT para autenticação
- `@nestjs/passport`: Integração com Passport
- `@prisma/client`: Cliente do Prisma
- `prisma`: ORM para gerenciamento de banco de dados
- `passport-jwt`: Estratégia JWT para Passport
- `better-sqlite3`: Driver SQLite

## 🔧 Troubleshooting

### Erro: "PrismaClient not initialized"
- Execute `npx prisma generate` para regenerar o cliente

### Erro: "Port 3000 already in use"
- Mude a porta com `PORT=3001 npm run start:dev`

### Erro: "Database connection failed"
- Verifique se o caminho do banco de dados em `.env` está correto

## 📚 Documentação Adicional

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Passport.js Documentation](http://www.passportjs.org/)

## 👨‍💻 Desenvolvimento

### Criar um novo módulo
```bash
nest generate module <nome-do-modulo>
```

### Criar um novo controller
```bash
nest generate controller <nome-do-modulo>/<nome-do-controller>
```

### Criar um novo service
```bash
nest generate service <nome-do-modulo>/<nome-do-service>
```

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias e correções:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
