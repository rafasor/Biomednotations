# HealthEasy - Análises Laboratoriais

Bem-vindo ao HealthEasy! Este projeto tem como objetivo simplificar o gerenciamento de pacientes e suas análises laboratoriais. Com uma interface intuitiva e funcionalidades robustas, o HealthEasy permite cadastrar, visualizar e deletar pacientes e suas respectivas análises.

## Descrição

O HealthEasy é uma aplicação desenvolvida com React Native para o frontend e Express.js para o backend, utilizando MongoDB como banco de dados. A aplicação é autenticada, garantindo segurança na manipulação dos dados dos pacientes e suas análises.

## Funcionalidades

- **Cadastro de Pacientes:** Adicione novos pacientes com informações detalhadas.
- **Gerenciamento de Análises:** Cadastre, visualize e gerencie análises laboratoriais para cada paciente.
- **Autenticação Segura:** Sistema de login e autenticação para proteger os dados.
- **Design Responsivo:** Interface amigável e responsiva para uma melhor experiência do usuário.

## Instalação

### Requisitos

- Node.js
- MongoDB
- TypeScript
- Express
- ReactNative
- Yarn ou npm

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/health-easy.git
   cd health-easy


### Instale as dependências do backend:

bash
Copy code
cd backend
npm install
Instale as dependências do frontend:

bash
Copy code
cd ../frontend
npm install
Configure o ambiente:

Crie um arquivo .env na pasta backend com as seguintes variáveis:

env
Copy code
PORT=9090
MONGODB_URI=mongodb://localhost:27017/health_easy
JWT_SECRET=sua_chave_secreta
Inicie o servidor backend:

bash
Copy code
cd backend
npm run dev
Inicie o aplicativo frontend:

bash
Copy code
cd ../frontend
npm start

Uso

### Cadastro de Pacientes
Na tela inicial, clique em "Adicionar Paciente".
Preencha as informações necessárias e clique em "Cadastrar".
Gerenciamento de Análises
Na lista de pacientes, selecione um paciente para abrir as opções.
Clique em "Cadastrar Análises" para adicionar uma nova análise.
Clique em "Mostrar Análises" para visualizar as análises cadastradas para o paciente.
Deletar Pacientes
Na lista de pacientes, selecione um paciente para abrir as opções.
Clique em "Deletar Paciente" para remover o paciente da lista.
Estrutura do Projeto

health-easy/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.ts
│   ├── server.ts
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── public/
│   └── package.json
├── README.md
└── package.json

### Tecnologias Utilizadas
  Frontend: React Native, TypeScript, Axios, AsyncStorage
  Backend: Node.js, TypeScript, Express.js, Mongoose
  Banco de Dados: MongoDB
  Autenticação: JWT (JSON Web Token)

Contribuição
Fork este repositório.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -m 'Adicionei uma nova feature').
Push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.
Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

Feito com ❤️ por [RJA Softwares].
