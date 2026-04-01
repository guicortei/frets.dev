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
npm install --save-dev prettier vitest
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
