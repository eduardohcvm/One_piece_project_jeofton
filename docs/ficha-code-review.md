# FICHA DE CODE REVIEW — Aula 12
**Disciplina:** Aplicações para Internet — HTML5 e CSS3  
**Prof. Jeofton Costa**

---

## Identificação

| Campo                     | Preenchimento                                      |
|---------------------------|----------------------------------------------------|
| **Grupo Revisor**         | Turma — Revisão Cruzada (Aula 12)                 |
| **Componente Revisado**   | `.char-card` — Card de Personagem                  |
| **Grupo Dono**            | Eduardo Henrique / One Piece Wiki (Projeto Jeofton)|
| **Arquivo**               | `css/components.css`                               |
| **Data**                  | 28/05/2026                                         |

---

## Checklist de Critérios

| Critério de Revisão                                                                 | Aprovado | Melhoria | Bloqueador |
|-------------------------------------------------------------------------------------|:--------:|:--------:|:----------:|
| O componente usa apenas tokens semânticos (sem valores hardcoded)?                  |          | ✅ ANTES  |            |
| Há separação clara entre estrutura (HTML) e apresentação (CSS)?                     | ✅       |          |            |
| O nome das classes é descritivo e segue uma convenção consistente?                  | ✅       |          |            |
| O componente é responsivo por si mesmo (funciona em diferentes containers)?         |          | ✅        |            |
| Há comentário de cabeçalho documentando o componente?                               |          |          | ✅ ANTES   |
| Os estados interativos (:hover, :focus, :active, :disabled) estão definidos?       |          | ✅ ANTES  |            |
| Há algum uso de `!important` que poderia ser evitado?                               | ✅       |          |            |
| A acessibilidade foi considerada (contraste, aria, foco visível)?                   | ✅       |          |            |

> **ANTES** = problema identificado antes das correções da Aula 12; corrigido nesta entrega.

---

## Comentários Detalhados

### [BLOQUEADOR] Ausência de cabeçalho `@component`

**[OBSERVAÇÃO]** O bloco `.char-card` não possuía nenhum comentário de
documentação de cabeçalho antes da Aula 12. Não havia declaração dos tokens
consumidos, estados interativos ou variantes.

**[IMPACTO]** Um desenvolvedor novo no projeto precisa ler 40+ linhas de CSS para
inferir quais tokens o componente depende. Em uma equipe de 5 pessoas, isso gera
custo de onboarding repetido a cada novo integrante. Design systems como Carbon
(IBM) e Spectrum (Adobe) exigem cabeçalho como contrato mínimo de qualquer
componente.

**[SUGESTÃO]** Adicionar bloco `/** @component ... */` com `@tokens-consumed`,
`@states`, `@variants`, `@since` e `@updated` imediatamente antes do seletor.

**[CATEGORIA]** Bloqueador — impede a entrega da Aula 12 sem correção.

**[DECISÃO]** ✅ ACEITAR — cabeçalho completo adicionado nesta aula.

---

### [MELHORIA] Valores RGBA hardcoded nos badges de status

**[OBSERVAÇÃO]** Os três modificadores de status do card usavam literais RGBA
diretamente no CSS:

```css
/* Antes */
.char-card__status--alive   { background: rgba(39 174 96 / 0.18); }
.char-card__status--dead    { background: rgba(231 76 60 / 0.18); }
.char-card__status--unknown { background: rgba(149 165 166 / 0.18); }
```

O mesmo padrão se repetia em `.crew-status--active/dead/unknown` — totalizando
6 literais idênticos em dois componentes distintos.

**[IMPACTO]** Se a cor de "vivo" precisar mudar (por rebranding ou ajuste de
contraste), são necessárias no mínimo 2 edições manuais em arquivos separados.
Com o crescimento do projeto, esse número aumenta. É exatamente o problema que
tokens semânticos resolvem.

**[SUGESTÃO]** Criar tokens semânticos em `tokens.css`:

```css
--clr-status-alive-bg:   rgba(39 174 96 / 0.18);
--clr-status-dead-bg:    rgba(231 76 60 / 0.18);
--clr-status-unknown-bg: rgba(149 165 166 / 0.18);
```

E substituir nos dois componentes:

```css
/* Depois */
.char-card__status--alive   { background: var(--clr-status-alive-bg); }
```

**[CATEGORIA]** Melhoria — não bloqueador, mas deve ser corrigido.

**[DECISÃO]** ✅ ACEITAR — tokens criados em `tokens.css` e aplicados em
`char-card` e `crew-card` nesta aula.

---

### [MELHORIA] Estado `:focus-within` ausente nos cards

**[OBSERVAÇÃO]** O componente definia `:hover` mas não `:focus-within`. A regra
global `:focus-visible` em `base.css` cobre o foco em elementos individuais
(links, botões), mas o card-container em si não sinalizava visualmente quando
um filho recebia foco por teclado.

**[IMPACTO]** Usuários que navegam por teclado (Tab) conseguem focar links e
botões dentro do card, mas o card pai não fornece nenhuma indicação visual de
qual card está "ativo". Isso prejudica a orientação espacial em grids com 12+
cards.

**[SUGESTÃO]** Adicionar:

```css
.char-card:focus-within {
  border-color: rgba(245 197 24 / 0.35);
  box-shadow: var(--shadow-md), 0 0 0 3px rgba(245 197 24 / 0.12);
}
```

**[CATEGORIA]** Melhoria com impacto em acessibilidade.

**[DECISÃO]** ✅ ACEITAR — `:focus-within` adicionado em `char-card`,
`fruit-card` e `crew-card` nesta aula.

---

### [MELHORIA] Layout interno do card não usa Container Query

**[OBSERVAÇÃO]** O grid pai (`.cards-grid`) tem `container-type: inline-size`
e `@container section-ct` controla o número de colunas. Porém, o layout
*interno* do `.char-card` é sempre `flex-direction: column`, independente do
espaço disponível no container.

**[IMPACTO]** Em um layout de 1 coluna (mobile ou sidebar larga), o card ocupa
100% da largura disponível — chegando a 400–500px — mas continua exibindo o
avatar e o conteúdo em pilha vertical, quando uma orientação horizontal seria
mais eficiente para o espaço.

**[SUGESTÃO]** Adicionar container ao próprio card e uma query horizontal:

```css
.char-card { container-type: inline-size; container-name: char-card-ct; }

@container char-card-ct (min-width: 360px) {
  .char-card__header { gap: var(--space-md); }
  .char-card__stats  { grid-template-columns: repeat(4, 1fr); }
}
```

**[CATEGORIA]** Melhoria — não bloqueador; aceitar com escopo futuro.

**[DECISÃO]** ✅ ACEITAR COM ESCOPO — implementaremos o layout horizontal
interno do card na Aula 13, quando o componente tiver showcase completo.

---

### [PERGUNTA] Por que `z-index: 200` e `z-index: 199` no header/nav?

**[OBSERVAÇÃO]** `.header` usa `z-index: 200` e `.nav` usa `z-index: 199`.

**[PERGUNTA]** Existe uma escala documentada de z-index no projeto? A diferença
de 1 entre header e nav é suficiente para garantir que o nav aparece abaixo do
header em todos os navegadores?

**[DECISÃO]** ✅ RESPOSTA — a diferença garante que o nav (menu mobile) desliza
*por baixo* do header ao animar. O valor 200 foi escolhido para superar modais e
dropdowns de terceiros sem atingir valores extremos (999, 9999). Uma escala de
z-index formal em `tokens.css` é planejada para a Aula 13.

---

## Problema Mais Crítico Identificado

**Ausência de cabeçalho `@component`** em todos os componentes de `components.css`.
O arquivo tinha 313 linhas sem nenhuma documentação de interface pública — tokens
consumidos, estados e variantes eram completamente implícitos. Isso viola o
princípio de Component-Driven Development onde "um desenvolvedor que nunca viu o
componente deve conseguir usá-lo apenas lendo o cabeçalho" (Aula 12, p. 3).

---

## Sugestão de Melhoria Mais Importante

**Tokenizar os fundos RGBA dos badges de status** (implementado nesta aula).
É a mudança com maior custo-benefício: 3 linhas em `tokens.css` eliminam 6
literais hardcoded distribuídos em 2 componentes, e garantem consistência
automática em qualquer instância futura que precise de um badge de status.

---

## Ponto Forte que Merece ser Replicado

**A arquitetura de tokens é referência.** Mais de 95% dos valores em
`components.css` referenciam variáveis de `tokens.css`. Toda cor, espaçamento,
raio de borda, sombra e transição vive em um único arquivo — tornando o design
system coeso, temável e fácil de auditar. A combinação de `container-type:
inline-size` no `.cards-grid` com `@container section-ct` em `responsive.css`
é uso correto e moderno de Container Queries (CSS Level 4), demonstrando
alinhamento com as práticas abordadas nas Aulas 10 e 11.

---

## Backlog Pós-Review

| Item                                | Decisão               | Prazo      |
|-------------------------------------|-----------------------|------------|
| Cabeçalho `@component` em todos os blocos | ✅ Implementado (Aula 12) | Concluído |
| Tokens `--clr-status-*-bg`          | ✅ Implementado (Aula 12) | Concluído |
| `:focus-within` nos 3 tipos de card | ✅ Implementado (Aula 12) | Concluído |
| Layout horizontal interno do card   | Aceitar com escopo    | Aula 13    |
| Escala formal de z-index em tokens  | Investigar            | Aula 13    |
