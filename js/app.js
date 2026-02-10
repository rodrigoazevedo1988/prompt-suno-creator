/**
 * Prompt Suno Creator - Application Logic
 * A form-based tool for generating optimized music prompts for Suno AI
 */

// DOM element selector helper
const $ = (id) => document.getElementById(id);
const toast = $("toast");

/**
 * Generate animated background particles
 */
function generateParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 10px and 50px
    const size = Math.random() * 40 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 15}s`;
    
    // Random animation duration
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    
    particlesContainer.appendChild(particle);
  }
}

/**
 * Handle language selection change
 */
function handleLanguageChange() {
  const langSelect = $("lang");
  const otherLanguageInput = $("otherLanguage");
  const otherLanguageLabel = $("otherLanguageLabel");
  
  langSelect.addEventListener("change", function() {
    if (this.value === "other") {
      otherLanguageInput.style.display = "block";
      otherLanguageLabel.style.display = "block";
      otherLanguageInput.focus();
    } else {
      otherLanguageInput.style.display = "none";
      otherLanguageLabel.style.display = "none";
    }
  });
}

/**
 * Clean and normalize string input
 * @param {string} s - Input string
 * @returns {string} - Cleaned string
 */
function clean(s) {
  return (s ?? "").toString().trim().replace(/\s+/g, " ");
}

/**
 * Validate Lyrics content to prevent Suno from singing descriptions
 * @param {string} lyrics - Lyrics content to validate
 * @returns {object} - Object with isValid flag and warnings array
 */
function validateLyrics(lyrics) {
  const warnings = [];
  let isValid = true;

  if (!lyrics || lyrics.trim() === "") {
    return { isValid: true, warnings: [] };
  }

  // Words that should NOT appear in Lyrics outside of metatags
  const forbiddenWords = [
    "violão", "sanfona", "clima", "arranjo", "instrumental", 
    "guitarra", "piano", "bateria", "baixo", "sintetizador",
    "synth", "drums", "bass", "acoustic", "electric",
    "melody", "harmony", "rhythm", "beat", "tempo",
    "atmosphere", "vibe", "mood", "energy", "dynamics",
    "intro", "outro", "bridge", "pre-chorus", "refrão",
    "verse", "chorus", "hook", "solo", "drop"
  ];

  // Check for forbidden words outside of metatags
  const lines = lyrics.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines and metatags
    if (!line || line.startsWith('[') && line.endsWith(']')) {
      continue;
    }

    // Check for forbidden words
    for (const word of forbiddenWords) {
      if (line.toLowerCase().includes(word)) {
        warnings.push(`⚠️ Linha ${i + 1}: "${word}" não deveria estar no Lyrics. Isso vai para o STYLE.`);
        isValid = false;
      }
    }

    // Check for long descriptive phrases (more than 3 words that look like descriptions)
    const words = line.split(/\s+/);
    if (words.length > 3 && !line.includes('"') && !line.includes("'")) {
      // Check if it looks like a description (contains adjectives/adverbs)
      const descriptiveWords = ["marcando", "entrando", "sorrindo", "animado", "disfarçada", "suave", "forte", "rápido", "lento"];
      for (const desc of descriptiveWords) {
        if (line.toLowerCase().includes(desc)) {
          warnings.push(`⚠️ Linha ${i + 1}: Isso parece descrição musical, não letra. Vai para o STYLE.`);
          isValid = false;
          break;
        }
      }
    }
  }

  // Check for content inside [Instrumental] tag
  let inInstrumental = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === "[Instrumental]") {
      inInstrumental = true;
      continue;
    }
    
    if (inInstrumental && line && !line.startsWith('[')) {
      warnings.push(`⚠️ Linha ${i + 1}: [Instrumental] deve estar vazio. Apenas "[Instrumental]" sem texto.`);
      isValid = false;
      inInstrumental = false;
    }
    
    if (line.startsWith('[') && line.endsWith(']') && line !== "[Instrumental]") {
      inInstrumental = false;
    }
  }

  return { isValid, warnings };
}

/**
 * Generate a "similar but not equal" artist name
 * This creates a name inspired by the original but legally distinct
 * @param {string} name - Original artist name
 * @returns {string} - Similar artist name
 */
function similarArtist(name) {
  const base = clean(name);
  if (!base) return "";
  
  const suffixes = [" Nova", " Noir", " Vale", " Prism", " Luz", " Arc", " Drift", " Bloom"];
  const suf = suffixes[Math.floor(Math.random() * suffixes.length)];

  const vmap = { a: "e", e: "i", i: "a", o: "u", u: "o", A: "E", E: "I", I: "A", O: "U", U: "O" };
  let out = "";
  
  for (let i = 0; i < base.length; i++) {
    const ch = base[i];
    if (vmap[ch] && Math.random() < 0.28) out += vmap[ch];
    else out += ch;
  }
  
  if (out === base) out = base.slice(0, Math.max(2, base.length - 1)) + suf;
  else out = out + suf;

  return out;
}

/**
 * Generate optimized Suno style format
 * @param {object} data - Form data
 * @returns {string} - Optimized style string
 */
function generateOptimizedStyle(data) {
  const styleOptimization = $("styleOptimization").value;
  const bpm = clean($("bpm").value) || "~130";
  
  // Convert Portuguese terms to English for better Suno performance
  const emotionMap = {
    "nostalgia": "nostalgic",
    "raiva": "angry",
    "esperança": "hopeful",
    "paixão": "passionate",
    "saudade": "melancholic",
    "alívio": "relieved",
    "ironia": "ironic",
    "superacao": "uplifting",
    "amor urbano": "urban love",
    "ciúme": "jealous",
    "liberdade": "free",
    "crítica social": "social critique",
    "noturna": "nocturnal",
    "íntima": "intimate",
    "cinematográfica": "cinematic",
    "agressiva": "aggressive",
    "solar": "sunny"
  };
  
  // Convert genre to English
  const genreMap = {
    "pop": "pop",
    "trap": "trap",
    "rock": "rock",
    "mpb": "mpb",
    "funk": "funk",
    "eletrônico": "electronic",
    "sertanejo": "sertanejo",
    "bachata": "bachata",
    "latino": "latin",
    "arroz": "arroz"
  };
  
  // Convert voice type
  const voiceMap = {
    "Feminina": "female",
    "Masculina": "male",
    "Mista": "mixed",
    "Instrumental (sem voz)": "instrumental"
  };
  
  // Convert formation
  const formationMap = {
    "Solo": "solo",
    "Dueto": "duet",
    "Solo + Backing vocals": "solo with backing vocals",
    "Coro": "chorus"
  };
  
  // Convert tempo
  const tempoMap = {
    "Lento": "slow",
    "Médio": "medium",
    "Rápido": "fast",
    "Não sei / tanto faz": "medium"
  };
  
  // Generate base style components
  const genres = data.genero.split(',').map(g => genreMap[clean(g).toLowerCase()] || clean(g)).filter(g => g).join(', ');
  const voice = voiceMap[data.voz_tipo] || data.voz_tipo.toLowerCase();
  const formation = formationMap[data.voz_formacao] || data.voz_formacao.toLowerCase();
  const tempo = tempoMap[data.andamento] || data.andamento.toLowerCase();
  
  // Process emotions
  let emotions = [];
  if (data.emocao_principal) {
    emotions.push(emotionMap[data.emocao_principal.toLowerCase()] || data.emocao_principal);
  }
  if (data.emocao_secundaria) {
    emotions.push(emotionMap[data.emocao_secundaria.toLowerCase()] || data.emocao_secundaria);
  }
  
  // Process instruments
  const instruments = [];
  if (data.instrumentos_principais) {
    instruments.push(...data.instrumentos_principais.split(',').map(i => clean(i)));
  }
  if (data.instrumentos_secundarios) {
    instruments.push(...data.instrumentos_secundarios.split(',').map(i => clean(i)));
  }
  
  // Generate style based on optimization level
  let style;
  if (styleOptimization === "optimized") {
    // Optimized style - short, dense, English-based
    style = `${genres}, ${voice} vocal, ${formation}, ${emotions.join(', ') || 'melodic'}, ${data.atmosfera || 'vibe'}, melodic, catchy hooks, ${instruments.join(', ') || 'standard instruments'}, ${tempo} tempo, ${bpm} BPM, style similar to "${data.referencia_similar || 'artist'}"`;
  } else if (styleOptimization === "detailed") {
    // Detailed style - more descriptive
    style = `${genres}, ${voice} vocal, ${formation}, ${emotions.join(', ') || 'melodic'}, ${data.atmosfera || 'vibe'}, ${data.estilo || 'style'}, melodic, catchy hooks, ${instruments.join(', ') || 'standard instruments'}, ${tempo} tempo, ${bpm} BPM, style similar to "${data.referencia_similar || 'artist'}"`;
  } else {
    // Minimal style - only genre
    style = `${genres}, ${voice} vocal, ${tempo} tempo, ${bpm} BPM, style similar to "${data.referencia_similar || 'artist'}"`;
  }
  
  return style;
}

/**
 * Collect all form data into a structured object
 * @returns {object} - Form data object
 */
function collect() {
  const data = {
    idioma: $("lang").value,
    idioma_especifico: clean($("otherLanguage").value),
    genero: clean($("genre").value),
    estilo: clean($("style").value),
    referencia: clean($("ref").value),
    referencia_similar: "",
    voz_tipo: $("voiceType").value,
    voz_formacao: $("formation").value,
    emocao_principal: clean($("emotionMain").value),
    emocao_secundaria: clean($("emotionSide").value),
    tema: clean($("theme").value),
    pov: $("pov").value,
    andamento: $("tempo").value,
    atmosfera: clean($("mood").value),
    instrumentos_principais: clean($("instMain").value),
    instrumentos_secundarios: clean($("instSide").value),
    estrutura: clean($("structure").value),
    refrão_tipo: $("chorusType").value,
    hook: clean($("hook").value),
    solo: clean($("solo").value),
    obrigatorios: clean($("must").value),
    evitar: clean($("avoid").value),
    extras: clean($("extras").value),
    letra_pronta: $("lyrics").value.trim(),
    usar_metatags: $("wantMetatags").checked,
    bpm: clean($("bpm").value),
    styleOptimization: $("styleOptimization").value
  };
  
  // Handle language selection
  if (data.idioma === "other") {
    data.idioma = data.idioma_especifico || "Outro";
  }
  
  data.referencia_similar = data.referencia ? similarArtist(data.referencia) : "";
  return data;
}

/**
 * Build the final prompt string from collected data
 * @param {object} data - Form data object
 * @returns {object} - Object containing prompt, missing fields, and validation warnings
 */
function buildPrompt(data) {
  const missing = [];
  if (!data.genero) missing.push("Gênero musical");

  const langHuman = (() => {
    switch (data.idioma) {
      case "pt-BR": return "Português (Brasil)";
      case "pt-PT": return "Português (Portugal)";
      case "en": return "Inglês";
      case "es": return "Espanhol";
      case "mix": return "Misto (PT + EN)";
      default: return data.idioma;
    }
  })();

  const refLine = data.referencia
    ? `Referência (não copiar): ${data.referencia} → use algo na vibe de "${data.referencia_similar}" (nome parecido, não igual).`
    : `Referência: (nenhuma) — crie um direcionamento estético sem citar artista real.`;

  const lyricsInstr = data.letra_pronta
    ? `LETRA: O usuário já forneceu letra. Use exatamente a letra abaixo (pode ajustar só pontuação/quebras se necessário para cantar melhor, mas SEM mudar o sentido).`
    : `LETRA: O usuário NÃO forneceu letra. Crie uma letra ORIGINAL completa, coerente e cantável, alinhada ao tema, emoção e estrutura.`;

  const metatagsLine = data.usar_metatags
    ? `Use metatags no formato [Intro], [Verse], [Pre-Chorus], [Chorus], [Bridge], [Outro] (conforme fizer sentido).`
    : `Não use metatags explícitas; apenas descreva estrutura de forma natural.`;

  // Generate optimized style
  const style = generateOptimizedStyle(data);

  const soloLine = data.solo ? `Solo instrumental desejado: ${data.solo}.` : `Solo instrumental: (não especificado).`;
  const hookLine = data.hook ? `Hook/frase central sugerida: "${data.hook}".` : `Hook/frase central: (você deve criar uma).`;

  const mustLine = data.obrigatorios ? `Obrigatórios: ${data.obrigatorios}.` : `Obrigatórios: (nenhum).`;
  const avoidLine = data.evitar ? `Evitar: ${data.evitar}.` : `Evitar: (nenhum).`;
  const extrasLine = data.extras ? `Extras: ${data.extras}.` : `Extras: (nenhum).`;

  // Validate lyrics if provided
  let validationWarnings = [];
  let lyricsValidationSection = "";
  if (data.letra_pronta) {
    const validation = validateLyrics(data.letra_pronta);
    validationWarnings = validation.warnings;
    
    if (validationWarnings.length > 0) {
      lyricsValidationSection = `
⚠️ ALERTAS DE VALIDAÇÃO DA LETRA DO USUÁRIO:
${validationWarnings.join('\n')}

🚨 IMPORTANTE: O Suno canta TUDO que estiver como texto normal no Lyrics.
- Direções musicais (instrumentos, clima, arranjo) devem ir no STYLE
- No Lyrics, coloque APENAS o que pode ser cantado
- [Instrumental] deve estar vazio, apenas a metatag

Se quiser corrigir, ajuste a letra antes de gerar o prompt final.
`;
    }
  }

  const prompt =
`Você é um especialista em composições para Suno AI.

TAREFA:
1) Crie a CANÇÃO completa (letra + orientação de melodia/arranjo).
2) Entregue um PROMPT FINAL para eu colar no Suno (campo Style + campo Lyrics), bem formatado.
3) Garanta coerência entre tema, emoção, estrutura e estética.

BRIEF (respostas do usuário):
- Idioma: ${langHuman}
- Gênero: ${data.genero || "(não informado)"}
- Estilo/vibe: ${data.estilo || "(não informado)"}
- ${refLine}
- Voz: ${data.voz_tipo} | Formação: ${data.voz_formacao}
- Emoção principal: ${data.emocao_principal || "(não informado)"}${data.emocao_secundaria ? ` | Secundárias: ${data.emocao_secundaria}` : ""}
- Tema: ${data.tema || "(não informado)"} | POV: ${data.pov}
- Andamento/energia: ${data.andamento} | Atmosfera: ${data.atmosfera || "(não informado)"}
- Instrumentos principais: ${data.instrumentos_principais || "(não informado)"}
- Instrumentos secundários: ${data.instrumentos_secundarios || "(não informado)"}
- Estrutura desejada: ${data.estrutura || "(não informado)"}
- Refrão: ${data.refrão_tipo}
- ${hookLine}
- ${soloLine}
- ${mustLine}
- ${avoidLine}
- ${extrasLine}

REGRAS DE SAÍDA:
- ${metatagsLine}
- O resultado deve vir em 2 blocos:
  A) STYLE (formato otimizado para Suno - curto, denso, em inglês): ${style}
  B) LYRICS (letra final pronta para cantar, seguindo a estrutura, com toda a narrativa e emoção).
- Se o usuário deixou letra pronta, use-a. Se não, crie.
- Não cite o nome do artista real diretamente no prompt final; use apenas a "referência similar" ou descrições.

${lyricsInstr}
${data.letra_pronta ? `\nLETRA DO USUÁRIO:\n${data.letra_pronta}\n` : ""}

Agora gere a composição completa e entregue STYLE + LYRICS prontos.`;

  return { prompt, missing, validationWarnings };
}

/**
 * Show a toast notification
 * @param {string} msg - Message to display
 */
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 900);
}

/**
 * Download content as a file
 * @param {string} filename - Name of the file to download
 * @param {string} content - Content to write to file
 * @param {string} mime - MIME type of the file
 */
function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 500);
}

/**
 * Set the output text
 * @param {string} text - Text to display in output area
 */
function setOut(text) {
  $("out").textContent = text || "";
}

/**
 * Show loading state
 * @param {boolean} isLoading - Whether to show loading
 */
function setLoading(isLoading) {
  const genButton = $("gen");
  if (isLoading) {
    genButton.innerHTML = '<span class="loading"></span> Gerando...';
    genButton.disabled = true;
  } else {
    genButton.innerHTML = 'Gerar PROMPT FINAL (pra me enviar)';
    genButton.disabled = false;
  }
}

// Event Listeners

// Generate prompt button
$("gen").addEventListener("click", () => {
  setLoading(true);
  setTimeout(() => {
    const data = collect();
    const { prompt, missing, validationWarnings } = buildPrompt(data);

    if (missing.length) {
      $("status").textContent = `Faltando: ${missing.join(", ")} (recomendado preencher). Mesmo assim gerei.`;
    } else if (validationWarnings.length > 0) {
      $("status").textContent = `⚠️ ${validationWarnings.length} alerta(s) de validação na letra. Verifique abaixo.`;
    } else {
      $("status").textContent = "Pronto. Agora copie e cole aqui no chat.";
    }
    setOut(prompt);
    setLoading(false);
  }, 500); // Simulate loading time
});

// Copy to clipboard button
$("copy").addEventListener("click", async () => {
  const text = $("out").textContent;
  if (!text) {
    $("status").textContent = "Nada pra copiar ainda. Clique em \"Gerar\". ";
    return;
  }
  await navigator.clipboard.writeText(text);
  showToast("Copiado ✅");
});

// Download as TXT button
$("dlTxt").addEventListener("click", () => {
  const text = $("out").textContent;
  if (!text) {
    $("status").textContent = "Nada pra baixar ainda. Clique em \"Gerar\". ";
    return;
  }
  downloadFile("brief_suno_sr_gato.txt", text, "text/plain;charset=utf-8");
});

// Download as JSON button
$("dlJson").addEventListener("click", () => {
  const data = collect();
  const built = buildPrompt(data);
  const payload = {
    data,
    prompt_final: built.prompt
  };
  downloadFile("brief_suno_sr_gato.json", JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
});

// Reset form button
$("reset").addEventListener("click", () => {
  document.querySelectorAll("input, textarea").forEach(el => {
    if (el.id === "structure") return; // mantém default
    el.value = "";
  });
  $("genre").value = "";
  $("lang").value = "pt-BR";
  $("voiceType").value = "Feminina";
  $("formation").value = "Solo";
  $("tempo").value = "Médio";
  $("chorusType").value = "Explosivo";
  $("pov").value = "1ª pessoa (eu)";
  $("wantMetatags").checked = true;
  $("styleOptimization").value = "optimized";
  $("status").textContent = "";
  setOut("");
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  generateParticles();
  handleLanguageChange();
  
  // Initialize with default message
  setOut("Clique em \"Gerar PROMPT FINAL (pra me enviar)\" depois de preencher o formulário.");
});
