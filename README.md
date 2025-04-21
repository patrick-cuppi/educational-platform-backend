# Plataforma Educacional inspirada no tema da Netflix - Backend (Node.js)

Este é o Backend do projeto desenvolvido em ***Node.js***.

## Sobre o Projeto

A plataforma educacional é composta por:
- [Frontend em Next.js](https://github.com/patrick-cuppi/educational-platform-frontend)
- Backend em Node.js (Este repositório aqui!)

### Componentes do Sistema

- **Frontend (Next.js)**
  - Interface do usuário para criação de conta e interação com os cursos
  - Lista dos últimos episódios assistidos e lista com os episódios que mais gostou
  - Desenvolvido com Next.js para garantir performance e boa experiência do usuário

- **Backend (Node.js)**
  - Gerencia contas dos usuários e dos cursos
  - Controla a evolução do usuário, salvando os últimos episódios assistidos
  - Controla a lista dos episódios que o usuário mais gostou
  - Painel administrativo para gerenciamento dos cursos

## Fluxo de Comunicação

1. Frontend realiza requisições para a API via REST
2. API processa as requisições e retorna os dados

## Ordem de Execução dos Serviços

Para executar o projeto completo, os serviços devem ser iniciados na seguinte ordem:

1. **API (Node.js)** - Deve ser executado primeiro pois configura o banco de dados
2. **Frontend (Next.js)** - Interface de usuário que se comunica com a API

## Instruções Detalhadas

Cada componente do sistema possui instruções específicas de instalação e configuração em seus repectivos repositórios:

- **API em Node.js**: Este repositório aqui. Setup do projeto abaixo!
- **Frontend em Next.js**: Consulte o README na pasta do projeto [(clique aqui)](https://github.com/patrick-cuppi/educational-platform-frontend).

## Arquitetura da aplicação
![Visualize a arquitetura completa aqui](/public/db_schema.png)

## Pré-requisitos

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/)

## Importante!

⚠️ **Este projeto em específico eu não utilizei o Docker**, mas você pode substituir tranquilamente pelo Docker ao invés de utilizar o PostgreSQL instalado e o pgAdmin4. Caso você utilize o Docker, recomendo a seguinte imagem: [bitnami/postgresql](https://hub.docker.com/r/bitnami/postgresql). Para isso, você poderá criar um arquivo `docker-compose.yml` e inserir o seguinte código:
```bash
services:
  service-pg:
    image: bitnami/postgresql
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=onebitflix
```

## Setup do Projeto

1. Clone o repositório - backend:
```bash
git clone https://github.com/patrick-cuppi/educational-platform-backend
cd educational-platform-backend
npm install
```

2. Clone o repositório - frontend:
```bash
git clone https://github.com/patrick-cuppi/educational-platform-frontend
cd educational-platform-frontend
npm install
```

3. Execute o comando para rodar a aplicação backend:
```bash
npm run dev
```

3. Verifique se o banco está rodando:
```bash
# para listar os serviços PostgreSQL e verificar se estão em execução:
net start postgresql
# e para obter informações detalhadas:
sc query postgresql
```

4. Caso esteja utilizando docker:
```bash
# para rodar a aplicação a partir do arquivo docker-compose.yml
docker-compose up -d
# para verificar os containers:
docker ps
```
> ⚠️ Qualquer dúvida que você possua em relação a containers e Docker, recomendo ler a [documentação](https://docs.docker.com/) deles. 

5. Execute o comando para rodar a aplicação frontend:
```bash
npm run dev
```
O backend estará disponível em `http://localhost:3030`.
O frontend estará disponível em `http://localhost:3000` e integrado ao backend.

## Funcionalidades

### Autenticação
- Login via API com senha criptografada e autenticação utlizando JWT
- Proteção de rotas via middleware

## Tecnologias Utilizadas

- Node.js v.22
- TypeScript (linguagem utilizada para desenvolvimento)
- AdminJS (painel administrativo dos usuários e dos cursos)
- bcrypt (gerar o hash das senhas)
- CORS (proteção das rotas acessadas pelo frontend)
- dotenv (configuração das variáveis de ambiente)
- jsonwebtoken (para a autenticação do usuário)
- express (para gerenciamento das rotas)
- Sequelize (ORM para gerar as migrations e interagir com o Banco de Dados)
- PostgreSQL (Banco de Dados utilizado)