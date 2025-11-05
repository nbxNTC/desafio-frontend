# DIRETIVAS GERAIS PARA A LLM (COPILOT)

- **Objetivo:** Guiar o desenvolvimento de um desafio técnico para vaga de Frontend Engineer usando a API do YouTube.
- **Foco:** Seguir estritamente os requisitos do README, equilibrando velocidade com código sênior e boas práticas.
- **Stack:** Aderir 100% à stack definida nos requisitos técnicos obrigatórios.
- **Restrições:** Não sugerir bibliotecas ou abordagens fora da stack obrigatória, nem criar arquivos markdown de documentação adicional. Atualizaremos somente o README.md conforme necessário.

## ⚠️ REGRA CRÍTICA: ESCOPO DE ALTERAÇÕES

**IMPORTANTE:** Altere APENAS o que foi EXPLICITAMENTE solicitado pelo usuário.

- ❌ **NÃO faça alterações "extras"** ou "melhorias" não solicitadas
- ❌ **NÃO remova arquivos** a menos que seja explicitamente pedido
- ❌ **NÃO refatore código** que não foi mencionado na solicitação
- ❌ **NÃO adicione funcionalidades** além do que foi pedido
- ✅ **Faça SOMENTE** o que foi requisitado, nada mais, nada menos
- ✅ **Pergunte** se tiver dúvidas sobre o escopo da alteração

**Exemplo:**
- Se pedirem para "ajustar a função X", ajuste APENAS a função X
- Se pedirem para "mover código de A para B", mova APENAS o código especificado
- Se pedirem para "adicionar validação no formulário", adicione APENAS essa validação

---

# CONTEXTO DO PROJETO E OBJETIVO

**Projeto:** Desafio Técnico de Frontend (Vaga: Frontend Engineer - Bycoders).
**Objetivo:** Criar uma aplicação de plataforma de vídeos utilizando a YouTube Data API v3.
**Restrição Principal:** Seguir _estritamente_ a stack de requisitos técnicos obrigatórios e implementar todos os requisitos funcionais esperados.

---

# CHECKLIST PARA DESENVOLVIMENTO DE NOVAS FEATURES

Ao desenvolver qualquer nova funcionalidade, **SEMPRE** verifique os seguintes pontos:

## 📋 Validação e Schemas
- ✅ **Schemas Yup:** Se a feature envolve formulários ou validação de dados, crie schemas do Yup na pasta `/lib/form/schemas/` ou similar.

## 🪝 Custom Hooks
- ✅ **Hooks Personalizados:** Abstraia a lógica complexa dos componentes e páginas criando custom hooks na pasta `/hooks/`.
  - Data fetching, manipulação de estado, side effects devem estar em hooks reutilizáveis.

## 🔌 Services
- ✅ **Services Layer:** Para chamadas de API ou lógica de negócio:
  - Crie novos services na pasta `/services/` quando necessário.
  - Ou adicione novas funções aos services já existentes para manter a organização.

## 📝 TypeScript Types
- ✅ **Tipos e Interfaces:** Sempre defina tipos adequados na pasta `/types/` para:
  - Request/Response de APIs
  - Tipos específicos de componentes
  - Entidades de domínio

## 🌐 API Configuration
- ✅ **Configuração de APIs:** Se a feature usa uma nova API externa:
  - Configure a instância do Axios em `/lib/apis/`
  - Mantenha a configuração centralizada (baseURL, headers, interceptors)

## 🔢 Constants
- ✅ **Constantes:** Evite magic numbers/strings no código:
  - Cadastre todas as constantes na pasta `/constants/`
  - URLs, chaves de configuração, valores fixos devem estar centralizados

## ⚛️ Component Architecture
- ✅ **Server Components First:**
  - **Preferência:** Use Server Components por padrão para melhor performance
  - **Client Components:** Use `'use client'` **APENAS** quando necessário:
    - Uso de Context API ou Providers
    - Interatividade (onClick, onChange, etc)
    - React Hooks (useState, useEffect, etc)
    - Animações e bibliotecas client-side

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

- **Idioma e Nomenclatura:**
  - **Todos os comentários no código devem ser escritos em inglês.**
  - **Todos os nomes de componentes, funções, variáveis e tipos devem estar em inglês.**
  - **Todos os textos de interface, validações e mensagens de erro devem estar em inglês.**
  - Mantenha consistência linguística em toda a aplicação.

---
