# Projeto Teste | Deploy Front e Back

Você pode ver o projeto Online: [Aqui!](https://exe01.vercel.app/)

## Instalar e rodar o projeto

### Dependências globais
Você precisa ter duas principais dependências instaladas:

- Node.js LTS v16 (ou qualquer versão superior)
- Docker Engine com Docker Compose

### Depêndencias locais

Então após clonar o repositório, abra o terminal e digite:

```bash
docker-compose up -d
```
> Isto irá automaticamente rodar os serviços de banco de dados, NodeJS e ReactJS.

O Docker, como configurado no docker-compose.yml, ira criar três containers, `db` | `back` | `front`, instalando as dependencias necessárias em cada container e executando um comando para subir os serviços.

> Obs: Nesta aplicação o Docker e docker-compose só serão usados em ambiente de desenvolvimento, no deploy não serão necessários!

Para ver a aplicação:

> Você devera conseguir ver o APP React em: http://localhost:3000
>
> Você devera conseguir ver o status da API em: http://localhost:3001/status

```bash
# A API backend
http://localhost:3001/status

# deve retornar:
{
  "message": "[Healthy] - API Up!"
}
```


## Sobre o Projeto

Este projeto consiste em uma aplicação web com um backend Node.js e um frontend React. O foco principal do projeto foi a implementação de um sistema de cadastro e login de usuários, integrado a um banco de dados MySQL, utilizando o Sequelize como ORM. O deploy da API backend e do banco de dados MySQL foi realizado na plataforma Railway, enquanto o frontend foi hospedado na Vercel.

Você pode ver o projeto Online: [Aqui!](https://exe01.vercel.app/)

### Tecnologias Utilizadas

#### Backend
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para aplicativos web Node.js.
- **Bibliotecas Adicionais**: Express async errors, Express rate limit, Cors, Helmet, Joi, Json Web Token.
- **Banco de Dados**: MySQL com Sequelize como ORM.

#### Frontend
- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **Recursos Adicionais**: React router DOM, Context API, Yup, CSS Module.

#### Infraestrutura e Ferramentas
- **Deploy**: Railway (Backend e DB), Vercel (Frontend).
- **Versionamento**: GitHub.
- **Ambiente de Desenvolvimento**: Docker e Docker Compose.
