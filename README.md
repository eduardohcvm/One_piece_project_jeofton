# ☠ One Piece Wiki — O Mundo dos Piratas
Projeto de: Eduardo Henrique Calado Vieira de Melo e Jean Icaro Lima de Oliveira


Este projeto consiste no desenvolvimento de um site temático inspirado no
universo de One Piece, com o objetivo de apresentar e explicar alguns personagens
fictícios da obra,  A proposta é
criar uma experiência informativa e visualmente agradável para os fãs, reunindo
curiosidades, descrições e elementos marcantes de cada local de forma divertida e
interativa. 


Uma wiki interativa do universo **One Piece**, consumindo a [api-onepiece.com](https://api.api-onepiece.com/v2) para exibir personagens, Akuma no Mi, tripulações e sagas.
<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/1ad56672-3948-4508-8d6a-8ece9f32a69d" />

wireframe
<img width="769" height="528" alt="{B7D5961A-ECBE-4A05-B6CD-D28F1433C291}" src="https://github.com/user-attachments/assets/3ca59b85-e89f-4b32-8d84-d081bad53e29" />
<img width="1152" height="648" alt="Sem título" src="https://github.com/user-attachments/assets/54aa253b-1e93-4b00-bf25-3cb2b321cb90" />


Devtools teste
<img width="1363" height="765" alt="{905BAC77-36D5-4F57-9133-D4F6DC350730}" src="https://github.com/user-attachments/assets/a16b8a04-2503-40bf-91f3-ec161194c0fb" />



## Funcionalidades

- **Personagens** — listagem com busca por nome, função ou tripulação, paginação com "Carregar mais"
- **Akuma no Mi** — cards com filtro por tipo (Paramecia, Zoan, Logia)
- **Tripulações** — destaque visual para tripulações Yonko
- **Sagas** — linha do tempo cronológica com capítulos, episódios e volumes
- **Estatísticas** — contadores no hero carregados da API em tempo real
- **Design responsivo** — mobile-first com breakpoints para tablet e desktop
- **Animações** — fade-in com Intersection Observer e skeletons de carregamento
- **Acessibilidade** — roles ARIA, labels e navegação por teclado


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
```

### Opção 2 — Live Server (recomendado para desenvolvimento)

Se usar **VS Code**, instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer):

1. Abra a pasta no VS Code
2. Clique com o botão direito em `index.html`
3. Selecione **"Open with Live Server"**
4. O navegador abrirá em `http://127.0.0.1:5500`


> **Nota:** A aplicação consome a API `https://api.api-onepiece.com/v2`. Certifique-se de estar conectado à internet.


## Créditos

- **One Piece** © Eiichiro Oda / Shueisha — site fan-made para fins educacionais
- Dados fornecidos por [api-onepiece.com](https://api-onepiece.com)
- Desenvolvido como projeto de treinamento — **Prof. Jeofton Costa**
