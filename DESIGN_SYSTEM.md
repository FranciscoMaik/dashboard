# IDENTIDADE VISUAL — Mundo Invest Dashboard

## Stack Técnica
- Tailwind CSS para toda estilização (NUNCA criar arquivos .css separados)
- shadcn/ui como base de componentes, customizados via className
- Todos os valores visuais definidos como TOKENS SEMÂNTICOS no tailwind.config
- NUNCA usar valores hardcoded no código — sempre tokens semânticos
- NUNCA usar cores/radius/sombras padrão do Tailwind — apenas tokens deste documento
- A IA que implementa é RESPONSÁVEL por criar SVGs originais e composições visuais únicas baseadas nas descrições abaixo — NÃO use decoração genérica (blobs, dot grids, partículas) como substituto
- A paleta usa UMA cor accent forte + neutros. NÃO crie arco-íris de categorias. A identidade é uma cor só.

## Setup Necessário (instalar antes de buildar)

### Libs adicionais
| Lib | Pra quê | Instalação |
|---|---|---|
| `framer-motion` | Animações de entrada, micro-interações e fluidez ao apresentar dados para o cliente | `npm i framer-motion` |

---

## A Alma do App
"A precisão institucional encontra a leveza e a esperança."
O Mundo Invest Dashboard transforma a rigidez dos relatórios financeiros em uma narrativa visual acolhedora e cristalina. É preciso como a matemática (para respeitar o dinheiro do cliente), mas leve, limpo e elegante como um guia confiável para o futuro.

---

## Referências e Princípios
- **Linear:** A obsessão pela clareza geométrica, ícones de traços precisos e interfaces que parecem "afiadas". → Princípio: Redução de ruído. Só o que importa ganha contorno. → Aplicação: Bordas subtis de 1px, sem backgrounds pesados para cards, muita área de respiro.
- **Vercel:** Tipografia soberana e hierarquia definida por contrastes de cinzas. → Princípio: A ausência de cor cria foco. Quando a cor aparece, ela guia o olhar. → Aplicação: Todo o dashboard é em escala de cinzas e branco puro; a cor principal (Indigo) é usada apenas onde há "vitória" (lucro, meta alcançada) ou ação.

---

## Decisões de Identidade

### ESTRUTURA

#### Layout de Apresentação
**O que:** Uma interface "Cental Stage" (Palco Central). Em vez da clássica sidebar pesada colada na esquerda, uma navegação global superior minimalista (topbar) ou uma sidebar "flutuante" e fininha (apenas ícones), liberando a largura máxima da tela.
**Por que:** O assessor está apresentando dados ao cliente. A tela precisa parecer "uma folha de papel digital limpa focada no cliente", não um painel militar de operações espremidas.
**Como:** Usar max-w-screen-2xl com margens laterais generosas. O background é branco, e a área principal de conteúdo "flutua" ligeiramente ou apenas é dividida por grid, sem caixas delimitadoras pesadas.
**Nunca:** Entregar um grid denso de tabelas grudadas umas nas outras sem respiro lateral.

#### Apresentação de Dados
**O que:** "Cards de História", não tabelas. Os números do cliente são traduzidos em narrativas visuais dentro de cards amplos antes de mostrar listas de ativos.
**Por que:** Muitos números assustam e entediam. Ao converter o bloco de "Renda Fixa" em um card narrativo, o cliente sente acolhimento e compreensão imediata.
**Como:** O topo da tela sempre traz os 3-4 KPIs vitais representados como *Conceitos Visuais*. Apenas os *drill-downs* e telas de detalhe contêm tabelas tabulares, que devem ter `<Table>` sem bordas verticais, com padding enorme entre as linhas.
**Nunca:** Jogar uma tabela de 15 colunas logo na primeira visualização da seção.

### LINGUAGEM

#### Tipografia de Engenharia Leve
**O que:** Fonte sans-serif geométrica limpa (como Geist, Inter ou font-sans padrão bem ajustada), com tracking ajustado (-0.02em para títulos).
**Por que:** Transmite precisão cirúrgica sem ser agressiva. As letras perfeitamente desenhadas geram confiança no cálculo dos rendimentos.
**Como:** `tracking-tight` para H1/H2, cores de texto controladas estritamente (`text-primary` para títulos, `text-muted` para labels de dados).
**Nunca:** Misturar com sans-serif arredondadas ("fofas") ou fontes serifadas antiquadas.

#### Geometria "Afiada, mas Humana"
**O que:** Bordas contidas. O `radius-card` é `12px` (arredondado o suficiente para não machucar os olhos, mas não tão curvo a ponto de parecer um app infantil).
**Por que:** "Elegância do linear". Interfaces excessivamente arredondadas parecem falta de seriedade com dinheiro.
**Como:** `rounded-card` e `border-subtle` constante em divisórias internas.
**Nunca:** Usar `rounded-3xl` ou pills em excesso, a menos que seja um badge específico.

### RIQUEZA VISUAL ← OBRIGATÓRIO

#### Textura Ambiente
**O que:** "Cartografia do Futuro" (Um grid topográfico geométrico ultrafino e muito sutil no fundo do header da tela).
**Temática:** Representa o "Mundo", as camadas de patrimônio e a subida através das linhas de contorno de um mapa, apontando para a construção e mapeamento de objetivos.
**Tratamento:** Linhas finíssimas (0.5px) formando curvas de nível geográficas estilizadas, desenhadas no canto superior direito do background. Monocromático: usando preto ou cinza na **opacity 2% a 4%**. A fundação é silenciosa.

#### Conceitos Visuais por Componente

##### 1. Card de "Patrimônio Total" (Saldo e Evolução Macro)
**Representa:** A solidez, o acúmulo e o alicerce financeiro do cliente.
**Metáfora visual:** Uma montanha de fundação crescendo graciosamente.
**Cena detalhada:** Um plano isométrico (wireframe) que se estende suavemente a partir da base do card. Sobre ele, elevam-se 3 ou 4 pilares/barras retangulares em perspectiva 3D (desenhados apenas com as arestas finas em SVG). Uma linha brilhante e fluida (como um fio de fibra ótica) conecta os topos desses pilares, subindo da esquerda para a direita. Somente o fio de conexão possui a cor `accent-primary`, irradiando uma sombra glow sutil para o centro. Os pilares possuem apenas as linhas cinzas super claras e o topo minimamente preenchido com opacity 10%.
**Viabilidade:** CÓDIGO PURO (Composição de path SVG com linhas diagonais suaves).
**Se asset externo:** N/A.
**Alternativa simplificada:** Uma montanha poligonal de linhas superpostas desenhada em SVG 2D, com um sol minimalista (círculo outline) nascendo atrás.

##### 2. Card de "Alocação de Ativos / Diversificação"
**Representa:** O equilíbrio perfeito e a proteção do ecossistema financeiro.
**Metáfora visual:** Um sistema orbital ou constelação equilibrada.
**Cena detalhada:** Ao invés daquele infame e batido "gráfico de rosca", desenhe em SVG uma série de 3 ou 4 órbitas circulares finamente tracejadas (`stroke-dasharray="4 4"`) ao redor de um núcleo central vazio e limpo. Sobre essas órbitas gravitam planetas "nodes" orbitais. Cada "nó" representa uma classe de ativo (Ações, Renda Fixa) com diâmetros proporcionais. Um pequeno rastro de cometa com a cor `accent-primary` segue o maior nó (o ativo predominante). Sem blocos preenchidos densos, apenas um balé vetorial elegante de precisão.
**Viabilidade:** CÓDIGO PURO (Composição geométrica de círculos e `stroke-dasharray`).

##### 3. Card de "Progresso de Metas" (Objectives)
**Representa:** A clareza do objetivo e a sensação de estar caminhando seguro.
**Metáfora visual:** Um mapa de jornada limpo conectando o "hoje" à "chegada".
**Cena detalhada:** Uma linha curva bezier e minimalista corta o painel do card. No início, círculos concêntricos e finos (de onde partimos). Na ponta final, um alvo delineado por finas bordas, que respira levemente usando CSS. Em 60% do caminho (representando o que falta do objetivo), a curva tem um ponto focal brilhante e uma "trilha de luz" para trás usando um gradient stroke na linha SVG indo de `transparent` para `accent-primary`.
**Viabilidade:** CÓDIGO PURO (Múltiplos paths SVG com stroke-gradient e pequenos círculos como markers).

##### 4. Card de "Movimentações Recentes / Liquidez"
**Representa:** O fluxo de vida operando ativamente a favor do cliente.
**Metáfora visual:** Correntes de ar, fluidez de ondas.
**Cena detalhada:** No fundo direito do card, 3 ondas sinuosas horizontais desenhadas por linhas finas translúcidas de bordas suaves. Na onda do meio, minúsculas setas (representando aportes ou ganhos paralelos) apontam para nordeste (↗), e deslizam lentamente para a direita ao se observar a tela. Isso tira o aspecto de "extrato de banco" e traz leveza à liquidez.
**Viabilidade:** CÓDIGO PURO (Componente animável via Framer Motion percorrendo um SVG path sutil).

##### 5. Empty State de Módulo (Ex: Sem investimentos Internacionais ainda)
**Representa:** Oportunidade futura e expansão estratégica.
**Metáfora visual:** Um lote nobre aberto esperando para receber construção.
**Cena detalhada:** O grid isométrico de terreno desenhado com finíssimas linhas cinzas, perfeitamente iluminado. Flutuando precisamente 10px acima do centro geométrico desse grid, um losango "blueprint" desenhado apenas pelos contornos em tom `accent-primary`, girando microscopicamente ou oscilando verticalmente, convidando sutilmente para plantar a primeira semente internacional. Abaixo dele, a própria "sombra" é apenas o preenchimento de grade obscurecida suavemente.
**Viabilidade:** CÓDIGO PURO (Um quadrado e losangos SVG distorcidos isométricamente com transformação CSS simulada).

---

## Tokens de Design

### Cores — Fundos
| Token | Valor | Uso |
|---|---|---|
| `surface-page` | `#FAFAFA` (Zinc 50) | Fundo principal da página inteira. Ultra clean. |
| `surface-card` | `#FFFFFF` | Cards e backgrounds de containers com informações primárias. |
| `surface-elevated` | `#FFFFFF` | Painéis suspensos (Modais, sub-menus), requer `shadow-float`. |
| `surface-hover` | `#F4F4F5` (Zinc 100) | Highlight tátil sobre linhas de tabela ou elementos de lista interativos. |

### Cores — Texto
| Token | Valor | Uso |
|---|---|---|
| `text-primary` | `#18181B` (Zinc 900) | Títulos puros, valores de patrimônio, onde precisamos de peso focado. |
| `text-secondary` | `#52525B` (Zinc 600) | Texto de apoio, categorias das linhas, meta-dados e breadcrumbs. |
| `text-muted` | `#A1A1AA` (Zinc 400) | Labels minúsculas de eixos X/Y, ou hint interativo vazio. |

### Cores — Accent (UMA COR APENAS)
A alma vibrante do projeto. Evoca confiança firmeza e tecnologia elegante sem ser o "azul de banco tradicional". Vamos usar o Índigo Elétrico / Ultramarine.
| Token | Valor | Uso |
|---|---|---|
| `accent-primary` | `#4F46E5` (Indigo 600) | A ÚNICA cor da vitrine. Pontos altos de gráficos, botões de ação final, highlights de metas, links interativos e preenchimentos ativos em gráficos radiais ou vetores "Conceituais". |
| `accent-hover` | `#4338CA` (Indigo 700) | Hover de botão principal de ação. |
| `accent-subtle` | `rgba(79, 70, 229, 0.08)` | Fundo com fundo translúcido da marca para seletores (tabs ativas, chips marcados e halos de destaque sob objetos importantes SVG). |

### Cores — Status (APENAS para feedback funcional explícito)
*(Atenção: Não criar variações de azul, amarelo ou roxo para classes de ativos como CDB vs Ações. Apenas se houver um delta positivo vs negativo explícito na carteira num context functional "Ganhou X" e "Perdeu X").*
| Token | Valor | Uso |
|---|---|---|
| `status-success` | `#10B981` (Emerald 500) | Indicativo de incremento (+R$2.000) de mês a mês, sem roubar atenção do Accent. |
| `status-error` | `#EF4444` (Red 500) | Indicativo de quebra de regras, descolamento bizarro do plano ou saldo faltante explícito ou validações de falhas de tela. |
| `status-warning` | `#F59E0B` (Amber 500) | Reavaliação de risco, balanço desajustado pendente de aprovação do assessor. |

### Bordas
| Token | Valor | Uso |
|---|---|---|
| `border-default` | `#E4E4E7` (Zinc 200) | Divisores explícitos maiores ou áreas destacadas de container externo. |
| `border-subtle` | `#F4F4F5` (Zinc 100) | Separações finas internas (linhas de table, delimitadores de lista dentro do card) que não disputam atenção geométrica com o card em si. |

### Geometria
| Token | Valor | Uso |
|---|---|---|
| `radius-card` | `12px` | Ponto fixo para dar cara elegante de aplicativo (não mobile fofo). Todo wrapper da página de overview usa este contorno (Cards amplos, grids numéricos). |
| `radius-button` | `8px` | Botões afiados de CTAs de ação, inputs e seletores nativos. |
| `radius-input` | `8px` | Caixas textuais. |

### Sombras
| Token | Valor | Uso |
|---|---|---|
| `shadow-card` | `0 2px 24px -6px rgba(0,0,0,0.03)`| Sombras etéreas invisíveis focadas, só para remover a visualização bidimensional de folha plana presa da interface e gerar ar ambiente sobre `surface-page`. |
| `shadow-hover` | `0 12px 30px -10px rgba(0,0,0,0.08)` | Highlight sutil que ergue e atrai botões clicáveis num hover real e contundente. |
| `shadow-float` | `0 20px 40px -12px rgba(0,0,0,0.12)` | Exclusivamente para popovers soltos (menu de contexto, drill down modais temporários). |

---

## Componentes Shadcn — Overrides

| Componente | Override (usando tokens) |
|---|---|
| `<Card>` | `bg-surface-card rounded-card shadow-card border-none` (Removemos a borda padrão do shadcn pra focar na sombra puríssima etérea limpa, tornando-o imensamente clean) |
| `<Button>` | `rounded-button bg-accent-primary hover:bg-accent-hover font-semibold tracking-tight shadow-sm text-white` |
| `<Badge>` | `bg-surface-page border border-border-default text-text-secondary rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase` |
| `<Table>` | Remove explicitamente os borders radiais externos da lista. `<TableRow>` ganha `border-b border-border-subtle hover:bg-surface-hover transition-colors`. A ausência de bordas restritas laterais liberta o respiro do app. |
| `<Input>` | `bg-surface-page border border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20` |

---

## Regra de Ouro

Ao criar qualquer tela ou componente para o Mundo Invest Dashboard:
1. Siga TODAS as decisões de identidade (estrutura clean + linguagem afiada + riqueza visual em conceito).
2. Use shadcn/ui como infraestrutura oculta, e sobrescreva radicalmente todo padrão que apite como "vazio default" utilizando os custom classNames com nossos tokens.
3. APENAS tokens semânticos documentados — nunca insira um `border-gray-300` cru. Encontre o token certo.
4. O `accent-primary` (Indigo 600) é nossa única arma. Traga essa estocada de cor para indicar direcionamento ou dados coroados. Todo o resto no aplicativo orbita calmo e sereno nos tons neutros do Zinc.
5. Os cards cruciais de painel DEVEM ter sua CENA NARRATIVA criada integralmente. Não coloque ícones genéricos Lucide gigantes a 10% de opacidade com dots borrados achando que criou uma identidade gráfica. Formule e costure o vetor conforme o conceito (o alvo pro progresso, a órbita na alocação, o mapa topográfico).
6. A IA implementadora, ao programar o arquivo TSX nas etapas futuras, se encarrega inteiramente de projetar e criar as artes das cenas de fundo usando código SVG declarativo de blocos/linhas.
7. **"A precisão institucional encontra a leveza e a esperança."** (Esta é a frase balizadora).

## Teste Final
Coloque o Mundo Invest Dashboard gerado lado a lado de qualquer sistema concorrente de gestão que usa AntDesign de caixa cru.
- Nossa fonte não sangra de tabelas espessas e opressivas (Linguagem).
- Não temos sidebars encastelados num verde ou cinza chapados escuros (Estrutura).
- Quando o cliente clica para inspecionar sobre as metas, ao em vez do texto frio e desolador de um gráfico pie chart com múltiplas fatias sem sabor, ele encontra a leve visualização com vetores limpos de uma linha de chegada e um traçado suave conectando seu caminho futuro de riqueza de mãos dadas a beleza gráfica de constelações isométricas (Conceito Visual / Riqueza).

Se houver poeira colorida de pixels pra todos os cantos, se voltar a cores azuis-praias para ações do tesouro, está ERRADO.
Repita o manto Sagrado: "Uma Cor de Destaque, Um Mar Neutro Focado, Uma História em SVG por Card".
