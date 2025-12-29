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

function formatDateInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts = [];

  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2));
  }

  if (digits.length >= 4) {
    parts.push(digits.slice(2, 4));
  }

  if (digits.length > 4) {
    parts.push(digits.slice(4, 8));
  }

  return parts.join("/");
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
  const [cabala, setCabala] = useState(null);
  const [tarot, setTarot] = useState(null);
  const starWrapRef = useRef(null);
  const starCanvasRef = useRef(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const date = parseDateInput(birthdate.trim());

    if (!trimmedName) {
      setError("Digite seu nome para continuar.");
      return;
    }

    if (!date) {
      setError("Informe a data no formato dd/mm/aaaa.");
      return;
    }

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
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <a className="text-sm font-semibold uppercase tracking-[0.3em]" href="#inicio">
              Caminho Arcano
            </a>
            <nav className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm">
              <a
                className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                href="#ocidental"
              >
                Signo ocidental
              </a>
              <a
                className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                href="#chines"
              >
                Horoscopo chines
              </a>
              <a
                className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                href="#cabala"
              >
                Cabala
              </a>
              <a
                className="rounded-full border border-transparent px-3 py-1 transition hover:border-white/30 hover:text-color1"
                href="#tarot"
              >
                Tarot
              </a>
            </nav>
          </div>
        </header>

        <main>
          <section className="relative flex min-h-screen items-center overflow-hidden py-16 lg:py-20" id="inicio">
            <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
            <div className="fade-up space-y-8">
              <div className="max-w-2xl space-y-5">
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  2026: O Ano da Ascensao.
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
                className="fade-up grid gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur"
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
              className="fade-up relative h-[45vh] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_rgba(13,4,21,0.35)] lg:h-[70vh]"
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

        <section className="py-16" id="ocidental">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">Signo ocidental</h2>
              <p className="text-sm text-white/70 sm:text-base">
                O zodiaco tradicional e seus elementos de expressao.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-8 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Elemento
                </span>
                <span>{western?.element ?? "--"}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">
                {western?.name ?? "Seu signo ocidental"}
              </h3>
              <p className="mt-2 text-sm text-white/50">{western?.range ?? "--"}</p>
              <p className="mt-4 text-base text-white/75">
                {western?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-color2/10 py-16" id="chines">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">Horoscopo chines</h2>
              <p className="text-sm text-white/70 sm:text-base">
                O ciclo lunar com 12 animais guardioes.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-8 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Ano base
                </span>
                <span>{chinese?.year ?? "--"}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">
                {chinese?.name ?? "Seu horoscopo chines"}
              </h3>
              <p className="mt-4 text-base text-white/75">
                {chinese?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
              <p className="mt-5 text-sm text-white/50">
                Calculo aproximado usando 4 de fevereiro como virada de ano.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16" id="cabala">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">Cabala e caminho</h2>
              <p className="text-sm text-white/70 sm:text-base">
                Numerologia cabalistica para revelar seu caminho.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-8 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Foco
                </span>
                <span>{cabala?.keyword ?? "--"}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">
                {cabala ? `Caminho ${cabala.number}` : "Caminho cabalistico"}
              </h3>
              <p className="mt-4 text-base text-white/75">
                {cabala?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-color2/10 py-16" id="tarot">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]">
            <div className="fade-up space-y-3">
              <h2 className="text-2xl font-semibold sm:text-3xl">Tarot pessoal</h2>
              <p className="text-sm text-white/70 sm:text-base">
                Arcano maior associado ao seu caminho.
              </p>
            </div>
            <div className="fade-up rounded-3xl border border-white/15 bg-white/5 p-8 shadow-[0_24px_60px_rgba(13,4,21,0.45)] backdrop-blur">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="rounded-full border border-color3/40 bg-color3/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]">
                  Arcano
                </span>
                <span>{tarot ? `Arcano ${tarot.number}` : "--"}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold">
                {tarot?.name ?? "Sua carta do tarot"}
              </h3>
              <p className="mt-4 text-base text-white/75">
                {tarot?.desc ?? "Preencha seus dados para carregar a descricao."}
              </p>
            </div>
          </div>
        </section>
        </main>

        <footer className="border-t border-white/10 bg-color5/85 py-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-white/60">
            <p>Caminho Arcano. Leia, descubra e reflita sobre suas energias pessoais.</p>
            <p>Feito para inspirar autoconhecimento.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
