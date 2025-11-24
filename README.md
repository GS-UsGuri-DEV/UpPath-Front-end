# UpPath - Plataforma de Desenvolvimento Profissional e Bem-Estar

> Plataforma EduTech que une inteligência artificial, gestão de carreira e bem-estar emocional para guiar o desenvolvimento profissional de forma personalizada e sustentável.

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)

---

## 📋 Sumário

- [Status do Projeto](#-status-do-projeto)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [Screenshots](#-screenshots)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Rotas Principais](#-rotas-principais)
- [Autores e Créditos](#-autores-e-créditos)
- [Links Importantes](#-links-importantes)

---

## 🚀 Status do Projeto

**🟡 Em Desenvolvimento Ativo**

O projeto UpPath está atualmente em desenvolvimento para a Global Solution 2025 da FIAP. Funcionalidades principais implementadas:

- ✅ Sistema de autenticação (usuários e empresas)
- ✅ Dashboard personalizado com métricas de bem-estar
- ✅ Gestão de perfil de usuário
- ✅ Sistema de trilhas de aprendizado
- ✅ Módulo de bem-estar emocional
- ✅ Tema claro/escuro com Context API
- ✅ Integração com API Java [Link](https://uppath.onrender.com)
- ✅ Deploy na Vercel [Link](https://up-path.vercel.app)

---

## 💡 Sobre o Projeto

### Visão Geral

O **UpPath** é uma plataforma inovadora que combina tecnologia e empatia para preparar profissionais para o futuro. Em um mercado de trabalho dinâmico, ajudamos pessoas e empresas a:

- **Identificar lacunas de competências** através de análise inteligente de perfil
- **Criar trilhas de aprendizado personalizadas** adaptadas às metas individuais
- **Monitorar o equilíbrio emocional** com check-ins e sugestões de bem-estar
- **Prevenir burnout** através de acompanhamento contínuo

### Diferenciais

🎯 **Personalização Inteligente**: Recomendações baseadas em perfil, objetivos e dados de mercado

🧠 **Foco em Bem-Estar**: Módulo de saúde emocional integrado ao aprendizado

🤝 **Modelo Híbrido B2C/B2B**: Atende tanto indivíduos quanto empresas

🌱 **Alinhamento ODS**: Contribui com os Objetivos de Desenvolvimento Sustentável 4, 8 e 10 da ONU

### Problema que Resolve

Profissionais enfrentam dificuldades em:

- Identificar quais habilidades desenvolver
- Encontrar trilhas de capacitação personalizadas
- Manter equilíbrio emocional durante o aprendizado
- Lidar com burnout causado por sobrecarga

O UpPath integra essas três frentes em uma solução única e humanizada.

---

## 🛠 Tecnologias Utilizadas

### Core

- **React 19.1.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.8.3** - Superset tipado do JavaScript
- **Vite 7.1.7** - Build tool e dev server
- **TailwindCSS 4.1.13** - Framework CSS utility-first

### Roteamento e Formulários

- **React Router DOM 7.9.3** - Navegação e roteamento
- **React Hook Form 7.63.0** - Gerenciamento de formulários
- **Zod 4.1.11** - Validação de schemas

### Backend e Autenticação

- **API Java** - Backend personalizado (integração em andamento)

### UI e Ícones

- **React Icons 5.5.0** - Biblioteca de ícones
- **CSS Variables** - Tema dinâmico claro/escuro

### Desenvolvimento

- **ESLint 9.36.0** - Linter para qualidade de código
- **Prettier 3.3.3** - Formatador de código
- **TypeScript ESLint** - Regras específicas para TypeScript

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recomendado) ou npm/yarn

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/GS-UsGuri-DEV/UpPath-Front-end.git
cd UpPath-Front-end
```

2. **Instale as dependências**

```bash
pnpm install
```

ou

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=seu_project_id
VITE_APPWRITE_DATABASE_ID=seu_database_id
VITE_APPWRITE_COLLECTION_USERS=sua_collection_users
VITE_APPWRITE_COLLECTION_COMPANIES=sua_collection_companies
VITE_APPWRITE_BUCKET_ID=seu_bucket_id
```

4. **Inicie o servidor de desenvolvimento**

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

---

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (use `.env.example` como base):

```env
# API Endpoints
VITE_API_URL_JAVA=https://uppath.onrender.com
VITE_API_URL_PYTHON=https://uppath-python.onrender.com
```

---

## 🎮 Como Usar

### Acesso Local

Após a instalação, acesse `http://localhost:5173` no navegador.

### Acesso em Produção

🌐 **URL da Aplicação**: [Link](https://up-path.vercel.app)

### Funcionalidades Principais

#### 1. Cadastro e Login

- Cadastre-se como **Usuário** (CPF) ou **Empresa** (CNPJ)
- Faça login com email/CPF/CNPJ e senha
- Autenticação segura via Appwrite

#### 2. Dashboard Personalizado

- Visualize métricas de bem-estar emocional
- Acompanhe progresso nas trilhas de aprendizado
- Veja recomendações personalizadas

#### 3. Trilhas de Aprendizado

- Explore cursos recomendados baseados no seu perfil
- Acompanhe progresso em cada trilha
- Acesse conteúdos de parceiros (Coursera, Alura, FIAP ON)

#### 4. Bem-Estar Emocional

- Realize check-ins diários de humor
- Receba alertas e sugestões de pausas
- Acesse recursos de apoio emocional

#### 5. Perfil

- Gerencie suas informações pessoais
- Atualize foto de perfil
- Altere senha

---

## 📸 Screenshots

### Página Inicial

![Página Inicial - Seção Hero](docs/screenshots/Captura%20de%20tela%202025-11-24%20025212.png)

### Dashboard de Usuário

![Dashboard - Métricas e Bem-Estar](docs/screenshots/Captura%20de%20tela%202025-11-24%20025149.png)

### Perfil do Usuário

![Gerenciamento de Perfil](docs/screenshots/Captura%20de%20tela%202025-11-24%20025203.png)

### Módulo de Bem-Estar

![Bem-Estar Emocional](docs/screenshots/Captura%20de%20tela%202025-11-24%20025412.png)

### Trilhas de Aprendizado

![Trilhas de Aprendizado](docs/screenshots/Captura%20de%20tela%202025-11-24%20025119.png)

---

## 📁 Estrutura de Pastas

```
UpPath-Front-end/
├── .github/
│   └── instructions/          # Instruções e regras do projeto
├── docs/                      # Documentação adicional
├── public/                    # Arquivos estáticos
│   └── icon/                  # Ícones e imagens
├── src/
│   ├── api/                   # Configuração de APIs
│   │   ├── client.ts          # Cliente HTTP
│   │   ├── mocks/             # Dados mockados
│   │   └── services/          # Serviços de API
│   ├── components/            # Componentes reutilizáveis
│   │   ├── BemEstar/          # Componentes de bem-estar
│   │   ├── Buttons/           # Botões (tema, etc)
│   │   ├── Contato/           # Formulários de contato
│   │   ├── Cursos/            # Cards de cursos
│   │   ├── FAQ/               # Perguntas frequentes
│   │   ├── Footer/            # Rodapé
│   │   ├── Form/              # Inputs e formulários
│   │   ├── GraphicsDashboard/ # Gráficos e métricas
│   │   ├── Home/              # Seções da home
│   │   ├── NavBar/            # Barra de navegação
│   │   ├── Perfil/            # Componentes de perfil
│   │   └── Spinner/           # Loading spinner
│   ├── contexts/              # Contextos React
│   │   ├── AuthContext.tsx    # Autenticação
│   │   └── ThemeContext.tsx   # Tema claro/escuro
│   ├── data/                  # Dados estáticos
│   ├── hooks/                 # Custom hooks
│   ├── routes/                # Páginas/Rotas
│   │   ├── Cadastro/          # Página de cadastro
│   │   ├── Contato/           # Página de contato
│   │   ├── Cursos/            # Página de cursos
│   │   ├── Dashboard/         # Dashboard do usuário
│   │   ├── DashboardEmpresa/  # Dashboard empresa
│   │   ├── Dicas/             # Dicas de bem-estar
│   │   ├── Error/             # Página 404
│   │   ├── FAQ/               # FAQ
│   │   ├── Home/              # Página inicial
│   │   ├── Login/             # Página de login
│   │   ├── Perfil/            # Página de perfil
│   │   ├── Protected/         # Rota protegida usuário
│   │   ├── ProtectedAdmin/    # Rota protegida admin
│   │   ├── ProtectedCompany/  # Rota protegida empresa
│   │   └── Questionario/      # Questionário inicial
│   ├── shared/                # Utilitários compartilhados
│   │   └── appwrite.ts        # Configuração Appwrite
│   ├── types/                 # Tipos TypeScript
│   ├── App.tsx                # Componente raiz
│   ├── main.tsx               # Entry point
│   └── index.css              # Estilos globais
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
└── README.md                  # Este arquivo
```

---

## 🗺 Rotas Principais

### Rotas Públicas

| Rota        | Descrição                                  | Componente |
| ----------- | ------------------------------------------ | ---------- |
| `/`         | Página inicial com apresentação do projeto | `Home`     |
| `/login`    | Autenticação de usuários e empresas        | `Login`    |
| `/cadastro` | Registro de novos usuários/empresas        | `Cadastro` |
| `/faq`      | Perguntas frequentes                       | `FAQ`      |
| `/contato`  | Formulário de contato                      | `Contato`  |
| `/cursos`   | Catálogo de cursos e trilhas               | `Cursos`   |
| `/dicas`    | Dicas de bem-estar e desenvolvimento       | `Dicas`    |

### Rotas Protegidas (Requer Login - Usuário)

| Rota            | Descrição                             | Componente     |
| --------------- | ------------------------------------- | -------------- |
| `/dashboard`    | Dashboard com métricas personalizadas | `Dashboard`    |
| `/perfil`       | Gerenciamento de perfil do usuário    | `Perfil`       |
| `/questionario` | Questionário de perfil profissional   | `Questionario` |

### Rotas Protegidas (Requer Login - Empresa)

| Rota                 | Descrição                                    | Componente         |
| -------------------- | -------------------------------------------- | ------------------ |
| `/dashboard-empresa` | Dashboard corporativo com métricas de equipe | `DashboardEmpresa` |

### Rota de Erro

| Rota | Descrição                   | Componente |
| ---- | --------------------------- | ---------- |
| `*`  | Página 404 - Não encontrado | `Error404` |

### Navegação Dinâmica

- NavBar ocultada nas rotas `/login` e `/cadastro`
- Redirecionamento automático para login em rotas protegidas
- Proteção de rotas baseada no tipo de conta (usuário/empresa)

---

## 👥 Autores e Créditos

### Equipe de Desenvolvimento

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/alex-isidro">
        <img src="https://github.com/alex-isidro.png" width="100px;" alt="Alexander Dennis"/><br>
        <sub><b>Alexander Dennis Isidro Mamani</b></sub>
      </a><br>
      <sub>RM: 565554 | Turma: 1TDSPG</sub><br>
      <a href="https://github.com/alex-isidro">GitHub</a> •
      <a href="https://www.linkedin.com/in/alexander-dennis-a3b48824b/">LinkedIn</a>
    </td>
    <td align="center">
      <a href="https://github.com/KelsonZh0">
        <img src="https://github.com/KelsonZh0.png" width="100px;" alt="Kelson Zhang"/><br>
        <sub><b>Kelson Zhang</b></sub>
      </a><br>
      <sub>RM: 563748 | Turma: 1TDSPG</sub><br>
      <a href="https://github.com/KelsonZh0">GitHub</a> •
      <a href="https://www.linkedin.com/in/kelson-zhang-211456323/">LinkedIn</a>
    </td>
    <td align="center">
      <a href="https://github.com/PxS00">
        <img src="https://github.com/PxS00.png" width="100px;" alt="Lucas Rossoni"/><br>
        <sub><b>Lucas Rossoni Dieder</b></sub>
      </a><br>
      <sub>RM: 563770 | Turma: 1TDSPG</sub><br>
      <a href="https://github.com/PxS00">GitHub</a> •
      <a href="https://www.linkedin.com/in/lucas-rossoni-dieder-32242a353/">LinkedIn</a>
    </td>
  </tr>
</table>

### Instituição

**FIAP - Faculdade de Informática e Administração Paulista**

Projeto desenvolvido para a **Global Solution 2025** - Disciplina de Front-End Design Engineering

---

## 🔗 Links Importantes

### Repositórios do Projeto

| Repositório       | Descrição                    | Link                                                                           |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| **Front-End**     | Interface React + TypeScript | [GitHub - UpPath-Front-end](https://github.com/GS-UsGuri-DEV/UpPath-Front-end) |
| **Back-End Java** | API RESTful em Java          | [Link](https://uppath.onrender.com)                                            |

### Recursos Externos

- 📺 **Vídeo de Apresentação no YouTube**: [[Link](https://youtu.be/RbAHpjLfbgQ)]
- 🌐 **Deploy na Vercel**: [https://up-path.vercel.app]

### Tecnologias e Documentações

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [React Router Documentation](https://reactrouter.com/)

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte da **Global Solution 2025 da FIAP**.

**MIT License** - Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🌟 Alinhamento com os ODS da ONU

O UpPath contribui diretamente com:

- **ODS 4** - Educação de Qualidade: Acesso a aprendizado personalizado e contínuo
- **ODS 8** - Trabalho Decente e Crescimento Econômico: Desenvolvimento de competências profissionais
- **ODS 10** - Redução das Desigualdades: Democratização do acesso à capacitação

---

<div align="center">

**Desenvolvido com 💙 pela equipe UpPath**

**FIAP - Global Solution 2025**

[⬆ Voltar ao topo](#uppath---plataforma-de-desenvolvimento-profissional-e-bem-estar)

</div>
