"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { revealDelayStyle, useScrollReveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

type FormData = { nome: string; whatsapp: string; cidade: string };
type FormErrors = Partial<Record<keyof FormData, string>>;
type StatItem = { value: number; label: string; suffix?: string };
type TrajectoryItem = {
  title: string;
  label: string;
  alt: string;
  variant: "large" | "medium" | "small";
  subtitle: string;
  description: string;
  imageSrc?: string;
  iconSrc?: string;
  objectPosition?: string;
};

const WHATSAPP_LINK = "https://wa.me/5562995073952";
const INSTAGRAM_LINK = "https://instagram.com/subtenentesergio";
const HERO_IMAGES = [
  "/images/foto-oficial.jpg",
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
];
const HERO_SLIDE_INTERVAL_MS = 10000;
const HERO_FADE_MS = 2000;

const featuredVideo = {
  title: "Assista e entenda por que eu não paro.",
  subtitle: "Sem rodeios: posição firme, experiência real e compromisso com Goiás.",
  youtubeId: "bP133Tsw-Zc",
};

const priorities = [
  {
    prioridade: "Prioridade 01",
    titulo: "Segurança",
    texto: "Combate firme ao crime, inteligência operacional e defesa objetiva de quem vive sob pressão nas ruas.",
    rodape: "Ordem pública",
  },
  {
    prioridade: "Prioridade 02",
    titulo: "Valorização",
    texto: "Respeito, estrutura e reconhecimento para os profissionais que sustentam a segurança pública com disciplina e coragem.",
    rodape: "Defesa da categoria",
  },
  {
    prioridade: "Prioridade 03",
    titulo: "Família",
    texto: "Proteção da família, educação com valores e políticas públicas que reforcem estabilidade social e responsabilidade coletiva.",
    rodape: "Base da sociedade",
  },
  {
    prioridade: "Prioridade 04",
    titulo: "Ordem",
    texto: "Autoridade responsável, compromisso com a lei e direção firme para devolver previsibilidade ao país.",
    rodape: "Liderança institucional",
  },
];

const shorts = [
  { title: "Recado direto sobre segurança nas ruas.", youtubeId: "ED_POXa7vo0", tag: "Segurança" },
  { title: "Valorização policial sem enrolação.", youtubeId: "short-placeholder-2", tag: "Categoria" },
  { title: "Família e ordem: compromisso de mandato.", youtubeId: "short-placeholder-3", tag: "Valores" },
];

const longVideos = [
  { title: "Entrevista completa: prioridades para Brasília.", youtubeUrl: "https://www.youtube.com/watch?v=video-placeholder-1" },
  { title: "Propostas para segurança pública em profundidade.", youtubeUrl: "https://www.youtube.com/watch?v=video-placeholder-2" },
  { title: "Defesa da categoria policial: plano de ação.", youtubeUrl: "https://www.youtube.com/watch?v=video-placeholder-3" },
];

const STATS: StatItem[] = [
  { value: 18, label: "Projetos em defesa do cidadão" },
  { value: 64, label: "Audiências e reuniões em Brasília" },
  { value: 82, label: "Bairros visitados", suffix: "+" },
  { value: 240, label: "Demandas encaminhadas", suffix: "+" },
];

const TRAJECTORY_ITEMS: TrajectoryItem[] = [
  {
    title: "Conselheiro Tutelar",
    label: "Serviço público",
    subtitle: "Proteção direta à família",
    description: "Atuação de linha de frente, presença institucional e defesa firme de quem mais precisa de amparo.",
    alt: "Subtenente Sérgio como Conselheiro Tutelar",
    imageSrc: "/images/trajetoria/conselheiro-tutelar.jpg",
    iconSrc: "/images/placeholders/trajetoria-conselheiro.svg",
    objectPosition: "center 16%",
    variant: "large",
  },
  {
    title: "Presidente da ASSEGO",
    label: "Representação",
    subtitle: "Liderança de categoria",
    description: "Articulação institucional, defesa organizada da classe e voz firme nos espaços de decisão.",
    alt: "Placeholder institucional para Presidente da ASSEGO",
    iconSrc: "/images/placeholders/trajetoria-assego.svg",
    variant: "medium",
  },
  {
    title: "Igreja",
    label: "Comunidade",
    subtitle: "Base moral e presença social",
    description: "Compromisso com valores, escuta da comunidade e serviço próximo das pessoas.",
    alt: "Subtenente Sérgio em atuação na Igreja",
    imageSrc: "/images/trajetoria/igreja.jpg",
    iconSrc: "/images/placeholders/trajetoria-igreja.svg",
    objectPosition: "center 14%",
    variant: "small",
  },
  {
    title: "Vicentinos em Goiás",
    label: "Ação social",
    subtitle: "Serviço que chega na ponta",
    description: "Trabalho solidário com presença concreta, responsabilidade pública e impacto social real em Goiás.",
    alt: "Subtenente Sérgio em atuação com os Vicentinos em Goiás",
    imageSrc: "/images/trajetoria/vicentinos-goias.jpg",
    iconSrc: "/images/placeholders/trajetoria-vicentinos.svg",
    objectPosition: "center 20%",
    variant: "large",
  },
];

const FAQ_ITEMS = [
  { q: "Quais são as prioridades do mandato?", a: "Segurança pública, valorização policial, defesa da família e compromisso com a ordem social." },
  { q: "Como posso apoiar a campanha?", a: "Com cadastro no formulário, compartilhamento dos materiais oficiais e mobilização local na sua cidade." },
  { q: "Haverá agenda presencial?", a: "Sim. A agenda é divulgada continuamente no Instagram oficial e nos canais da equipe." },
  { q: "Como posso enviar demandas da categoria?", a: "Pelo WhatsApp oficial e pelos canais de atendimento da campanha." },
  { q: "Onde acompanho notícias e posicionamentos?", a: "No Instagram oficial e nas publicações semanais da campanha." },
];

const testimonials = [
  "Sérgio conhece a rua, enfrenta o crime e não foge do debate quando o assunto é segurança.",
  "A tropa precisa de voz firme em Brasília. Sérgio tem história, postura e coragem para representar.",
  "Chega de promessa vazia. Queremos alguém que defenda polícia valorizada e a lei sendo cumprida.",
];

function StatsCounters() {
  return (
    <Section className="bg-transparent py-0">
      <GlassCard data-reveal className="overflow-hidden rounded-[2rem] px-5 py-8 sm:px-7 sm:py-9">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Temas e compromissos</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">Números que refletem presença, trabalho e prioridades para Brasília.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4 md:gap-0">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal
              style={revealDelayStyle(index * 70)}
              className={`rounded-[1.5rem] border border-white/8 bg-white/[0.025] px-4 py-5 text-center md:rounded-none md:border-y-0 md:px-6 ${index > 0 ? "md:border-l" : "md:border-transparent"}`}
            >
              <p className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  durationMs={1180}
                  startDelayMs={index * 150}
                  className="inline-block tabular-nums"
                />
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}

function FloatingSocialButtons() {
  const baseStyle =
    "group relative flex h-[3.35rem] w-[3.35rem] items-center justify-center overflow-hidden rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(13,24,46,0.94),rgba(8,15,29,0.9))] text-white shadow-[0_18px_36px_rgba(0,0,0,0.24),0_1px_0_rgba(255,255,255,0.05)_inset] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_22px_44px_rgba(255,223,0,0.1)] sm:h-[3.6rem] sm:w-[3.6rem]";

  return (
    <div className="fixed right-4 z-50 flex flex-col gap-3 sm:right-5 md:right-6" style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 1rem))" }}>
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className={baseStyle}>
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),transparent_38%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" className="relative z-10 h-7 w-7 fill-current sm:h-8 sm:w-8">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.41 2.2 11.83c0 1.73.45 3.42 1.31 4.92L2 22l5.41-1.42a9.8 9.8 0 0 0 4.62 1.17h.01c5.41 0 9.83-4.41 9.83-9.83 0-2.62-1.02-5.08-2.82-6.99Zm-7.02 15.18h-.01a8.12 8.12 0 0 1-4.14-1.13l-.3-.18-3.21.84.86-3.13-.2-.32a8.1 8.1 0 0 1-1.24-4.34c0-4.49 3.66-8.15 8.16-8.15 2.17 0 4.2.84 5.73 2.39a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.03 8.26Zm4.47-6.11c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.4-.42-.54-.43h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.31.98 2.47c.12.16 1.68 2.56 4.07 3.59.57.25 1.02.4 1.37.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
        </svg>
      </a>
      <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram" className={baseStyle}>
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.18),transparent_38%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        <svg viewBox="0 0 24 24" className="relative z-10 h-7 w-7 fill-current sm:h-8 sm:w-8">
          <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5A3.96 3.96 0 0 0 7.75 20.2h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95h-8.5Zm8.97 1.35a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" />
        </svg>
      </a>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number | null>(null);
  const watermarkRafRef = useRef<number | null>(null);
  const leavingTimeoutRef = useRef<number | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({ nome: "", whatsapp: "", cidade: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useScrollReveal();

  useEffect(() => {
    const reduceMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerMedia = window.matchMedia("(pointer: coarse)");

    const handleMediaChange = () => {
      setPrefersReducedMotion(reduceMotionMedia.matches);
      setIsCoarsePointer(coarsePointerMedia.matches);
    };

    handleMediaChange();
    reduceMotionMedia.addEventListener("change", handleMediaChange);
    coarsePointerMedia.addEventListener("change", handleMediaChange);

    return () => {
      reduceMotionMedia.removeEventListener("change", handleMediaChange);
      coarsePointerMedia.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    heroElement.style.setProperty("--mx", "50%");
    heroElement.style.setProperty("--my", "50%");

    if (isCoarsePointer || prefersReducedMotion) return;

    const flushMousePosition = () => {
      rafRef.current = null;
      const { x, y } = mouseRef.current;
      heroElement.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      heroElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      mouseRef.current = {
        x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
      };

      if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(flushMousePosition);
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
      if (rafRef.current === null) rafRef.current = window.requestAnimationFrame(flushMousePosition);
    };

    heroElement.addEventListener("mousemove", onMouseMove);
    heroElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      heroElement.removeEventListener("mousemove", onMouseMove);
      heroElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [isCoarsePointer, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        setLeavingIndex(prev);
        if (leavingTimeoutRef.current !== null) window.clearTimeout(leavingTimeoutRef.current);
        leavingTimeoutRef.current = window.setTimeout(() => {
          setLeavingIndex(null);
          leavingTimeoutRef.current = null;
        }, HERO_FADE_MS);
        return next;
      });
    }, HERO_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      if (leavingTimeoutRef.current !== null) window.clearTimeout(leavingTimeoutRef.current);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyParallax = () => {
      if (!watermarkRef.current) return;
      const scrollY = window.scrollY || 0;
      const speed = mobileQuery.matches ? 0.012 : 0.024;
      const maxOffset = mobileQuery.matches ? 18 : 36;
      const offset = reduceMotionQuery.matches ? 0 : Math.min(maxOffset, scrollY * speed);
      watermarkRef.current.style.transform = `translate3d(-50%, calc(-50% + ${offset.toFixed(2)}px), 0)`;
    };

    const onScroll = () => {
      if (watermarkRafRef.current !== null) return;
      watermarkRafRef.current = window.requestAnimationFrame(() => {
        watermarkRafRef.current = null;
        applyParallax();
      });
    };

    applyParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (watermarkRafRef.current !== null) window.cancelAnimationFrame(watermarkRafRef.current);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    const values = {
      nome: formData.nome.trim(),
      whatsapp: formData.whatsapp.trim(),
      cidade: formData.cidade.trim(),
    };

    if (values.nome.length < 3) nextErrors.nome = "Informe um nome válido.";
    if (!/^\+?[0-9()\s-]{10,}$/.test(values.whatsapp)) nextErrors.whatsapp = "Informe um WhatsApp válido com DDD.";
    if (values.cidade.length < 2) nextErrors.cidade = "Informe sua cidade.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ type: "error", message: "Revise os campos destacados para concluir o cadastro." });
      return;
    }

    setFeedback({ type: "success", message: "Cadastro recebido. Nossa equipe entrará em contato pelos canais oficiais." });
    setFormData({ nome: "", whatsapp: "", cidade: "" });
  };

  return (
    <main className="pb-10 sm:pb-14">
      <header className="fixed inset-x-0 top-0 z-50 pt-2.5 sm:pt-3">
        <Container>
          <div className={`mx-auto flex w-full items-center justify-between rounded-full border px-3 py-1.5 transition-all duration-300 sm:px-4 sm:py-2 lg:px-4.5 ${isScrolled ? "border-white/12 bg-[rgba(7,14,27,0.84)] shadow-[0_18px_44px_rgba(0,0,0,0.22),0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-[18px]" : "border-white/10 bg-[rgba(7,14,27,0.62)] shadow-[0_12px_28px_rgba(0,0,0,0.14),0_1px_0_rgba(255,255,255,0.03)_inset] backdrop-blur-[14px]"}`}>
            <a href="#topo" className="flex min-w-0 items-center gap-2 rounded-full px-1 py-0.5 sm:gap-2.5 sm:px-1">
              <div className="relative flex h-[2.02rem] w-[2.02rem] shrink-0 items-center justify-center sm:h-[2.18rem] sm:w-[2.18rem]">
                <div className="relative flex h-[2.24rem] w-[2.24rem] items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(255,255,255,0.012)_68%,transparent_100%)] shadow-[0_9px_16px_rgba(0,0,0,0.14)] sm:h-[2.42rem] sm:w-[2.42rem]">
                  <div className="relative h-[2.08rem] w-[2.08rem] sm:h-[2.24rem] sm:w-[2.24rem]">
                    <div className="absolute inset-0 rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]" />
                    <Image
                      src="/images/hero-candidate-frame.png"
                      alt="Marca institucional Subtenente Sérgio"
                      fill
                      sizes="(max-width: 640px) 36px, 42px"
                      className="object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.16)]"
                    />
                    <div className="absolute inset-[12.1%] overflow-hidden rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <Image
                        src="/images/foto-oficial.jpg"
                        alt="Subtenente Sérgio"
                        fill
                        sizes="(max-width: 640px) 30px, 35px"
                        className="object-cover [object-position:52%_14%] scale-[1.22] sm:scale-[1.24]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex h-[1.7rem] w-[8.55rem] shrink min-w-0 items-center sm:h-[1.82rem] sm:w-[9.05rem] lg:h-[1.94rem] lg:w-[9.7rem]">
                <Image
                  src="/images/header-wordmark.svg"
                  alt="Logo Subtenente Sérgio"
                  fill
                  sizes="(max-width: 640px) 136px, (max-width: 1024px) 146px, 155px"
                  className="object-contain object-left"
                />
              </div>
            </a>
            <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
              <a href="#prioridades" className="rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white xl:px-4">Prioridades</a>
              <a href="#trajetoria" className="rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white xl:px-4">Trajetória</a>
              <a href="#videos" className="rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white xl:px-4">Vídeos</a>
              <a href="#apoie" className={buttonStyles("secondary", "px-4.5 py-[0.6rem] text-[10px] uppercase tracking-[0.2em] xl:px-5")}>Apoie</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "px-4.5 py-[0.6rem] text-[10px] uppercase tracking-[0.2em] xl:px-5")}>WhatsApp</a>
            </nav>
          </div>
        </Container>
      </header>

      <section id="topo" ref={heroRef} className="cinematic-hero relative min-h-[100svh] pt-23 sm:pt-27">
        <div className="absolute inset-0 overflow-hidden">
          {HERO_IMAGES.map((src, index) => {
            const isActive = index === activeIndex;
            const isLeaving = index === leavingIndex;
            const zoomClass = prefersReducedMotion ? "scale-100" : isActive ? "scale-[1.06]" : "scale-[1.02]";

            return (
              <Image
                key={src}
                src={src}
                alt="Foto oficial do Subtenente Sérgio"
                fill
                priority={index === 0}
                sizes="100vw"
                className={`absolute inset-0 object-cover [object-position:62%_22%] transition-[opacity,transform] duration-[2000ms] ease-out ${isActive || isLeaving ? "opacity-100" : "opacity-0"} ${zoomClass} ${index === 0 ? "hero-bg-reveal" : ""}`}
              />
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[128%] w-[128%] -translate-x-[16%] -translate-y-1/2 opacity-[0.12] mix-blend-screen blur-[1px] sm:opacity-[0.14] lg:h-[134%] lg:w-[134%]">
            <Image
              src="/images/brazil-flag-premium-bg.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,16,0.78)_0%,rgba(4,8,16,0.34)_43%,rgba(4,8,16,0.78)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_44%,rgba(255,223,0,0.06),transparent_24%),radial-gradient(circle_at_66%_54%,rgba(20,105,255,0.08),transparent_24%),radial-gradient(circle_at_42%_30%,rgba(0,161,55,0.08),transparent_26%)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[3] hero-mouse-glow opacity-90" />
        <div className="pointer-events-none absolute inset-y-0 left-[-20%] z-[4] hidden w-[45%] hero-moving-light md:block" />
        <div className="pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(4,8,16,0.12),rgba(4,8,16,0.28)_42%,rgba(4,8,16,0.84)_100%)] overlay-breathe" />

        <Container className="relative z-10 flex min-h-[calc(100svh-6rem)] items-center py-14 sm:py-18">
          <div className="grid w-full gap-7 lg:grid-cols-[minmax(0,1.14fr)_minmax(420px,0.9fr)] lg:items-center xl:gap-8">
            <div className="hero-content-reveal max-w-[56rem] space-y-7 xl:space-y-8">
              <div className="space-y-4 xl:space-y-5">
                <h1 className="max-w-[13.8ch] text-[clamp(3.15rem,8.45vw,6.55rem)] font-black uppercase leading-[0.84] tracking-[-0.064em] text-white [text-shadow:0_18px_48px_rgba(0,0,0,0.48)]">
                  GOIÁS SEGURO
                  <br />
                  EXIGE VOZ FIRME
                  <br />
                  EM <span className="text-accent">BRASÍLIA</span>.
                </h1>
                <p className="max-w-[42rem] text-base leading-relaxed text-white/82 sm:text-lg md:text-[1.15rem]">Experiência de rua, disciplina institucional e compromisso direto com quem protege as famílias goianas.</p>
                <div className="flex max-w-[42rem] flex-wrap items-center gap-x-3.5 gap-y-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/62 sm:text-xs">
                  <span>Segurança pública</span>
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span>Valorização policial</span>
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span>Ordem e família</span>
                </div>
              </div>
              <div className="flex flex-col gap-3.5 pt-2 sm:flex-row">
                <a href="#apoie" className={buttonStyles("primary", "px-7 py-4 text-[11px] uppercase tracking-[0.22em]")}>Quero apoiar</a>
                <a href="#trajetoria" className={buttonStyles("secondary", "px-7 py-4 text-[11px] uppercase tracking-[0.22em]")}>Ver trajetória</a>
              </div>
            </div>

            <div className="seal-reveal flex justify-center lg:justify-end">
              <GlassCard className="relative w-full max-w-[34.25rem] overflow-hidden rounded-[2.05rem] p-0 shadow-[var(--hero-shadow)]">
                <div className="relative flex min-h-[38rem] flex-col overflow-hidden rounded-[2.05rem] border border-white/10 sm:min-h-[40.5rem]">
                  <div ref={watermarkRef} aria-hidden className="pointer-events-none absolute left-1/2 top-[46%] z-10 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 opacity-[0.032] mix-blend-screen">
                    <Image src="/images/logo-watermark.png" alt="" fill sizes="420px" className="object-contain" />
                  </div>
                  <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_24%,rgba(3,9,20,0.12)_42%,rgba(3,9,20,0.64)_100%)]" />
                  <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_28%_18%,rgba(255,223,0,0.1),transparent_24%),radial-gradient(circle_at_78%_66%,rgba(20,105,255,0.1),transparent_26%)]" />
                  <div className="relative z-[4] px-4.5 pt-4.5 sm:px-5.5 sm:pt-5.5">
                    <div className="relative aspect-[1.04/1] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[rgba(6,14,28,0.28)] shadow-[0_18px_36px_rgba(0,0,0,0.2)]">
                      <Image
                        src="/images/foto-oficial.jpg"
                        alt="Subtenente Sérgio em retrato oficial"
                        fill
                        priority
                        sizes="(max-width: 1024px) 90vw, 430px"
                        className="object-cover [object-position:52%_16%]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(3,9,20,0.04),transparent_34%,rgba(3,9,20,0.24)_100%)]" />
                    </div>
                  </div>
                  <div className="relative z-[4] mt-3 px-4.5 pb-4.5 pt-2.5 sm:px-5.5 sm:pb-5.5 sm:pt-3.5">
                    <div className="rounded-[1.6rem] border border-white/10 bg-[rgba(5,12,24,0.64)] px-4.5 py-4.5 shadow-[0_14px_30px_rgba(0,0,0,0.16)] backdrop-blur-[16px] sm:px-5.5 sm:py-5.5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/88">Subtenente Sérgio</p>
                      <p className="mt-3 text-[1.85rem] font-black uppercase tracking-[-0.045em] text-white sm:text-[2rem]">Experiência, firmeza e representação.</p>
                      <p className="mt-3 max-w-[26rem] text-sm leading-relaxed text-white/70 sm:text-[0.95rem]">Presença institucional para defender a segurança pública, a categoria policial e as famílias goianas.</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </Container>
      </section>

      <Section id="prioridades" className="bg-transparent pt-14 md:pt-20">
        <div className="section-heading">
          <Badge data-reveal className="border-white/12 bg-white/[0.04] px-4 py-2 text-white">Direção de mandato</Badge>
          <h2 data-reveal style={revealDelayStyle(40)} className="mt-5 text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Prioridades com clareza institucional</h2>
          <p data-reveal style={revealDelayStyle(80)} className="text-lg leading-relaxed text-muted-foreground">Eixos de atuação com postura institucional, prioridade política clara e compromisso direto com a realidade das famílias goianas.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {priorities.map((item, index) => (
            <Card key={item.titulo} data-reveal style={revealDelayStyle(120 + index * 70)} className="min-h-[18.5rem] rounded-[1.9rem] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">{item.prioridade}</p>
              <h3 className="mt-5 text-[1.9rem] font-black uppercase tracking-[-0.04em] text-white">{item.titulo}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/72">{item.texto}</p>
              <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/52">
                <span>{item.rodape}</span>
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="trajetoria" className="bg-transparent">
        <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="space-y-6">
            <Badge data-reveal className="border-white/12 bg-white/[0.04] px-4 py-2 text-white">Trajetória e serviço</Badge>
            <div className="space-y-4">
              <h2 data-reveal style={revealDelayStyle(40)} className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Uma trajetória construída no serviço</h2>
              <p data-reveal style={revealDelayStyle(80)} className="text-lg leading-relaxed text-muted-foreground">Da defesa da família à representação institucional, cada etapa reforça compromisso, experiência e presença real na vida pública e social de Goiás.</p>
            </div>
            <GlassCard data-reveal style={revealDelayStyle(120)} className="rounded-[2rem] p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">Marcos de atuação</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {TRAJECTORY_ITEMS.map((item) => (
                  <div key={`summary-${item.title}`} className="rounded-[1.3rem] border border-white/10 bg-white/[0.035] px-4 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-white/84">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/56">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard data-reveal style={revealDelayStyle(160)} className="rounded-[2.2rem] p-5 sm:p-6 lg:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              {TRAJECTORY_ITEMS.map((item, index) => {
                const mediaSrc = item.imageSrc ?? item.iconSrc ?? "/images/placeholders/trajetoria-assego.svg";
                const sizeClass = item.variant === "large" ? "md:min-h-[26rem]" : item.variant === "medium" ? "md:min-h-[24rem]" : "md:min-h-[22rem]";

                return (
                  <article key={item.title} data-reveal style={revealDelayStyle(180 + index * 70)} className={`group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[rgba(255,255,255,0.035)] shadow-[0_14px_32px_rgba(0,0,0,0.12)] ${sizeClass}`}>
                    <div className="relative aspect-[1/1.03] overflow-hidden border-b border-white/8">
                      <Image
                        src={mediaSrc}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
                        className="object-cover brightness-[0.72] contrast-[1.08] saturate-[0.9] transition-transform duration-500 group-hover:scale-[1.03]"
                        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                      />
                      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,24,0.04),rgba(4,11,24,0.18)_42%,rgba(4,11,24,0.84)_100%)]" />
                      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,223,0,0.12),transparent_24%)]" />
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="inline-flex w-fit rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/78">{item.label}</span>
                      <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.03em] text-white">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-primary/90">{item.subtitle}</p>
                      <p className="mt-4 text-sm leading-relaxed text-white/70">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </Section>

      <StatsCounters />

      <Section className="bg-transparent">
        <div className="section-heading">
          <h2 data-reveal className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">{featuredVideo.title}</h2>
          <p data-reveal style={revealDelayStyle(80)} className="text-lg leading-relaxed text-muted-foreground">{featuredVideo.subtitle}</p>
        </div>
        <GlassCard data-reveal style={revealDelayStyle(120)} className="mt-10 overflow-hidden rounded-[2rem] p-3 sm:p-4">
          <p className="mb-4 px-2 text-lg font-bold text-foreground">Vídeo em destaque</p>
          <div className="aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-[0_16px_34px_rgba(0,0,0,0.22)] ring-1 ring-white/6">
            <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`} title={featuredVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
        </GlassCard>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "px-7 py-3.5 text-[11px] uppercase tracking-[0.2em]")}>Falar no WhatsApp</a>
          <a href="#apoie" className={buttonStyles("secondary", "px-7 py-3.5 text-[11px] uppercase tracking-[0.2em]")}>Quero apoiar</a>
        </div>
      </Section>

      <Section className="bg-transparent">
        <div className="section-heading">
          <h2 data-reveal className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Prova social</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Card key={item} data-reveal style={revealDelayStyle(index * 80)} className="rounded-[1.8rem] p-7">
              <p className="text-base leading-relaxed text-white/76">&quot;{item}&quot;</p>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">Apoiador(a)</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="videos" className="bg-transparent">
        <div className="section-heading">
          <h2 data-reveal className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Vídeos</h2>
        </div>
        <div className="mt-10 grid gap-12">
          <div>
            <h3 data-reveal style={revealDelayStyle(40)} className="text-2xl font-black tracking-[-0.03em] text-foreground">Curtos (Reels/Shorts)</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shorts.map((short, index) => (
                <GlassCard key={short.youtubeId} data-reveal style={revealDelayStyle(index * 70)} className="rounded-[1.8rem] p-3">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[rgba(4,9,18,0.76)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <span className="inline-flex rounded-full border border-white/12 bg-black/48 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">{short.tag}</span>
                    <div className="mt-4 h-[calc(100%-3.4rem)] overflow-hidden rounded-[1rem] border border-white/10 bg-black shadow-[0_12px_28px_rgba(0,0,0,0.24)]">
                      <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${short.youtubeId}`} title={short.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.86))]" />
                    <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-white">{short.title}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <h3 data-reveal style={revealDelayStyle(60)} className="text-2xl font-black tracking-[-0.03em] text-foreground">Vídeos completos</h3>
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {longVideos.map((video, index) => (
                <a key={video.youtubeUrl} data-reveal style={revealDelayStyle(index * 70)} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group block rounded-[1.8rem] border border-[var(--stroke)] bg-[linear-gradient(180deg,rgba(10,21,42,0.84),rgba(7,14,28,0.76))] p-3 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--stroke-strong)] hover:shadow-[var(--shadow-hover)]">
                  <div className="relative aspect-video rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,223,0,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4">
                    <div className="flex h-full items-center justify-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(255,223,0,0.28)] bg-primary text-xl text-black shadow-[0_18px_36px_rgba(255,223,0,0.2)]">&#9654;</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground transition-colors duration-300 group-hover:text-primary">{video.title}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="apoie" className="bg-transparent">
        <div className="grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
          <div data-reveal className="max-w-[40rem] space-y-6">
            <Badge className="border-white/12 bg-white/[0.04] px-4 py-2 text-white">Mobilização 2026</Badge>
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Cadastro de apoiadores</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">Entre na mobilização e receba agenda, materiais oficiais e orientações para fortalecer a campanha na sua cidade.</p>
            </div>
            <GlassCard className="rounded-[2rem] p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">Por que se cadastrar</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3"><span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" /><p className="text-sm leading-relaxed text-white/70">Receber materiais prontos para mobilização local e divulgação responsável.</p></div>
                <div className="flex items-start gap-3"><span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" /><p className="text-sm leading-relaxed text-white/70">Acompanhar agenda, posicionamentos e convocações da equipe de campanha.</p></div>
                <div className="flex items-start gap-3"><span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" /><p className="text-sm leading-relaxed text-white/70">Conectar sua cidade a uma representação firme, organizada e institucional.</p></div>
              </div>
            </GlassCard>
          </div>

          <GlassCard data-reveal style={revealDelayStyle(100)} className="rounded-[2rem] p-6 sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">Cadastro oficial</p>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.03em] text-foreground">Fortaleça a campanha</h3>
              </div>
              <div aria-hidden className="hidden h-12 w-12 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,223,0,0.28),rgba(255,223,0,0.02))] sm:block" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="nome" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">Nome</label>
                <input id="nome" name="nome" value={formData.nome} onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))} className="w-full rounded-[1rem] border border-white/12 bg-[rgba(255,255,255,0.035)] px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-white/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-300 focus:border-primary focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/20" placeholder="Seu nome completo" />
                {errors.nome ? <p className="mt-1 text-xs text-red-300">{errors.nome}</p> : null}
              </div>
              <div>
                <label htmlFor="whatsapp" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">WhatsApp</label>
                <input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={(event) => setFormData((prev) => ({ ...prev, whatsapp: event.target.value }))} className="w-full rounded-[1rem] border border-white/12 bg-[rgba(255,255,255,0.035)] px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-white/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-300 focus:border-primary focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/20" placeholder="(62) 99999-9999" />
                {errors.whatsapp ? <p className="mt-1 text-xs text-red-300">{errors.whatsapp}</p> : null}
              </div>
              <div>
                <label htmlFor="cidade" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">Cidade</label>
                <input id="cidade" name="cidade" value={formData.cidade} onChange={(event) => setFormData((prev) => ({ ...prev, cidade: event.target.value }))} className="w-full rounded-[1rem] border border-white/12 bg-[rgba(255,255,255,0.035)] px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-white/28 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all duration-300 focus:border-primary focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/20" placeholder="Sua cidade" />
                {errors.cidade ? <p className="mt-1 text-xs text-red-300">{errors.cidade}</p> : null}
              </div>
              <Button type="submit" className="w-full px-7 py-4 text-[11px] font-black uppercase tracking-[0.22em]">Quero participar</Button>
              {feedback ? <p role="status" aria-live="polite" className={`rounded-[1rem] px-4 py-3 text-sm ${feedback.type === "success" ? "bg-primary/14 text-primary" : "bg-red-500/14 text-red-200"}`}>{feedback.message}</p> : null}
            </form>
          </GlassCard>
        </div>
      </Section>

      <Section id="faq" className="bg-transparent pb-8 md:pb-12">
        <div className="section-heading">
          <h2 data-reveal className="text-3xl font-black uppercase tracking-[-0.03em] text-foreground sm:text-4xl">Perguntas frequentes</h2>
        </div>
        <div className="mt-10 space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.q} data-reveal style={revealDelayStyle(index * 50)} className="faq-item rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,21,42,0.84),rgba(7,14,28,0.76))] p-5 shadow-[0_16px_32px_rgba(0,0,0,0.14)] backdrop-blur-[14px]">
              <summary className="cursor-pointer text-lg font-semibold text-foreground transition-colors duration-300 hover:text-primary">{item.q}</summary>
              <div className="faq-content"><div><p className="mt-3 text-sm leading-relaxed text-white/68">{item.a}</p></div></div>
            </details>
          ))}
        </div>
      </Section>

      <FloatingSocialButtons />

      <footer className="bg-transparent text-foreground">
        <div className="border-t border-white/8">
          <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/70">Subtenente Sérgio | Presidente da ASSEGO</p>
            <div className="flex items-center gap-4 text-sm font-semibold text-white/72">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-primary">WhatsApp</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-primary">Instagram</a>
            </div>
          </Container>
          <Container className="pb-8">
            <p className="text-xs text-subtle-foreground">Aviso LGPD: seus dados serão usados apenas para a comunicação da campanha.</p>
          </Container>
        </div>
      </footer>
    </main>
  );
}



