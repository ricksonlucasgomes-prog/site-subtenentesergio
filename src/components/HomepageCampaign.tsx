
"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { revealDelayStyle, useScrollReveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type FormData = { nome: string; whatsapp: string; cidade: string };
type FormErrors = Partial<Record<keyof FormData, string>>;
type StatItem = { value: number; label: string; suffix?: string };
type TrajectoryItem = {
  title: string;
  label: string;
  alt: string;
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
const OFFICIAL_LOGO_SRC = "/images/logo-sergio-oficial.png";
const OFFICIAL_LOGO_WIDTH = 2000;
const OFFICIAL_LOGO_HEIGHT = 1263;

const featuredVideo = {
  title: "Assista e entenda por que eu não paro.",
  subtitle: "Sem rodeios: posição firme, experiência real e compromisso com Goiás.",
  youtubeId: "bP133Tsw-Zc",
};

const priorities = [
  { prioridade: "Prioridade 01", titulo: "Segurança", texto: "Combate firme ao crime, inteligência operacional e defesa objetiva de quem vive sob pressão nas ruas.", rodape: "Ordem pública" },
  { prioridade: "Prioridade 02", titulo: "Valorização", texto: "Respeito, estrutura e reconhecimento para os profissionais que sustentam a segurança pública com disciplina e coragem.", rodape: "Defesa da categoria" },
  { prioridade: "Prioridade 03", titulo: "Família", texto: "Proteção da família, educação com valores e políticas públicas que reforcem estabilidade social e responsabilidade coletiva.", rodape: "Base da sociedade" },
  { prioridade: "Prioridade 04", titulo: "Ordem", texto: "Autoridade responsável, compromisso com a lei e direção firme para devolver previsibilidade ao país.", rodape: "Liderança institucional" },
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
  { title: "Conselheiro Tutelar", label: "Serviço público", subtitle: "Proteção direta à família", description: "Atuação de linha de frente, presença institucional e defesa firme de quem mais precisa de amparo.", alt: "Subtenente Sérgio como Conselheiro Tutelar", imageSrc: "/images/trajetoria/conselheiro-tutelar.jpg", iconSrc: "/images/placeholders/trajetoria-conselheiro.svg", objectPosition: "center 16%" },
  { title: "Presidente da ASSEGO", label: "Representação", subtitle: "Liderança de categoria", description: "Articulação institucional, defesa organizada da classe e voz firme nos espaços de decisão.", alt: "Placeholder institucional para Presidente da ASSEGO", iconSrc: "/images/placeholders/trajetoria-assego.svg" },
  { title: "Igreja", label: "Comunidade", subtitle: "Base moral e presença social", description: "Compromisso com valores, escuta da comunidade e serviço próximo das pessoas.", alt: "Subtenente Sérgio em atuação na Igreja", imageSrc: "/images/trajetoria/igreja.jpg", iconSrc: "/images/placeholders/trajetoria-igreja.svg", objectPosition: "center 14%" },
  { title: "Vicentinos em Goiás", label: "Ação social", subtitle: "Serviço que chega na ponta", description: "Trabalho solidário com presença concreta, responsabilidade pública e impacto social real em Goiás.", alt: "Subtenente Sérgio em atuação com os Vicentinos em Goiás", imageSrc: "/images/trajetoria/vicentinos-goias.jpg", iconSrc: "/images/placeholders/trajetoria-vicentinos.svg", objectPosition: "center 20%" },
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

const HERO_PILLARS = [
  { label: "Segurança", text: "Combate ao crime com posição firme, inteligência e defesa de quem está na linha de frente." },
  { label: "Valorização", text: "Respeito institucional à categoria policial e presença nos espaços de decisão." },
  { label: "Família e ordem", text: "Princípios, estabilidade social e compromisso com a autoridade da lei." },
];

const SUPPORT_REASONS = [
  "Receber agenda, posicionamentos e materiais oficiais da campanha.",
  "Mobilizar sua cidade com orientação direta da equipe.",
  "Fortalecer uma representação com história, disciplina e autoridade pública.",
];

function FloatingSocialButtons() {
  const baseStyle =
    "group relative flex h-[3.35rem] w-[3.35rem] items-center justify-center overflow-hidden rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(13,24,46,0.94),rgba(8,15,29,0.9))] text-white shadow-[0_18px_36px_rgba(0,0,0,0.24),0_1px_0_rgba(255,255,255,0.05)_inset] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[0_22px_44px_rgba(255,223,0,0.1)] sm:h-[3.6rem] sm:w-[3.6rem]";

  return (
    <div className="fixed right-4 z-50 flex flex-col gap-3 sm:right-5 md:right-6" style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 1rem))" }}>
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className={baseStyle}><svg viewBox="0 0 24 24" className="h-7 w-7 fill-current sm:h-8 sm:w-8"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.41 2.2 11.83c0 1.73.45 3.42 1.31 4.92L2 22l5.41-1.42a9.8 9.8 0 0 0 4.62 1.17h.01c5.41 0 9.83-4.41 9.83-9.83 0-2.62-1.02-5.08-2.82-6.99Zm-7.02 15.18h-.01a8.12 8.12 0 0 1-4.14-1.13l-.3-.18-3.21.84.86-3.13-.2-.32a8.1 8.1 0 0 1-1.24-4.34c0-4.49 3.66-8.15 8.16-8.15 2.17 0 4.2.84 5.73 2.39a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.03 8.26Zm4.47-6.11c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.4-.42-.54-.43h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.31.98 2.47c.12.16 1.68 2.56 4.07 3.59.57.25 1.02.4 1.37.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg></a>
      <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram" className={baseStyle}><svg viewBox="0 0 24 24" className="h-7 w-7 fill-current sm:h-8 sm:w-8"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5A3.96 3.96 0 0 0 7.75 20.2h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95h-8.5Zm8.97 1.35a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" /></svg></a>
    </div>
  );
}

function StatsBand() {
  return (
    <div className="border-y border-white/10 bg-[linear-gradient(180deg,rgba(8,14,24,0.98),rgba(6,12,22,0.9))]">
      <Container>
        <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <div key={stat.label} data-reveal style={revealDelayStyle(index * 60)} className={`px-5 py-7 sm:px-6 sm:py-8 lg:px-8 ${index > 0 ? "sm:border-l sm:border-white/10" : ""}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/95">Presença pública</p>
              <p className="mt-4 text-[2.8rem] font-black tracking-[-0.065em] text-white sm:text-[3.45rem]"><AnimatedCounter value={stat.value} suffix={stat.suffix} durationMs={1180} startDelayMs={index * 150} className="inline-block tabular-nums" /></p>
              <p className="mt-3 max-w-[17rem] text-[0.95rem] leading-relaxed text-white/78">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default function HomepageCampaign() {
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const watermarkRafRef = useRef<number | null>(null);
  const leavingTimeoutRef = useRef<number | null>(null);
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
    const handleMediaChange = () => setPrefersReducedMotion(reduceMotionMedia.matches);
    handleMediaChange();
    reduceMotionMedia.addEventListener("change", handleMediaChange);
    return () => reduceMotionMedia.removeEventListener("change", handleMediaChange);
  }, []);

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
    const values = { nome: formData.nome.trim(), whatsapp: formData.whatsapp.trim(), cidade: formData.cidade.trim() };
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
          <div className={`mx-auto flex w-full items-center justify-between border px-3 py-2.5 transition-all duration-300 sm:px-4 lg:px-5 ${isScrolled ? "border-white/12 bg-[rgba(6,12,22,0.94)] shadow-[0_16px_42px_rgba(0,0,0,0.28)]" : "border-white/10 bg-[rgba(6,12,22,0.8)]"}`}>
            <a href="#topo" className="flex shrink-0 items-center">
              <Image src={OFFICIAL_LOGO_SRC} alt="Logo oficial Subtenente Sérgio" width={OFFICIAL_LOGO_WIDTH} height={OFFICIAL_LOGO_HEIGHT} priority sizes="(max-width: 640px) 116px, (max-width: 1024px) 148px, 178px" className="h-auto w-[7rem] object-contain sm:w-[8.4rem] lg:w-[10.2rem]" />
            </a>
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-8 lg:flex xl:gap-10">
              <nav className="flex min-w-0 items-center justify-end gap-1">
                <a href="#prioridades" className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/68 transition-colors duration-200 hover:text-white">Prioridades</a>
                <a href="#trajetoria" className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/68 transition-colors duration-200 hover:text-white">Trajetória</a>
                <a href="#videos" className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/68 transition-colors duration-200 hover:text-white">Vídeos</a>
                <a href="#apoie" className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/68 transition-colors duration-200 hover:text-white">Mobilização</a>
              </nav>
              <div className="flex shrink-0 items-center gap-2.5">
                <a href="#apoie" className={buttonStyles("secondary", "px-4.5 py-[0.68rem] text-[10px] font-black uppercase tracking-[0.22em]")}>Apoie</a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "px-4.75 py-[0.68rem] text-[10px] font-black uppercase tracking-[0.22em]")}>WhatsApp</a>
              </div>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "px-4 py-[0.7rem] text-[10px] font-black uppercase tracking-[0.22em] lg:hidden")}>WhatsApp</a>
          </div>
        </Container>
      </header>

      <section id="topo" className="cinematic-hero relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="absolute inset-0 overflow-hidden">
          {HERO_IMAGES.map((src, index) => {
            const isActive = index === activeIndex;
            const isLeaving = index === leavingIndex;
            const zoomClass = prefersReducedMotion ? "scale-100" : isActive ? "scale-[1.05]" : "scale-[1.01]";
            return <Image key={src} src={src} alt="Foto oficial do Subtenente Sérgio" fill priority={index === 0} sizes="100vw" className={`absolute inset-0 object-cover [object-position:60%_20%] transition-[opacity,transform] duration-[2000ms] ease-out ${isActive || isLeaving ? "opacity-100" : "opacity-0"} ${zoomClass} ${index === 0 ? "hero-bg-reveal" : ""}`} />;
          })}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,7,12,0.96)_0%,rgba(3,7,12,0.88)_32%,rgba(3,7,12,0.58)_58%,rgba(3,7,12,0.84)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,10,0.56)_0%,rgba(2,5,10,0.18)_30%,rgba(2,5,10,0.78)_84%,rgba(2,5,10,0.96)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(3,7,12,0.96))]" />
        <Container className="relative z-10 flex min-h-[calc(100svh-7rem)] items-center pb-14 sm:pb-16">
          <div className="grid w-full gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-16">
            <div className="hero-content-reveal max-w-[43rem] pt-2">
              <Badge className="border-[rgba(255,223,0,0.22)] bg-[rgba(255,223,0,0.08)] px-4 py-2 text-white">Campanha 2026 | Representação com firmeza</Badge>
              <h1 className="mt-7 max-w-[11.5ch] text-[clamp(3.25rem,7vw,6.8rem)] font-black uppercase leading-[0.86] tracking-[-0.068em] text-white">Goiás precisa de voz firme, presença e autoridade.</h1>
              <p className="mt-7 max-w-[39rem] text-[1.02rem] leading-relaxed text-white/80 sm:text-[1.12rem]">De engraxate no interior de Goiás a presidente reeleito da maior entidade de praças militares do estado. 28 anos de farda, fé e luta pelo que realmente vale a pena.</p>
              <div className="mt-10 grid gap-3.5 sm:grid-cols-3">
                {HERO_PILLARS.map((pillar, index) => (
                  <div key={pillar.label} data-reveal style={revealDelayStyle(60 + index * 40)} className="border-l-[3px] border-primary/90 bg-[rgba(255,255,255,0.02)] px-4 py-3.5">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-white">{pillar.label}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/72">{pillar.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.24em] shadow-[0_18px_32px_rgba(5,56,30,0.22)]")}>Falar com a equipe</a>
                <a href="#trajetoria" className={buttonStyles("secondary", "px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.24em]")}>Conheça a trajetória</a>
              </div>
            </div>
            <div className="seal-reveal">
              <div className="relative ml-auto w-full max-w-[43.5rem]">
                <div ref={watermarkRef} aria-hidden className="pointer-events-none absolute left-1/2 top-[44%] z-0 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 opacity-[0.045] mix-blend-screen"><Image src="/images/logo-watermark.png" alt="" fill sizes="560px" className="object-contain" /></div>
                <div className="relative z-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,31,0.48),rgba(10,18,31,0.16))] shadow-[0_28px_56px_rgba(0,0,0,0.24)]">
                  <div className="grid lg:grid-cols-[1fr_14rem]">
                    <div className="relative min-h-[31rem] sm:min-h-[39rem] lg:min-h-[43.5rem]">
                      <Image src="/images/foto-oficial.jpg" alt="Subtenente Sérgio em retrato oficial" fill sizes="(max-width: 1024px) 100vw, 700px" className="object-cover [object-position:58%_12%] scale-[1.03]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,0.06)_0%,rgba(4,8,14,0.18)_40%,rgba(4,8,14,0.72)_100%)]" />
                      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[linear-gradient(180deg,rgba(5,10,18,0.12),rgba(5,10,18,0.82))] px-5 py-6 sm:px-7">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Subtenente Sérgio</p>
                        <p className="mt-2.5 max-w-[23rem] text-[1.38rem] font-black uppercase tracking-[-0.045em] text-white sm:text-[1.9rem]">Experiência real para representar com autoridade.</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between border-t border-white/10 bg-[rgba(5,10,18,0.86)] px-5 py-5 lg:border-l lg:border-t-0 lg:px-4 lg:py-6">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/46">Identidade oficial</p>
                        <Image src={OFFICIAL_LOGO_SRC} alt="Logo oficial Subtenente Sérgio" width={OFFICIAL_LOGO_WIDTH} height={OFFICIAL_LOGO_HEIGHT} sizes="(max-width: 1024px) 180px, 150px" className="mt-4 h-auto w-[9.75rem] object-contain lg:w-full" />
                      </div>
                      <div className="mt-8 space-y-6">
                        <div className="border-t border-white/10 pt-4"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Missão</p><p className="mt-2 text-sm leading-relaxed text-white/70">Defender quem garante a ordem, proteger a família e representar Goiás sem vacilação.</p></div>
                        <div className="border-t border-white/10 pt-4"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Postura</p><p className="mt-2 text-sm leading-relaxed text-white/70">Disciplina, autoridade e compromisso com presença institucional permanente.</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <StatsBand />
      <Section id="prioridades" className="bg-transparent">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_1.58fr] lg:gap-16">
          <div className="space-y-6 lg:pt-2">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Direção de mandato</Badge>
            <div className="space-y-4">
              <h2 data-reveal style={revealDelayStyle(40)} className="text-3xl font-black uppercase tracking-[-0.04em] text-foreground sm:text-[3.45rem]">Prioridades de campanha com posição clara.</h2>
              <p data-reveal style={revealDelayStyle(80)} className="text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">Cada frente de atuação é apresentada como compromisso público: firme, mensurável e coerente com a trajetória do candidato.</p>
            </div>
          </div>
          <div className="border-y border-white/10">
            {priorities.map((item, index) => (
              <article key={item.titulo} data-reveal style={revealDelayStyle(120 + index * 60)} className={`grid gap-4 px-0 py-8 md:grid-cols-[10.5rem_1fr_auto] md:items-start md:gap-7 ${index > 0 ? "border-t border-white/10" : ""}`}>
                <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/90">{item.prioridade}</p>
                <div>
                  <h3 className="text-[2rem] font-black uppercase tracking-[-0.045em] text-white sm:text-[2.3rem]">{item.titulo}</h3>
                  <p className="mt-3.5 max-w-[43rem] text-[0.98rem] leading-relaxed text-white/74 sm:text-base">{item.texto}</p>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 md:pt-2.5">{item.rodape}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="trajetoria" className="bg-[rgba(5,10,18,0.4)]">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="space-y-8">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Trajetória, autoridade e experiência</Badge>
            <div className="space-y-4">
              <h2 data-reveal style={revealDelayStyle(40)} className="text-3xl font-black uppercase tracking-[-0.04em] text-foreground sm:text-[3.45rem]">Uma vida pública construída no serviço e na representação.</h2>
              <p data-reveal style={revealDelayStyle(80)} className="max-w-[37rem] text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">Da proteção da família à liderança institucional, a trajetória de Subtenente Sérgio forma uma credencial política baseada em presença real, responsabilidade e defesa objetiva de Goiás.</p>
            </div>
            <div data-reveal style={revealDelayStyle(120)} className="border-l-4 border-primary pl-5"><p className="text-[1.5rem] font-black uppercase leading-tight tracking-[-0.045em] text-white sm:text-[2.15rem]">“Representação não se improvisa. Ela se constrói com serviço prestado, postura e coragem para decidir.”</p></div>
            <div className="grid gap-5 sm:grid-cols-2">
              {TRAJECTORY_ITEMS.slice(0, 2).map((item, index) => (
                <div key={item.title} data-reveal style={revealDelayStyle(150 + index * 40)} className="border-t border-white/12 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/90">{item.label}</p>
                  <p className="mt-3 text-[1.15rem] font-black uppercase tracking-[-0.03em] text-white">{item.title}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/48">{item.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/64">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div data-reveal style={revealDelayStyle(110)} className="relative overflow-hidden rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(6,12,22,0.8),rgba(6,12,22,0.62))] shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[22rem] sm:min-h-[29rem]"><Image src="/images/trajetoria/vicentinos-goias.jpg" alt="Subtenente Sérgio em atuação com os Vicentinos em Goiás" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover [object-position:center_20%]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,0.08),rgba(4,8,14,0.58))]" /></div>
                <div className="flex flex-col justify-center px-5 py-6 sm:px-7"><p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/90">Credibilidade pública</p><h3 className="mt-4 text-[2.1rem] font-black uppercase tracking-[-0.045em] text-white sm:text-[2.55rem]">Presença social, institucional e comunitária.</h3><p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">A experiência acumulada em frentes distintas reforça capacidade de representação, leitura do território e compromisso com demandas concretas da população.</p></div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {TRAJECTORY_ITEMS.map((item, index) => {
                const mediaSrc = item.imageSrc ?? item.iconSrc ?? "/images/placeholders/trajetoria-assego.svg";
                return (
                  <article key={item.title} data-reveal style={revealDelayStyle(150 + index * 40)} className="overflow-hidden rounded-[1.1rem] border border-white/7 bg-[linear-gradient(180deg,rgba(6,12,22,0.46),rgba(6,12,22,0.2))]">
                    <div className="relative h-32"><Image src={mediaSrc} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 420px" className="object-cover brightness-[0.78]" style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined} /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,12,0.14),rgba(3,7,12,0.72))]" /></div>
                    <div className="px-4 py-4"><p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/90">{item.label}</p><h3 className="mt-2.5 text-[1.05rem] font-black uppercase tracking-[-0.03em] text-white">{item.title}</h3><p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-white/46">{item.subtitle}</p><p className="mt-3 text-sm leading-relaxed text-white/60">{item.description}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-transparent">
        <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-16">
          <div className="space-y-6 lg:pt-3">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Vídeo em destaque</Badge>
            <h2 data-reveal style={revealDelayStyle(40)} className="text-3xl font-black uppercase tracking-[-0.045em] text-foreground sm:text-[3.3rem]">{featuredVideo.title}</h2>
            <p data-reveal style={revealDelayStyle(80)} className="max-w-[33rem] text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">{featuredVideo.subtitle}</p>
            <div data-reveal style={revealDelayStyle(120)} className="border-l-4 border-primary pl-5"><p className="text-sm leading-relaxed text-white/72">O vídeo centraliza a narrativa da campanha: posição firme, leitura política da realidade e defesa direta das prioridades de Goiás.</p></div>
            <div data-reveal style={revealDelayStyle(160)} className="flex flex-col gap-3 pt-1 sm:flex-row">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", "px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em]")}>Falar no WhatsApp</a>
              <a href="#apoie" className={buttonStyles("secondary", "px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em]")}>Quero apoiar</a>
            </div>
          </div>
          <div data-reveal style={revealDelayStyle(100)} className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(6,12,22,0.82),rgba(6,12,22,0.58))] p-4 sm:p-5">
            <div className="mb-5 border-b border-white/10 px-1 pb-4 sm:px-2"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Conteúdo oficial de campanha</p><p className="mt-2.5 text-[1.08rem] font-black uppercase tracking-[-0.03em] text-white">Mensagem central</p></div>
            <div className="aspect-video overflow-hidden bg-black"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`} title={featuredVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
          </div>
        </div>
      </Section>
      <Section className="bg-[rgba(5,10,18,0.36)]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:items-start">
          <article data-reveal className="border-l-4 border-primary bg-[linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.006))] px-6 py-8 sm:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Apoio e percepção pública</p>
            <p className="mt-5 text-[1.95rem] font-black uppercase leading-[0.96] tracking-[-0.055em] text-white sm:text-[2.8rem]">“A tropa precisa de voz firme em Brasília.”</p>
            <p className="mt-5 max-w-[32rem] text-[1.02rem] leading-relaxed text-white/76">{testimonials[1]}</p>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">Base de apoio</p>
          </article>
          {[testimonials[0], testimonials[2]].map((item, index) => (
            <article key={item} data-reveal style={revealDelayStyle(60 + index * 60)} className="border-t border-white/12 pt-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">Depoimento</p>
              <p className="mt-4 text-[1.08rem] font-semibold leading-relaxed text-white/84">&quot;{item}&quot;</p>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">Apoiador(a)</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="videos" className="bg-transparent">
        <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
          <div>
            <div className="section-heading">
              <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Mídia de campanha</Badge>
              <h2 data-reveal style={revealDelayStyle(40)} className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] text-foreground sm:text-[3.2rem]">Conteúdos para acompanhar e compartilhar.</h2>
              <p data-reveal style={revealDelayStyle(80)} className="max-w-[42rem] text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">Os vídeos curtos concentram recados diretos. Os conteúdos completos aprofundam propostas, prioridades e visão de mandato.</p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              {shorts.map((short, index) => (
                <article key={short.youtubeId} data-reveal style={revealDelayStyle(120 + index * 50)} className="overflow-hidden rounded-[1.05rem] border border-white/7 bg-[linear-gradient(180deg,rgba(6,12,22,0.56),rgba(6,12,22,0.26))]">
                  <div className="relative aspect-[9/16] bg-black"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${short.youtubeId}`} title={short.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
                  <div className="px-4 py-4.5"><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90">{short.tag}</p><p className="mt-3 text-sm font-semibold leading-relaxed text-white">{short.title}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className="space-y-5 pt-3">
            <p data-reveal className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Vídeos completos</p>
            {longVideos.map((video, index) => (
              <a key={video.youtubeUrl} data-reveal style={revealDelayStyle(120 + index * 60)} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group block border-b border-white/10 py-6 transition-colors duration-300">
                <div className="flex items-start justify-between gap-5">
                  <div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Conteúdo de campanha</p><p className="mt-3 text-[1.12rem] font-black uppercase tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-primary sm:text-[1.28rem]">{video.title}</p></div>
                  <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/12 bg-[rgba(255,255,255,0.03)] text-lg text-white/84 transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary">&#9654;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section id="apoie" className="bg-[rgba(5,10,18,0.72)]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal className="space-y-7">
            <Badge className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Mobilização 2026</Badge>
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-[-0.045em] text-foreground sm:text-[3.3rem]">Cadastro de apoiadores para fortalecer a campanha.</h2>
              <p className="max-w-[35rem] text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">Entre na mobilização e receba agenda, orientações e materiais oficiais para ampliar a presença da campanha com organização e disciplina.</p>
            </div>
            <div className="space-y-4 border-l-4 border-primary pl-5">
              {SUPPORT_REASONS.map((reason, index) => (
                <p key={reason} data-reveal style={revealDelayStyle(60 + index * 40)} className="text-sm leading-relaxed text-white/76 sm:text-base">{reason}</p>
              ))}
            </div>
            <div data-reveal style={revealDelayStyle(180)} className="border-t border-white/10 pt-6"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Canal direto</p><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-lg font-black uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:text-primary">Falar com a equipe no WhatsApp</a></div>
          </div>
          <div data-reveal style={revealDelayStyle(100)} className="rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(6,12,22,0.82),rgba(6,12,22,0.58))] px-5 py-6 shadow-[0_20px_48px_rgba(0,0,0,0.14)] sm:px-7 sm:py-8">
            <div className="mb-7 border-b border-white/10 pb-6"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Cadastro oficial</p><h3 className="mt-3 text-[2rem] font-black uppercase tracking-[-0.045em] text-foreground sm:text-[2.5rem]">Fortaleça a campanha</h3><p className="mt-3 max-w-[32rem] text-sm leading-relaxed text-white/68 sm:text-base">Preencha seus dados para receber convocações, agenda e materiais da campanha diretamente da equipe oficial.</p></div>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div><label htmlFor="nome" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">Nome</label><input id="nome" name="nome" value={formData.nome} onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))} className="w-full border border-white/12 bg-[rgba(255,255,255,0.025)] px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-white/24 transition-colors duration-300 focus:border-primary focus:bg-white/[0.04]" placeholder="Seu nome completo" />{errors.nome ? <p className="mt-1 text-xs text-red-300">{errors.nome}</p> : null}</div>
              <div><label htmlFor="whatsapp" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">WhatsApp</label><input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={(event) => setFormData((prev) => ({ ...prev, whatsapp: event.target.value }))} className="w-full border border-white/12 bg-[rgba(255,255,255,0.025)] px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-white/24 transition-colors duration-300 focus:border-primary focus:bg-white/[0.04]" placeholder="(62) 99999-9999" />{errors.whatsapp ? <p className="mt-1 text-xs text-red-300">{errors.whatsapp}</p> : null}</div>
              <div><label htmlFor="cidade" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">Cidade</label><input id="cidade" name="cidade" value={formData.cidade} onChange={(event) => setFormData((prev) => ({ ...prev, cidade: event.target.value }))} className="w-full border border-white/12 bg-[rgba(255,255,255,0.025)] px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-white/24 transition-colors duration-300 focus:border-primary focus:bg-white/[0.04]" placeholder="Sua cidade" />{errors.cidade ? <p className="mt-1 text-xs text-red-300">{errors.cidade}</p> : null}</div>
              <Button type="submit" className="w-full px-7 py-4 text-[11px] font-black uppercase tracking-[0.24em] shadow-[0_18px_32px_rgba(5,56,30,0.18)]">Quero participar</Button>
              {feedback ? <p role="status" aria-live="polite" className={`px-4 py-3 text-sm ${feedback.type === "success" ? "bg-primary/14 text-primary" : "bg-red-500/14 text-red-200"}`}>{feedback.message}</p> : null}
            </form>
          </div>
        </div>
      </Section>
      <Section id="faq" className="bg-[linear-gradient(180deg,rgba(5,10,18,0.24),transparent)] pb-8 md:pb-12">
        <div className="grid gap-8 lg:grid-cols-[0.56fr_1.44fr] lg:gap-16">
          <div className="section-heading">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Perguntas frequentes</Badge>
            <h2 data-reveal style={revealDelayStyle(40)} className="mt-5 text-3xl font-black uppercase tracking-[-0.04em] text-foreground sm:text-[3rem]">Informações diretas para quem quer acompanhar e apoiar.</h2>
          </div>
          <div className="space-y-0 border-t border-white/10">
            {FAQ_ITEMS.map((item, index) => (
              <details key={item.q} data-reveal style={revealDelayStyle(index * 40)} className="faq-item border-b border-white/10 py-6">
                <summary className="cursor-pointer text-[1.08rem] font-black tracking-[-0.02em] text-foreground transition-colors duration-300 hover:text-primary sm:text-[1.18rem]">{item.q}</summary>
                <div className="faq-content"><div><p className="mt-4 max-w-[44rem] text-sm leading-relaxed text-white/68 sm:text-base">{item.a}</p></div></div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <FloatingSocialButtons />

      <footer className="border-t border-white/10 bg-[rgba(4,8,14,0.96)] text-foreground">
        <Container className="py-10 sm:py-12">
          <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[28rem]">
              <Image src={OFFICIAL_LOGO_SRC} alt="Logo oficial Subtenente Sérgio" width={OFFICIAL_LOGO_WIDTH} height={OFFICIAL_LOGO_HEIGHT} sizes="(max-width: 640px) 170px, 210px" className="h-auto w-[10.5rem] object-contain sm:w-[12.5rem]" />
              <p className="mt-5 text-sm leading-relaxed text-white/66">Subtenente Sérgio | Presidente da ASSEGO. Campanha com foco em segurança pública, valorização da categoria, família e ordem institucional.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:text-right">
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Navegação</p><div className="mt-4 space-y-2 text-sm text-white/72"><a href="#prioridades" className="block transition-colors duration-300 hover:text-white">Prioridades</a><a href="#trajetoria" className="block transition-colors duration-300 hover:text-white">Trajetória</a><a href="#videos" className="block transition-colors duration-300 hover:text-white">Vídeos</a><a href="#apoie" className="block transition-colors duration-300 hover:text-white">Apoie</a></div></div>
              <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Canais oficiais</p><div className="mt-4 space-y-2 text-sm text-white/72"><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block transition-colors duration-300 hover:text-white">WhatsApp</a><a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block transition-colors duration-300 hover:text-white">Instagram</a></div></div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5"><p className="text-xs text-subtle-foreground">Aviso LGPD: seus dados serão usados apenas para a comunicação da campanha.</p></div>
        </Container>
      </footer>
    </main>
  );
}


