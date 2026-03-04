"use client";

import { CSSProperties, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { revealDelayStyle, useScrollReveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import CinematicBackground from "@/components/ui/CinematicBackground";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Section } from "@/components/ui/Section";

type FormData = {
  nome: string;
  whatsapp: string;
  cidade: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

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
  subtitle: "Sem rodeio: posição firme, experiência real e compromisso com Goiás.",
  youtubeId: "bP133Tsw-Zc",
};

const shorts: Array<{ title: string; youtubeId: string; tag: string }> = [
  {
    title: "Recado direto sobre segurança nas ruas.",
    youtubeId: "ED_POXa7vo0",
    tag: "Segurança",
  },
  {
    title: "Valorização policial sem enrolação.",
    youtubeId: "short-placeholder-2",
    tag: "Categoria",
  },
  {
    title: "Família e ordem: compromisso de mandato.",
    youtubeId: "short-placeholder-3",
    tag: "Valores",
  },
];

const longVideos: Array<{ title: string; youtubeUrl: string }> = [
  {
    title: "Entrevista completa: prioridades para Brasília.",
    youtubeUrl: "https://www.youtube.com/watch?v=video-placeholder-1",
  },
  {
    title: "Propostas para segurança pública em profundidade.",
    youtubeUrl: "https://www.youtube.com/watch?v=video-placeholder-2",
  },
  {
    title: "Defesa da categoria policial: plano de ação.",
    youtubeUrl: "https://www.youtube.com/watch?v=video-placeholder-3",
  },
];

type StatItem = {
  value: number;
  label: string;
  suffix?: string;
  format?: "compactThousandsPt" | "plain";
};

const STATS: StatItem[] = [
  { value: 18, label: "PROJETOS EM DEFESA DO CIDADÃO", format: "plain" },
  { value: 64, label: "AUDIÊNCIAS E REUNIÕES EM BRASÍLIA", format: "plain" },
  { value: 82, label: "BAIRROS VISITADOS", suffix: "+", format: "plain" },
  { value: 240, label: "DEMANDAS ENCAMINHADAS", suffix: "+", format: "plain" },
];

function formatStatValue(value: number, stat: StatItem): string {
  if (stat.format === "compactThousandsPt") {
    return value.toLocaleString("pt-BR");
  }
  return `${value}`;
}

function StatsCounters() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasStartedRef = useRef(false);
  const rafIdsRef = useRef<number[]>([]);
  const startTimeoutIdsRef = useRef<number[]>([]);
  const bounceTimeoutIdsRef = useRef<number[]>([]);
  const [start, setStart] = useState(false);
  const [currentValues, setCurrentValues] = useState<number[]>(() => STATS.map(() => 0));
  const [isBouncing, setIsBouncing] = useState<boolean[]>(() => STATS.map(() => false));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    onChange();
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStartedRef.current) {
            return;
          }
          hasStartedRef.current = true;
          if (prefersReducedMotion) {
            setCurrentValues(STATS.map((stat) => stat.value));
          } else {
            setStart(true);
          }
          observer.disconnect();
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!start) {
      return;
    }

    const duration = 1100;
    const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

    const animateStat = (index: number) => {
      const startedAt = performance.now();
      let didBounce = false;

      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);

        setCurrentValues((prev) => {
          const next = [...prev];
          next[index] = Math.round(STATS[index].value * eased);
          return next;
        });

        if (!didBounce && progress >= 0.9) {
          didBounce = true;
          setIsBouncing((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });

          const bounceTimeout = window.setTimeout(() => {
            setIsBouncing((prev) => {
              const next = [...prev];
              next[index] = false;
              return next;
            });
          }, 120);
          bounceTimeoutIdsRef.current.push(bounceTimeout);
        }

        if (progress < 1) {
          const rafId = window.requestAnimationFrame(tick);
          rafIdsRef.current.push(rafId);
        } else {
          setCurrentValues((prev) => {
            const next = [...prev];
            next[index] = STATS[index].value;
            return next;
          });
        }
      };

      const rafId = window.requestAnimationFrame(tick);
      rafIdsRef.current.push(rafId);
    };

    STATS.forEach((_, index) => {
      const timeoutId = window.setTimeout(() => animateStat(index), index * 140);
      startTimeoutIdsRef.current.push(timeoutId);
    });

    return () => {
      startTimeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
      bounceTimeoutIdsRef.current.forEach((id) => window.clearTimeout(id));
      rafIdsRef.current.forEach((id) => window.cancelAnimationFrame(id));
      startTimeoutIdsRef.current = [];
      bounceTimeoutIdsRef.current = [];
      rafIdsRef.current = [];
    };
  }, [start]);

  return (
    <Section className="border-b border-border bg-transparent py-12 md:py-16">
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
        <GlassCard
          ref={sectionRef}
          data-reveal
          className="overflow-hidden rounded-3xl p-6 md:p-8"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">TEMAS E COMPROMISSOS</h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Números que refletem presença, trabalho e prioridades para Brasília.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                style={revealDelayStyle(index * 80)}
                className={`rounded-2xl border border-[var(--stroke)] bg-white/[0.03] p-4 text-center transition-transform duration-300 hover:-translate-y-0.5 hover:border-[rgba(255,223,0,0.3)] hover:shadow-[0_0_40px_rgba(13,124,53,0.12)] md:rounded-none md:border-y-0 md:border-r-0 md:px-6 md:py-4 ${
                  index > 0 ? "md:border-l md:border-border-strong" : "md:border-transparent"
                }`}
              >
                <p
                  className={`text-4xl font-black tracking-tight text-foreground drop-shadow-[0_0_18px_rgba(13,124,53,0.35)] transition-transform duration-[120ms] md:text-5xl ${
                    isBouncing[index] ? "scale-[1.03]" : "scale-100"
                  }`}
                >
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 blur-xl opacity-30"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(13,124,53,0.45), transparent 70%)",
                      }}
                    />
                    {formatStatValue(currentValues[index] ?? 0, stat)}
                    {stat.suffix ? <span>{stat.suffix}</span> : null}
                  </span>
                </p>
                <p className="mt-2 text-xs font-bold tracking-[0.16em] text-primary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number | null>(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const leavingTimeoutRef = useRef<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    cidade: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const testimonials = useMemo(
    () => [
      "Sérgio conhece a rua, enfrenta o crime e não foge do debate quando o assunto é segurança.",
      "A tropa precisa de voz firme em Brasília. Sérgio tem história, postura e coragem para representar.",
      "Chega de promessa vazia. Queremos alguém que defenda polícia valorizada e lei sendo cumprida.",
    ],
    [],
  );

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
    if (!heroElement) {
      return;
    }

    heroElement.style.setProperty("--mx", "50%");
    heroElement.style.setProperty("--my", "50%");
    heroElement.style.setProperty("--px", "0px");
    heroElement.style.setProperty("--py", "0px");

    if (isCoarsePointer || prefersReducedMotion) {
      return;
    }

    const flushMousePosition = () => {
      rafRef.current = null;
      const { x, y } = mouseRef.current;
      heroElement.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      heroElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
      heroElement.style.setProperty("--px", `${((x - 0.5) * 8).toFixed(2)}px`);
      heroElement.style.setProperty("--py", `${((y - 0.5) * 6).toFixed(2)}px`);
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = heroElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      mouseRef.current = { x, y };
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(flushMousePosition);
      }
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: 0.5, y: 0.5 };
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(flushMousePosition);
      }
    };

    heroElement.addEventListener("mousemove", onMouseMove);
    heroElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      heroElement.removeEventListener("mousemove", onMouseMove);
      heroElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isCoarsePointer, prefersReducedMotion]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % HERO_IMAGES.length;
        setLeavingIndex(prev);

        if (leavingTimeoutRef.current !== null) {
          window.clearTimeout(leavingTimeoutRef.current);
        }

        leavingTimeoutRef.current = window.setTimeout(() => {
          setLeavingIndex(null);
          leavingTimeoutRef.current = null;
        }, HERO_FADE_MS);

        return next;
      });
    }, HERO_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      if (leavingTimeoutRef.current !== null) {
        window.clearTimeout(leavingTimeoutRef.current);
        leavingTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function validate(values: FormData): FormErrors {
    const nextErrors: FormErrors = {};

    if (values.nome.trim().length < 3) {
      nextErrors.nome = "Informe um nome válido.";
    }

    if (!/^\+?[0-9()\s-]{10,}$/.test(values.whatsapp.trim())) {
      nextErrors.whatsapp = "Informe um WhatsApp válido com DDD.";
    }

    if (values.cidade.trim().length < 2) {
      nextErrors.cidade = "Informe sua cidade.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback({
        type: "error",
        message: "Revise os campos e tente novamente.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message: "Cadastro recebido. Em breve entraremos em contato.",
    });

    setFormData({ nome: "", whatsapp: "", cidade: "" });
  }

  return (
    <CinematicBackground>
      <main className="relative z-10 min-h-screen overflow-hidden text-foreground">
      <header
        className={`sticky top-0 z-40 border-b border-border backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "bg-background/75 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
            : "bg-background/55"
        }`}
      >
        <Container className="h-14 md:h-16">
          <div className="flex h-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Logo oficial Subtenente Sérgio"
                className="h-11 w-auto shrink-0 rounded-md bg-white px-1 py-0.5 md:h-12"
              />
              <div className="hidden min-w-0 sm:block">
                <p className="truncate text-sm font-bold text-foreground">Subtenente Sérgio</p>
                <p className="text-xs text-subtle-foreground">Campanha 2026</p>
              </div>
            </div>

            <nav className="hidden items-center gap-2 lg:flex">
              <a
                href="#bandeiras"
                className="rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all duration-200 hover:bg-card hover:text-foreground"
              >
                Bandeiras
              </a>
              <a
                href="#apoie"
                className="rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all duration-200 hover:bg-card hover:text-foreground"
              >
                Apoie
              </a>
              <a
                href="#faq"
                className="rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground transition-all duration-200 hover:bg-card hover:text-foreground"
              >
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#bandeiras"
                className="rounded-full border border-border-strong px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground transition-colors duration-200 hover:bg-card-strong lg:hidden"
              >
                Menu
              </a>
              <a
                href={WHATSAPP_LINK}
                className={buttonStyles(
                  "primary",
                  "px-4 py-2 text-xs shadow-[0_10px_24px_rgba(255,223,0,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(255,223,0,0.34)] sm:text-sm",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </header>

      <Section
        ref={heroRef}
        className="relative overflow-hidden border-b border-border !py-0 min-h-[70vh] md:min-h-[78vh]"
        style={{ "--mx": "50%", "--my": "50%", "--px": "0px", "--py": "0px" } as CSSProperties}
      >
        <div
          className="absolute inset-0 z-0"
          style={
            isCoarsePointer || prefersReducedMotion
              ? undefined
              : { transform: "translate3d(var(--px), var(--py), 0)", transition: "transform 120ms linear" }
          }
        >
          {HERO_IMAGES.map((src, index) => {
            const isActive = index === activeIndex;
            const isLeaving = index === leavingIndex;
            const zoomClass =
              isActive || isLeaving ? "animate-[cinematicZoom_10s_ease-in-out_forwards]" : "";

            return (
              <Image
                key={src}
                src={src}
                alt="Foto oficial do Subtenente Sérgio"
                fill
                sizes="100vw"
                priority={index === 0}
                className={`
                  absolute inset-0 object-cover
                  [object-position:65%_30%]
                  transition-opacity ease-in-out
                  transform-gpu backface-hidden will-change-[opacity,transform] [transform-origin:center]
                  ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}
                  ${zoomClass}
                `}
                style={{ transitionDuration: `${HERO_FADE_MS}ms` }}
              />
            );
          })}
        </div>

        <div aria-hidden className="hero-mouse-glow pointer-events-none absolute inset-0 z-[9]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overlay-breathe">
          <div className="hero-moving-light absolute inset-y-0 left-[-35%] w-[65%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 14% 12%, rgba(255, 223, 0, 0.07), transparent 42%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[520px] md:h-[640px]"
            style={{
              background:
                "radial-gradient(120% 70% at 50% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0) 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[320px] md:h-[420px]"
            style={{
              background:
                "linear-gradient(to top, rgba(7,8,10,1) 0%, rgba(7,8,10,0.97) 20%, rgba(7,8,10,0.75) 45%, rgba(7,8,10,0.35) 70%, rgba(255,223,0,0.05) 82%, rgba(7,8,10,0) 100%)",
            }}
          />
        </div>

        <div className="absolute right-4 top-4 z-20 seal-reveal md:right-6 md:top-6">
          <GlassCard className="w-[180px] p-3 sm:w-[220px] sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              FOTO OFICIAL
            </p>
            <p className="mt-1 text-sm font-extrabold text-foreground sm:text-base">Subtenente Sérgio</p>
            <div className="mt-2 h-[2px] w-14 bg-primary" />
            <p className="mt-2 text-[11px] font-medium text-muted-foreground sm:text-xs">Campanha 2026</p>
          </GlassCard>
        </div>

        <div className="relative z-20 flex min-h-[70vh] items-end py-14 md:min-h-[78vh] md:py-20">
          <div className="hero-content-reveal max-w-[42rem] space-y-7 md:space-y-8 lg:max-w-[45rem]">
            <Badge className="border-[var(--stroke)] bg-accent-soft text-foreground">CAMPANHA 2026</Badge>
            <h1
              className="text-[38px] font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-[64px] md:tracking-[-0.02em]"
              style={{ textShadow: "0 10px 36px rgba(0,0,0,0.68)" }}
            >
              GOIÁS SEGURO
              <br />
              COM VOZ FIRME EM
              <br />
              <span className="text-accent">BRASÍLIA</span>.
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Experiência real de rua e compromisso com quem protege as famílias goianas.
            </p>
            <div className="h-[3px] w-64 rounded-full bg-[linear-gradient(90deg,rgba(255,223,0,0.95),rgba(13,124,53,0.55),rgba(0,39,118,0.35),transparent)]" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("primary", "w-full px-7 py-3.5 text-sm sm:w-auto")}
              >
                Falar no WhatsApp
              </a>
              <a
                href="#apoie"
                className={buttonStyles(
                  "secondary",
                  "w-full border-border-strong bg-transparent px-7 py-3.5 text-sm hover:bg-card sm:w-auto",
                )}
              >
                Apoiar a campanha
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section id="bandeiras" className="border-b border-border bg-transparent">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <h2 data-reveal className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Bandeiras
          </h2>
          <p data-reveal style={revealDelayStyle(80)} className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Prioridades para uma representação firme, técnica e conectada com quem vive a realidade da segurança.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <GlassCard data-reveal style={revealDelayStyle(0)}>
              <h3 className="text-xl font-bold text-foreground">Segurança</h3>
              <p className="mt-3 text-sm text-muted-foreground">Combate firme ao crime. Tolerância zero com a impunidade.</p>
            </GlassCard>
            <GlassCard data-reveal style={revealDelayStyle(80)}>
              <h3 className="text-xl font-bold text-foreground">Valorização</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Respeito, estrutura e reconhecimento para quem protege a sociedade.
              </p>
            </GlassCard>
            <GlassCard data-reveal style={revealDelayStyle(160)}>
              <h3 className="text-xl font-bold text-foreground">Família</h3>
              <p className="mt-3 text-sm text-muted-foreground">Defesa da família, da educação com valores e da ordem social.</p>
            </GlassCard>
            <GlassCard data-reveal style={revealDelayStyle(240)}>
              <h3 className="text-xl font-bold text-foreground">Ordem</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Autoridade, disciplina e compromisso com a lei. O Brasil precisa de direção.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      <StatsCounters />

      <Section className="border-b border-border bg-transparent pt-12 md:pt-16">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <div className="space-y-4">
            <h2 data-reveal className="text-3xl font-extrabold text-foreground sm:text-4xl">
              {featuredVideo.title}
            </h2>
            <p data-reveal style={revealDelayStyle(80)} className="max-w-2xl text-lg text-muted-foreground">
              {featuredVideo.subtitle}
            </p>
          </div>
          <GlassCard
            data-reveal
            style={revealDelayStyle(120)}
            className="mx-auto mt-8 w-full max-w-[1280px] overflow-hidden p-3 shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
          >
            <p className="mb-3 px-1 text-lg font-bold text-foreground">Vídeo em destaque</p>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </GlassCard>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("primary", "px-7 py-3.5")}
            >
              Falar no WhatsApp
            </a>
            <a href="#apoie" className={buttonStyles("secondary", "px-7 py-3.5")}>
              Quero apoiar
            </a>
          </div>
        </div>
      </Section>

      <Section className="border-b border-border bg-transparent">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <h2 data-reveal className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Prova social
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Card key={item} data-reveal style={revealDelayStyle(index * 80)}>
                <p className="text-base leading-relaxed text-muted-foreground">&quot;{item}&quot;</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">Apoiador(a)</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-border bg-transparent">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <h2 data-reveal className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Vídeos
          </h2>
          <div className="mt-10 grid gap-12">
            <div>
              <h3 data-reveal style={revealDelayStyle(40)} className="text-2xl font-bold text-foreground">
                Curtos (Reels/Shorts)
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shorts.map((short, index) => (
                  <div
                    key={short.youtubeId}
                    data-reveal
                    style={revealDelayStyle(index * 70)}
                    className="group block rounded-2xl border border-border bg-card p-3 shadow-[0_14px_34px_rgba(0,0,0,0.42)] transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_20px_46px_rgba(255,223,0,0.14)]"
                  >
                    <div className="relative w-full aspect-[9/16] overflow-hidden rounded-xl border border-border-strong bg-linear-to-b from-card-strong to-background p-4">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(155deg,rgba(255,255,255,0.08)_0%,transparent_55%)]"
                      />
                      <span className="rounded-full border border-border-strong bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                        {short.tag}
                      </span>
                      <div className="mt-3 h-[calc(100%-3rem)] overflow-hidden rounded-lg border border-border bg-black">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${short.youtubeId}`}
                          title={short.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black/90 via-black/45 to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-foreground">{short.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 data-reveal style={revealDelayStyle(60)} className="text-2xl font-bold text-foreground">
                Vídeos completos
              </h3>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {longVideos.map((video, index) => (
                  <a
                    key={video.youtubeUrl}
                    data-reveal
                    style={revealDelayStyle(index * 70)}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-border bg-card p-3 shadow-[0_14px_34px_rgba(0,0,0,0.42)] transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_20px_46px_rgba(255,223,0,0.14)]"
                  >
                    <div className="relative aspect-video rounded-xl border border-border-strong bg-linear-to-b from-card-strong to-background p-4">
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(155deg,rgba(255,255,255,0.08)_0%,transparent_55%)]"
                      />
                      <div className="flex h-full items-center justify-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg text-black">
                          &#9654;
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                      {video.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="apoie" className="border-b border-border bg-transparent">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <div className="grid gap-10 md:grid-cols-2">
            <div data-reveal>
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Cadastro de apoiadores</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Preencha seus dados para receber materiais, agenda e formas de participar da campanha.
              </p>
            </div>
            <GlassCard data-reveal style={revealDelayStyle(100)} className="bg-white/[0.07]">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="nome" className="mb-1 block text-sm font-semibold text-foreground">
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, nome: event.target.value }))
                  }
                  className="w-full rounded-lg border border-border-strong bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground0 transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome"
                />
                {errors.nome ? <p className="mt-1 text-xs text-red-400">{errors.nome}</p> : null}
              </div>
              <div>
                <label htmlFor="whatsapp" className="mb-1 block text-sm font-semibold text-foreground">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      whatsapp: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-border-strong bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground0 transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
                  placeholder="(62) XXXXX-XXXX"
                />
                {errors.whatsapp ? <p className="mt-1 text-xs text-red-400">{errors.whatsapp}</p> : null}
              </div>
              <div>
                <label htmlFor="cidade" className="mb-1 block text-sm font-semibold text-foreground">
                  Cidade
                </label>
                <input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, cidade: event.target.value }))
                  }
                  className="w-full rounded-lg border border-border-strong bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-foreground0 transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary"
                  placeholder="Sua cidade"
                />
                {errors.cidade ? <p className="mt-1 text-xs text-red-400">{errors.cidade}</p> : null}
              </div>
              <Button type="submit" className="w-full px-7 py-3.5">
                Cadastrar apoio
              </Button>
              {feedback ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={`rounded-md px-3 py-2 text-sm ${
                    feedback.type === "success"
                      ? "bg-primary/15 text-primary"
                      : "bg-red-500/15 text-red-300"
                  }`}
                >
                  {feedback.message}
                </p>
              ) : null}
              </form>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Section id="faq" className="bg-transparent">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <h2 data-reveal className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Perguntas frequentes
          </h2>
          <div className="mt-10 space-y-4">
            {[
            {
              q: "Quais são as prioridades do mandato?",
              a: "Segurança pública, valorização policial, família e ordem social.",
            },
            {
              q: "Como posso apoiar a campanha?",
              a: "Com cadastro no formulário, compartilhamento dos materiais e mobilização local.",
            },
            {
              q: "Existe agenda presencial?",
              a: "Sim, com divulgação contínua no Instagram oficial e nos canais da equipe.",
            },
            {
              q: "Como enviar demandas da categoria?",
              a: "Pelo WhatsApp oficial e pelos canais de atendimento da campanha.",
            },
            {
              q: "Onde acompanho notícias e posicionamentos?",
              a: "No Instagram oficial e nas publicações semanais da campanha.",
            },
            ].map((item, index) => (
              <details
                key={item.q}
                data-reveal
                style={revealDelayStyle(index * 50)}
                className="faq-item rounded-xl border border-[var(--stroke)] bg-[var(--glass)] p-5 backdrop-blur-lg"
              >
                <summary className="cursor-pointer text-lg font-semibold text-foreground transition-colors duration-300 hover:text-primary">
                  {item.q}
                </summary>
                <div className="faq-content">
                  <div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <footer className="border-t border-border bg-transparent text-foreground">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(10,11,13,0.55)]" />
          <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">Subtenente Sérgio | Presidente da ASSEGO</p>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-primary"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-primary"
              >
                Instagram
              </a>
            </div>
          </Container>
          <Container className="pb-8">
            <p className="text-xs text-subtle-foreground">
              Aviso LGPD: seus dados serão usados apenas para comunicação da campanha.
            </p>
          </Container>
        </div>
      </footer>
      </main>
    </CinematicBackground>
  );
}

