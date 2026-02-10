# 🎛️ Prompt Suno Creator

Uma ferramenta web para criar prompts otimizados para o [Suno AI](https://suno.com), um gerador de músicas com inteligência artificial, focada em formatos que performam melhor na plataforma.

![Status](https://img.shields.io/badge/status-ativo-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-orange)
![CSS3](https://img.shields.io/badge/CSS3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow)

## 📋 Sobre o Projeto

O **Prompt Suno Creator** é um formulário interativo que coleta informações detalhadas sobre uma música desejada e gera um prompt estruturado otimizado para o Suno AI. A ferramenta implementa as melhores práticas para obter resultados de alta qualidade na plataforma:

- **Formato de Style otimizado**: Curto, denso, em inglês (melhor performance)
- **Referências artísticas inteligentes**: Nomes similares, não reais
- **Controle preciso**: Separação clara entre Style (técnica) e Lyrics (narrativa)
- **Exportação múltipla**: Copiar para clipboard, baixar como .txt ou .json
- **Interface responsiva**: Funciona em desktop e dispositivos móveis
- **Animações suaves**: Experiência visual agradável

## 🚀 Funcionalidades Avançadas

### ✨ Recursos Principais

- **Formulário Completo**: Campos para todos os aspectos de uma composição musical
- **Geração de Prompt Automática**: Cria prompts otimizados com um clique
- **Referências Artísticas Similares**: Gera nomes inspirados mas legalmente distintos
- **Otimização de Style**: Formato curto, denso, em inglês para melhor performance no Suno
- **Campo BPM**: Sugestão de batidas por minuto (opcional)
- **Templates de Style**: Variações pré-definidas para A/B testing
- **Exportação Múltipla**: Copiar para clipboard, baixar como .txt ou .json
- **Validação de Campos**: Alerta sobre campos obrigatórios não preenchidos
- **Interface Responsiva**: Funciona em desktop e dispositivos móveis
- **Animações de Partículas**: Fundo dinâmico e visualmente atraente

### 📝 Campos do Formulário

| Categoria | Campos |
|-----------|--------|
| **Básico** | Idioma, Gênero musical, Estilo/Vibe, Referência artística |
| **Vocal** | Tipo de voz, Formação vocal |
| **Emocional** | Emoção principal, Emoções secundárias, Tema central |
| **Narrativa** | Ponto de vista (POV) |
| **Técnico** | Andamento/energia, Atmosfera sonora, Instrumentos, BPM |
| **Estrutura** | Seções desejadas, Tipo de refrão, Hook, Solo |
| **Requisitos** | Obrigatórios, Evitar, Extras |
| **Letra** | Letra pronta (opcional) com validação automática |
| **Otimização** | Nível de otimização do Style |

## 🎯 Formato Otimizado para Suno AI

### Regra de Ouro do Style no Suno

O STYLE deve ser:
- **Curto** (1 linha ou poucas linhas)
- **Majoritariamente em inglês**
- **Separado por vírgulas**
- **Sem frases longas**
- **Sem narrativa**
- **Referência de artista → nome parecido, não real**
- **BPM como sugestão**

### Exemplo de Style Otimizado

```
bachata, sertanejo, male vocal, solo, joyful, heartbreak, bar vibe, melodic, catchy hooks, accordion, acoustic guitar, electric guitar, bass, drums, subtle xylophone, medium tempo, ~130 BPM, style similar to "Gustavvo Lim Nova"
```

### Template Genérico

```
{genre_1}, {genre_2}, {subgenre_optional}, {voice_type}, {formation}, {main_emotion}, {secondary_emotion}, {vibe}, melodic, catchy hooks, {main_instruments}, {secondary_instruments_optional}, {tempo}, ~{bpm} BPM, style similar to "{artist_like_name}"
```

## 🚨 Regra Absoluta do Suno - Lyrics

### 🎯 O Que NÃO Fazer no Lyrics

O Suno canta **TUDO** que estiver como texto normal no Lyrics. Ele não entende "descrição poética" como direção implícita.

❌ **Nunca escreva descrições soltas em texto**

❌ **Nunca use frases explicativas fora de tags**

❌ **Exemplo INCORRETO** (o Suno vai cantar tudo):
```
[Intro]
[Instrumental]
Violão marcando bachata
Sanfona entra sorrindo
Clima animado, dor disfarçada
```

### ✅ O Que Fazer no Lyrics

✅ **Instrumental SEM texto = instrumental**

✅ **Direção musical → Style, não Lyrics**

✅ **Se quiser indicar instrumental, use apenas a metatag**

✅ **Exemplo CORRETO** (100% seguro):
```
[Intro]
[Instrumental]
```

👉 **Nada mais.** O arranjo já vem do STYLE.

### 🎯 Onde Colocar as Informações Musicais?

Tudo que descreve como a música sova vai para o **STYLE**:

**❌ No Lyrics (não coloque aqui):**
- Violão marcando bachata
- Sanfona entra sorrindo
- Clima animado, dor disfarçada

**✅ No Style (coloque aqui):**
```
sertanejo, bachata, male vocal, solo, joyful heartbreak, upbeat, bar vibe, melodic, acoustic guitar groove, accordion lead, medium tempo, 125 BPM, style similar to "Gustavo Lim Nova"
```

### 🧠 Regra Mental Simples

**Lyrics = só o que pode ser cantado**

**Style = tudo que descreve como a música soa**

Se você ler a linha e pensar:
🗣️ *"isso não faz sentido alguém cantar"*
➡️ **não entra no Lyrics.**

### 🔧 Sistema de Validação Automática

O Prompt Suno Creator possui um sistema de validação automática que:

**❌ Bloqueia palavras como:**
- violão, sanfona, clima, arranjo, instrumental
- guitarra, piano, bateria, baixo, sintetizador
- melody, harmony, rhythm, beat, tempo
- atmosphere, vibe, mood, energy, dynamics

**❌ Bloqueia frases longas dentro de [Instrumental]**

**✅ Permite apenas:**
```
[Intro]
[Instrumental]
```

Quando você colar uma letra no campo "Letra pronta", o sistema automaticamente:
1. Analisa cada linha da letra
2. Detecta palavras que não deveriam estar no Lyrics
3. Exibe avisos específicos com número da linha
4. Sugere mover essas informações para o STYLE

### 📋 Exemplo de Validação

Se você colar uma letra com descrições musicais, o sistema mostrará:

```
⚠️ ALERTAS DE VALIDAÇÃO DA LETRA DO USUÁRIO:
⚠️ Linha 3: "violão" não deveria estar no Lyrics. Isso vai para o STYLE.
⚠️ Linha 4: "sanfona" não deveria estar no Lyrics. Isso vai para o STYLE.
⚠️ Linha 5: "clima" não deveria estar no Lyrics. Isso vai para o STYLE.
⚠️ Linha 7: Isso parece descrição musical, não letra. Vai para o STYLE.

🚨 IMPORTANTE: O Suno canta TUDO que estiver como texto normal no Lyrics.
- Direções musicais (instrumentos, clima, arranjo) devem ir no STYLE
- No Lyrics, coloque APENAS o que pode ser cantado
- [Instrumental] deve estar vazio, apenas a metatag

Se quiser corrigir, ajuste a letra antes de gerar o prompt final.
```

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

4. **Clique em "Gerar PROMPT FINAL"** para criar o prompt otimizado

5. **Copie ou baixe** o resultado para usar no Suno AI

## 📁 Estrutura do Projeto

```
prompt-suno-creator/
├── index.html          # Página principal com layout fullscreen
├── css/
│   └── styles.css     # Estilos com animações e layout responsivo
├── js/
│   └── app.js         # Lógica com formato otimizado para Suno
├── .gitignore         # Arquivos ignorados pelo Git
├── README.md          # Documentação completa
├── IMPROVEMENTS.md     # Sugestões de melhorias
└── LICENSE            # Licença MIT
```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com acessibilidade
- **CSS3**: Estilos com variáveis CSS, Grid Layout, Flexbox e animações
- **JavaScript (ES6+)**: Lógica da aplicação sem dependências externas

## 🔧 Desenvolvimento

### Modificar Estilos

Edite o arquivo [`css/styles.css`](css/styles.css:1) para personalizar as cores, layout e aparência da aplicação.

### Modificar Lógica

Edite o arquivo [`js/app.js`](js/app.js:1) para adicionar novas funcionalidades ou modificar o comportamento existente.

### Adicionar Novos Campos

1. Adicione o HTML em [`index.html`](index.html:1)
2. Atualize a função [`collect()`](js/app.js:77) para coletar o novo valor
3. Atualize a função [`generateOptimizedStyle()`](js/app.js:150) para incluir o campo no style otimizado

## 📊 Exemplo de Uso

### Prompt Gerado Otimizado

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
  A) STYLE (formato otimizado para Suno - curto, denso, em inglês): pop, female vocal, solo, nostalgic, melancholic, intimate, melodic, catchy hooks, piano, synth, pads, slow tempo, ~90 BPM, style similar to "Billie Eilish Nova"
  B) LYRICS (letra final pronta para cantar, seguindo a estrutura, com toda a narrativa e emoção).
- Se o usuário deixou letra pronta, use-a. Se não, crie.
- Não cite o nome do artista real diretamente no prompt final; use apenas a "referência similar" ou descrições.

LETRA: O usuário NÃO forneceu letra. Crie uma letra ORIGINAL completa, coerente e cantável, alinhada ao tema, emoção e estrutura.

Agora gere a composição completa e entregue STYLE + LYRICS prontos.
```

## 🎯 Melhores Práticas Recomendadas

### Para obter os melhores resultados no Suno:

1. **Use o formato otimizado** (curto, denso, em inglês)
2. **Separe Style e Lyrics**: Style = técnica, Lyrics = narrativa
3. **Use referências similares**: Nunca nomes de artistas reais
4. **BPM como sugestão**: Funciona como diretriz para o Suno
5. **Teste variações**: Gere múltiplos prompts para A/B testing
6. **Seja específico nos instrumentos**: Listar principais e secundários
7. **Valide a letra**: Use o sistema de validação para evitar que o Suno cante descrições
8. **Lyrics = só o que pode ser cantado**: Direções musicais vão no Style
9. **[Instrumental] deve estar vazio**: Apenas a metatag, sem texto adicional

## 🚀 Próximos Passos Sugeridos

- [x] Adicionar validação automática de Lyrics para evitar que o Suno cante descrições
- [ ] Adicionar presets de gêneros musicais (bachata, sertanejo, funk, trap, etc.)
- [ ] Implementar validação automática de style longo
- [ ] Adicionar sistema de favoritos para prompts
- [ ] Criar versão PWA para uso offline
- [ ] Implementar analytics para acompanhar uso
- [ ] Adicionar suporte a múltiplos prompts simultâneos

O projeto está pronto para uso e otimizado para obter os melhores resultados na plataforma Suno AI.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Sugestões de Melhorias

### Melhorias Futuras Planejadas

- [x] Adicionar validação automática de Lyrics para evitar que o Suno cante descrições
- [ ] Adicionar temas de cores alternativos
- [ ] Implementar salvamento local (localStorage)
- [ ] Adicionar templates de gêneros musicais
- [ ] Criar versão em inglês/espanhol
- [ ] Adicionar pré-visualização de áudio (quando disponível)
- [ ] Implementar exportação direta para Suno API
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
