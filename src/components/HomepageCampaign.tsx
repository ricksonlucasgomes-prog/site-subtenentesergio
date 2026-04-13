
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
  title: "Realidade Salarial",
  subtitle: "Sem rodeios: posição firme, experiência real e compromisso com Goiás.",
  embedUrl: "https://www.instagram.com/reel/DC4HFSORbv4/embed",
  platform: "Reel",
  type: "vertical" as const,
};

const priorities = [
  { prioridade: "Prioridade 01", titulo: "Segurança", texto: "Combate firme ao crime, inteligência operacional e defesa objetiva de quem vive sob pressão nas ruas.", rodape: "Ordem pública" },
  { prioridade: "Prioridade 02", titulo: "Valorização", texto: "Respeito, estrutura e reconhecimento para os profissionais que sustentam a segurança pública com disciplina e coragem.", rodape: "Defesa da categoria" },
  { prioridade: "Prioridade 03", titulo: "Família", texto: "Proteção da família, educação com valores e políticas públicas que reforcem estabilidade social e responsabilidade coletiva.", rodape: "Base da sociedade" },
  { prioridade: "Prioridade 04", titulo: "Ordem", texto: "Autoridade responsável, compromisso com a lei e direção firme para devolver previsibilidade ao país.", rodape: "Liderança institucional" },
];

const shorts = [
  { title: "Deficit de Efetivo", embedUrl: "https://www.instagram.com/reel/DH4QH2PRKZt/embed", tag: "Segurança", platform: "Reel", type: "vertical" as const },
  { title: "Direito Militar", embedUrl: "https://www.instagram.com/reel/DGLLb2mR8S4/embed", tag: "Categoria", platform: "Reel", type: "vertical" as const },
  { title: "Sergio Responde", embedUrl: "https://www.instagram.com/reel/DHTgH8IRhUR/embed", tag: "Valores", platform: "Reel", type: "vertical" as const },
];

const longVideos = [
  { title: "Atuacao Firme", youtubeUrl: "https://www.instagram.com/reel/DJ_744bxuvc/", platform: "Reel", type: "vertical" as const },
  { title: "Arraia ASSEGO", youtubeUrl: "https://www.instagram.com/reel/DJ1p0auxB28/", platform: "Reel", type: "vertical" as const },
  { title: "ASSEGO Presente", youtubeUrl: "https://www.instagram.com/reel/DJ61slcxdfR", platform: "Reel", type: "vertical" as const },
  { title: "Bastidores Classe", youtubeUrl: "https://www.instagram.com/reel/DDdGg2jRyaQ/", platform: "Reel", type: "vertical" as const },
  { title: "Vila International", youtubeUrl: "https://www.instagram.com/assego/reel/DG8F5ZO01Gk/", platform: "Reel", type: "vertical" as const },
  { title: "Podcast ASSEGO", youtubeUrl: "https://www.facebook.com/assego/videos/1571014966945275/", platform: "Facebook", type: "horizontal" as const },
  { title: "Mensagem ASSEGO", youtubeUrl: "https://www.facebook.com/assego/videos/573436265553606", platform: "Facebook", type: "horizontal" as const },
];

const STATS: StatItem[] = [
  { value: 18, label: "Projetos em defesa do cidadão" },
  { value: 64, label: "Audiências e reuniões em Brasília" },
  { value: 82, label: "Bairros visitados", suffix: "+" },
  { value: 240, label: "Demandas encaminhadas", suffix: "+" },
];

const TRAJECTORY_ITEMS: TrajectoryItem[] = [
  { title: "Conselheiro Tutelar", label: "Serviço público", subtitle: "Proteção direta à família", description: "Atuação de linha de frente, presença institucional e defesa firme de quem mais precisa de amparo.", alt: "Subtenente Sérgio como Conselheiro Tutelar", imageSrc: "/images/trajetoria/conselheiro-tutelar.jpeg", iconSrc: "/images/placeholders/trajetoria-conselheiro.svg", objectPosition: "center 16%" },
  { title: "Presidente da ASSEGO", label: "Representação", subtitle: "Liderança de categoria", description: "Articulação institucional, defesa organizada da classe e voz firme nos espaços de decisão.", alt: "Placeholder institucional para Presidente da ASSEGO", iconSrc: "/images/placeholders/trajetoria-assego.svg" },
  { title: "Igreja", label: "Comunidade", subtitle: "Base moral e presença social", description: "Compromisso com valores, escuta da comunidade e serviço próximo das pessoas.", alt: "Subtenente Sérgio em atuação na Igreja", imageSrc: "/images/trajetoria/igreja.jpeg", iconSrc: "/images/placeholders/trajetoria-igreja.svg", objectPosition: "center 14%" },
  { title: "Vicentinos em Goiás", label: "Ação social", subtitle: "Serviço que chega na ponta", description: "Trabalho solidário com presença concreta, responsabilidade pública e impacto social real em Goiás.", alt: "Subtenente Sérgio em atuação com os Vicentinos em Goiás", imageSrc: "/images/trajetoria/vicentinos-goias.jpeg", iconSrc: "/images/placeholders/trajetoria-vicentinos.svg", objectPosition: "center 20%" },
];

const FAQ_ITEMS = [
  { q: "Quais são as prioridades do mandato?", a: "Segurança pública, valorização policial, defesa da família e compromisso com a ordem social." },
  { q: "Como posso apoiar a campanha?", a: "Com cadastro no formulário, compartilhamento dos materiais oficiais e mobilização local na sua cidade." },
  { q: "Haverá agenda presencial?", a: "Sim. A agenda é divulgada continuamente no Instagram oficial e nos canais da equipe." },
  { q: "Como posso enviar demandas da categoria?", a: "Pelo WhatsApp oficial e pelos canais de atendimento da campanha." },
  { q: "Onde acompanho notícias e posicionamentos?", a: "No Instagram oficial e nas publicações semanais da campanha." },
];

const testimonials = [
  {
    symbol: "★",
    category: "Militar",
    text: "Sérgio conhece a realidade da tropa porque viveu cada etapa. Ele não fala de gabinete — fala de quem já patrulhou rua, já perdeu colega e nunca desistiu da farda.",
    signature: "Sgt. PM — Região Metropolitana de Goiânia",
  },
  {
    symbol: "♥️",
    category: "Família militar",
    text: "Quando meu marido precisou de apoio jurídico, a ASSEGO sob a gestão do Sérgio resolveu em dias o que outras entidades não resolveram em meses. Ele cuida da família do militar de verdade.",
    signature: "Esposa de PM — Aparecida de Goiânia",
  },
  {
    symbol: "★",
    category: "Militar",
    text: "A tropa precisa de voz firme em Brasília. Sérgio tem história, postura e coragem para representar. Ele não promete — ele entrega.",
    signature: "Subtenente BM — Norte de Goiás",
  },
  {
    symbol: "★",
    category: "Militar",
    text: "Vi a ASSEGO se transformar nesses últimos anos. Mais estrutura, mais respeito, mais benefícios. Isso tem nome: Sérgio. Não é discurso, é resultado.",
    signature: "1º Sgt. PM — Jataí, GO",
  },
];

const featuredTestimonial = testimonials[0];
const supportingTestimonials = testimonials.slice(1);

const SUPPORT_REASONS = [
  "Receber agenda, posicionamentos e materiais oficiais da campanha.",
  "Mobilizar sua cidade com orientação direta da equipe.",
  "Fortalecer uma representação com história, disciplina e autoridade pública.",
];

const SECTION_TITLE_CLASS = "text-[2rem] font-black uppercase tracking-[-0.045em] text-foreground sm:text-[3.1rem] lg:text-[3.3rem]";
const SECTION_TEXT_CLASS = "text-base leading-[1.82] text-white/72 sm:text-[1.05rem]";
const SURFACE_CLASS = "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] shadow-[0_22px_48px_rgba(0,0,0,0.16)]";
const SURFACE_SUBTLE_CLASS = "rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))]";
const PRIORITIES_TITLE_CLASS = "max-w-[13.5ch] text-balance text-[1.95rem] font-black uppercase leading-[0.96] tracking-[-0.042em] text-foreground sm:max-w-[14.5ch] sm:text-[2.7rem] sm:leading-[0.94] lg:max-w-[15.8ch] lg:text-[3rem] lg:leading-[0.93] xl:max-w-[16.5ch] xl:text-[3.15rem]";
const HOMEPAGE_PRIMARY_CTA_CLASS =
  "border-[rgba(227,184,42,0.42)] bg-[linear-gradient(180deg,#f0d05f_0%,#d4a41e_100%)] text-[#1a1508] shadow-[0_16px_30px_rgba(112,85,15,0.16),0_1px_0_rgba(255,255,255,0.14)_inset] hover:border-[rgba(244,214,108,0.5)] hover:bg-[linear-gradient(180deg,#f6db78_0%,#dfb737_100%)] hover:text-[#140f05] hover:shadow-[0_18px_34px_rgba(112,85,15,0.2),0_1px_0_rgba(255,255,255,0.16)_inset] active:bg-[linear-gradient(180deg,#daad28_0%,#c39212_100%)]";
const TOP_PRIMARY_CTA_CLASS =
  "border-[rgba(208,172,57,0.34)] bg-[linear-gradient(180deg,#e7ce74_0%,#c49522_100%)] text-[#171105] shadow-[0_14px_26px_rgba(92,67,10,0.12),0_1px_0_rgba(255,255,255,0.12)_inset] hover:border-[rgba(230,199,100,0.42)] hover:bg-[linear-gradient(180deg,#edd785_0%,#cea42d_100%)] hover:text-[#130e04] hover:shadow-[0_16px_28px_rgba(92,67,10,0.16),0_1px_0_rgba(255,255,255,0.14)_inset] active:bg-[linear-gradient(180deg,#d6b24b_0%,#b88818_100%)]";

function resolveVideoHref(url: string) {
  return url.endsWith("/embed") ? url.replace(/\/embed$/, "/") : url;
}

function videoCardBackground(type: "vertical" | "horizontal") {
  return type === "vertical"
    ? "bg-[radial-gradient(circle_at_72%_18%,rgba(255,223,0,0.17),transparent_18%),radial-gradient(circle_at_26%_82%,rgba(20,122,73,0.14),transparent_24%),linear-gradient(160deg,rgba(18,31,52,0.98),rgba(7,13,23,0.98))]"
    : "bg-[radial-gradient(circle_at_76%_26%,rgba(255,223,0,0.14),transparent_18%),radial-gradient(circle_at_22%_70%,rgba(20,122,73,0.11),transparent_22%),linear-gradient(135deg,rgba(16,28,48,0.96),rgba(5,10,18,0.98))]";
}

function FloatingSocialButtons() {
  const baseStyle =
    "group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(13,24,46,0.92),rgba(8,15,29,0.88))] text-white shadow-[0_12px_24px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:shadow-[0_16px_30px_rgba(255,223,0,0.06)] sm:h-11 sm:w-11 md:h-[2.9rem] md:w-[2.9rem] lg:h-[3.45rem] lg:w-[3.45rem]";

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-1.5 z-50 flex flex-col gap-1.5 sm:bottom-[calc(env(safe-area-inset-bottom)+0.875rem)] sm:right-3 sm:gap-2 md:bottom-[calc(env(safe-area-inset-bottom)+1rem)] md:right-4 lg:bottom-[max(1rem,calc(env(safe-area-inset-bottom)+1rem))] lg:right-6 lg:gap-3">
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className={baseStyle}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 lg:h-7 lg:w-7"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.41 2.2 11.83c0 1.73.45 3.42 1.31 4.92L2 22l5.41-1.42a9.8 9.8 0 0 0 4.62 1.17h.01c5.41 0 9.83-4.41 9.83-9.83 0-2.62-1.02-5.08-2.82-6.99Zm-7.02 15.18h-.01a8.12 8.12 0 0 1-4.14-1.13l-.3-.18-3.21.84.86-3.13-.2-.32a8.1 8.1 0 0 1-1.24-4.34c0-4.49 3.66-8.15 8.16-8.15 2.17 0 4.2.84 5.73 2.39a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.03 8.26Zm4.47-6.11c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.2-.48-.4-.42-.54-.43h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.31.98 2.47c.12.16 1.68 2.56 4.07 3.59.57.25 1.02.4 1.37.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" /></svg></a>
      <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" aria-label="Abrir Instagram" className={baseStyle}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 lg:h-7 lg:w-7"><path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5A3.96 3.96 0 0 0 7.75 20.2h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95h-8.5Zm8.97 1.35a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" /></svg></a>
    </div>
  );
}

function StatsBand() {
  return (
    <div className="relative z-20 -mt-6 border-y border-primary/22 bg-[radial-gradient(circle_at_50%_0%,rgba(255,223,0,0.18),transparent_32%),linear-gradient(180deg,rgba(24,38,58,0.99),rgba(16,27,42,0.99)_50%,rgba(10,18,31,0.99))] shadow-[0_24px_56px_rgba(0,0,0,0.2)] sm:-mt-8 lg:-mt-10">
      <Container>
        <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <div key={stat.label} data-reveal style={revealDelayStyle(index * 60)} className={`relative flex w-full flex-col items-center px-4 py-9 text-center sm:px-6 sm:py-10 sm:items-start sm:text-left lg:px-8 lg:py-12 ${index > 0 ? "sm:border-l sm:border-white/10" : ""}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">Presença pública</p>
              <p className="mt-4 text-center text-[4.1rem] font-black leading-none tracking-[-0.11em] text-white sm:text-left sm:text-[5rem] lg:text-[5.7rem]">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} durationMs={1180} startDelayMs={index * 150} className="inline-block tabular-nums" />
              </p>
              <div className="mx-auto mt-5 h-px w-16 bg-primary/42 sm:mx-0" />
              <p className="mx-auto mt-4 max-w-[16rem] text-center text-[0.95rem] leading-[1.7] text-white/78 sm:mx-0 sm:max-w-[18rem] sm:text-left sm:text-[0.98rem]">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
export default function HomepageCampaign() {
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
    <main className="overflow-x-clip bg-[linear-gradient(180deg,#040a12_0%,#07111d_22%,#07101a_56%,#040911_100%)] pb-6 text-foreground sm:pb-8">
      <header className="fixed inset-x-0 top-0 z-50 pt-1 sm:pt-1.5">
        <Container className="px-3 sm:px-4.5 lg:px-6 xl:px-8">
          <div className="relative mx-auto w-full">
            <div className={`relative flex w-full items-center justify-between rounded-[0.95rem] border px-2.75 py-[0.24rem] transition-all duration-300 sm:px-3.5 sm:py-[0.28rem] lg:px-4.5 lg:py-[0.3rem] ${isScrolled ? "border-white/12 bg-[linear-gradient(180deg,rgba(16,22,33,0.76),rgba(8,13,22,0.7))] shadow-[0_12px_24px_rgba(0,0,0,0.18),0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-lg" : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] shadow-[0_10px_22px_rgba(0,0,0,0.14),0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-md"}`}>
            <div aria-hidden className="pointer-events-none absolute inset-[1px] rounded-[0.82rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))]" />
            <a href="#topo" className="flex shrink-0 items-center">
              <Image src={OFFICIAL_LOGO_SRC} alt="Logo oficial Subtenente Sérgio" width={OFFICIAL_LOGO_WIDTH} height={OFFICIAL_LOGO_HEIGHT} priority sizes="(max-width: 640px) 74px, (max-width: 1024px) 96px, 116px" className="h-auto w-[4.25rem] object-contain sm:w-[5.1rem] lg:w-[6.4rem]" />
            </a>
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-3.5 lg:flex xl:gap-5">
              <nav className="flex min-w-0 items-center justify-end gap-1">
                <a href="#prioridades" className="group relative px-2.25 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/64 transition-colors duration-300 hover:text-white"><span className="relative">Prioridades</span><span aria-hidden className="absolute inset-x-2.25 -bottom-[1px] h-px origin-left scale-x-0 bg-white/34 transition-transform duration-300 group-hover:scale-x-100" /></a>
                <a href="#trajetoria" className="group relative px-2.25 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/64 transition-colors duration-300 hover:text-white"><span className="relative">Trajetória</span><span aria-hidden className="absolute inset-x-2.25 -bottom-[1px] h-px origin-left scale-x-0 bg-white/34 transition-transform duration-300 group-hover:scale-x-100" /></a>
                <a href="#videos" className="group relative px-2.25 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/64 transition-colors duration-300 hover:text-white"><span className="relative">Vídeos</span><span aria-hidden className="absolute inset-x-2.25 -bottom-[1px] h-px origin-left scale-x-0 bg-white/34 transition-transform duration-300 group-hover:scale-x-100" /></a>
                <a href="#apoie" className="group relative px-2.25 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/64 transition-colors duration-300 hover:text-white"><span className="relative">Mobilização</span><span aria-hidden className="absolute inset-x-2.25 -bottom-[1px] h-px origin-left scale-x-0 bg-white/34 transition-transform duration-300 group-hover:scale-x-100" /></a>
              </nav>
              <div className="flex shrink-0 items-center gap-2 lg:gap-2.5">
                <a href="#apoie" className={buttonStyles("secondary", "px-3.45 py-[0.44rem] text-[10px] font-black uppercase tracking-[0.21em] lg:border-white/14 lg:bg-[rgba(255,255,255,0.018)] lg:px-3.8 lg:py-[0.48rem] lg:shadow-[0_7px_16px_rgba(0,0,0,0.07)] lg:hover:bg-[rgba(255,255,255,0.038)]")}>Apoie</a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", `${TOP_PRIMARY_CTA_CLASS} px-3.75 py-[0.44rem] text-[10px] font-black uppercase tracking-[0.21em] lg:px-4.1 lg:py-[0.48rem] lg:hover:scale-[1.03]`) }>WhatsApp</a>
              </div>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", `${TOP_PRIMARY_CTA_CLASS} px-2.9 py-[0.42rem] text-[9.5px] font-black uppercase tracking-[0.18em] lg:hidden`)}>WhatsApp</a>
          </div>
          </div>
        </Container>
      </header>

      <section id="topo" className="cinematic-hero relative min-h-[100svh] overflow-hidden pt-[4.15rem] sm:pt-[4.75rem] lg:pt-24">
        <div className="absolute inset-0 overflow-hidden">
          {HERO_IMAGES.map((src, index) => {
            const isActive = index === activeIndex;
            const isLeaving = index === leavingIndex;
            const zoomClass = prefersReducedMotion ? "scale-100" : isActive ? "scale-[1.05]" : "scale-[1.01]";
            return <Image key={src} src={src} alt="Foto oficial do Subtenente Sérgio" fill priority={index === 0} sizes="100vw" className={`absolute inset-0 object-cover [object-position:60%_20%] transition-[opacity,transform] duration-[2000ms] ease-out ${isActive || isLeaving ? "opacity-100" : "opacity-0"} ${zoomClass} ${index === 0 ? "hero-bg-reveal" : ""}`} />;
          })}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,8,16,0.988)_0%,rgba(5,11,22,0.926)_30%,rgba(8,18,32,0.4)_58%,rgba(4,8,16,0.85)_100%)] lg:bg-[linear-gradient(106deg,rgba(2,6,14,0.995)_0%,rgba(4,9,18,0.968)_18%,rgba(7,18,34,0.72)_48%,rgba(4,8,16,0.93)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(104,156,247,0.14),transparent_23%),radial-gradient(circle_at_70%_42%,rgba(26,120,88,0.09),transparent_22%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.028),transparent_16%),linear-gradient(180deg,rgba(2,5,10,0.36)_0%,rgba(2,5,10,0.08)_32%,rgba(2,5,10,0.72)_84%,rgba(2,5,10,0.96)_100%)] lg:bg-[radial-gradient(circle_at_76%_25%,rgba(94,148,244,0.17),transparent_16%),radial-gradient(circle_at_70%_38%,rgba(24,118,86,0.12),transparent_21%),radial-gradient(circle_at_20%_22%,rgba(255,255,255,0.028),transparent_18%),linear-gradient(180deg,rgba(2,5,10,0.22)_0%,rgba(2,5,10,0.04)_28%,rgba(2,5,10,0.72)_84%,rgba(2,5,10,0.97)_100%)]" />
        <div className="absolute inset-0 hidden opacity-[0.045] mix-blend-soft-light lg:block lg:bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_20%,transparent_58%,rgba(28,152,89,0.05)_78%,transparent_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(3,7,14,0.93)_0%,rgba(3,7,14,0.82)_36%,rgba(3,7,14,0.24)_78%,transparent)] lg:w-[52%] lg:bg-[linear-gradient(90deg,rgba(2,6,13,0.978)_0%,rgba(3,7,14,0.91)_34%,rgba(3,7,14,0.28)_74%,transparent)]" />
        <div className="pointer-events-none absolute right-[1%] top-[13%] hidden h-[62%] w-[38%] opacity-[0.085] mix-blend-soft-light blur-[2px] lg:block">
          <div className="relative h-full w-full">
            <Image src={OFFICIAL_LOGO_SRC} alt="" fill sizes="520px" className="object-contain grayscale brightness-[1.8] contrast-[0.38] scale-[1.16]" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(3,7,12,0.96))]" />
        <Container className="relative z-10 flex min-h-[calc(100svh-4.4rem)] items-start px-5 py-9 sm:px-6 sm:py-11 lg:items-center lg:pb-18 lg:pt-0">
          <div className="grid w-full justify-items-center gap-10 sm:gap-11 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:justify-items-stretch lg:gap-14 xl:gap-18">
            <div className="hero-content-reveal relative z-10 flex max-w-[20.5rem] flex-col items-center pt-2 text-center sm:max-w-[24rem] sm:pt-4 lg:max-w-[32.5rem] lg:items-start lg:pt-20 lg:text-left xl:max-w-[33.5rem]">
              <div aria-hidden className="absolute left-0 top-3 hidden h-16 w-px bg-[linear-gradient(180deg,rgba(255,223,0,0.78),rgba(255,255,255,0.06),transparent)] lg:block" />
              <Badge className="mx-auto border-[rgba(255,223,0,0.28)] bg-[rgba(255,223,0,0.12)] px-3 py-1.5 text-[9px] tracking-[0.16em] text-white sm:px-3.5 sm:py-1.75 sm:text-[9.5px] sm:tracking-[0.18em] lg:mx-0 lg:px-4.5 lg:py-2.5 lg:text-[10px] lg:tracking-[0.22em]">Campanha 2026</Badge>
              <h1 className="mt-5 max-w-[8.95ch] text-[3.08rem] font-black uppercase leading-[0.9] tracking-[-0.065em] text-white sm:max-w-[9.1ch] sm:text-[3.2rem] sm:leading-[0.9] lg:mt-11 lg:max-w-[10.5ch] lg:text-[clamp(2.92rem,4.82vw,5.08rem)] lg:leading-[1.06] lg:tracking-[-0.055em] xl:max-w-[10.7ch]"><span className="text-primary [text-shadow:0_0_20px_rgba(255,223,0,0.07)]">Goiás</span> precisa de<br />voz firme,<br />presença e<br />autoridade.</h1>
              <p className="mt-5 max-w-[19.75rem] text-[0.95rem] leading-[1.78] text-white/80 sm:mt-6 sm:max-w-[25rem] sm:text-[0.98rem] sm:leading-[1.78] lg:mt-12 lg:max-w-[29.75rem] lg:text-[1.05rem] lg:leading-[2.04] lg:text-white/71 xl:max-w-[30.5rem]">De engraxate no interior de Goiás a presidente reeleito da maior entidade de praças militares do estado. 28 anos de farda, fé e luta pelo que realmente vale a pena.</p>
              <div className="mx-auto mt-7 flex w-full max-w-[18.75rem] flex-col gap-2.5 sm:mt-8 sm:max-w-[19.75rem] sm:gap-3 lg:mx-0 lg:mt-15 lg:max-w-none lg:flex-row lg:items-center lg:gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", `${TOP_PRIMARY_CTA_CLASS} w-full justify-center px-6 py-3.25 text-[11px] font-black uppercase tracking-[0.2em] shadow-none lg:w-auto lg:px-7 lg:py-3.65 lg:text-[10.5px] lg:tracking-[0.22em] lg:shadow-[0_12px_24px_rgba(90,67,10,0.12)]`) }>Falar com a equipe</a>
                <a href="#trajetoria" className={buttonStyles("secondary", "w-full justify-center bg-[rgba(255,255,255,0.03)] px-6 py-3.25 text-[11px] font-black uppercase tracking-[0.2em] shadow-none lg:w-auto lg:border-white/10 lg:bg-[rgba(255,255,255,0.026)] lg:px-6.85 lg:py-3.65 lg:text-[10.5px] lg:tracking-[0.22em] lg:text-white/78 lg:hover:bg-[rgba(255,255,255,0.04)]")}>Conheça a trajetória</a>
              </div>
            </div>
            <div className="seal-reveal relative z-10 mt-8 w-full justify-self-center sm:mt-10 lg:mt-0 lg:justify-self-stretch lg:-mr-8 lg:translate-y-5 xl:-mr-10">
              <div className="absolute left-[18%] top-[10%] h-[56%] w-[50%] rounded-full bg-[rgba(87,138,255,0.12)] blur-3xl lg:left-[14%] lg:top-[6%] lg:h-[62%] lg:w-[56%] lg:bg-[rgba(84,141,255,0.14)] lg:blur-[84px]" />
              <div className="absolute right-[10%] top-[18%] h-[44%] w-[32%] rounded-full bg-[rgba(38,138,100,0.1)] blur-3xl lg:right-[6%] lg:top-[14%] lg:h-[50%] lg:w-[38%] lg:bg-[rgba(38,138,100,0.12)] lg:blur-[88px]" />
              <div className="absolute -bottom-8 right-[8%] h-40 w-40 rounded-full bg-white/6 blur-3xl" />
              <div className="relative mx-auto w-full max-w-[23.75rem] sm:max-w-[32rem] lg:ml-auto lg:mr-0 lg:max-w-[48rem]">
                <div className="relative min-h-[24rem] overflow-hidden rounded-2xl sm:min-h-[29rem] sm:rounded-[1.4rem] lg:min-h-[48rem] lg:rounded-none xl:min-h-[50rem]">
                  <div className="absolute inset-[8%_12%_12%_12%] rounded-full bg-[rgba(118,164,255,0.11)] blur-3xl lg:inset-[10%_8%_15%_16%] lg:bg-[rgba(118,164,255,0.13)] lg:blur-[86px]" />
                  <div className="absolute inset-[6%_4%_0_18%] hidden rounded-[42%] bg-[rgba(32,128,92,0.07)] blur-[82px] lg:block" />
                  <Image src="/images/foto-oficial.jpg" alt="Subtenente Sérgio em retrato oficial" fill sizes="(max-width: 1024px) 100vw, 760px" className="object-cover [object-position:58%_12%] scale-[1.05] drop-shadow-[0_20px_40px_rgba(0,0,0,0.22)] lg:[object-position:56%_9%] lg:scale-[1.08] lg:drop-shadow-[0_42px_88px_rgba(0,0,0,0.28)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,18,0.18),transparent_16%,transparent_84%,rgba(5,10,18,0.22)),radial-gradient(circle_at_68%_40%,transparent_44%,rgba(5,10,18,0.16)_76%,rgba(5,10,18,0.34)_100%),linear-gradient(180deg,rgba(4,8,14,0.02)_0%,rgba(4,8,14,0.12)_48%,rgba(4,8,14,0.76)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,8,16,0.82)_0%,rgba(4,8,16,0.54)_10%,rgba(4,8,16,0.22)_22%,rgba(4,8,16,0.05)_33%,transparent_47%,transparent_84%,rgba(4,8,16,0.12)_100%),radial-gradient(circle_at_74%_34%,transparent_38%,rgba(4,8,16,0.08)_68%,rgba(4,8,16,0.22)_100%),linear-gradient(180deg,rgba(4,8,14,0.02)_0%,rgba(4,8,14,0.07)_32%,rgba(4,8,14,0.84)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-9">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Subtenente Sérgio</p>
                    <p className="mt-3 max-w-[16rem] text-[1.18rem] font-black uppercase leading-[0.98] tracking-[-0.04em] text-white sm:max-w-[19rem] sm:text-[1.42rem] lg:max-w-[25rem] lg:text-[2.28rem] lg:leading-[0.93] lg:tracking-[-0.052em]">Experiência real para representar com autoridade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <StatsBand />
      <Section id="prioridades" className="bg-[linear-gradient(180deg,rgba(255,255,255,0.024),rgba(255,255,255,0.008))] py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 xl:grid-cols-[0.78fr_1.22fr] xl:gap-12">
          <div className="space-y-5 lg:max-w-[34rem] lg:pt-1">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Direção de mandato</Badge>
            <div className="space-y-4">
              <h2 data-reveal style={revealDelayStyle(40)} className={PRIORITIES_TITLE_CLASS}>Prioridades de campanha com posição clara.</h2>
              <p data-reveal style={revealDelayStyle(80)} className={SECTION_TEXT_CLASS}>Cada frente de atuação é apresentada como compromisso público: firme, mensurável e coerente com a trajetória do candidato.</p>
            </div>
          </div>
          <div className="border-t border-white/10">
            {priorities.map((item, index) => (
              <article key={item.titulo} data-reveal style={revealDelayStyle(120 + index * 60)} className={`grid gap-4 px-0 py-7 md:grid-cols-[10rem_1fr_auto] md:items-start md:gap-6 ${index > 0 ? "border-t border-white/10" : ""}`}>
                <p className="pt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">{item.prioridade}</p>
                <div>
                  <h3 className="text-[2.1rem] font-black uppercase tracking-[-0.045em] text-white sm:text-[2.45rem]">{item.titulo}</h3>
                  <p className="mt-3 max-w-[43rem] text-[1rem] leading-[1.8] text-white/78 sm:text-base">{item.texto}</p>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 md:pt-2.5">{item.rodape}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="trajetoria" className="bg-[linear-gradient(180deg,rgba(7,14,24,0.34),rgba(9,17,29,0.14))] py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14">
          <div className="space-y-9">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Trajetória, autoridade e experiência</Badge>
            <div className="space-y-5">
              <h2 data-reveal style={revealDelayStyle(40)} className={SECTION_TITLE_CLASS}>Uma vida pública construída no serviço e na representação.</h2>
              <p data-reveal style={revealDelayStyle(80)} className="max-w-[39rem] text-[1.02rem] leading-[1.85] text-white/72 sm:text-[1.08rem]">Da proteção da família à liderança institucional, a trajetória de Subtenente Sérgio forma uma credencial política baseada em presença real, responsabilidade e defesa objetiva de Goiás.</p>
            </div>
            <div data-reveal style={revealDelayStyle(120)} className="max-w-[42rem] border-l-[3px] border-primary/80 pl-5 sm:pl-6">
              <p className="text-[1.58rem] font-black uppercase leading-[1.02] tracking-[-0.05em] text-white sm:text-[2.22rem]">“Representação não se improvisa. Ela se constrói com serviço prestado, postura e coragem para decidir.”</p>
            </div>
            <div className="grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2 sm:gap-7 sm:pt-7">
              {TRAJECTORY_ITEMS.slice(0, 2).map((item, index) => (
                <div key={item.title} data-reveal style={revealDelayStyle(150 + index * 40)} className="space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/90">{item.label}</p>
                  <p className="text-[1.15rem] font-black uppercase tracking-[-0.03em] text-white">{item.title}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/46">{item.subtitle}</p>
                  <p className="max-w-[18rem] text-sm leading-[1.75] text-white/68">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div data-reveal style={revealDelayStyle(110)} className="grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-8">
              <div className="relative min-h-[26rem] overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.02)] ring-1 ring-white/6 md:min-h-[29rem]">
                <Image src="/images/trajetoria/policial-militar.jpeg" alt="Subtenente Sérgio em presença institucional na Polícia Militar" fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover [object-position:center_16%] md:[object-position:center_22%]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,0.06),rgba(4,8,14,0.2)_38%,rgba(4,8,14,0.72)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-5 sm:px-6 sm:py-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary/90">Credibilidade pública</p>
                  <p className="mt-3 max-w-[24rem] text-[1.55rem] font-black uppercase leading-[0.94] tracking-[-0.045em] text-white sm:text-[2rem]">Presença social, institucional e comunitária.</p>
                </div>
              </div>
              <div className="flex flex-col justify-end lg:pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/44">Leitura de território</p>
                <h3 className="mt-4 max-w-[12ch] text-[1.95rem] font-black uppercase tracking-[-0.05em] text-white sm:text-[2.5rem]">Autoridade construída em campo, não em discurso.</h3>
                <p className="mt-5 max-w-[28rem] text-[0.98rem] leading-[1.8] text-white/72 sm:text-base">A experiência acumulada em frentes distintas reforça capacidade de representação, leitura do território e compromisso com demandas concretas da população.</p>
              </div>
            </div>
            <div className="space-y-0 border-t border-white/10">
              {TRAJECTORY_ITEMS.slice(2).map((item, index) => {
                const mediaSrc = item.imageSrc ?? item.iconSrc ?? "/images/placeholders/trajetoria-assego.svg";
                const mobileObjectPositionClass =
                  item.title === "Igreja"
                    ? "[object-position:center_18%] md:[object-position:center_14%]"
                    : item.title === "Vicentinos em Goiás"
                      ? "[object-position:center_26%] md:[object-position:center_20%]"
                      : "[object-position:center_18%] md:[object-position:center]";
                return (
                  <article key={item.title} data-reveal style={revealDelayStyle(170 + index * 50)} className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[6.75rem_1fr] md:items-start md:gap-6 md:py-8">
                    <div className="relative h-40 overflow-hidden rounded-2xl border border-white/10 sm:h-44 md:h-24">
                      <Image src={mediaSrc} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 180px" className={`object-cover brightness-[0.8] ${mobileObjectPositionClass}`} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,12,0.08),rgba(3,7,12,0.46))]" />
                    </div>
                    <div className="grid gap-3.5 lg:grid-cols-[10.5rem_1fr] lg:items-start lg:gap-6">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary/90">{item.label}</p>
                        <h3 className="mt-2.5 text-[1.15rem] font-black uppercase tracking-[-0.03em] text-white sm:text-[1.28rem]">{item.title}</h3>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/42">{item.subtitle}</p>
                      </div>
                      <p className="max-w-[27rem] text-sm leading-[1.78] text-white/66">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.016),rgba(255,255,255,0.004))] py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-start lg:gap-12">
          <div className="space-y-5 lg:pt-2">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Vídeo em destaque</Badge>
            <h2 data-reveal style={revealDelayStyle(40)} className={SECTION_TITLE_CLASS}>{featuredVideo.title}</h2>
            <p data-reveal style={revealDelayStyle(80)} className={`max-w-[33rem] ${SECTION_TEXT_CLASS}`}>{featuredVideo.subtitle}</p>
            <div data-reveal style={revealDelayStyle(120)} className="border-l-4 border-primary pl-5"><p className="text-sm leading-relaxed text-white/72">O vídeo centraliza a narrativa da campanha: posição firme, leitura política da realidade e defesa direta das prioridades de Goiás.</p></div>
            <div data-reveal style={revealDelayStyle(160)} className="flex flex-col gap-3 pt-1 sm:flex-row">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={buttonStyles("primary", `${HOMEPAGE_PRIMARY_CTA_CLASS} px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em]`)}>Falar no WhatsApp</a>
              <a href="#apoie" className={buttonStyles("secondary", "px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em]")}>Quero apoiar</a>
            </div>
          </div>
          <div data-reveal style={revealDelayStyle(100)} className="border-t border-white/10 pt-5 sm:pt-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Conteúdo oficial de campanha</p>
                <p className="mt-2.5 text-[1.08rem] font-black uppercase tracking-[-0.03em] text-white">Mensagem central</p>
              </div>
              <p className="max-w-[18rem] text-sm leading-relaxed text-white/58">Um pronunciamento central para contextualizar prioridades, postura pública e visão de mandato.</p>
            </div>
            <a
              href={resolveVideoHref(featuredVideo.embedUrl)}
              target="_blank"
              rel="noreferrer"
              className="group mx-auto block w-full max-w-[22rem] overflow-hidden rounded-2xl border border-white/10 shadow-[0_22px_46px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.01] lg:mr-0"
            >
              <div className="relative aspect-[9/16] overflow-hidden">
                <div className={`absolute inset-0 ${videoCardBackground(featuredVideo.type)}`} />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,16,0.14),rgba(4,8,16,0.04)_36%,rgba(4,8,16,0.2)_100%),linear-gradient(180deg,rgba(4,8,16,0.02),rgba(4,8,16,0.76))]" />
                <div aria-hidden className="absolute inset-y-8 left-[16%] w-px bg-[linear-gradient(180deg,rgba(255,223,0,0.55),rgba(255,255,255,0.08),transparent)]" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                  {featuredVideo.platform}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/54">Vídeo em destaque</p>
                  <p className="mt-3 max-w-[15rem] text-[1.45rem] font-black uppercase leading-[0.98] tracking-[-0.045em] text-white sm:text-[1.82rem]">
                    {featuredVideo.title}
                  </p>
                  <p className="mt-3 max-w-[15rem] text-sm leading-[1.75] text-white/72">
                    Clique para abrir o conteúdo oficial e acompanhar a mensagem completa.
                  </p>
                </div>
                <div className="absolute right-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.06)] text-white transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/45 group-hover:text-primary">
                  <span className="ml-1 text-xl">&#9654;</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Section>
      <Section className="bg-[linear-gradient(180deg,rgba(5,10,18,0.14),rgba(5,10,18,0.06))] py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12">
          <article data-reveal className="border-y border-white/10 py-8 sm:py-10">
            <div className="flex items-center gap-3 text-primary/90">
              <span className="text-lg leading-none">{featuredTestimonial.symbol}</span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em]">Apoio e percepção pública</p>
            </div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/46">Depoimento principal</p>
            <h2 className="mt-4 max-w-[12ch] text-[2.15rem] font-black uppercase leading-[0.92] tracking-[-0.06em] text-white sm:text-[3.2rem] lg:text-[3.3rem]">
              Validação de quem conhece a realidade da tropa.
            </h2>
            <blockquote className="mt-8 max-w-[42rem]">
              <p className="text-[1.18rem] leading-[1.85] text-white sm:text-[1.35rem] lg:text-[1.5rem]">
                &quot;{featuredTestimonial.text}&quot;
              </p>
            </blockquote>
            <div className="mt-8 border-l-2 border-primary/70 pl-4 sm:pl-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">{featuredTestimonial.category}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/64 sm:text-[0.95rem]">{featuredTestimonial.signature}</p>
            </div>
          </article>

          <aside data-reveal style={revealDelayStyle(80)} className="border-y border-white/10 py-8 sm:py-10">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Depoimentos de apoio</p>
              <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-white/62">
                Três vozes reforçando resultado, confiança e representação.
              </p>
            </div>
            <div className="mt-6 space-y-6">
              {supportingTestimonials.map((item, index) => (
                <article
                  key={item.signature}
                  data-reveal
                  style={revealDelayStyle(120 + index * 50)}
                  className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm leading-none text-primary/90">{item.symbol}</span>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/90">{item.category}</p>
                  </div>
                  <p className="mt-3 text-[1rem] leading-relaxed text-white/86">&quot;{item.text}&quot;</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-white/48">{item.signature}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section id="videos" className="bg-[linear-gradient(180deg,rgba(8,15,25,0.26),rgba(6,12,22,0.12))] px-4 py-20 sm:px-0 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          <div>
            <div className="section-heading">
              <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Mídia de campanha</Badge>
              <h2 data-reveal style={revealDelayStyle(40)} className="mt-5 text-[2rem] font-black uppercase tracking-[-0.045em] text-foreground sm:text-[3.1rem] lg:text-[3.2rem]">Conteúdos para acompanhar e compartilhar.</h2>
              <p data-reveal style={revealDelayStyle(80)} className={`max-w-[42rem] ${SECTION_TEXT_CLASS}`}>Os vídeos curtos concentram recados diretos. Os conteúdos completos aprofundam propostas, prioridades e visão de mandato.</p>
            </div>
            <div className="mt-6 space-y-8 sm:mt-9">
              <article data-reveal style={revealDelayStyle(120)} className={`border border-primary/14 px-4 py-7 sm:px-6 sm:py-8 ${SURFACE_CLASS}`}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{shorts[0].tag}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">Vídeo em destaque</span>
                </div>
                <p className="mt-4 max-w-[26rem] text-[1.52rem] font-black uppercase leading-[1.02] tracking-[-0.05em] text-white sm:text-[1.86rem]">{shorts[0].title}</p>
                <a
                  href={resolveVideoHref(shorts[0].embedUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 block w-full max-w-[21rem] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_54px_rgba(0,0,0,0.24)] ring-1 ring-white/6 transition-transform duration-300 hover:scale-[1.01] sm:mt-7"
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden">
                    <div className={`absolute inset-0 ${videoCardBackground(shorts[0].type)}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.02),rgba(4,8,16,0.18)_44%,rgba(4,8,16,0.78)_100%)]" />
                    <div aria-hidden className="absolute inset-y-6 left-5 w-px bg-[linear-gradient(180deg,rgba(255,223,0,0.48),rgba(255,255,255,0.06),transparent)]" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                      <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                      {shorts[0].platform}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/52">{shorts[0].tag}</p>
                      <p className="mt-3 max-w-[14rem] text-[1.2rem] font-black uppercase leading-[1.04] tracking-[-0.04em] text-white sm:text-[1.45rem]">
                        {shorts[0].title}
                      </p>
                    </div>
                    <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.06)] text-white transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/45 group-hover:text-primary">
                      <span className="ml-0.5 text-lg">&#9654;</span>
                    </div>
                  </div>
                </a>
              </article>
              <div className="grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-2 md:gap-7">
                {shorts.slice(1).map((short, index) => (
                  <article key={short.embedUrl} data-reveal style={revealDelayStyle(160 + index * 50)} className="grid gap-4">
                    <a
                      href={resolveVideoHref(short.embedUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="group block"
                    >
                      <div className="relative mx-auto aspect-[9/16] w-full max-w-[15rem] overflow-hidden rounded-2xl border border-white/8 shadow-[0_18px_34px_rgba(0,0,0,0.16)] ring-1 ring-white/5 transition-transform duration-300 group-hover:scale-[1.02]">
                        <div className={`absolute inset-0 ${videoCardBackground(short.type)}`} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.04),rgba(4,8,16,0.18)_44%,rgba(4,8,16,0.72)_100%)]" />
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                          <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                          {short.platform}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48">{short.tag}</p>
                          <p className="mt-2 max-w-[11rem] text-[0.92rem] font-black uppercase leading-[1.08] tracking-[-0.03em] text-white">
                            {short.title}
                          </p>
                        </div>
                        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.06)] text-white transition-transform duration-300 group-hover:scale-105 group-hover:border-primary/45 group-hover:text-primary">
                          <span className="ml-0.5 text-base">&#9654;</span>
                        </div>
                      </div>
                    </a>
                    <div className="pt-1 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">{short.tag}</p>
                      <p className="mt-3 text-[1rem] font-semibold leading-relaxed text-white">{short.title}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 pt-1 lg:pl-1">
            <div data-reveal className="border-b border-white/10 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Vídeos completos</p>
              <p className="mt-3 max-w-[22rem] text-sm leading-relaxed text-white/66">Conteúdos para aprofundar posicionamentos, propostas e visão pública de campanha.</p>
            </div>
            {longVideos.map((video, index) => (
              <a key={video.youtubeUrl} data-reveal style={revealDelayStyle(120 + index * 60)} href={video.youtubeUrl} target="_blank" rel="noreferrer" className="group block border-b border-white/10 py-6 transition-colors duration-300">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">Conteúdo de campanha</p>
                      <span className="inline-flex rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary/90">{video.platform}</span>
                    </div>
                    <p className="mt-3 max-w-[24rem] text-[1.16rem] font-black uppercase leading-[1.14] tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-primary sm:text-[1.34rem]">{video.title}</p>
                  </div>
                  <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.05)] text-lg text-white/84 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/45 group-hover:bg-primary/8 group-hover:text-primary">&#9654;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section id="apoie" className="bg-[radial-gradient(circle_at_16%_20%,rgba(27,151,88,0.1),transparent_28%),linear-gradient(180deg,rgba(24,39,62,0.56),rgba(14,24,39,0.46)_58%,rgba(10,18,30,0.34))] py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14">
          <div data-reveal className="space-y-8">
            <Badge className="border-[rgba(255,223,0,0.22)] bg-[rgba(255,223,0,0.08)] px-4 py-2 text-white">Mobilização 2026</Badge>
            <div className="space-y-5">
              <h2 className="max-w-[12ch] text-[2.45rem] font-black uppercase leading-[0.92] tracking-[-0.05em] text-foreground sm:text-[3.45rem] lg:text-[3.65rem]">Entre em campo e fortaleça a campanha.</h2>
              <p className="max-w-[36rem] text-[1.02rem] leading-[1.82] text-white/72 sm:text-[1.08rem]">Sua participação ajuda a ampliar presença, mobilização e alcance político em Goiás. Cadastre-se para receber agenda, materiais oficiais e orientação direta da equipe de campanha.</p>
            </div>
            <div className={`${SURFACE_SUBTLE_CLASS} border-primary/18 px-5 py-5 sm:px-6 sm:py-6`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Ação imediata</p>
              <p className="mt-3 max-w-[24rem] text-[1.2rem] font-black uppercase leading-[1.08] tracking-[-0.035em] text-white sm:text-[1.45rem]">Quem se mobiliza agora ajuda a dar escala, rua e voz a essa campanha.</p>
            </div>
            <div className="space-y-4 border-l-4 border-primary pl-5">
              {SUPPORT_REASONS.map((reason, index) => (
                <p key={reason} data-reveal style={revealDelayStyle(60 + index * 40)} className="text-sm leading-[1.8] text-white/82 sm:text-base">{reason}</p>
              ))}
            </div>
            <div data-reveal style={revealDelayStyle(180)} className="border-t border-white/10 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/90">Canal direto</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-[1.05rem] font-black uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:text-primary">Falar com a equipe no WhatsApp</a>
            </div>
          </div>
          <div data-reveal style={revealDelayStyle(100)} className={`${SURFACE_CLASS} border-primary/18 px-5 py-6 sm:px-7 sm:py-8`}>
            <div className="mb-8 grid gap-4 border-b border-white/10 pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Cadastro oficial</p>
                <h3 className="mt-3 text-[2.1rem] font-black uppercase tracking-[-0.05em] text-foreground sm:text-[2.7rem]">Fortaleça a campanha</h3>
              </div>
              <p className="max-w-[21rem] text-sm leading-[1.78] text-white/72 sm:text-right sm:text-base">Preencha seus dados para receber convocações, agenda e materiais da campanha diretamente da equipe oficial.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div><label htmlFor="nome" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/66">Nome</label><input id="nome" name="nome" value={formData.nome} onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))} className="w-full border-0 border-b border-white/18 bg-transparent px-0 py-4 text-sm text-foreground outline-none placeholder:text-white/26 transition-colors duration-300 focus:border-primary" placeholder="Seu nome completo" />{errors.nome ? <p className="mt-1 text-xs text-red-300">{errors.nome}</p> : null}</div>
              <div><label htmlFor="whatsapp" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/66">WhatsApp</label><input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={(event) => setFormData((prev) => ({ ...prev, whatsapp: event.target.value }))} className="w-full border-0 border-b border-white/18 bg-transparent px-0 py-4 text-sm text-foreground outline-none placeholder:text-white/26 transition-colors duration-300 focus:border-primary" placeholder="(62) 99999-9999" />{errors.whatsapp ? <p className="mt-1 text-xs text-red-300">{errors.whatsapp}</p> : null}</div>
              <div><label htmlFor="cidade" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/66">Cidade</label><input id="cidade" name="cidade" value={formData.cidade} onChange={(event) => setFormData((prev) => ({ ...prev, cidade: event.target.value }))} className="w-full border-0 border-b border-white/18 bg-transparent px-0 py-4 text-sm text-foreground outline-none placeholder:text-white/26 transition-colors duration-300 focus:border-primary" placeholder="Sua cidade" />{errors.cidade ? <p className="mt-1 text-xs text-red-300">{errors.cidade}</p> : null}</div>
              <Button type="submit" className={`${HOMEPAGE_PRIMARY_CTA_CLASS} w-full px-7 py-4.35 text-[11px] font-black uppercase tracking-[0.26em]`}>Quero participar</Button>
              {feedback ? <p role="status" aria-live="polite" className={`px-4 py-3 text-sm ${feedback.type === "success" ? "bg-primary/14 text-primary" : "bg-red-500/14 text-red-200"}`}>{feedback.message}</p> : null}
            </form>
          </div>
        </div>
      </Section>
      <Section id="faq" className="bg-[linear-gradient(180deg,rgba(5,10,18,0.1),rgba(5,10,18,0.02))] pt-18 pb-10 sm:pt-20 md:pb-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 xl:gap-12">
          <div className="section-heading lg:max-w-[39rem]">
            <Badge data-reveal className="border-[rgba(255,223,0,0.18)] bg-transparent px-4 py-2 text-white">Perguntas frequentes</Badge>
            <h2 data-reveal style={revealDelayStyle(40)} className="mt-5 max-w-[14.2ch] text-[2rem] font-black uppercase leading-[0.95] tracking-[-0.045em] text-foreground sm:max-w-[15.5ch] sm:text-[3rem] sm:leading-[0.94] lg:max-w-[17.8ch] lg:text-[3.15rem] lg:leading-[0.92]">Informações diretas para quem quer acompanhar e apoiar.</h2>
          </div>
          <div className="space-y-0 border-t border-white/10 lg:max-w-[42rem] lg:justify-self-end">
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


