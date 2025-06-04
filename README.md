FelMon Solutions
Sistema completo de gestão para bares e estabelecimentos, com painel de funcionário (PDV) e painel de dono (dashboard mobile), desenvolvido em React (frontend) e Node.js/TypeScript (backend). O sistema inclui funcionalidades de login, cadastro de produtos, controle de estoque, carrinho de pedidos integrado com maquininhas de pagamento e relatórios.

📋 Índice
Tecnologias Utilizadas
Funcionalidades Principais
Estrutura de Pastas
Pré-requisitos
Instalação e Configuração
Configurar o Backend
Configurar o Frontend
Scripts Disponíveis

Como Usar

1. Cadastro de Usuário

2. Login e Perfis

3. Painel de Funcionário (PDV)

4. Painel do Dono (Dashboard Mobile)
Personalizações
Favicon
Logo
Roadmap Futuro
Licença

🛠️ Tecnologias Utilizadas
Backend
Node.js
TypeScript
Express
Prisma ORM (com SQLite em modo desenvolvimento)
JWT (JsonWebToken) para autenticação
cors
ts-node-dev (para desenvolvimento em modo watch)
Frontend
React (Vite + TypeScript)
Tailwind CSS (configuração de temas claro/escuro)
Lucide Icons (ícones)
Fetch API para consumo da API REST
React Router (opcional, pode ser adicionado para rotas protegidas)
Ferramentas de Build / Configuração
Vite (bundler frontend)
PostCSS + Tailwind CSS (para gerar utilitários de estilo)
ESLint + Prettier (configurações básicas de lint e formatação)
Husky (hooks de Git – opcional)



✨ Funcionalidades Principais

Autenticação
Login de “Admin” (dono) e “Employee” (funcionário)
Armazenamento de token JWT no localStorage
Painel de Funcionário (PDV)
Busca de produtos por nome ou código de barras
Adição de itens ao carrinho e manipulação de quantidade
Remoção automática do item quando quantidade chega a zero
Botão “Finalizar Pedido” (simula pagamento via maquininhas)
Botão “Cancelar Pedido” (limpa o carrinho instantaneamente)
Exibição de total e status de pagamento (aguardando, aprovado)
Painel do Dono (Dashboard Mobile)
Exibição de relatórios de venda (diário, semanal, mensal)
Controle de estoque (visualização de níveis, alertas de estoque baixo)
Importação de nota fiscal (em JPG/PNG/PDF) com OCR simulado (MVP)
Ranking de funcionários baseado nos logs de venda (ex.: top vendedores)
Diferenciação de permissões:
Admin (dono): pode cadastrar/editar produtos, ver relatórios e histórico
Employee (funcionário): apenas faz pedidos via PDV, sem acesso a relatórios
Gerenciamento de Produtos
CRUD de produtos (nome, preço, categoria, estoque)
Leitura do estoque em tempo real
Filtragem e ordenação por categoria, nome, preço
Controle de Usuários e Logs
Registro de ações (criação de venda, alteração de estoque) no banco logs
Tela de “Extrato” para visualizar todas as atividades


✅ Pré-requisitos
Antes de começar, certifique-se de ter instalado:
Node.js (versão 16+ recomendada)
npm (ou Yarn, mas as instruções aqui usam npm)
Git (opcional, para clonagem)

⚙️ Instalação e Configuração
A seguir, passo a passo para deixar tudo rodando localmente.

1. Clonar o Repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo/felmon.solution.app
2. Configurar o Backend
Entre na pasta backend/:

bash
Copiar
Editar
cd backend
Instale as dependências:

bash
Copiar
Editar
npm install
Copie o arquivo de ambiente de exemplo e ajuste variáveis:

bash
Copiar
Editar
cp .env.example .env
Edite o .env com as variáveis necessárias, por exemplo:

env
Copiar
Editar
DATABASE_URL="file:./dev.db"        # Usa SQLite local em dev
JWT_SECRET="umSegredoMuitoSecreto"   # Para gerar/validar tokens
Gere o cliente Prisma e rode as migrações:

bash
Copiar
Editar
npx prisma migrate dev --name init
npx prisma generate
Inicie o backend em modo de desenvolvimento (reload automático):

bash
Copiar
Editar
npm run dev
Por padrão, o servidor deve subir em http://localhost:4000.

Encerre com Ctrl + C.

3. Configurar o Frontend
Abra uma nova aba/terminal e vá para a pasta raiz do frontend:

bash
Copiar
Editar
cd ../               # Se estiver em backend/, volte para felmon.solution.app
cd frontend          # ou apenas `cd .` se seu package.json já estiver na raiz
Instale as dependências:

bash
Copiar
Editar
npm install
Verifique (ou crie) o arquivo de configuração do Tailwind:

tailwind.config.js:

js
Copiar
Editar
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
postcss.config.js:

js
Copiar
Editar
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
Inicie o frontend em modo de desenvolvimento:

bash
Copiar
Editar
npm run dev
O Vite irá rodar em http://localhost:5173 (ou porta indicada no terminal).
Você deverá ver a tela de login no navegador.


📦 Scripts Disponíveis
Backend (dentro de backend/)
npm run dev
Roda o servidor Node/Express em modo desenvolvimento (via ts-node-dev).

npm run build
Compila todos os arquivos TypeScript (src/) para JavaScript em dist/.

npm run start
Inicia o servidor gerado em dist/server.js (node dist/server.js) para produção.

npx prisma migrate dev --name <nome>
Cria/atualiza migração e aplica no banco (geralmente SQLite no ambiente dev).

npx prisma studio
Abre o Prisma Studio para visualizar/editar dados diretamente.

Frontend (na raiz do projeto ou dentro de frontend/)
npm run dev
Inicia o servidor de desenvolvimento (Vite) e faz hot reload.

npm run build
Gera build otimizado para produção dentro de dist/.

npm run preview
Serve o build estático gerado em modo preview (útil para testar antes de deploy).



🚀 Como Usar
1. Cadastro de Usuário
Não há tela de cadastro público no MVP, então insira manualmente um usuário no banco via Prisma Studio ou pela API (rota protegida). Exemplo de mutation/prisma:

ts
Copiar
Editar
// No Prisma Studio (Node REPL) ou seed script:
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '<hash_da_senha>',
      role: 'owner', // ou 'employee'
    },
  });
}

main();
Você pode implementar futuramente uma rota POST /api/register.

2. Login e Perfis
Abra http://localhost:5173 no navegador.
Escolha o perfil (Admin ou Funcionário) e preencha “Usuário” e “Senha”.
O frontend envia POST /api/login:

json
Copiar
Editar
{
  "username": "admin",
  "password": "123456",
  "role": "owner"
}
Se válido, o backend retorna:

json
Copiar
Editar
{
  "token": "<JWT>",
  "role": "owner",
  "username": "admin"
}
O frontend armazena o token e redireciona para:
Admin → Dashboard do Dono (DonoDashboard.tsx)
Employee → Tela de PDV (EmployeeOrders.tsx)

3. Painel de Funcionário (PDV)
Busca de produtos: digite parte do nome ou o código de barras → lista filtrada de cards de produto.
Adicionar ao Carrinho: clique no card para inserir 1 unidade; clicar novamente soma +1.
Manipular Quantidade:
Botão “–”: reduz 1 unidade. Se chegar a zero, o item é removido do carrinho.
Botão “+”: aumenta 1 unidade.
Total: soma price × quantity de todos os itens no carrinho.
Finalizar Pedido: inicia o fluxo de pagamento (status “waiting” → “approved” → limpa carrinho).
Cancelar Pedido: limpa o carrinho imediatamente (volta para “Carrinho vazio”).

4. Painel do Dono (Dashboard Mobile)
Relatórios de Vendas: exibição de totais diários, semanais e mensais (gráficos com Chart.js ou Recharts).
Controle de Estoque: lista produtos e quantidades, alerta em estoque baixo.
Importação de Nota Fiscal: botão “Importar Nota” (abre modal para upload de imagem/PDF). Futuramente, OCR converte nota em itens e atualiza automaticamente o estoque.
Ranking de Funcionários: ranking por nº de vendas (consulta logs armazenados).
Permissões: apenas o “owner” consegue ver essas telas; “employee” não tem acesso.



🎨 Personalizações
Favicon
Crie uma pasta public/ na raiz do frontend (mesmo nível de index.html).

Coloque o arquivo favicon.ico (ou favicon.png, favicon.svg) dentro de public/.

Adicione no <head> do index.html:

html
Copiar
Editar
<link rel="icon" href="/favicon.ico" />
Reinicie npm run dev e faça um Hard Refresh no navegador.

Logo
Adicione a imagem do logo em src/assets/ (por exemplo, src/assets/logo.png).

No componente LoginScreen.tsx, importe:

ts
Copiar
Editar
import logo from '../assets/logo.png';
Substitua a tag <img src="/lovable-uploads/..." ... /> por:

tsx
Copiar
Editar
<img src={logo} alt="Logo do Sistema" className="w-full h-full object-contain" />
O Vite irá processar e exibir o novo logo quando você recarregar a aplicação.

🚧 Roadmap Futuro
Autenticação Completa:
Tela de cadastro (admin cria novos usuários).
Reset de senha e recuperação por e-mail.
Integração com OCR:
Permitir upload direto de imagem/PDF de nota fiscal e extrair itens com um serviço de OCR (Google Vision, Tesseract, etc.).
Integração Real de Pagamento:
Conectar com APIs oficiais das maquininhas (Rede, Cielo, Stone, PagSeguro) para envio automático do valor e descrição do pedido.
Multiunidades:
Centralizar dados de estoque e vendas de várias franquias em um único painel administrativo.
Permitir que o dono veja relatórios consolidados e altere preços/estoque globalmente.
Relatórios Avançados:
Exportar CSV/Excel/PDF a partir do dashboard.
Integração com Google Sheets / Google Data Studio.
Gráficos de rentabilidade por produto, margem de lucro, etc.
Permissões Granulares:
Níveis de usuário (Gerente, Suporte, Estoquista).
Controle de ações (quem pode cancelar venda, reembolsar, alterar estoque manualmente).


📄 Licença
Este projeto está licenciado sob a MIT License.
Desenvolvido por FelMon Solutions

