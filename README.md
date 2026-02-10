# 🎛️ Prompt Suno Creator

Uma ferramenta web para criar prompts detalhados e estruturados para o [Suno AI](https://suno.com), um gerador de músicas com inteligência artificial.

![Status](https://img.shields.io/badge/status-ativo-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-orange)
![CSS3](https://img.shields.io/badge/CSS3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow)

## 📋 Sobre o Projeto

O **Prompt Suno Creator** é um formulário interativo que coleta informações detalhadas sobre uma música desejada e gera um prompt estruturado pronto para ser usado no Suno AI. A ferramenta ajuda a transformar ideias musicais em prompts detalhados que incluem:

- Gênero e estilo musical
- Referências artísticas (com geração de nomes similares)
- Características vocais e instrumentais
- Emoções e atmosfera desejada
- Estrutura da música
- Letra (opcional)
- Metatags para o Suno

## 🚀 Funcionalidades

### ✨ Principais Recursos

- **Formulário Completo**: Campos para todos os aspectos de uma composição musical
- **Geração de Prompt Automática**: Cria prompts estruturados com um clique
- **Referências Artísticas Similares**: Gera nomes inspirados mas legalmente distintos
- **Exportação Múltipla**: Copiar para clipboard, baixar como .txt ou .json
- **Validação de Campos**: Alerta sobre campos obrigatórios não preenchidos
- **Interface Responsiva**: Funciona em desktop e dispositivos móveis
- **Modo Escuro**: Interface agradável para uso prolongado

### 📝 Campos do Formulário

| Categoria | Campos |
|-----------|--------|
| **Básico** | Idioma, Gênero musical, Estilo/Vibe, Referência artística |
| **Vocal** | Tipo de voz, Formação vocal |
| **Emocional** | Emoção principal, Emoções secundárias, Tema central |
| **Narrativa** | Ponto de vista (POV) |
| **Técnico** | Andamento/energia, Atmosfera sonora, Instrumentos |
| **Estrutura** | Seções desejadas, Tipo de refrão, Hook, Solo |
| **Requisitos** | Obrigatórios, Evitar, Extras |
| **Letra** | Letra pronta (opcional) |

## 🛠️ Instalação e Uso

### Pré-requisitos

Este projeto é puramente estático e não requer instalação de dependências. Apenas um navegador moderno é necessário.

### Como Usar

1. **Clone ou baixe o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/prompt-suno-creator.git
   cd prompt-suno-creator
   ```

2. **Abra o arquivo `index.html`** no seu navegador ou use um servidor local:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (com npx)
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. **Preencha o formulário** com as informações da música desejada

4. **Clique em "Gerar PROMPT FINAL"** para criar o prompt

5. **Copie ou baixe** o resultado para usar no Suno AI

## 📁 Estrutura do Projeto

```
prompt-suno-creator/
├── index.html          # Página principal
├── css/
│   └── styles.css     # Estilos da aplicação
├── js/
│   └── app.js         # Lógica da aplicação
├── .gitignore         # Arquivos ignorados pelo Git
├── README.md          # Documentação
└── prompt-suno.html   # Arquivo original (referência)
```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos com variáveis CSS, Grid Layout e Flexbox
- **JavaScript (ES6+)**: Lógica da aplicação sem dependências externas

## 🔧 Desenvolvimento

### Modificar Estilos

Edite o arquivo [`css/styles.css`](css/styles.css:1) para personalizar as cores, layout e aparência da aplicação.

### Modificar Lógica

Edite o arquivo [`js/app.js`](js/app.js:1) para adicionar novas funcionalidades ou modificar o comportamento existente.

### Adicionar Novos Campos

1. Adicione o HTML em [`index.html`](index.html:1)
2. Atualize a função [`collect()`](js/app.js:77) para coletar o novo valor
3. Atualize a função [`buildPrompt()`](js/app.js:109) para incluir o campo no prompt final

## 📊 Exemplo de Uso

### Prompt Gerado

```
Você é um especialista em composições para Suno AI.

TAREFA:
1) Crie a CANÇÃO completa (letra + orientação de melodia/arranjo).
2) Entregue um PROMPT FINAL para eu colar no Suno (campo Style + campo Lyrics), bem formatado.
3) Garanta coerência entre tema, emoção, estrutura e estética.

BRIEF (respostas do usuário):
- Idioma: Português (Brasil)
- Gênero: Pop
- Estilo/vibe: pop melancólico minimalista
- Referência (não copiar): Billie Eilish → use algo na vibe de "Billei Prism" (nome parecido, não igual).
- Voz: Feminina | Formação: Solo
- Emoção principal: nostalgia | Secundárias: saudade
- Tema: superação | POV: 1ª pessoa (eu)
- Andamento/energia: Lento | Atmosfera: noturna, íntima
- Instrumentos principais: piano, synth
- Instrumentos secundários: pads, cordas
- Estrutura desejada: Intro, Verse 1, Pre-Chorus, Chorus, Verse 2, Chorus, Bridge, Final Chorus, Outro
- Refrão: Contido / íntimo
- Hook/frase central: (você deve criar uma).
- Solo instrumental: (não especificado).
- Obrigatórios: (nenhum).
- Evitar: (nenhum).
- Extras: (nenhum).

REGRAS DE SAÍDA:
- Use metatags no formato [Intro], [Verse], [Pre-Chorus], [Chorus], [Bridge], [Outro] (conforme fizer sentido).
- O resultado deve vir em 2 blocos:
  A) STYLE (um parágrafo objetivo com gênero, vibe, timbres, andamento sugerido, voz, e referências "parecidas").
  B) LYRICS (letra final pronta para cantar, seguindo a estrutura).
- Se o usuário deixou letra pronta, use-a. Se não, crie.
- Não cite o nome do artista real diretamente no prompt final; use apenas a "referência similar" ou descrições.

LETRA: O usuário NÃO forneceu letra. Crie uma letra ORIGINAL completa, coerente e cantável, alinhada ao tema, emoção e estrutura.

Agora gere a composição completa e entregue STYLE + LYRICS prontos.
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Sugestões de Melhorias

### Melhorias Futuras Planejadas

- [ ] Adicionar temas de cores alternativos
- [ ] Implementar salvamento local (localStorage)
- [ ] Adicionar templates de gêneros musicais
- [ ] Criar versão em inglês/espanhol
- [ ] Adicionar pré-visualização de áudio (quando disponível)
- [ ] Implementar exportação direta para Suno API
- [ ] Adicionar validação mais robusta
- [ ] Criar versão PWA (Progressive Web App)
- [ ] Adicionar histórico de prompts gerados
- [ ] Implementar compartilhamento de prompts

### Melhorias Técnicas Sugeridas

1. **TypeScript**: Migrar o JavaScript para TypeScript para melhor tipagem
2. **Framework**: Considerar usar Vue.js ou React para melhor gerenciamento de estado
3. **Build Tool**: Adicionar Vite ou Webpack para otimização
4. **Testes**: Implementar testes unitários com Jest ou Vitest
5. **Linting**: Adicionar ESLint e Prettier para consistência de código

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👏 Créditos

- Desenvolvido para facilitar a criação de prompts para o Suno AI
- Inspirado na necessidade de estruturar briefs musicais de forma profissional

## 🔗 Links Úteis

- [Suno AI](https://suno.com) - Plataforma de geração de músicas com IA
- [Documentação do Suno](https://docs.suno.com) - Documentação oficial

---

Feito com ❤️ para a comunidade de criadores musicais
