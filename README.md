# Front-end Project

Este é um projeto front-end desenvolvido usando React. Ele contém as páginas e componentes que fazem parte de uma aplicação web.

## Tecnologias Usadas

- **React**: Biblioteca JavaScript para a construção de interfaces de usuário.
- **Axios**: Para fazer requisições HTTP.
- **Tailwind CSS**: Framework CSS para um design moderno e responsivo.
- **Docker**: Contêineres para empacotar a aplicação e suas dependências.

## Funcionalidades

### 1. **Dashboard**
A página principal do projeto que exibe uma visão geral de dados importantes.

### 2. **TopMusic**
Página que exibe uma lista das músicas mais populares com base no número de visualizações. Utiliza dados da API para apresentar músicas ordenadas e paginadas.

### 3. **Paginção**
A lista de músicas é paginada, exibindo 5 itens por vez. O usuário pode navegar pelas páginas utilizando os botões de "Anterior" e "Próximo".

## Estrutura do Projeto

```bash
├── src
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas principais da aplicação
│   ├── services/           # Arquivos responsáveis por interações com APIs
│   ├── App.js              # Componente raiz da aplicação
│   └── index.js            # Ponto de entrada da aplicação
├── public/
│   └── index.html          # Arquivo HTML principal
├── .gitignore              # Arquivos e pastas ignoradas pelo Git
├── package.json            # Dependências e scripts do projeto
├── tailwind.config.js      # Configurações do Tailwind CSS
├── Dockerfile              # Arquivo Docker para containerizar a aplicação
└── docker-compose.yml      # Arquivo Docker Compose para orquestrar a aplicação
