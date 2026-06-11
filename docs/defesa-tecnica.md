# Defesa Técnica do Projeto Integrador — One Piece Wiki
**Disciplina:** Aplicações para Internet — HTML5 e CSS3 · **Prof. Jeofton Costa**

Respostas ao Banco de Perguntas Técnicas (P1–P8), com decisão + razão +
trade-off e a localização exata no código.

---

## P1 — Se o cliente mudar a cor primária da marca, quantos arquivos CSS precisam ser editados? `(C2 — Sistema de tokens)`

**Resposta: apenas 1 arquivo (`css/tokens.css`), em 2 linhas.**

A cor dourada da marca vive em duas linhas primitivas:

- `css/tokens.css:35` → `--gold-500: #f5c518;` (valor hex)
- `css/tokens.css:61` → `--rgb-gold: 245 197 24;` (canais RGB, usados em transparências)

Todo o resto do projeto consome a camada **semântica** `--clr-gold`
(`css/tokens.css:143`), que aponta para `--gold-500`. Nenhum componente
referencia o hex diretamente. Os efeitos com transparência (hover, glow,
focus) usam `rgb(var(--rgb-gold) / α)`, então também herdam a troca.

- **Decisão:** dois níveis de token (primitivo + semântico).
- **Razão:** centraliza o controle da marca em um único ponto.
- **Trade-off:** uma camada extra de indireção (`--clr-gold → --gold-500`),
  que custa uma linha de leitura a mais, mas elimina o risco de
  inconsistência ("find & replace" de hex espalhado por 5 arquivos).

---

## P2 — Por que você usou `@container` aqui em vez de `@media`? `(C3 — Responsividade avançada)`

**Resposta: porque o grid de cards deve reagir ao espaço do seu contêiner, não ao tamanho do viewport.**

- `css/components.css:236` → `.section` declara `container-type: inline-size; container-name: section-ct;`
- `css/components.css:280` → `.cards-grid` também é um contêiner (`cards-ct`).
- `css/responsive.css:70,74,79` → as colunas (1→2→3→4) são decididas por
  `@container section-ct (min-width: …)`, não por `@media`.

- **Decisão:** Container Queries para o número de colunas dos cards.
- **Razão:** o mesmo `.cards-grid` pode aparecer em uma seção full-width ou,
  amanhã, numa sidebar estreita. Com `@media`, ele olharia para a janela e
  quebraria dentro da sidebar. Com `@container`, ele se adapta ao espaço real
  que recebeu — é um componente **portável** (CDD).
- **Trade-off:** Container Queries são CSS recente; em navegadores muito
  antigos caem no layout base (1 coluna mobile-first), o que é uma degradação
  graciosa aceitável.

> Observação: ainda uso `@media` para o que é genuinamente dependente do
> dispositivo — `@media (min-width: 1600px)` para legibilidade em projetor
> (`css/responsive.css:64`) e `@media (prefers-reduced-motion)` para
> acessibilidade (`css/responsive.css:85`). A escolha é por ferramenta certa
> para cada caso.

---

## P3 — Qual componente você mais se orgulha e por que ele é bem construído? `(C4, C5)`

**Resposta: o `.char-card` (Card de Personagem).**

Documentação e código em `css/components.css:283` (cabeçalho `@component
CharCard`) e regras a partir da linha ~400.

Por que é bem construído:
1. **100% tokenizado** — cores, espaços, raios e sombras vêm de tokens
   semânticos; zero valores hardcoded.
2. **Três estados cobertos e documentados** — `default`, `:hover`
   (`css/components.css:403`) e `:focus-within` (`css/components.css:405`),
   este último garante feedback visual para quem navega por teclado.
3. **API explícita** — o cabeçalho `@component` declara `@tokens-consumed`,
   `@states` e `@variants`, então outro dev usa o card só lendo o topo.
4. **Variantes de status** semânticas (`--alive`, `--dead`, `--unknown`) com
   tokens de fundo dedicados (`--clr-status-*-bg`).

- **Decisão técnica mais difícil:** o campo "Tripulação" vinha da API ora como
  string, ora como objeto, exibindo `[object Object]`. Resolvido com o helper
  `resolveStr()` em `js/app.js:149`.
- **Trade-off:** o card não busca seus próprios dados (recebe via render
  function) — menos isolado que um web component, mas muito mais leve e
  suficiente para o escopo do projeto.

---

## P4 — O Lighthouse apontou um problema de acessibilidade — o que você corrigiu? `(C3, C4)`

**Resposta: contraste de texto insuficiente e foco de teclado invisível.**

1. **Contraste (WCAG AA 4.5:1):** o token de texto esmaecido era
   `#4f627a`, que reprovava no contraste sobre os fundos escuros. Foi
   clareado para `#6f86a6` no primitivo `--slate-600`
   (`css/tokens.css:53`), agora ≥ 4.5:1.
2. **Foco visível por teclado:** adicionado `:focus-visible` global com
   contorno dourado (`css/base.css:146`) e `:focus-within` nos três tipos de
   card (`css/components.css:405,434,453`).
3. **Zoom no iOS:** inputs usam `font-size: max(16px, 1rem)`
   (`css/base.css:28`) para impedir o auto-zoom do Safari ao focar campos.

- **Decisão:** tratar acessibilidade como requisito, não enfeite.
- **Razão:** foco visível e contraste são critérios objetivos de auditoria.
- **Trade-off:** o `#6f86a6` é levemente mais claro que o tom original
  pretendido, sacrificando um pouco do visual "dim" em favor da legibilidade.

---

## P5 — Explique a diferença entre um token primitivo e um token semântico no seu projeto. `(C2 — Arquitetura CSS)`

**Resposta:**

- **Primitivo** = valor cru, **sem significado de uso**. Responde "que cor é
  esta?". Ex.: `--gold-500: #f5c518` e `--rgb-gold: 245 197 24`
  (`css/tokens.css`, bloco "CAMADA 1 — PRIMITIVOS", linha 30).
- **Semântico** = **papel/intenção**, e referencia um primitivo. Responde
  "para que serve esta cor?". Ex.: `--clr-gold: var(--gold-500)`,
  `--clr-bg: var(--navy-950)`, `--clr-text-muted: var(--slate-400)`
  (`css/tokens.css`, bloco "CAMADA 2 — SEMÂNTICOS", linha 130).

Os componentes consomem **apenas** a camada semântica. Isso permite, por
exemplo, ter um futuro tema claro trocando só os mapeamentos semânticos, sem
tocar em nenhum componente.

- **Trade-off:** mais tokens para manter; compensa em escala e consistência.

---

## P6 — Você usou `!important` em algum lugar? Por quê? `(C2, C4)`

**Resposta: sim, em um único lugar, e é um uso justificado.**

- Único uso: bloco `@media (prefers-reduced-motion: reduce)` em
  `css/responsive.css:85-90`, zerando `animation-duration` e
  `transition-duration`.
- **Razão:** é a forma recomendada (MDN) de garantir que a preferência de
  acessibilidade do usuário **sobreponha qualquer animação**, inclusive as
  declaradas com alta especificidade ou inline. Aqui o `!important` é
  intencional e correto.
- **Onde foi removido:** havia um `transform: none !important` no `.nav`
  desktop; descobrimos que a cascata por ordem de origem já resolvia (o
  `responsive.css` carrega depois do `components.css`), então o `!important`
  era **desnecessário e foi retirado** (`css/responsive.css:18`).

- **Trade-off:** `!important` dificulta overrides futuros; por isso ele só
  permanece onde a intenção é justamente ser inviolável (reduced-motion).

---

## P7 — Como seu projeto funciona em 360px? `(C3 — Responsividade)` — *demonstrar ao vivo no DevTools*

**Resposta: layout mobile-first sem overflow horizontal.**

- A base (sem media query) já é a versão de 360px: `.cards-grid` é
  `grid-template-columns: 1fr` (uma coluna) em `css/components.css:280`.
- `body { overflow-x: hidden }` (`css/base.css:21`) protege contra estouros
  acidentais de elementos decorativos (ex.: a caveira do hero).
- Tipografia fluida com `clamp()` (`css/tokens.css`, `--fs-h1` etc.) impede
  que títulos grandes vazem em telas estreitas.
- `min-width: 0` nos itens de texto (`.char-card__info`, `.search-bar__input`)
  permite o `text-overflow: ellipsis` em vez de empurrar o layout.

**Roteiro da demonstração:** DevTools → Toggle device toolbar → Responsive →
largura 360 → rolar as 4 seções mostrando que nada gera barra de rolagem
horizontal e que os cards ocupam 1 coluna.

- **Trade-off:** em 360px mostramos menos densidade (1 card por linha), mas
  ganhamos legibilidade e zero overflow.

---

## P8 — Por que você escolheu esta convenção de nomenclatura? O time seguiu ela até o final? `(C2, C5)`

**Resposta: BEM (Block / Element / Modifier), aplicado de forma consistente.**

Exemplos no código (`css/components.css`):
- **Block:** `.char-card`, `.fruit-card`, `.crew-card`, `.footer`
- **Element:** `.char-card__avatar`, `.char-card__status`, `.footer__nav`
- **Modifier:** `.char-card__status--alive`, `.fruit-card--logia`,
  `.crew-card--yonko`, `.section--alt`

- **Razão:** BEM torna a relação estrutural evidente só pelo nome da classe
  (o `__` liga elemento ao bloco; o `--` marca variante), sem depender de
  aninhamento de seletores — o que mantém a especificidade baixa e plana.
- **Consistência:** todo o `components.css` segue o padrão; não há mistura de
  camelCase/snake_case. Os tokens seguem sua própria convenção paralela
  (`--clr-*`, `--fs-*`, `--space-*`), documentada no topo de `tokens.css`.
- **Trade-off:** nomes de classe ficam mais longos (`.char-card__stat-value`),
  mas a legibilidade e a ausência de colisão compensam.

---

## Mapa rápido de evidências (para a banca)

| Critério | Onde provar no código |
|----------|------------------------|
| **C1** Semântica | `index.html`: `header`/`main`/`section`/`article`/`nav`/`footer`, `h1→h2→h3` sem pulos, `aria-label`, `lang="pt-BR"` |
| **C2** Tokens 2 camadas | `css/tokens.css` — CAMADA 1 (linha 30) e CAMADA 2 (linha 130); zero hardcoded nos componentes |
| **C3** Responsivo + a11y | `@container` (`responsive.css:70+`), `clamp()` (tokens), `:focus-visible` (`base.css:146`), contraste (`tokens.css:53`) |
| **C4** Qualidade | cabeçalhos `@component` (`components.css:283+`), estados `:hover`/`:focus-within`, `!important` só em reduced-motion |
| **C5** Defesa | este documento — decisão + razão + trade-off em cada resposta |
