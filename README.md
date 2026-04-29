# ☠ One Piece Wiki — O Mundo dos Piratas

Projeto de treinamento desenvolvido durante as aulas com o Prof. Jeofton Costa.  
Uma wiki interativa do universo **One Piece**, consumindo a [api-onepiece.com](https://api.api-onepiece.com/v2) para exibir personagens, Akuma no Mi, tripulações e sagas.
<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/1ad56672-3948-4508-8d6a-8ece9f32a69d" />


---

## Funcionalidades

- **Personagens** — listagem com busca por nome, função ou tripulação, paginação com "Carregar mais"
- **Akuma no Mi** — cards com filtro por tipo (Paramecia, Zoan, Logia)
- **Tripulações** — destaque visual para tripulações Yonko
- **Sagas** — linha do tempo cronológica com capítulos, episódios e volumes
- **Estatísticas** — contadores no hero carregados da API em tempo real
- **Design responsivo** — mobile-first com breakpoints para tablet e desktop
- **Animações** — fade-in com Intersection Observer e skeletons de carregamento
- **Acessibilidade** — roles ARIA, labels e navegação por teclado

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Marcação | HTML5 semântico |
| Estilo | CSS3 (Custom Properties, Grid, Flexbox, `clamp()`) |
| Lógica | JavaScript ES2022 (Vanilla, `async/await`, `Promise.all`) |
| Dados | [One Piece API v2](https://api.api-onepiece.com/v2) |
| Fontes | Google Fonts — Cinzel + Inter |

---

## Como executar

O projeto é **100% frontend** — não precisa de servidor, build ou dependências.

### Opção 1 — Abrir diretamente no navegador

```bash
# Clone o repositório
git clone https://github.com/eduardohcvm/One_piece_project_jeofton.git

# Acesse a pasta
cd One_piece_project_jeofton

# Abra o arquivo no navegador
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Opção 2 — Live Server (recomendado para desenvolvimento)

Se usar **VS Code**, instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer):

1. Abra a pasta no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione **"Open with Live Server"**
4. O navegador abrirá em `http://127.0.0.1:5500`

### Opção 3 — http-server (Node.js)

```bash
# Instale o servidor (apenas uma vez)
npm install -g http-server

# Execute na raiz do projeto
http-server .

# Acesse em http://localhost:8080
```

> **Nota:** A aplicação consome a API `https://api.api-onepiece.com/v2`. Certifique-se de estar conectado à internet.

---

## Estrutura do projeto

```
One_piece_project_jeofton/
├── index.html        # Estrutura HTML da aplicação
├── css/
│   └── style.css     # Estilos — design system, layout, componentes
└── js/
    └── app.js        # Lógica — integração com API, renderização, eventos
```

---

## Capturas de tela

| Seção | Descrição |
|-------|-----------|
| Hero | Banner com estatísticas do universo carregadas da API |
| Personagens | Grid com busca e paginação |
| Akuma no Mi | Cards com filtro por tipo de fruta |
| Tripulações | Cards com destaque para Yonko |
| Sagas | Linha do tempo cronológica |

---

## API utilizada

[**api-onepiece.com**](https://api.api-onepiece.com/v2) — API pública e gratuita com dados do universo One Piece.

Endpoints consumidos:

```
GET /v2/characters/en
GET /v2/fruits/en
GET /v2/crews/en
GET /v2/sagas/en
GET /v2/characters/en/count
GET /v2/fruits/en/count
GET /v2/crews/en/count
GET /v2/sagas/en/count
```

---

## Créditos

- **One Piece** © Eiichiro Oda / Shueisha — site fan-made para fins educacionais
- Dados fornecidos por [api-onepiece.com](https://api-onepiece.com)
- Desenvolvido como projeto de treinamento — **Prof. Jeofton Costa**
