import { useEffect, useRef, useState } from "react";

const westernSigns = [
  {
    name: "Aries",
    start: { month: 3, day: 21 },
    end: { month: 4, day: 19 },
    element: "Fogo",
    range: "21/03 a 19/04",
    desc: "Impulso, coragem e pioneirismo. Energia para iniciar ciclos."
  },
  {
    name: "Touro",
    start: { month: 4, day: 20 },
    end: { month: 5, day: 20 },
    element: "Terra",
    range: "20/04 a 20/05",
    desc: "Estabilidade, paciencia e sensorialidade. Busca por seguranca."
  },
  {
    name: "Gemeos",
    start: { month: 5, day: 21 },
    end: { month: 6, day: 20 },
    element: "Ar",
    range: "21/05 a 20/06",
    desc: "Curiosidade, comunicacao e versatilidade. Conecta ideias."
  },
  {
    name: "Cancer",
    start: { month: 6, day: 21 },
    end: { month: 7, day: 22 },
    element: "Agua",
    range: "21/06 a 22/07",
    desc: "Emocao, cuidado e memoria. Protege o que ama."
  },
  {
    name: "Leao",
    start: { month: 7, day: 23 },
    end: { month: 8, day: 22 },
    element: "Fogo",
    range: "23/07 a 22/08",
    desc: "Expressao, brilho e generosidade. Lideranca criativa."
  },
  {
    name: "Virgem",
    start: { month: 8, day: 23 },
    end: { month: 9, day: 22 },
    element: "Terra",
    range: "23/08 a 22/09",
    desc: "Analise, servico e refinamento. Aperfeicoa detalhes."
  },
  {
    name: "Libra",
    start: { month: 9, day: 23 },
    end: { month: 10, day: 22 },
    element: "Ar",
    range: "23/09 a 22/10",
    desc: "Equilibrio, diplomacia e estetica. Harmoniza relacoes."
  },
  {
    name: "Escorpiao",
    start: { month: 10, day: 23 },
    end: { month: 11, day: 21 },
    element: "Agua",
    range: "23/10 a 21/11",
    desc: "Intensidade, transformacao e profundidade. Renova a alma."
  },
  {
    name: "Sagitario",
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
    element: "Fogo",
    range: "22/11 a 21/12",
    desc: "Expansao, aventura e filosofia. Busca sentido."
  },
  {
    name: "Capricornio",
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 },
    element: "Terra",
    range: "22/12 a 19/01",
    desc: "Disciplina, responsabilidade e ambicao. Construtor de metas."
  },
  {
    name: "Aquario",
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
    element: "Ar",
    range: "20/01 a 18/02",
    desc: "Originalidade, visao e coletividade. Inova o futuro."
  },
  {
    name: "Peixes",
    start: { month: 2, day: 19 },
    end: { month: 3, day: 20 },
    element: "Agua",
    range: "19/02 a 20/03",
    desc: "Sensibilidade, empatia e imaginacao. Fluidez espiritual."
  }
];

const chineseAnimals = [
  { name: "Rato", desc: "Estrategia, adaptacao e inteligencia rapida." },
  { name: "Boi", desc: "Paciencia, perseveranca e confianca." },
  { name: "Tigre", desc: "Coragem, instinto e independencia." },
  { name: "Coelho", desc: "Gentileza, diplomacia e sensibilidade." },
  { name: "Dragao", desc: "Carisma, vigor e grandeza." },
  { name: "Serpente", desc: "Sabedoria, intuicao e magnetismo." },
  { name: "Cavalo", desc: "Liberdade, movimento e entusiasmo." },
  { name: "Cabra", desc: "Criatividade, cuidado e empatia." },
  { name: "Macaco", desc: "Inventividade, humor e versatilidade." },
  { name: "Galo", desc: "Precisao, franqueza e orgulho." },
  { name: "Cao", desc: "Lealdade, protecao e justica." },
  { name: "Porco", desc: "Generosidade, prazer e confianca." }
];

const cabalaPaths = {
  1: { keyword: "Inicio", desc: "Lideranca, iniciativa e coragem para abrir caminhos." },
  2: { keyword: "Cooperacao", desc: "Parcerias, sensibilidade e intuicao em equilibrio." },
  3: { keyword: "Criacao", desc: "Expressao, criatividade e alegria comunicativa." },
  4: { keyword: "Estrutura", desc: "Disciplina, responsabilidade e base solida." },
  5: { keyword: "Mudanca", desc: "Liberdade, curiosidade e desejo de movimento." },
  6: { keyword: "Cuidado", desc: "Afeto, protecao e senso de comunidade." },
  7: { keyword: "Sabedoria", desc: "Estudo, introspeccao e busca espiritual." },
  8: { keyword: "Poder", desc: "Realizacao, estrategia e dominio interno." },
  9: { keyword: "Servico", desc: "Empatia, altruismo e encerramentos conscientes." },
  10: { keyword: "Ciclos", desc: "Mudancas de rota e oportunidades de crescimento." },
  11: { keyword: "Inspiracao", desc: "Visao elevada, intuicao e magnetismo." },
  12: { keyword: "Entrega", desc: "Pausa, novo olhar e desapego do controle." },
  13: { keyword: "Transformacao", desc: "Renovacao profunda e coragem para recomecar." },
  14: { keyword: "Equilibrio", desc: "Harmonia, cura e alquimia emocional." },
  15: { keyword: "Desejo", desc: "Confronto das sombras e autenticidade." },
  16: { keyword: "Verdade", desc: "Rupturas que libertam e revelam." },
  17: { keyword: "Esperanca", desc: "Fe, inspiracao e regeneracao." },
  18: { keyword: "Misterio", desc: "Intuicao, sonhos e sensibilidade profunda." },
  19: { keyword: "Vitalidade", desc: "Claridade, alegria e confianca." },
  20: { keyword: "Despertar", desc: "Chamado interior e renovacao de proposito." },
  21: { keyword: "Integracao", desc: "Conclusao, plenitude e realizacao." },
  22: { keyword: "Liberdade", desc: "Fe, espontaneidade e novos caminhos." }
};

const tarotCards = {
  1: { name: "O Mago", desc: "Iniciativa, talento e foco para manifestar." },
  2: { name: "A Sacerdotisa", desc: "Intuicao, silencio e misterio interior." },
  3: { name: "A Imperatriz", desc: "Criatividade, nutricao e abundancia." },
  4: { name: "O Imperador", desc: "Estrutura, autoridade e protecao." },
  5: { name: "O Hierofante", desc: "Tradicao, aprendizado e valores." },
  6: { name: "Os Enamorados", desc: "Escolhas alinhadas ao coracao." },
  7: { name: "O Carro", desc: "Direcao, conquista e movimento." },
  8: { name: "A Forca", desc: "Coragem, dominio interno e paciencia." },
  9: { name: "O Eremita", desc: "Busca interior e sabedoria." },
  10: { name: "A Roda da Fortuna", desc: "Ciclos, mudanca e destino." },
  11: { name: "A Justica", desc: "Equilibrio, verdade e responsabilidade." },
  12: { name: "O Enforcado", desc: "Pausa, entrega e novo olhar." },
  13: { name: "A Morte", desc: "Fim, renascimento e transformacao." },
  14: { name: "A Temperanca", desc: "Harmonia, cura e moderacao." },
  15: { name: "O Diabo", desc: "Desejos, apegos e sombra." },
  16: { name: "A Torre", desc: "Ruptura, revelacao e libertacao." },
  17: { name: "A Estrela", desc: "Esperanca, inspiracao e fe." },
  18: { name: "A Lua", desc: "Intuicao, sonhos e ambiguidade." },
  19: { name: "O Sol", desc: "Vitalidade, clareza e alegria." },
  20: { name: "O Julgamento", desc: "Despertar, chamado e renovacao." },
  21: { name: "O Mundo", desc: "Conclusao, plenitude e integracao." },
  22: { name: "O Louco", desc: "Liberdade, espontaneidade e inicio." }
};

const ASTRO_PATH = "/mapa-astral";
const CHINESE_PATH = "/horoscopo-chines";
const AZTRO_PROXY_PATH = "/api/aztro";
const HOROSCOPE_FALLBACK_PATH = "/api/horoscope";
const TRANSLATE_PROXY_PATH = "/api/translate";
const D1XZ_PROXY_PATH = "/api/d1xz";
const D1XZ_DAILY_PATH = "/sx/yunshi/";

const signRulers = {
  Aries: "Marte",
  Touro: "Venus",
  Gemeos: "Mercurio",
  Cancer: "Lua",
  Leao: "Sol",
  Virgem: "Mercurio",
  Libra: "Venus",
  Escorpiao: "Plutao",
  Sagitario: "Jupiter",
  Capricornio: "Saturno",
  Aquario: "Urano",
  Peixes: "Netuno"
};

const aztroSignKeys = {
  Aries: "aries",
  Touro: "taurus",
  Gemeos: "gemini",
  Cancer: "cancer",
  Leao: "leo",
  Virgem: "virgo",
  Libra: "libra",
  Escorpiao: "scorpio",
  Sagitario: "sagittarius",
  Capricornio: "capricorn",
  Aquario: "aquarius",
  Peixes: "pisces"
};

const d1xzSignMeta = {
  Rato: { cn: "\u9f20", pinyin: "shu" },
  Boi: { cn: "\u725b", pinyin: "niu" },
  Tigre: { cn: "\u864e", pinyin: "hu" },
  Coelho: { cn: "\u5154", pinyin: "tu" },
  Dragao: { cn: "\u9f99", pinyin: "long" },
  Serpente: { cn: "\u86c7", pinyin: "she" },
  Cavalo: { cn: "\u9a6c", pinyin: "ma" },
  Cabra: { cn: "\u7f8a", pinyin: "yang" },
  Macaco: { cn: "\u7334", pinyin: "hou" },
  Galo: { cn: "\u9e21", pinyin: "ji" },
  Cao: { cn: "\u72d7", pinyin: "gou" },
  Porco: { cn: "\u732a", pinyin: "zhu" }
};

const chineseZodiacLabels = {
  "\u9f20": "Rato",
  "\u725b": "Boi",
  "\u864e": "Tigre",
  "\u5154": "Coelho",
  "\u9f99": "Dragao",
  "\u86c7": "Serpente",
  "\u9a6c": "Cavalo",
  "\u7f8a": "Cabra",
  "\u7334": "Macaco",
  "\u9e21": "Galo",
  "\u72d7": "Cao",
  "\u732a": "Porco",
  Rat: "Rato",
  Ox: "Boi",
  Tiger: "Tigre",
  Rabbit: "Coelho",
  Dragon: "Dragao",
  Snake: "Serpente",
  Horse: "Cavalo",
  Goat: "Cabra",
  Sheep: "Cabra",
  Monkey: "Macaco",
  Rooster: "Galo",
  Dog: "Cao",
  Pig: "Porco",
  Boar: "Porco"
};

const chineseElementAccents = {
  Madeira: "bg-gradient-to-br from-emerald-300 to-lime-300",
  Fogo: "bg-gradient-to-br from-rose-400 to-orange-300",
  Terra: "bg-gradient-to-br from-amber-300 to-stone-300",
  Metal: "bg-gradient-to-br from-slate-200 to-zinc-200",
  Agua: "bg-gradient-to-br from-sky-400 to-blue-500"
};

const horseElementSet = [
  { element: "Madeira", desc: "Criatividade e impulso para crescer." },
  { element: "Fogo", desc: "Energia alta e coragem para liderar." },
  { element: "Terra", desc: "Estabilidade e foco em resultados." },
  { element: "Metal", desc: "Disciplina e firmeza nas escolhas." },
  { element: "Agua", desc: "Intuicao e flexibilidade emocional." }
];

const elementForecasts = {
  Fogo: {
    focus: "Expansao pessoal e coragem para iniciar projetos adiados.",
    challenge: "Controlar impulsos e manter constancia nas escolhas.",
    direction: "Escolha uma meta central e alimente o ritmo com rotina."
  },
  Terra: {
    focus: "Consolidacao, disciplina e resultados concretos.",
    challenge: "Flexibilizar diante de mudancas inevitaveis.",
    direction: "Planeje, mas ajuste a rota sem perder o foco."
  },
  Ar: {
    focus: "Conexoes, estudos e ideias em circulacao.",
    challenge: "Dispersao e excesso de informacao.",
    direction: "Priorize poucos projetos e comunique com clareza."
  },
  Agua: {
    focus: "Cura emocional e profundidade nos vinculos.",
    challenge: "Limites energeticos e medo de se expor.",
    direction: "Respeite seu tempo e fortaleça o autocuidado."
  },
  Default: {
    focus: "Preencha seus dados para receber previsoes personalizadas.",
    challenge: "Revele seu signo para desbloquear a leitura anual.",
    direction: "Informe seu nome e data para iniciar."
  }
};

const elementMoonInsights = {
  Fogo: "Emocoes intensas e espontaneas. Precisa de movimento para equilibrar.",
  Terra: "Sentimentos constantes e busca por seguranca emocional.",
  Ar: "Necessidade de dialogo para organizar o que sente.",
  Agua: "Intuicao profunda e sensibilidade elevada nos vinculos."
};

function normalizeApostrophes(value) {
  return value.replace(/[’`´]/g, "'");
}

function formatNameSentenceCase(value) {
  const lower = value.toLocaleLowerCase("pt-BR");

  if (!lower) {
    return "";
  }

  return lower[0].toLocaleUpperCase("pt-BR") + lower.slice(1);
}

function hasKeyboardRun(value) {
  const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

  for (const row of rows) {
    const reversed = row.split("").reverse().join("");

    for (let i = 0; i <= row.length - 4; i += 1) {
      const chunk = row.slice(i, i + 4);
      if (value.includes(chunk)) {
        return true;
      }
    }

    for (let i = 0; i <= reversed.length - 4; i += 1) {
      const chunk = reversed.slice(i, i + 4);
      if (value.includes(chunk)) {
        return true;
      }
    }

    for (let i = 0; i <= row.length - 3; i += 1) {
      const triplet = row.slice(i, i + 3);
      const first = value.indexOf(triplet);
      if (first !== -1 && value.indexOf(triplet, first + 2) !== -1) {
        return true;
      }
    }

    for (let i = 0; i <= reversed.length - 3; i += 1) {
      const triplet = reversed.slice(i, i + 3);
      const first = value.indexOf(triplet);
      if (first !== -1 && value.indexOf(triplet, first + 2) !== -1) {
        return true;
      }
    }
  }

  return false;
}

function validateAndFormatName(input) {
  const normalized = normalizeApostrophes(input).replace(/\s+/g, " ").trim();

  if (!normalized) {
    return { valid: false, formattedName: "", error: "Digite seu nome para continuar." };
  }

  if (!/^[\p{L}\p{M}' ]+$/u.test(normalized)) {
    return {
      valid: false,
      formattedName: "",
      error: "Use apenas letras, espacos e apostrofos."
    };
  }

  const compact = normalized.replace(/\s+/g, "");
  if (compact.length < 2) {
    return { valid: false, formattedName: "", error: "Digite pelo menos 2 letras." };
  }

  const formattedName = formatNameSentenceCase(normalized);
  const lettersOnly = formattedName
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-záàâãéêíóôõúüç]/g, "");
  const vowels = lettersOnly.match(/[aeiouáàâãéêíóôõúü]/g) || [];

  if (vowels.length === 0) {
    return {
      valid: false,
      formattedName,
      error: "O nome precisa ter pelo menos uma vogal."
    };
  }

  if (/(.)\1{3,}/.test(lettersOnly)) {
    return {
      valid: false,
      formattedName,
      error: "Evite repetir o mesmo caractere muitas vezes."
    };
  }

  if (/[bcdfghjklmnpqrstvwxyzç]{5,}/.test(lettersOnly)) {
    return {
      valid: false,
      formattedName,
      error: "O nome tem muitas consoantes seguidas."
    };
  }

  if (hasKeyboardRun(lettersOnly)) {
    return {
      valid: false,
      formattedName,
      error: "O nome parece uma sequencia de teclado."
    };
  }

  return { valid: true, formattedName, error: null };
}

const elementAccents = {
  Fogo: { label: "Fogo", className: "bg-gradient-to-br from-rose-400 to-orange-300" },
  Terra: { label: "Terra", className: "bg-gradient-to-br from-amber-300 to-emerald-400" },
  Ar: { label: "Ar", className: "bg-gradient-to-br from-sky-200 to-slate-200" },
  Agua: { label: "Agua", className: "bg-gradient-to-br from-sky-400 to-blue-500" }
};

function getElementAccent(value) {
  if (!value) {
    return null;
  }

  return elementAccents[value] || { label: value, className: "bg-white/40" };
}

function getSignRuler(value) {
  if (!value) {
    return null;
  }

  return signRulers[value] || null;
}

function getChineseZodiacLabel(value) {
  if (!value) {
    return "";
  }

  return chineseZodiacLabels[value] || value;
}

function getChineseElementAccent(value) {
  if (!value) {
    return "bg-white/25";
  }

  return chineseElementAccents[value] || "bg-white/25";
}

function getChineseYearElement(lunarYearLabel, fallbackYear) {
    const stemMap = {
    "\u7532": "Madeira",
    "\u4e59": "Madeira",
    "\u4e19": "Fogo",
    "\u4e01": "Fogo",
    "\u620a": "Terra",
    "\u5df1": "Terra",
    "\u5e9a": "Metal",
    "\u8f9b": "Metal",
    "\u58ec": "Agua",
    "\u7678": "Agua"
  };

  if (lunarYearLabel) {
    const trimmed = lunarYearLabel.trim();
    const firstChar = trimmed[0];
    if (stemMap[firstChar]) {
      return stemMap[firstChar];
    }
  }

  if (typeof fallbackYear === "number") {
    const stems = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"];
    const stem = stems[mod(fallbackYear - 4, 10)];
    return stemMap[stem] || null;
  }

  return null;
}

async function fetchAztro(signKey, day = "today") {
  const params = new URLSearchParams({ sign: signKey, day }).toString();
  const requestAztro = async () => {
    const response = await fetch(`${AZTRO_PROXY_PATH}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    if (!response.ok) {
      const error = new Error("Aztro request failed.");
      error.status = response.status;
      throw error;
    }

    return response.json();
  };

  const requestFallback = async () => {
    const response = await fetch(
      `${HOROSCOPE_FALLBACK_PATH}/api/v1/get-horoscope/daily?${params}`
    );

    if (!response.ok) {
      const error = new Error("Fallback request failed.");
      error.status = response.status;
      throw error;
    }

    const payload = await response.json();
    const description =
      payload?.data?.horoscope_data ||
      payload?.data?.horoscope ||
      payload?.data?.description ||
      payload?.horoscope_data ||
      payload?.horoscope ||
      payload?.description ||
      payload?.data?.prediction ||
      payload?.prediction ||
      "";

    if (!description) {
      const error = new Error("Fallback response missing description.");
      error.status = 502;
      throw error;
    }

    return {
      description,
      provider: "horoscope-app-api",
      source: payload
    };
  };

  try {
    return await requestFallback();
  } catch (error) {
    try {
      return await requestAztro();
    } catch (aztroError) {
      aztroError.cause = error;
      throw aztroError;
    }
  }
}

function hasCjkCharacters(value) {
  return /[\u3400-\u9fff]/.test(value);
}

function isLikelyPortuguese(value) {
  return /[ãõçáéíóúâêôà]/i.test(value);
}

async function translateToPtBr(text) {
  if (!text) {
    return { text: "", translated: false };
  }

  if (isLikelyPortuguese(text)) {
    return { text, translated: false };
  }

  const sourceLang = hasCjkCharacters(text) ? "zh-CN" : "en";
  const params = new URLSearchParams({
    q: text,
    langpair: `${sourceLang}|pt-br`
  });
  const response = await fetch(`${TRANSLATE_PROXY_PATH}?${params.toString()}`);

  if (!response.ok) {
    const error = new Error("Translation request failed.");
    error.status = response.status;
    throw error;
  }

  const payload = await response.json();
  const translatedText = payload?.responseData?.translatedText;

  if (!translatedText) {
    return { text, translated: false };
  }

  return { text: translatedText, translated: true };
}

async function readHtmlResponse(response) {
  const buffer = await response.arrayBuffer();
  const utf8Text = new TextDecoder("utf-8").decode(buffer);
  const contentType = response.headers.get("content-type") || "";
  const hasGbk =
    /charset=gb/i.test(contentType) || /charset=gb/i.test(utf8Text);

  if (!hasGbk) {
    return utf8Text;
  }

  try {
    return new TextDecoder("gb18030").decode(buffer);
  } catch (error) {
    return utf8Text;
  }
}

function pickBestParagraph(paragraphs) {
  if (!paragraphs.length) {
    return "";
  }

  const cleaned = paragraphs
    .map((value) => value.trim())
    .filter((value) => value.length > 12);

  if (!cleaned.length) {
    return paragraphs[0].trim();
  }

  return cleaned.reduce((best, current) =>
    current.length > best.length ? current : best
  );
}

function extractD1xzForecast(html, signInfo) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const normalize = (value) => value.replace(/\s+/g, " ").trim();
  const matchesSign = (value) => {
    const text = value.replace(/\s+/g, "").toLowerCase();
    return (
      text.includes(signInfo.cn) ||
      text.includes(signInfo.pinyin) ||
      text.includes(signInfo.name.toLowerCase())
    );
  };

  const headings = Array.from(doc.querySelectorAll("h1,h2,h3,h4,h5"));
  const heading = headings.find((node) =>
    matchesSign(node.textContent || "")
  );

  if (heading) {
    const container =
      heading.closest("section,article,div") || heading.parentElement;
    if (container) {
      const paragraphs = Array.from(container.querySelectorAll("p"))
        .map((node) => normalize(node.textContent || ""))
        .filter(Boolean);
      const picked = pickBestParagraph(paragraphs);
      if (picked) {
        return picked;
      }
    }

    const siblingParagraphs = [];
    let sibling = heading.nextElementSibling;
    while (sibling && !/H[1-5]/.test(sibling.tagName)) {
      if (sibling.tagName === "P") {
        const text = normalize(sibling.textContent || "");
        if (text) {
          siblingParagraphs.push(text);
        }
      } else {
        siblingParagraphs.push(
          ...Array.from(sibling.querySelectorAll("p"))
            .map((node) => normalize(node.textContent || ""))
            .filter(Boolean)
        );
      }

      if (siblingParagraphs.length >= 3) {
        break;
      }
      sibling = sibling.nextElementSibling;
    }

    const pickedSibling = pickBestParagraph(siblingParagraphs);
    if (pickedSibling) {
      return pickedSibling;
    }
  }

  const root =
    doc.querySelector("article") ||
    doc.querySelector(".content") ||
    doc.querySelector("#content") ||
    doc.querySelector("main") ||
    doc.body;
  const fallbackParagraphs = Array.from(root.querySelectorAll("p"))
    .map((node) => normalize(node.textContent || ""))
    .filter(Boolean);

  return pickBestParagraph(fallbackParagraphs);
}

async function fetchD1xzForecast(signName) {
  const signInfo = d1xzSignMeta[signName];

  if (!signInfo) {
    const error = new Error("Unknown chinese sign.");
    error.status = 400;
    throw error;
  }

  const candidates = [
    `/sx/yunshi/${signInfo.pinyin}/`,
    `/sx/${signInfo.pinyin}/`,
    D1XZ_DAILY_PATH
  ];

  for (const path of candidates) {
    try {
      const response = await fetch(`${D1XZ_PROXY_PATH}${path}`);
      if (!response.ok) {
        const error = new Error("D1xz request failed.");
        error.status = response.status;
        throw error;
      }

      const html = await readHtmlResponse(response);
      const description = extractD1xzForecast(html, {
        ...signInfo,
        name: signName
      });

      if (!description) {
        const error = new Error("D1xz response missing description.");
        error.status = 502;
        throw error;
      }

      return {
        description,
        sourcePath: path
      };
    } catch (error) {
      if (error?.status === 404) {
        continue;
      }
    }
  }

  const error = new Error("D1xz forecast unavailable.");
  error.status = 503;
  throw error;
}

function formatDateInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function parseDateInput(value) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const checkDate = new Date(year, month - 1, day);

  if (
    Number.isNaN(checkDate.getTime()) ||
    checkDate.getFullYear() !== year ||
    checkDate.getMonth() !== month - 1 ||
    checkDate.getDate() !== day
  ) {
    return null;
  }

  return { day, month, year };
}

function isDateInRange(day, month, start, end) {
  const startsBeforeEnd =
    start.month < end.month ||
    (start.month === end.month && start.day <= end.day);

  if (startsBeforeEnd) {
    const afterStart =
      month > start.month || (month === start.month && day >= start.day);
    const beforeEnd =
      month < end.month || (month === end.month && day <= end.day);
    return afterStart && beforeEnd;
  }

  const inEndOfYear =
    month > start.month || (month === start.month && day >= start.day);
  const inStartOfYear =
    month < end.month || (month === end.month && day <= end.day);

  return inEndOfYear || inStartOfYear;
}

function getWesternSign(day, month) {
  for (const sign of westernSigns) {
    if (isDateInRange(day, month, sign.start, sign.end)) {
      return sign;
    }
  }
  return null;
}

function adjustYearForChineseNewYear(day, month, year) {
  if (month < 2 || (month === 2 && day < 4)) {
    return year - 1;
  }
  return year;
}

function mod(number, base) {
  return ((number % base) + base) % base;
}

function getChineseSign(day, month, year) {
  const baseYear = 1900;
  const adjustedYear = adjustYearForChineseNewYear(day, month, year);
  const index = mod(adjustedYear - baseYear, 12);
  const animal = chineseAnimals[index];

  return {
    name: animal.name,
    desc: animal.desc,
    year: adjustedYear
  };
}

function getChineseYearZodiac(year) {
  const baseYear = 1900;
  const index = mod(year - baseYear, 12);
  const animal = chineseAnimals[index];

  return animal ? animal.name : "";
}

function sumDigits(value) {
  return value
    .toString()
    .split("")
    .reduce((total, digit) => total + Number(digit), 0);
}

function getLifePathNumber(day, month, year) {
  const digits = `${String(day).padStart(2, "0")}${String(month).padStart(
    2,
    "0"
  )}${year}`;
  let total = sumDigits(digits);

  while (total > 22) {
    total = sumDigits(total);
  }

  if (total === 0) {
    return 22;
  }

  return total;
}

export default function App() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [western, setWestern] = useState(null);
  const [chinese, setChinese] = useState(null);
  const [chineseForecast, setChineseForecast] = useState({ status: "idle" });
  const [chineseYearInfo, setChineseYearInfo] = useState({ status: "idle" });
  const [cabala, setCabala] = useState(null);
  const [tarot, setTarot] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aztroBySign, setAztroBySign] = useState({});
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === "undefined") {
      return "home";
    }

    const path = window.location.pathname.replace(/\/+$/, "");
    if (path.endsWith(ASTRO_PATH)) {
      return "astro";
    }
    if (path.endsWith(CHINESE_PATH)) {
      return "chinese";
    }
    return "home";
  });
  const starWrapRef = useRef(null);
  const starCanvasRef = useRef(null);
  const modalCanvasRef = useRef(null);
  const hasLoadedAztroRef = useRef(false);
  const calendarDbRef = useRef(null);
  const calendarLoadedRef = useRef(false);
  const elementAccent = getElementAccent(western?.element);
  const isAstroPage = currentPage === "astro";
  const isChinesePage = currentPage === "chinese";
  const isDev = import.meta?.env?.DEV;
  const currentYear = new Date().getFullYear();
  const ruler = getSignRuler(western?.name);
  const forecast = elementForecasts[western?.element] || elementForecasts.Default;
  const solarTitle = western ? `Sol em ${western.name}` : "Sol em --";
  const lunarTitle = western ? `Lua em ${western.name}` : "Lua em --";
  const solarSummary = western
    ? `Sol em ${western.name}: ${western.desc}`
    : "Preencha seus dados na pagina inicial para gerar o resumo solar.";
  const moonInsight = western
    ? elementMoonInsights[western.element] ||
      "Emocoes guiadas por intuicao e sensibilidade."
    : "Preencha seus dados na pagina inicial para gerar o resumo lunar.";
  const lunarSummary = western ? `Lua em ${western.name}: ${moonInsight}` : moonInsight;
  const chineseYearLabel =
    chineseYearInfo.status === "success" ? chineseYearInfo.zodiac : "--";
  const chineseYearElement =
    chineseYearInfo.status === "success" ? chineseYearInfo.element : null;
  const chineseYearElementAccent = getChineseElementAccent(chineseYearElement);
  const chineseYearLunarLabel =
    chineseYearInfo.status === "success" ? chineseYearInfo.lunarYearLabel : "";

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/+$/, "");
      if (path.endsWith(ASTRO_PATH)) {
        setCurrentPage("astro");
        return;
      }
      if (path.endsWith(CHINESE_PATH)) {
        setCurrentPage("chinese");
        return;
      }
      setCurrentPage("home");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const container = starWrapRef.current;
    const canvas = starCanvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let stars = [];
    let connections = [];
    let width = 0;
    let height = 0;
    let animationId = 0;
    let isAnimating = false;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const createStars = () => {
      const area = width * height;
      const count = Math.max(60, Math.min(160, Math.round(area / 8000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.4 + Math.random() * 1.6,
        alpha: 0.3 + Math.random() * 0.7,
        twinkle: 0.002 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2
      }));

      const remaining = [...Array(stars.length).keys()];
      const groupCount = Math.max(3, Math.floor(stars.length / 28));
      connections = [];

      for (let g = 0; g < groupCount; g += 1) {
        if (remaining.length < 4) {
          break;
        }

        const startIndex = remaining.splice(
          Math.floor(Math.random() * remaining.length),
          1
        )[0];
        const group = [startIndex];
        const groupSize = 3 + Math.floor(Math.random() * 3);

        while (group.length < groupSize && remaining.length) {
          const last = group[group.length - 1];
          let nearestIdx = -1;
          let nearestDist = Infinity;

          for (let i = 0; i < remaining.length; i += 1) {
            const candidateIndex = remaining[i];
            const dx = stars[last].x - stars[candidateIndex].x;
            const dy = stars[last].y - stars[candidateIndex].y;
            const dist = dx * dx + dy * dy;
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestIdx = i;
            }
          }

          if (nearestIdx === -1) {
            break;
          }

          const maxDist = Math.min(width, height) * 0.35;
          if (Math.sqrt(nearestDist) > maxDist) {
            break;
          }

          const nextIndex = remaining.splice(nearestIdx, 1)[0];
          group.push(nextIndex);
        }

        for (let i = 0; i < group.length - 1; i += 1) {
          connections.push({
            a: group[i],
            b: group[i + 1],
            phase: Math.random() * Math.PI * 2,
            intensity: 0.15 + Math.random() * 0.25
          });
        }
      }
    };

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      if (!width || !height) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const render = (time) => {
      if (!width || !height) {
        if (!prefersReducedMotion) {
          animationId = requestAnimationFrame(render);
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.lineWidth = 1;

      connections.forEach((connection) => {
        const start = stars[connection.a];
        const end = stars[connection.b];
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.001 + connection.phase);
        const alpha = connection.intensity * pulse;
        ctx.strokeStyle = `rgba(104, 178, 248, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      });

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkle + star.phase) * 0.35;
        const alpha = Math.max(0.15, Math.min(1, star.alpha + twinkle));

        ctx.fillStyle = `rgba(248, 242, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(104, 178, 248, ${alpha * 0.35})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) {
        render(performance.now());
      }
    });

    resize();
    resizeObserver.observe(container);

    if (prefersReducedMotion) {
      render(performance.now());
    } else if (!isAnimating) {
      isAnimating = true;
      animationId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationId);
      isAnimating = false;
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const canvas = modalCanvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationId = 0;
    let width = 0;
    let height = 0;
    let startTime = 0;
    let particles = [];
    let rays = [];
    let twinkles = [];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const duration = 1600;
    const colors = [
      [104, 178, 248],
      [193, 152, 255],
      [248, 242, 255]
    ];

    const createExplosion = () => {
      const area = width * height;
      const particleCount = Math.max(60, Math.min(140, Math.round(area / 3000)));
      const rayCount = Math.max(10, Math.round(particleCount / 10));
      const twinkleCount = Math.max(16, Math.round(particleCount / 4));
      const maxRadius = Math.min(width, height) * 1.8;

      particles = Array.from({ length: particleCount }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
          angle: Math.random() * Math.PI * 2,
          distance: maxRadius * (0.2 + Math.random() * 0.7),
          drift: (Math.random() - 0.5) * 0.8,
          size: 0.6 + Math.random() * 1.6,
          alpha: 0.4 + Math.random() * 0.5,
          life: 700 + Math.random() * 900,
          color
        };
      });

      rays = Array.from({ length: rayCount }, () => ({
        angle: Math.random() * Math.PI * 2,
        length: maxRadius * (0.5 + Math.random() * 0.6),
        width: 0.6 + Math.random() * 1.2,
        alpha: 0.2 + Math.random() * 0.35,
        life: 500 + Math.random() * 700
      }));

      twinkles = Array.from({ length: twinkleCount }, () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: 0.4 + Math.random() * 1.2,
          alpha: 0.12 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          color
        };
      });

      startTime = 0;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : canvas.clientWidth;
      height = parent ? parent.clientHeight : canvas.clientHeight;

      if (!width || !height) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createExplosion();
    };

    const drawFrame = (elapsed) => {
      if (!width || !height) {
        return;
      }

      const centerX = width * 0.5;
      const centerY = height * 0.32;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      ctx.clearRect(0, 0, width, height);

      const glowRadius = Math.min(width, height) * (1 + easeOut);
      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        glowRadius
      );
      glow.addColorStop(0, `rgba(180, 215, 255, ${0.35 - progress * 0.15})`);
      glow.addColorStop(0.45, `rgba(173, 132, 255, ${0.25 - progress * 0.12})`);
      glow.addColorStop(1, "rgba(8, 5, 14, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      rays.forEach((ray) => {
        const rayProgress = Math.min(elapsed / ray.life, 1);
        const rayEase = 1 - Math.pow(1 - rayProgress, 2);
        const length = ray.length * rayEase;
        const alpha = (1 - rayProgress) * ray.alpha;
        if (alpha <= 0) {
          return;
        }
        ctx.strokeStyle = `rgba(104, 178, 248, ${alpha})`;
        ctx.lineWidth = ray.width;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(ray.angle) * length,
          centerY + Math.sin(ray.angle) * length
        );
        ctx.stroke();
      });

      particles.forEach((particle) => {
        const particleProgress = Math.min(elapsed / particle.life, 1);
        const particleEase = 1 - Math.pow(1 - particleProgress, 3);
        const distance = particle.distance * particleEase;
        const angle = particle.angle + particle.drift * particleProgress;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const alpha = (1 - particleProgress) * particle.alpha;
        if (alpha <= 0) {
          return;
        }
        ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      twinkles.forEach((twinkle) => {
        const flicker = 0.5 + 0.5 * Math.sin(elapsed * 0.004 + twinkle.phase);
        const alpha = twinkle.alpha * flicker * (1 - progress * 0.4);
        if (alpha <= 0) {
          return;
        }
        ctx.fillStyle = `rgba(${twinkle.color[0]}, ${twinkle.color[1]}, ${twinkle.color[2]}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(twinkle.x, twinkle.y, twinkle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const render = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed = time - startTime;
      drawFrame(elapsed);

      if (!prefersReducedMotion && elapsed < duration) {
        animationId = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) {
        drawFrame(duration);
      }
    });

    resize();
    resizeObserver.observe(canvas.parentElement || canvas);

    if (prefersReducedMotion) {
      drawFrame(duration);
    } else {
      animationId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [isModalOpen]);

  const navigateTo = (nextPage) => {
    let nextPath = "/";
    if (nextPage === "astro") {
      nextPath = ASTRO_PATH;
    } else if (nextPage === "chinese") {
      nextPath = CHINESE_PATH;
    }

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setIsMenuOpen(false);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadAztro = async (signKey) => {
    if (!signKey || aztroBySign[signKey]?.status === "loading") {
      return;
    }

    setAztroBySign((prev) => ({
      ...prev,
      [signKey]: {
        status: "loading",
        description: prev[signKey]?.description ?? "",
        translated: prev[signKey]?.translated ?? false
      }
    }));

    try {
      const data = await fetchAztro(signKey);
      let description = data.description;
      let translated = false;

      try {
        const translation = await translateToPtBr(description);
        description = translation.text;
        translated = translation.translated;
      } catch (translationError) {
        description = data.description;
        translated = false;
      }

      setAztroBySign((prev) => ({
        ...prev,
        [signKey]: {
          status: "success",
          description,
          translated,
          source: data
        }
      }));
    } catch (error) {
      const hint = isDev
        ? "Reinicie o npm run dev para ativar o proxy."
        : "Configure um proxy no servidor para acessar a API.";
      let message = "Nao foi possivel carregar agora. Tente novamente.";

      if (error?.status === 404) {
        message = `Nao foi possivel carregar agora. ${hint}`;
      } else if (error?.status === 503) {
        message = "Servico Aztro indisponivel (503). Tente novamente mais tarde.";
      } else if (error?.status === 502 || error?.status === 504) {
        message = "Servico Aztro instavel. Tente novamente em instantes.";
      }

      setAztroBySign((prev) => ({
        ...prev,
        [signKey]: {
          status: "error",
          message
        }
      }));
    }
  };

  useEffect(() => {
    if (!isAstroPage) {
      hasLoadedAztroRef.current = false;
      return;
    }

    if (hasLoadedAztroRef.current) {
      return;
    }

    hasLoadedAztroRef.current = true;

    const loadAll = async () => {
      for (const sign of westernSigns) {
        const signKey = aztroSignKeys[sign.name];
        if (!signKey) {
          continue;
        }
        await handleLoadAztro(signKey);
      }
    };

    loadAll();
  }, [isAstroPage]);

  useEffect(() => {
    if (!chinese?.name) {
      setChineseForecast({ status: "idle" });
      return;
    }

    let isActive = true;
    setChineseForecast((prev) => ({
      ...prev,
      status: "loading"
    }));

    const loadForecast = async () => {
      try {
        const data = await fetchD1xzForecast(chinese.name);
        let description = data.description;
        let translated = false;

        try {
          const translation = await translateToPtBr(description);
          description = translation.text || description;
          translated = translation.translated;
        } catch (translationError) {
          description = data.description;
          translated = false;
        }

        if (!isActive) {
          return;
        }

        setChineseForecast({
          status: "success",
          description,
          translated,
          source: data
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        let message = "Nao foi possivel carregar a previsao agora.";
        if (error?.status === 404) {
          message = "Previsao nao encontrada no d1xz.";
        } else if (error?.status === 503) {
          message = "Previsao indisponivel no d1xz. Tente mais tarde.";
        }

        setChineseForecast({
          status: "error",
          message
        });
      }
    };

    loadForecast();

    return () => {
      isActive = false;
    };
  }, [chinese?.name]);

  useEffect(() => {
    if (!isChinesePage) {
      setChineseYearInfo({ status: "idle" });
      return;
    }

    let isActive = true;
    setChineseYearInfo((prev) => ({
      ...prev,
      status: "loading"
    }));

    const setFallbackYear = (today) => {
      const adjustedYear = adjustYearForChineseNewYear(
        today.getDate(),
        today.getMonth() + 1,
        today.getFullYear()
      );
      const zodiac = getChineseYearZodiac(adjustedYear);
      const element = getChineseYearElement(null, adjustedYear);

      if (!isActive) {
        return;
      }

      setChineseYearInfo({
        status: "success",
        year: today.getFullYear(),
        zodiac,
        rawZodiac: zodiac,
        lunarYearLabel: "",
        element,
        approximate: true
      });
    };

    const loadChineseYear = async () => {
      const today = new Date();

      try {
        const moduleName = "traditional-chinese-calendar-database";
        const databaseUrlModule =
          "traditional-chinese-calendar-database/database/all.bin?url";

        const [{ Database }, { default: databaseUrl }] = await Promise.all([
          import(/* @vite-ignore */ moduleName),
          import(/* @vite-ignore */ databaseUrlModule)
        ]);

        if (!calendarDbRef.current) {
          calendarDbRef.current = new Database();
        }

        if (!calendarLoadedRef.current) {
          await calendarDbRef.current.load(databaseUrl);
          calendarLoadedRef.current = true;
        }

        const compound = calendarDbRef.current.getCompoundDate(
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate()
        );
        const zodiacLabel = getChineseZodiacLabel(compound?.zodiac);
        const lunarYearLabel = compound?.lunar?.year ?? "";
        const element = getChineseYearElement(
          lunarYearLabel,
          today.getFullYear()
        );

        if (!isActive) {
          return;
        }

        setChineseYearInfo({
          status: "success",
          year: today.getFullYear(),
          zodiac: zodiacLabel,
          rawZodiac: compound?.zodiac ?? "",
          lunarYearLabel,
          element,
          approximate: false
        });
      } catch (error) {
        setFallbackYear(today);
      }
    };

    loadChineseYear();

    return () => {
      isActive = false;
    };
  }, [isChinesePage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const nameCheck = validateAndFormatName(name);
    const date = parseDateInput(birthdate.trim());

    if (!nameCheck.valid) {
      setError(nameCheck.error);
      return;
    }

    if (!date) {
      setError("Informe a data no formato dd/mm/aaaa.");
      return;
    }

    const formattedName = nameCheck.formattedName;
    const westernSign = getWesternSign(date.day, date.month);
    const chineseSign = getChineseSign(date.day, date.month, date.year);
    const cabalaNumber = getLifePathNumber(date.day, date.month, date.year);
    const cabalaInfo = cabalaPaths[cabalaNumber] || {
      keyword: "Caminho",
      desc: "Leitura em construcao para este caminho."
    };
    const tarotInfo = tarotCards[cabalaNumber] || {
      name: "Arcano",
      desc: "Leitura em construcao para este arcano."
    };

    setName(formattedName);
    setWestern(westernSign);
    setChinese(chineseSign);
    setCabala({
      number: cabalaNumber,
      ...cabalaInfo
    });
    setTarot({
      number: cabalaNumber,
      ...tarotInfo
    });
    setIsModalOpen(true);

    const westernSection = document.getElementById("ocidental");
    if (westernSection) {
      westernSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative">
      <div ref={starWrapRef} className="pointer-events-none absolute inset-0 z-0">
        <canvas
          ref={starCanvasRef}
          className="absolute inset-0 h-full w-full opacity-80 mix-blend-screen"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-color5/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:py-4">
            <div className="flex w-full items-center justify-between sm:w-auto">
              <a
                className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em]"
                href={isAstroPage || isChinesePage ? "/" : "#inicio"}
                onClick={(event) => {
                  if (isAstroPage || isChinesePage) {
                    event.preventDefault();
                    navigateTo("home");
                  }
                }}
              >
                <img
                  className="h-14 w-14 rounded-full border border-white/15 bg-white/10 p-1"
                  src="/logo.svg"
                  alt="Caminho Arcano"
                />
                Caminho Arcano
              </a>
              <button
                className="rounded-full border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-white/30 hover:text-color1 sm:hidden"
                type="button"
                aria-controls="main-nav"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                Menu
              </button>
            </div>
            <nav
              id="main-nav"
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } w-full flex-col gap-2 rounded-2xl border border-white/10 bg-color5/80 p-3 text-xs uppercase tracking-[0.2em] text-white/70 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 sm:text-sm`}
            >
              {isAstroPage ? (
                <>
                  <button
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    type="button"
                    onClick={() => navigateTo("home")}
                  >
                    Voltar ao inicio
                  </button>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#signo-resumo"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Resumo
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#previsoes"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Previsoes {currentYear}
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#autoconhecimento"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mapa astral
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#conheca-mais"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signos
                  </a>
                </>
              ) : isChinesePage ? (
                <>
                  <button
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    type="button"
                    onClick={() => navigateTo("home")}
                  >
                    Voltar ao inicio
                  </button>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#chines-banner"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ano regente
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#chines-previsao"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Previsao
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#chines-cavalo"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cavalo
                  </a>
                </>
              ) : (
                <>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#ocidental"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signo
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#chines"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Horoscopo chines
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#cabala"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cabala
                  </a>
                  <a
                    className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                    href="#tarot"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Tarot
                  </a>
                </>
              )}
            </nav>
          </div>
        </header>

        <main>
          {isAstroPage ? (
            <>
              <section
                className="scroll-mt-24 py-12 sm:py-16 lg:py-20"
                id="signo-resumo"
              >
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
                  <div className="fade-up space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      Signos e mapa astral
                    </p>
                    <h1 className="text-2xl font-semibold sm:text-4xl">
                      Seu signo hoje
                    </h1>
                    <p className="text-sm text-white/70 sm:text-base">
                      Resumo com caracteristicas e planeta regente do signo da pessoa no dia da
                      consulta.
                    </p>
                  </div>
                  <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                        Planeta regente
                      </span>
                      <span>{ruler ?? "--"}</span>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold sm:text-2xl">
                      {western?.name ?? "Seu signo"}
                    </h2>
                    <p className="mt-2 text-sm text-white/50">{western?.range ?? "--"}</p>
                    <p className="mt-4 text-base text-white/75">
                      {western?.desc ??
                        "Preencha seus dados na pagina inicial para carregar o resumo."}
                    </p>
                    <div className="mt-5 flex items-center gap-3 text-sm text-white/70">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                        Elemento
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            elementAccent ? elementAccent.className : "bg-white/25"
                          } shadow-[0_0_12px_rgba(255,255,255,0.25)]`}
                          aria-hidden="true"
                        />
                        <span>{elementAccent ? elementAccent.label : "--"}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="scroll-mt-24 bg-color2/10 py-12 sm:py-16"
                id="previsoes"
              >
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
                  <div className="fade-up space-y-3">
                    <h2 className="text-xl font-semibold sm:text-3xl">
                      Previsoes {currentYear}
                    </h2>
                    <p className="text-sm text-white/70 sm:text-base">
                      Tendencias para o ano com base na energia do seu signo.
                    </p>
                  </div>
                  <div className="fade-up grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur">
                      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                        Foco
                      </span>
                      <p className="mt-3 text-sm text-white/75">{forecast.focus}</p>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur">
                      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                        Desafio
                      </span>
                      <p className="mt-3 text-sm text-white/75">{forecast.challenge}</p>
                    </div>
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur">
                      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                        Direcao
                      </span>
                      <p className="mt-3 text-sm text-white/75">{forecast.direction}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="scroll-mt-24 py-12 sm:py-16" id="autoconhecimento">
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
                  <div className="fade-up space-y-3">
                    <h2 className="text-xl font-semibold sm:text-3xl">
                      Autoconhecimento
                    </h2>
                    <p className="text-sm text-white/70 sm:text-base">
                      Se conheca atraves do seu mapa astral.
                    </p>
                  </div>
                  <div className="fade-up space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                          Planeta solar
                        </span>
                        <h3 className="mt-4 text-lg font-semibold">{solarTitle}</h3>
                        <p className="mt-3 text-sm text-white/75">{solarSummary}</p>
                      </div>
                      <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur">
                        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/50">
                          Planeta lunar
                        </span>
                        <h3 className="mt-4 text-lg font-semibold">{lunarTitle}</h3>
                        <p className="mt-3 text-sm text-white/75">{lunarSummary}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-color1 to-color3 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-color5 transition disabled:cursor-not-allowed disabled:opacity-60"
                        type="button"
                        disabled
                      >
                        Ver completo
                      </button>
                      <p className="text-xs text-white/50">
                        Em breve: conteudo completo com acesso pago.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="scroll-mt-24 bg-color2/10 py-12 sm:py-16"
                id="conheca-mais"
              >
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10">
                  <div className="fade-up space-y-3">
                    <h2 className="text-xl font-semibold sm:text-3xl">
                      Conheca mais sobre signos
                    </h2>
                    <p className="text-sm text-white/70 sm:text-base">
                      Resumo de cada signo, planeta regente e previsao diaria da Aztro.
                    </p>
                  </div>
                  <div className="fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {westernSigns.map((sign) => {
                      const accent = getElementAccent(sign.element);
                      const rulerName = getSignRuler(sign.name);
                      const signKey = aztroSignKeys[sign.name];
                      const horoscope = signKey ? aztroBySign[signKey] : null;
                      const isLoading = horoscope?.status === "loading";
                      const isSuccess = horoscope?.status === "success";
                      const isError = horoscope?.status === "error";

                      return (
                        <article
                          key={sign.name}
                          className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur"
                        >
                          <div className="flex items-center justify-between gap-3 text-xs text-white/70">
                            <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 uppercase tracking-[0.2em]">
                              Planeta regente
                            </span>
                            <span className="flex items-center gap-2 text-white/70">
                              <span>{rulerName ?? "--"}</span>
                              <span className="text-white/30">|</span>
                              <span className="flex items-center gap-1">
                                <span
                                  className={`h-2 w-2 rounded-full ${
                                    accent ? accent.className : "bg-white/25"
                                  } shadow-[0_0_8px_rgba(255,255,255,0.25)]`}
                                  aria-hidden="true"
                                />
                                <span>{accent ? accent.label : "--"}</span>
                              </span>
                            </span>
                          </div>
                          <h3 className="mt-4 text-lg font-semibold">{sign.name}</h3>
                          <p className="mt-1 text-xs text-white/50">{sign.range}</p>
                          <p className="mt-3 text-sm text-white/75">{sign.desc}</p>
                          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
                              Resumo de hoje
                            </div>
                            {isSuccess ? (
                              <>
                                <p className="mt-3 text-sm text-white/75">
                                  {horoscope?.description}
                                </p>
                              </>
                            ) : isError ? (
                              <p className="mt-3 text-sm text-rose-200">
                                {horoscope?.message ?? "Nao foi possivel carregar agora."}
                              </p>
                            ) : (
                              <p className="mt-3 text-xs text-white/50">
                                Previsao diaria via Aztro.
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            </>
          ) : isChinesePage ? (
            <>
              <section
                className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
                id="chines-banner"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,214,120,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(104,178,248,0.25),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,150,120,0.2),transparent_45%)]" />
                <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)]">
                  <div className="fade-up space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                      Horoscopo chines
                    </p>
                    <h1 className="text-3xl font-semibold sm:text-5xl">
                      Ano regido por {chineseYearLabel}
                    </h1>
                    <p className="text-sm text-white/70 sm:text-base">
                      Descubra o animal que guia o ciclo atual e mergulhe na energia do
                      Cavalo e seus elementos.
                    </p>
                    {chineseYearInfo.status === "loading" ? (
                      <p className="text-sm text-white/60">Carregando dados do ano...</p>
                    ) : chineseYearInfo.status === "error" ? (
                      <p className="text-sm text-rose-200">
                        {chineseYearInfo.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                        Ano atual
                      </span>
                      <span>{chineseYearInfo.year ?? currentYear}</span>
                    </div>
                    <h2 className="mt-6 text-xl font-semibold sm:text-2xl">
                      {chineseYearLabel}
                    </h2>
                    <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                        Elemento
                      </span>
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${chineseYearElementAccent} shadow-[0_0_12px_rgba(255,255,255,0.25)]`}
                          aria-hidden="true"
                        />
                        <span>{chineseYearElement ?? "--"}</span>
                      </span>
                    </div>
                    {chineseYearLunarLabel ? (
                      <p className="mt-4 text-sm text-white/50">
                        Ano lunar: {chineseYearLunarLabel}
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              <section
                className="bg-color2/10 py-12 sm:py-16"
                id="chines-previsao"
              >
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
                  <div className="fade-up space-y-3">
                    <h2 className="text-xl font-semibold sm:text-3xl">
                      Seu horoscopo chines hoje
                    </h2>
                    <p className="text-sm text-white/70 sm:text-base">
                      Previsao diaria do signo chines calculado pela sua data.
                    </p>
                  </div>
                  <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                        Ano base
                      </span>
                      <span>{chinese?.year ?? "--"}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                      {chinese?.name ?? "Seu horoscopo chines"}
                    </h3>
                    <p className="mt-4 text-base text-white/75">
                      {chinese?.desc ??
                        "Preencha seus dados para carregar a descricao."}
                    </p>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Previsao de hoje
                      </p>
                      {chineseForecast.status === "loading" ? (
                        <p className="mt-3 text-sm text-white/70">
                          Carregando previsao...
                        </p>
                      ) : chineseForecast.status === "success" ? (
                        <p className="mt-3 text-sm text-white/75">
                          {chineseForecast.description}
                        </p>
                      ) : chineseForecast.status === "error" ? (
                        <p className="mt-3 text-sm text-rose-200">
                          {chineseForecast.message}
                        </p>
                      ) : (
                        <p className="mt-3 text-xs text-white/50">
                          Preencha seus dados para liberar a previsao.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-12 sm:py-16" id="chines-cavalo">
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10">
                  <div className="fade-up space-y-3">
                    <h2 className="text-xl font-semibold sm:text-3xl">
                      Cavalo e seus elementos
                    </h2>
                    <p className="text-sm text-white/70 sm:text-base">
                      Cada elemento traz uma expressao diferente para o Cavalo.
                    </p>
                  </div>
                  <div className="fade-up grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {horseElementSet.map((item) => {
                      const accent = getChineseElementAccent(item.element);
                      return (
                        <article
                          key={item.element}
                          className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_40px_rgba(13,4,21,0.4)] backdrop-blur"
                        >
                          <div className="flex items-center justify-between text-xs text-white/70">
                            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 uppercase tracking-[0.2em]">
                              Elemento
                            </span>
                            <span className="flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${accent} shadow-[0_0_8px_rgba(255,255,255,0.25)]`}
                                aria-hidden="true"
                              />
                              <span>{item.element}</span>
                            </span>
                          </div>
                          <h3 className="mt-4 text-lg font-semibold">
                            Cavalo de {item.element}
                          </h3>
                          <p className="mt-3 text-sm text-white/75">{item.desc}</p>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="relative flex min-h-screen items-center overflow-hidden py-12 sm:py-16 lg:py-20" id="inicio">
            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:gap-10 lg:grid-cols-2">
            <div className="fade-up space-y-6 sm:space-y-8">
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                <h1 className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  2026: O Ano do Cavalo de Fogo.
                </h1>
                <h2 className="text-base font-light text-white/80 sm:text-lg lg:text-xl">
                  Uma energia indomavel se aproxima. Neste ciclo, quem nao segura firme as
                  redeas e deixado para tras.
                </h2>
                <a
                  className="inline-flex w-fit items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-color1 via-color2 to-color3 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-color5 shadow-[0_16px_40px_rgba(80,110,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(80,110,229,0.45)]"
                  href="#birth-form"
                >
                  Preparar-se para o Galope
                </a>
              </div>

              <form
                id="birth-form"
                className="fade-up grid gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:gap-4 sm:p-6"
                style={{ animationDelay: "0.1s" }}
                onSubmit={handleSubmit}
              >
                <div className="grid gap-2">
                  <label className="text-sm text-white/70" htmlFor="name">
                    Nome
                  </label>
                  <input
                    className="rounded-xl border border-white/20 bg-color5/60 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-color1 focus:outline-none focus:ring-2 focus:ring-color1/40"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-white/70" htmlFor="birthdate">
                    Data de nascimento
                  </label>
                  <input
                    className="rounded-xl border border-white/20 bg-color5/60 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-color1 focus:outline-none focus:ring-2 focus:ring-color1/40"
                    id="birthdate"
                    name="birthdate"
                    type="text"
                    inputMode="numeric"
                    placeholder="dd/mm/aaaa"
                    aria-describedby="birth-hint"
                    required
                    value={birthdate}
                    onChange={(event) =>
                      setBirthdate(formatDateInput(event.target.value))
                    }
                  />
                  <small id="birth-hint" className="text-xs text-white/50">
                    Formato: dd/mm/aaaa
                  </small>
                </div>
                <button
                  className="rounded-full bg-gradient-to-r from-color1 to-color3 px-6 py-3 text-base font-semibold text-color5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(80,110,229,0.35)]"
                  type="submit"
                >
                  Revelar caminho
                </button>
                <p className="min-h-[1.2rem] text-sm text-rose-200" role="alert">
                  {error}
                </p>
              </form>
            </div>

            <div
              className="fade-up relative h-[40vh] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_rgba(13,4,21,0.35)] sm:h-[45vh] lg:h-[70vh]"
              style={{ animationDelay: "0.15s" }}
            >
              <video
                className="absolute inset-0 h-full w-full object-cover brightness-[0.85] saturate-[0.9]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/fire-horses.png"
                aria-hidden="true"
              >
                <source src="/horses-banner.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-color5/75 via-color5/40 to-color5/10"></div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-24 py-12 sm:py-16" id="ocidental">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-xl font-semibold sm:text-3xl">Signo</h2>
              <p className="text-sm text-white/70 sm:text-base">
                O zodiaco tradicional e seus elementos de expressao.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Elemento
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      elementAccent ? elementAccent.className : "bg-white/25"
                    } shadow-[0_0_12px_rgba(255,255,255,0.25)]`}
                    aria-hidden="true"
                  />
                  <span>{elementAccent ? elementAccent.label : "--"}</span>
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                {western?.name ?? "Seu signo"}
              </h3>
              <p className="mt-2 text-sm text-white/50">{western?.range ?? "--"}</p>
              <p className="mt-4 text-base text-white/75">
                {western?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
              <button
                className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-color1 to-color3 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-color5 shadow-[0_12px_30px_rgba(80,110,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(80,110,229,0.45)]"
                type="button"
                onClick={() => navigateTo("astro")}
              >
                Ver mais sobre signos e mapa astral
              </button>
            </div>
          </div>
        </section>

        <section className="bg-color2/10 py-12 sm:py-16" id="chines">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-xl font-semibold sm:text-3xl">Horoscopo chines</h2>
              <p className="text-sm text-white/70 sm:text-base">
                O ciclo lunar com 12 animais guardioes.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Ano base
                </span>
                <span>{chinese?.year ?? "--"}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                {chinese?.name ?? "Seu horoscopo chines"}
              </h3>
              <p className="mt-4 text-base text-white/75">
                {chinese?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Previsao de hoje
                </p>
                {chineseForecast.status === "loading" ? (
                  <p className="mt-3 text-sm text-white/70">Carregando previsao...</p>
                ) : chineseForecast.status === "success" ? (
                  <p className="mt-3 text-sm text-white/75">
                    {chineseForecast.description}
                  </p>
                ) : chineseForecast.status === "error" ? (
                  <p className="mt-3 text-sm text-rose-200">
                    {chineseForecast.message}
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-white/50">
                    Preencha seus dados para liberar a previsao.
                  </p>
                )}
              </div>
              <button
                className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-color1 to-color3 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-color5 shadow-[0_12px_30px_rgba(80,110,229,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(80,110,229,0.45)]"
                type="button"
                onClick={() => navigateTo("chinese")}
              >
                Ver mais sobre horoscopo chines
              </button>
              <p className="mt-5 text-sm text-white/50">
                Calculo aproximado usando 4 de fevereiro como virada de ano.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16" id="cabala">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-xl font-semibold sm:text-3xl">Cabala e caminho</h2>
              <p className="text-sm text-white/70 sm:text-base">
                Numerologia cabalistica para revelar seu caminho.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Foco
                </span>
                <span>{cabala?.keyword ?? "--"}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                {cabala ? `Caminho ${cabala.number}` : "Caminho cabalistico"}
              </h3>
              <p className="mt-4 text-base text-white/75">
                {cabala?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-color2/10 py-12 sm:py-16" id="tarot">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-xl font-semibold sm:text-3xl">Tarot pessoal</h2>
              <p className="text-sm text-white/70 sm:text-base">
                Arcano maior associado ao seu caminho.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur sm:p-8">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Arcano
                </span>
                <span>{tarot ? `Arcano ${tarot.number}` : "--"}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold sm:text-2xl">
                {tarot?.name ?? "Sua carta do tarot"}
              </h3>
              <p className="mt-4 text-base text-white/75">
                {tarot?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
            </div>
          </div>
        </section>
            </>
          )}
        </main>

        <footer className="border-t border-white/10 bg-color5/85 py-8 sm:py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-white/60">
            <p>Caminho Arcano. Leia, descubra e reflita sobre suas energias pessoais.</p>
            <p>Feito para inspirar autoconhecimento.</p>
          </div>
        </footer>

        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="revelacao-titulo"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="reveal-in relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-color5/95 p-6 text-center shadow-[0_25px_60px_rgba(8,5,14,0.6)]"
              onClick={(event) => event.stopPropagation()}
            >
              <canvas
                ref={modalCanvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full opacity-90 mix-blend-screen"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  {name ? `${name}, o seu signo e:` : "o seu signo e:"}
                </p>
                <h3
                  id="revelacao-titulo"
                  className="mt-3 text-xl font-semibold sm:text-2xl"
                >
                  {western?.name ?? "--"}
                </h3>
                <p className="mt-3 text-base text-white/70">
                  {chinese?.name ? (
                    <>
                      <span className="block">Signo chines:</span>
                      <span className="block">{chinese.name}</span>
                    </>
                  ) : (
                    "Signo chines em preparacao."
                  )}
                </p>
                <button
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-gradient-to-r from-color1 to-color3 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-color5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(80,110,229,0.35)]"
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    const westernSection = document.getElementById("ocidental");
                    if (westernSection) {
                      westernSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                      });
                    }
                  }}
                >
                  Ver tudo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





