/**
 * Prompt Suno Creator - Application Logic
 * A form-based tool for generating music prompts for Suno AI
 */

// DOM element selector helper
const $ = (id) => document.getElementById(id);
const toast = $("toast");

/**
 * Clean and normalize string input
 * @param {string} s - Input string
 * @returns {string} - Cleaned string
 */
function clean(s) {
  return (s ?? "").toString().trim().replace(/\s+/g, " ");
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
 * Collect all form data into a structured object
 * @returns {object} - Form data object
 */
function collect() {
  const data = {
    idioma: $("lang").value,
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
    usar_metatags: $("wantMetatags").checked
  };
  
  data.referencia_similar = data.referencia ? similarArtist(data.referencia) : "";
  return data;
}

/**
 * Build the final prompt string from collected data
 * @param {object} data - Form data object
 * @returns {object} - Object containing prompt and missing fields
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
      default: return "Outro";
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

  const soloLine = data.solo ? `Solo instrumental desejado: ${data.solo}.` : `Solo instrumental: (não especificado).`;
  const hookLine = data.hook ? `Hook/frase central sugerida: "${data.hook}".` : `Hook/frase central: (você deve criar uma).`;

  const mustLine = data.obrigatorios ? `Obrigatórios: ${data.obrigatorios}.` : `Obrigatórios: (nenhum).`;
  const avoidLine = data.evitar ? `Evitar: ${data.evitar}.` : `Evitar: (nenhum).`;
  const extrasLine = data.extras ? `Extras: ${data.extras}.` : `Extras: (nenhum).`;

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
  A) STYLE (um parágrafo objetivo com gênero, vibe, timbres, andamento sugerido, voz, e referências "parecidas").
  B) LYRICS (letra final pronta para cantar, seguindo a estrutura).
- Se o usuário deixou letra pronta, use-a. Se não, crie.
- Não cite o nome do artista real diretamente no prompt final; use apenas a "referência similar" ou descrições.

${lyricsInstr}
${data.letra_pronta ? `\nLETRA DO USUÁRIO:\n${data.letra_pronta}\n` : ""}

Agora gere a composição completa e entregue STYLE + LYRICS prontos.`;

  return { prompt, missing };
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

// Event Listeners

// Generate prompt button
$("gen").addEventListener("click", () => {
  const data = collect();
  const { prompt, missing } = buildPrompt(data);

  if (missing.length) {
    $("status").textContent = `Faltando: ${missing.join(", ")} (recomendado preencher). Mesmo assim gerei.`;
  } else {
    $("status").textContent = "Pronto. Agora copie e cole aqui no chat.";
  }
  setOut(prompt);
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
  $("status").textContent = "";
  setOut("");
});

// Initialize with default message
setOut("Clique em \"Gerar PROMPT FINAL (pra me enviar)\" depois de preencher o formulário.");
