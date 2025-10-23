# Dashboard Financeiro

Um dashboard financeiro completo e responsivo construído com Next.js, Prisma e PostgreSQL (Neon).

## 🚀 Funcionalidades

- **Autenticação**: Login com Google, GitHub ou credenciais
- **Gestão de Transações**: Adicionar, editar e excluir receitas e despesas
- **Categorização**: Organize transações por categorias personalizáveis
- **Visualizações**: Gráficos de despesas por categoria e receitas vs despesas
- **Resumo Financeiro**: Saldo total, receitas, despesas e dados mensais
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Interface Moderna**: UI/UX intuitiva com componentes reutilizáveis

## 🛠️ Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Prisma** - ORM para banco de dados
- **PostgreSQL (Neon)** - Banco de dados em nuvem
- **NextAuth.js** - Autenticação
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd dashboard-finance
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `env.example` para `.env.local` e configure:

```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"

# OAuth Providers (opcional)
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"
GITHUB_CLIENT_ID="seu-github-client-id"
GITHUB_CLIENT_SECRET="seu-github-client-secret"
```

### 4. Configure o banco de dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Aplicar as migrações
npx prisma db push

# (Opcional) Abrir o Prisma Studio
npx prisma studio
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🗄️ Configuração do Banco de Dados

### Neon PostgreSQL

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Copie a string de conexão e adicione ao `.env.local`

### Schema do Banco

O projeto inclui um schema completo com:

- **Users**: Usuários do sistema
- **Categories**: Categorias para transações
- **Transactions**: Transações financeiras
- **Accounts/Sessions**: Autenticação (NextAuth)

## 🔐 Configuração de Autenticação

### Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Adicione `http://localhost:3000/api/auth/callback/google` como URI de redirecionamento

### GitHub OAuth

1. Acesse [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Clique em "New OAuth App"
3. Preencha os dados:
   - Application name: Dashboard Financeiro
   - Homepage URL: http://localhost:3000
   - Authorization callback URL: http://localhost:3000/api/auth/callback/github

## 📱 Responsividade

O dashboard é totalmente responsivo e funciona em:

- **Desktop**: Layout completo com sidebar e múltiplas colunas
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Interface mobile-first com navegação por abas

## 🎨 Personalização

### Cores e Temas

O projeto usa CSS custom properties para fácil personalização:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96%;
  /* ... outras variáveis */
}
```

### Componentes

Todos os componentes estão em `components/ui/` e podem ser reutilizados:

- Button
- Card
- Input
- Select
- Dialog
- E mais...

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean
- AWS
- E mais...

## 📊 Estrutura do Projeto

```
dashboard-finance/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticação
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   └── dashboard.tsx     # Componente principal
├── lib/                  # Utilitários
│   ├── auth.ts           # Configuração NextAuth
│   ├── prisma.ts         # Cliente Prisma
│   └── utils.ts          # Funções utilitárias
├── prisma/               # Schema e migrações
│   └── schema.prisma     # Schema do banco
└── public/               # Arquivos estáticos
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Confirme se as variáveis de ambiente estão configuradas
3. Verifique se o banco de dados está acessível
4. Abra uma issue no GitHub

## 🎯 Próximos Passos

- [ ] Relatórios em PDF
- [ ] Metas financeiras
- [ ] Notificações por email
- [ ] App mobile (React Native)
- [ ] Integração com bancos
- [ ] Análise de tendências
- [ ] Backup automático
- [ ] Múltiplas moedas

---

Desenvolvido com ❤️ usando Next.js, Prisma e PostgreSQL.
