# DIRETIVAS GERAIS PARA A LLM (COPILOT)

- **Objetivo:** Guiar o desenvolvimento de um desafio técnico para vaga de Frontend Engineer usando a API do YouTube.
- **Foco:** Seguir estritamente os requisitos do README, equilibrando velocidade com código sênior e boas práticas.
- **Stack:** Aderir 100% à stack definida nos requisitos técnicos obrigatórios.
- **Restrições:** Não sugerir bibliotecas ou abordagens fora da stack obrigatória, nem criar arquivos markdown de documentação adicional. Atualizaremos somente o README.md conforme necessário.
---

# CONTEXTO DO PROJETO E OBJETIVO

**Projeto:** Desafio Técnico de Frontend (Vaga: Frontend Engineer - Bycoders).
**Objetivo:** Criar uma aplicação de plataforma de vídeos utilizando a YouTube Data API v3.
**Restrição Principal:** Seguir _estritamente_ a stack de requisitos técnicos obrigatórios e implementar todos os requisitos funcionais esperados.

---

# REQUISITOS OBRIGATÓRIOS

O sucesso deste desafio depende de cumprir 100% dos seguintes requisitos.

## Requisitos Funcionais Obrigatórios

A aplicação _deve_ ter:

- Mecanismo para o usuário poder pesquisar vídeos
- Home page que exiba conteúdo interessante para uma plataforma de vídeos
- Estrutura de gerência do estado da aplicação (Context API)
- Histórico das buscas realizadas (persistir localmente no Local Storage ou Cookies)

## Requisitos Extras (Opcionais)

- Permitir cadastro de usuário / login através da API do YouTube + OAuth2
- Permitir upload de vídeo para a API do YouTube

## Requisitos Técnicos Obrigatórios

A stack _deve_ ser:

- **Next.js** (App Router)
- **TypeScript**
- **Context API** utilizando `useReducer`
- **Axios**
- **Tailwind CSS v4**
- **React Hook Form**
- **Yup** (validação de formulários)
- **Shadcn UI** (componentes de UI)
- **README.md** com instruções de instalação e execução.

---

# ESTRATÉGIA E DIRETIVAS DE ARQUITETURA

Para equilibrar velocidade e qualidade, seguiremos uma arquitetura baseada em features do Next.js.

## Padrões Técnicos Chave

Siga estes padrões para implementar a stack obrigatória:

- **Framework:**
  - Use **Next.js 15** com **App Router**.
  - Use Server Components quando possível e Client Components ('use client') quando necessário (ex: interatividade, hooks, Context).

- **UI:**
  - Use **Tailwind CSS v4** para todo o estilo.
  - Use **Shadcn UI** para componentes de UI (Button, Input, Card, etc). Ele é construído sobre Tailwind e acelera o desenvolvimento.

- **Gerenciamento de Estado:**
  - **Server State (API):** Use **Axios** diretamente ou com hooks customizados para data fetching da API do YouTube.
  - **Client State (Global):** Use **Context API + `useReducer`** para o histórico de buscas. O Provider deve ler/escrever no Local Storage usando `useEffect`.

- **Formulários e Validação:**
  - Use **React Hook Form** para formulários (busca, upload, etc).
  - Use **Yup** para a validação de esquema (via `@hookform/resolvers/yup`).

- **API do YouTube:**
  - Configure a API Key nas variáveis de ambiente (`.env.local`).
  - Use Axios para fazer as requisições.

- **Qualidade de Código:**
  - Configure **ESLint + Prettier** (já configurado no projeto).
  - Escreva código limpo e componentizado.
  - Use TypeScript de forma efetiva com tipos bem definidos.
  - Adicione testes se possível (Cypress já está configurado).

---
