"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type FormData = { nome: string; whatsapp: string; cidade: string };
type FormErrors = Partial<Record<keyof FormData, string>>;
type TrajectoryItem = {
  title: string;
  label: string;
  subtitle: string;
  description: string;
  alt: string;
  imageSrc?: string;
  iconSrc?: string;
  objectPosition?: string;
};

const WHATSAPP_LINK = "https://wa.me/5562995073952";
const INSTAGRAM_LINK = "https://instagram.com/subtenentesergio";
const OFFICIAL_LOGO_SRC = "/images/logo-sergio-oficial.png";
const OFFICIAL_LOGO_WIDTH = 2000;
const OFFICIAL_LOGO_HEIGHT = 1263;

const stats = [
  { value: 18, label: "Projetos em defesa do cidadao" },
  { value: 64, label: "Audiencias e reunioes em Brasilia" },
  { value: 82, label: "Bairros visitados", suffix: "+" },
  { value: 240, label: "Demandas encaminhadas", suffix: "+" },
];

const priorities = [
  {
    title: "Seguranca",
    text: "Combate firme ao crime, inteligencia operacional e defesa objetiva de quem vive sob pressao nas ruas.",
  },
  {
    title: "Valorizacao",
    text: "Respeito, estrutura e reconhecimento para os profissionais que sustentam a seguranca publica com disciplina e coragem.",
  },
  {
    title: "Familia",
    text: "Protecao da familia, educacao com valores e politicas publicas que reforcem estabilidade social e responsabilidade coletiva.",
  },
  {
    title: "Ordem",
    text: "Autoridade responsavel, compromisso com a lei e direcao firme para devolver previsibilidade ao pais.",
  },
];

const TRAJECTORY_ITEMS: TrajectoryItem[] = [
  {
    title: "Conselheiro Tutelar",
    label: "Servico publico",
    subtitle: "Protecao direta a familia",
    description: "Atuacao de linha de frente, presenca institucional e defesa firme de quem mais precisa de amparo.",
    alt: "Subtenente Sergio como Conselheiro Tutelar",
    imageSrc: "/images/trajetoria/conselheiro-tutelar.jpg",
    iconSrc: "/images/placeholders/trajetoria-conselheiro.svg",
    objectPosition: "center 16%",
  },
  {
    title: "Presidente da ASSEGO",
    label: "Representacao",
    subtitle: "Lideranca de categoria",
    description: "Articulacao institucional, defesa organizada da classe e voz firme nos espacos de decisao.",
    alt: "Placeholder institucional para Presidente da ASSEGO",
    iconSrc: "/images/placeholders/trajetoria-assego.svg",
  },
  {
    title: "Igreja",
    label: "Comunidade",
    subtitle: "Base moral e presenca social",
    description: "Compromisso com valores, escuta da comunidade e servico proximo das pessoas.",
    alt: "Subtenente Sergio em atuacao na Igreja",
    imageSrc: "/images/trajetoria/igreja.jpg",
    iconSrc: "/images/placeholders/trajetoria-igreja.svg",
    objectPosition: "center 14%",
  },
  {
    title: "Vicentinos em Goias",
    label: "Acao social",
    subtitle: "Servico que chega na ponta",
    description: "Trabalho solidario com presenca concreta, responsabilidade publica e impacto social real em Goias.",
    alt: "Subtenente Sergio em atuacao com os Vicentinos em Goias",
    imageSrc: "/images/trajetoria/vicentinos-goias.jpg",
    iconSrc: "/images/placeholders/trajetoria-vicentinos.svg",
    objectPosition: "center 20%",
  },
];

const testimonials = [
  {
    category: "Militar",
    text: "Sergio conhece a realidade da tropa porque viveu cada etapa. Ele nao fala de gabinete — fala de quem ja patrulhou rua, ja perdeu colega e nunca desistiu da farda.",
    signature: "Sgt. PM — Regiao Metropolitana de Goiania",
  },
  {
    category: "Familia militar",
    text: "Quando meu marido precisou de apoio juridico, a ASSEGO sob a gestao do Sergio resolveu em dias o que outras entidades nao resolveram em meses. Ele cuida da familia do militar de verdade.",
    signature: "Esposa de PM — Aparecida de Goiania",
  },
  {
    category: "Militar",
    text: "A tropa precisa de voz firme em Brasilia. Sergio tem historia, postura e coragem para representar. Ele nao promete — ele entrega.",
    signature: "Subtenente BM — Norte de Goias",
  },
  {
    category: "Militar",
    text: "Vi a ASSEGO se transformar nesses ultimos anos. Mais estrutura, mais respeito, mais beneficios. Isso tem nome: Sergio. Nao e discurso, e resultado.",
    signature: "1º Sgt. PM — Jatai, GO",
  },
];

const shorts = [
  { title: "Deficit de Efetivo", embedUrl: "https://www.instagram.com/reel/DH4QH2PRKZt/embed", tag: "Seguranca" },
  { title: "Direito Militar", embedUrl: "https://www.instagram.com/reel/DGLLb2mR8S4/embed", tag: "Categoria" },
  { title: "Sergio Responde", embedUrl: "https://www.instagram.com/reel/DHTgH8IRhUR/embed", tag: "Valores" },
];

const featuredVideo = {
  title: "Realidade Salarial",
  subtitle: "Sem rodeios: posicao firme, experiencia real e compromisso com Goias.",
  embedUrl: "https://www.instagram.com/reel/DC4HFSORbv4/embed",
};

export default function HomepageCampaignV2() {
  const [formData, setFormData] = useState<FormData>({ nome: "", whatsapp: "", cidade: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    const values = { nome: formData.nome.trim(), whatsapp: formData.whatsapp.trim(), cidade: formData.cidade.trim() };
    if (values.nome.length < 3) nextErrors.nome = "Informe um nome valido.";
    if (!/^\+?[0-9()\s-]{10,}$/.test(values.whatsapp)) nextErrors.whatsapp = "Informe um WhatsApp valido com DDD.";
    if (values.cidade.length < 2) nextErrors.cidade = "Informe sua cidade.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ type: "error", message: "Revise os campos destacados para concluir o cadastro." });
      return;
    }
    setFeedback({ type: "success", message: "Cadastro recebido. Nossa equipe entrara em contato pelos canais oficiais." });
    setFormData({ nome: "", whatsapp: "", cidade: "" });
  };

  return (
    <main className="overflow-hidden bg-[linear-gradient(180deg,#02050b_0%,#081321_42%,#050912_100%)] text-white">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(3,7,13,0.62)] backdrop-blur-2xl">
        <Container className="py-3">
          <div className="flex items-center justify-between gap-6">
            <a href="#topo" className="flex items-center">
              <Image
                src={OFFICIAL_LOGO_SRC}
                alt="Logo oficial Subtenente Sergio"
                width={OFFICIAL_LOGO_WIDTH}
                height={OFFICIAL_LOGO_HEIGHT}
                sizes="(max-width: 640px) 118px, 160px"
                className="h-auto w-[7rem] object-contain sm:w-[8.5rem]"
              />
            </a>
            <nav className="hidden items-center gap-7 lg:flex">
              <a href="#prioridades" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66 transition-colors hover:text-white">Prioridades</a>
              <a href="#trajetoria" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66 transition-colors hover:text-white">Trajetoria</a>
              <a href="#conteudos" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66 transition-colors hover:text-white">Conteudos</a>
              <a href="#apoie" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66 transition-colors hover:text-white">Apoie</a>
            </nav>
            <a href="#apoie" className={buttonStyles("primary", "px-5 py-3 text-[10px] font-black uppercase tracking-[0.24em]")}>Quero apoiar</a>
          </div>
        </Container>
      </header>

      <section id="topo" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_16%,rgba(255,223,0,0.18),transparent_22%),radial-gradient(circle_at_18%_18%,rgba(27,151,88,0.11),transparent_18%),linear-gradient(180deg,rgba(10,18,31,0.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,8,15,0.96)_0%,rgba(4,8,15,0.88)_34%,rgba(4,8,15,0.36)_62%,rgba(4,8,15,0.76)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(3,7,13,0.96))]" />
        <Container className="relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 xl:gap-20">
            <div className="max-w-[40rem]">
              <Badge className="border-primary/25 bg-[rgba(255,223,0,0.08)] px-4 py-2 text-white">Campanha 2026 | Representacao com firmeza</Badge>
              <h1 className="mt-8 max-w-[10.5ch] text-[clamp(3.55rem,8vw,7.15rem)] font-black uppercase leading-[0.86] tracking-[-0.082em] text-white">
                GOIAS PRECISA DE VOZ FIRME, PRESENCA E AUTORIDADE.
              </h1>
              <p className="mt-7 max-w-[34rem] text-[1.06rem] leading-[1.88] text-white/74 sm:text-[1.16rem]">
                De engraxate no interior de Goias a presidente reeleito da maior entidade de pracas militares do estado. 28 anos de farda, fe e luta pelo que realmente vale a pena.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#apoie" className={buttonStyles("primary", "px-7.5 py-4 text-[11px] font-black uppercase tracking-[0.24em] shadow-[0_24px_44px_rgba(8,82,46,0.22)]")}>Quero apoiar</a>
                <a href="#trajetoria" className={buttonStyles("secondary", "px-7.5 py-4 text-[11px] font-black uppercase tracking-[0.24em] bg-[rgba(255,255,255,0.04)]")}>Ver trajetoria</a>
              </div>
            </div>
            <div className="relative lg:-mr-8 xl:-mr-10">
              <div className="absolute inset-x-[8%] top-[7%] h-[86%] rounded-[2.4rem] bg-primary/12 blur-3xl" />
              <div className="absolute -bottom-12 right-[8%] h-40 w-40 rounded-full bg-white/6 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] shadow-[0_38px_96px_rgba(0,0,0,0.34)] ring-1 ring-white/6">
                <div className="relative min-h-[26rem] sm:min-h-[35rem] lg:min-h-[43rem]">
                  <Image src="/images/foto-oficial.jpg" alt="Subtenente Sergio em retrato oficial" fill sizes="(max-width: 1024px) 100vw, 760px" className="object-cover [object-position:58%_10%]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,0.04),rgba(4,8,14,0.12)_34%,rgba(4,8,14,0.84)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 px-6 py-6 sm:px-8 sm:py-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Subtenente Sergio</p>
                    <p className="mt-3 max-w-[22rem] text-[1.56rem] font-black uppercase leading-[0.96] tracking-[-0.045em] text-white sm:text-[2.08rem]">
                      Experiencia real para representar com autoridade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative z-10 -mt-6 border-y border-white/8 bg-[radial-gradient(circle_at_50%_0%,rgba(255,223,0,0.16),transparent_30%),linear-gradient(180deg,rgba(20,33,52,0.98),rgba(10,17,28,0.99))] shadow-[0_20px_54px_rgba(0,0,0,0.22)] sm:-mt-8">
        <Container className="py-9 sm:py-11">
          <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`px-5 py-6 sm:px-6 sm:py-7 lg:px-8 ${index > 0 ? "sm:border-l sm:border-white/8" : ""}`}>
                <p className="text-[4.25rem] font-black leading-none tracking-[-0.12em] text-white sm:text-[5.2rem] lg:text-[5.8rem]">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} durationMs={1100} startDelayMs={index * 120} className="inline-block tabular-nums" />
                </p>
                <p className="mt-4 max-w-[15rem] text-sm leading-[1.72] text-white/70 sm:text-[0.98rem]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section id="prioridades" className="bg-transparent py-18 sm:py-22">
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-18">
          <div className="max-w-[24rem]">
            <Badge className="border-primary/20 bg-transparent px-4 py-2 text-white">Prioridades</Badge>
            <h2 className="mt-6 text-[2.2rem] font-black uppercase leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.2rem]">Direcao clara para a campanha.</h2>
          </div>
          <div className="space-y-6">
            {priorities.map((item) => (
              <article key={item.title} className="rounded-[1.25rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] px-5 py-5 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                <h3 className="text-[1.45rem] font-black uppercase tracking-[-0.04em] text-white sm:text-[1.75rem]">{item.title}</h3>
                <p className="mt-3 max-w-[42rem] text-[1rem] leading-[1.8] text-white/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="trajetoria" className="bg-[linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))] py-18 sm:py-22">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-18">
          <div className="max-w-[34rem]">
            <Badge className="border-primary/20 bg-transparent px-4 py-2 text-white">Trajetoria</Badge>
            <h2 className="mt-6 text-[2.2rem] font-black uppercase leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.2rem]">Uma vida publica construida no servico e na representacao.</h2>
            <p className="mt-6 text-[1rem] leading-[1.85] text-white/72 sm:text-[1.06rem]">
              Da protecao da familia a lideranca institucional, a trajetoria de Subtenente Sergio forma uma credencial politica baseada em presenca real, responsabilidade e defesa objetiva de Goias.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-[1.12fr_0.88fr]">
            <div className="relative min-h-[27rem] overflow-hidden rounded-[1.7rem] border border-white/8 shadow-[0_28px_72px_rgba(0,0,0,0.24)] ring-1 ring-white/5">
              <Image src="/images/trajetoria/vicentinos-goias.jpg" alt="Subtenente Sergio em atuacao com os Vicentinos em Goias" fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover [object-position:center_20%]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,14,0.04),rgba(4,8,14,0.74))]" />
              <div className="absolute inset-x-0 bottom-0 px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Credibilidade publica</p>
                <p className="mt-3 max-w-[17rem] text-[1.4rem] font-black uppercase leading-[0.98] tracking-[-0.04em] text-white sm:text-[1.75rem]">
                  Autoridade construida em campo, nao em discurso.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {[
                TRAJECTORY_ITEMS[0],
                TRAJECTORY_ITEMS[1],
                TRAJECTORY_ITEMS[3],
              ].map((item) => (
                <article key={item.title} className="rounded-[1.1rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] px-4 py-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{item.label}</p>
                  <h3 className="mt-3 text-[1.1rem] font-black uppercase tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-white/66">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-transparent py-18 sm:py-22">
        <div className="grid items-start gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-18">
          <div className="max-w-[24rem]">
            <Badge className="border-primary/20 bg-transparent px-4 py-2 text-white">Video principal</Badge>
            <h2 className="mt-6 text-[2.1rem] font-black uppercase leading-[0.96] tracking-[-0.05em] text-white sm:text-[3rem]">{featuredVideo.title}</h2>
            <p className="mt-5 text-[1rem] leading-[1.8] text-white/70">{featuredVideo.subtitle}</p>
            <a href="#apoie" className={`${buttonStyles("secondary", "mt-7 px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.24em]")}`}>Quero apoiar</a>
          </div>
          <div className="overflow-hidden rounded-[1.65rem] border border-white/8 bg-black shadow-[0_30px_72px_rgba(0,0,0,0.32)] ring-1 ring-white/5">
            <div className="aspect-video">
              <iframe className="h-full w-full" src={featuredVideo.embedUrl} title={featuredVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] py-18 sm:py-22">
        <div className="max-w-[58rem]">
          <Badge className="border-primary/20 bg-transparent px-4 py-2 text-white">Prova social</Badge>
          <h2 className="mt-6 text-[2.1rem] font-black uppercase leading-[0.96] tracking-[-0.05em] text-white sm:text-[3rem]">Validacao de quem conhece a realidade.</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <article key={item.signature} className="rounded-[1.2rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.012))] px-5 py-6">
              <p className="text-[1.08rem] leading-[1.82] text-white/86 sm:text-[1.16rem]">&quot;{item.text}&quot;</p>
              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{item.category}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/52">{item.signature}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="conteudos" className="bg-transparent py-18 sm:py-22">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[1.55rem] border border-white/8 bg-black shadow-[0_28px_62px_rgba(0,0,0,0.26)] ring-1 ring-white/5">
              <div className="aspect-[16/9]">
                <iframe className="h-full w-full" src={shorts[0].embedUrl} title={shorts[0].title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
            </div>
            <p className="max-w-[25rem] text-[1.3rem] font-black uppercase leading-[1.08] tracking-[-0.035em] text-white">{shorts[0].title}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {shorts.slice(1).map((short) => (
              <article key={short.embedUrl} className="space-y-4 rounded-[1.1rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] p-3">
                <div className="overflow-hidden rounded-[1rem] border border-white/8 bg-black">
                  <div className="aspect-video">
                    <iframe className="h-full w-full" src={short.embedUrl} title={short.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{short.tag}</p>
                  <p className="mt-3 text-[1rem] font-semibold leading-[1.7] text-white">{short.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="apoie" className="bg-[radial-gradient(circle_at_12%_16%,rgba(255,223,0,0.14),transparent_22%),linear-gradient(180deg,rgba(19,31,49,0.96),rgba(9,16,26,0.98))] py-18 sm:py-22">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-[30rem]">
            <Badge className="border-primary/20 bg-primary/10 px-4 py-2 text-white">Mobilizacao</Badge>
            <h2 className="mt-6 max-w-[11ch] text-[2.4rem] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-[3.4rem]">
              ENTRE EM CAMPO E FORTALECA A CAMPANHA
            </h2>
            <p className="mt-6 text-[1rem] leading-[1.82] text-white/74 sm:text-[1.08rem]">
              Sua participacao ajuda a ampliar presenca, mobilizacao e alcance politico em Goias. Cadastre-se para receber agenda, materiais oficiais e orientacao direta da equipe.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-5 py-6 shadow-[0_30px_70px_rgba(0,0,0,0.28)] ring-1 ring-white/5 sm:px-7 sm:py-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="nome-v2" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">Nome</label>
                <input id="nome-v2" name="nome" value={formData.nome} onChange={(event) => setFormData((prev) => ({ ...prev, nome: event.target.value }))} className="w-full border-0 border-b border-white/16 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/24 focus:border-primary" placeholder="Seu nome completo" />
                {errors.nome ? <p className="mt-1 text-xs text-red-300">{errors.nome}</p> : null}
              </div>
              <div>
                <label htmlFor="whatsapp-v2" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">WhatsApp</label>
                <input id="whatsapp-v2" name="whatsapp" value={formData.whatsapp} onChange={(event) => setFormData((prev) => ({ ...prev, whatsapp: event.target.value }))} className="w-full border-0 border-b border-white/16 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/24 focus:border-primary" placeholder="(62) 99999-9999" />
                {errors.whatsapp ? <p className="mt-1 text-xs text-red-300">{errors.whatsapp}</p> : null}
              </div>
              <div>
                <label htmlFor="cidade-v2" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/62">Cidade</label>
                <input id="cidade-v2" name="cidade" value={formData.cidade} onChange={(event) => setFormData((prev) => ({ ...prev, cidade: event.target.value }))} className="w-full border-0 border-b border-white/16 bg-transparent px-0 py-4 text-sm text-white outline-none placeholder:text-white/24 focus:border-primary" placeholder="Sua cidade" />
                {errors.cidade ? <p className="mt-1 text-xs text-red-300">{errors.cidade}</p> : null}
              </div>
              <Button type="submit" className="w-full px-7 py-4 text-[11px] font-black uppercase tracking-[0.26em] shadow-[0_20px_38px_rgba(255,223,0,0.16)]">Quero participar</Button>
              {feedback ? <p role="status" aria-live="polite" className={`px-4 py-3 text-sm ${feedback.type === "success" ? "bg-primary/14 text-primary" : "bg-red-500/14 text-red-200"}`}>{feedback.message}</p> : null}
            </form>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(6,10,18,0.98),rgba(4,8,14,0.98))]">
        <Container className="py-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[26rem]">
              <Image
                src={OFFICIAL_LOGO_SRC}
                alt="Logo oficial Subtenente Sergio"
                width={OFFICIAL_LOGO_WIDTH}
                height={OFFICIAL_LOGO_HEIGHT}
                sizes="(max-width: 640px) 160px, 200px"
                className="h-auto w-[10rem] object-contain sm:w-[11.5rem]"
              />
              <p className="mt-5 text-sm leading-[1.8] text-white/62">
                Subtenente Sergio | Presidente da ASSEGO. Campanha com foco em seguranca publica, valorizacao da categoria, familia e ordem institucional.
              </p>
            </div>
            <div className="space-y-3 text-sm text-white/68 lg:text-right">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">WhatsApp</a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-white">Instagram</a>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
