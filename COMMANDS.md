# Comandos úteis — frets.dev

Referência rápida para configurar o ambiente e rodar o projeto. Execute na ordem que fizer sentido para você.

---

## Node (nvm)

Instala a versão LTS indicada e define essa versão como padrão em novos shells, para o `node` e o `npm` ficarem alinhados com o projeto.

```bash
nvm install lts/krypton
nvm alias default lts/krypton
```

---

## Projeto npm

Inicializa o `package.json` (se ainda não existir), instala o runtime do Next/React e as ferramentas de formatação e teste usadas no repositório.

```bash
npm init
npm install next react react-dom
npm install --save-dev prettier jest @swc/jest @swc/core dotenv
```

---

## Git

Abre o editor escolhido sempre que o Git pedir mensagem de commit ou rebase (por exemplo `git commit` sem `-m`).

```bash
git config --global core.editor "cursor --wait"
```

---

## Editor (Cursor / VS Code)

Ajustes no próprio editor para manter indentação e estilo de código iguais entre máquinas e formatar ao salvar, sem depender só da linha de comando.

Tarefas manuais:

- Instalar extensão **EditorConfig** e criar/editar `.editorconfig`.
- Instalar extensão **Prettier**.
- Definir o Prettier como formatador padrão.
- Ativar **Format on Save**.
- Desativar **Autosave** (se preferir salvar só quando quiser).

---

## Pastas do repositório

Documenta onde costuma ficar cada parte do app (rotas, testes, infraestrutura e domínio), para quem clona o repo achar arquivos com mais facilidade.

Convenção esperada: `pages`, `tests`, `infra`, `models` (e o que mais o projeto usar).

---

## Arquivos de configuração na raiz

Trechos do que cada arquivo faz neste repositório (todos ficam na pasta do projeto, salvo indicação em contrário).

### `.nvmrc`

Indica **qual versão do Node** o projeto espera (aqui: `lts/krypton`). Com o nvm instalado, em cada clone você pode rodar `nvm install` e `nvm use` na raiz para alinhar com o time e com o CI.

### `jsconfig.json`

Configuração do **JavaScript no editor** e do **Next.js**: `baseUrl: "."` e **`paths`** com `@/*` apontando para a raiz do projeto — imports como `@/infra/database.js`. O **Jest** repete só essa mesma regra em `moduleNameMapper` (não dá para ler `jsconfig` automaticamente).

### `jest.config.cjs`

Configura o **Jest**: arquivos `tests/**/*.test.js`, ambiente Node, timeout, **`@swc/jest`** para aceitar `import`/`export` nos testes sem Babel, e **`moduleNameMapper`** com uma única regra `^@/(.*)$` — o mesmo alias **`@/*`** definido em **`jsconfig.json`** (`paths`), para não manter imports duplicados por ferramenta.

No topo do arquivo, **`dotenv`** carrega **`.env`** e **`.env.development`**, para `process.env` nos testes bater com o Compose e com o app em desenvolvimento (sem `setupFilesAfterEnv` só para isso).

### `.editorconfig`

Define regras **mínimas e neutras ao editor** (aqui: indentação com espaços, tamanho 2). Quem instala a extensão EditorConfig passa a respeitar isso automaticamente, reduzindo diffs só por estilo.

### `.env.development`

Arquivo de variáveis para o modo **`development`**. O sufixo **`.development`** existe porque ferramentas como **Next.js** e **Vite** carregam, em desenvolvimento, arquivos específicos desse modo (`.env.development`, `.env.development.local`) em vez de misturar tudo com produção.

Neste projeto, o mesmo conjunto de valores usado no app em dev também é referenciado por:

- **`infra/compose.yaml`** — o serviço Postgres usa `env_file: ../.env.development`, ou seja, as credenciais/porta do container vêm desse arquivo na raiz.
- **`jest.config.cjs`** (bloco inicial com `dotenv`) — o mesmo carregamento de `.env` / `.env.development` para a suíte de testes.

**Boas práticas:** não commite segredos reais; use `.env.example` como modelo e mantenha arquivos sensíveis fora do Git se necessário. Em CI, prefira **secrets** e `env:` no workflow em vez de depender de um `.env` no repositório.

---

## Docker (Postgres)

Sobe o banco (e o que mais estiver no compose) com a mesma configuração em qualquer máquina; o segundo comando roda em background e força recriação dos containers quando você mudar a definição.

Criar/usar `infra/compose.yaml`, depois:

```bash
docker compose -f infra/compose.yaml up
```

Subir em segundo plano e recriar containers:

```bash
docker compose -f infra/compose.yaml up --detach --force-recreate
```

---

## Cliente Postgres no Mac (`psql`)

Instala só as ferramentas de linha de comando do PostgreSQL (incluindo `psql`) para conectar ao container ou a outro host sem passar pelo app Node.

O pacote no Homebrew é `libpq` (inclui `psql`), não `psql`:

```bash
brew install libpq
```

Depois siga o hint do `brew` para colocar o `bin` no `PATH` (em Apple Silicon costuma ser `/opt/homebrew/opt/libpq/bin`).

---

## Testes

Roda a suíte uma vez (`npm test`) ou fica observando arquivos e reexecutando testes ao salvar (`test:watch`).

```bash
npm test
npm run test:watch
```

---

## App Next.js

Inicia o servidor de desenvolvimento do Next com hot reload, normalmente em `http://localhost:3000`.

```bash
npm run dev
```
