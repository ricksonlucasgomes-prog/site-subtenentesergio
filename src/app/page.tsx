"use client";

import { FormEvent, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonStyles } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type FormData = {
  nome: string;
  whatsapp: string;
  cidade: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const WHATSAPP_LINK = "https://wa.me/5562999999999";
const INSTAGRAM_LINK = "https://instagram.com/subtenentesergio";
const featuredVideo = {
  title: "Assista e entenda por que eu não paro.",
  subtitle: "Sem rodeio: posição firme, experiência real e compromisso com Goiás.",
  youtubeId: "",
};
const shorts: Array<{ title: string; youtubeUrl: string }> = [
  {
    title: "Recado direto sobre segurança nas ruas.",
    youtubeUrl: "https://www.youtube.com/shorts/short-placeholder-1",
  },
  {
    title: "Valorização policial sem enrolação.",
    youtubeUrl: "https://www.youtube.com/shorts/short-placeholder-2",
  },
  {
    title: "Família e ordem: compromisso de mandato.",
    youtubeUrl: "https://www.youtube.com/shorts/short-placeholder-3",
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

export default function Home() {
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
    <main className="relative min-h-screen bg-white text-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%230B8F3C' fill-opacity='0.12'%3E%3Ccircle cx='8' cy='8' r='1'/%3E%3Ccircle cx='40' cy='22' r='1'/%3E%3Ccircle cx='82' cy='16' r='1'/%3E%3Ccircle cx='124' cy='28' r='1'/%3E%3Ccircle cx='20' cy='62' r='1'/%3E%3Ccircle cx='64' cy='54' r='1'/%3E%3Ccircle cx='108' cy='70' r='1'/%3E%3Ccircle cx='36' cy='102' r='1'/%3E%3Ccircle cx='86' cy='116' r='1'/%3E%3Ccircle cx='128' cy='96' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-primary/20 bg-white/95 shadow-sm backdrop-blur">
          <Container className="py-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="Logo oficial Subtenente Sérgio"
                  className="h-10 w-auto shrink-0 md:h-12"
                />
              </div>
              <a
                href={WHATSAPP_LINK}
                className={buttonStyles(
                  "primary",
                  "px-4 py-2 text-xs transition duration-200 hover:scale-105 sm:text-sm",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <nav className="mt-4 flex items-center gap-6 text-sm font-semibold text-slate-700">
              <a href="#bandeiras" className="transition-colors hover:text-primary">
                Bandeiras
              </a>
              <a href="#apoie" className="transition-colors hover:text-primary">
                Apoie
              </a>
              <a href="#faq" className="transition-colors hover:text-primary">
                FAQ
              </a>
            </nav>
          </Container>
          <div className="pointer-events-none h-px w-full bg-linear-to-r from-transparent via-primary/60 to-transparent" />
        </header>

        <Section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-soft/35 to-bg-soft pb-20 pt-16 md:pb-28 md:pt-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-linear-to-r from-primary via-accent to-primary opacity-85"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 70% 45%, rgba(11,143,60,0.16), transparent 62%)",
              }}
            />

            <div className="space-y-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 -top-14 h-72 w-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(11,143,60,0.18), transparent 60%)",
                }}
              />
              <Badge>PMGO | Presidente da ASSEGO</Badge>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Campanha 2026
              </p>
              <h1 className="text-4xl font-black leading-[0.98] tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Goias seguro com voz firme em Brasilia.
              </h1>
              <p className="max-w-2xl text-base text-slate-700 sm:text-lg md:text-xl">
                Experiencia real de rua e compromisso com quem protege as familias goianas.
              </p>
              <div className="h-[3px] w-56 max-w-full bg-linear-to-r from-primary via-accent/70 to-transparent" />
              <p className="hidden text-xs font-bold uppercase tracking-[0.2em] text-primary">
                A VOZ DA SEGURANÇA EM BRASÍLIA
              </p>
              <h1
                className="text-5xl font-black leading-[1.02] tracking-tight text-slate-900 md:text-7xl"
                hidden
              >
                Subtenente Sérgio{" "}
                <span className="text-primary">
                  não para.
                </span>
              </h1>
              <div className="hidden h-[3px] w-56 max-w-full bg-linear-to-r from-primary to-transparent" />
              <p className="hidden max-w-xl text-lg text-slate-700 md:text-xl">
                Segurança pública não se faz com discurso. Se faz com coragem,
                experiência e posicionamento firme. É isso que Goiás vai levar
                para Brasília.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles("primary", "w-full sm:w-auto")}
                >
                  Falar no WhatsApp
                </a>
                <a href="#apoie" className={buttonStyles("secondary", "w-full sm:w-auto")}>
                  Apoiar a campanha
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[520px]">
              <div className="relative overflow-hidden rounded-[28px] border border-primary/25 bg-white shadow-[0_20px_45px_rgba(11,143,60,0.16)]">
                <div
                  aria-hidden="true"
                  className="h-2 w-full bg-linear-to-r from-primary via-accent to-primary"
                />
                <div className="aspect-[4/5] bg-linear-to-b from-white via-primary-soft/20 to-bg-soft">
                  {/* TODO: Substituir este placeholder pela foto oficial do candidato */}
                  <div className="flex h-full items-center justify-center p-6 text-center">
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary/80">
                        Foto oficial
                      </p>
                      <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                        Subtenente Sergio
                      </p>
                      <p className="text-sm text-slate-600">
                        Inserir imagem em alta resolucao para fortalecer a primeira dobra.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="hidden border-primary/30 bg-white text-slate-800 shadow-[0_8px_28px_rgba(11,143,60,0.12)]">
              <h2 className="text-2xl font-bold text-primary">Autoridade e experiência</h2>
              <p className="mt-3 text-sm text-slate-600">PMGO | Presidente da ASSEGO</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>- Placeholder: anos de serviço e atuação operacional.</li>
                <li>- Placeholder: liderança em pautas da categoria policial.</li>
                <li>- Placeholder: articulação por segurança e ordem pública.</li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section className="bg-white pt-10 md:pt-14">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">{featuredVideo.title}</h2>
            <p className="max-w-2xl text-lg text-slate-700">{featuredVideo.subtitle}</p>
          </div>
          <div className="mx-auto mt-8 w-full max-w-4xl overflow-hidden rounded-xl border border-primary/30 bg-white shadow-[0_10px_30px_rgba(11,143,60,0.1)]">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("primary")}
            >
              Falar no WhatsApp
            </a>
            <a href="#apoie" className={buttonStyles("secondary")}>
              Quero apoiar
            </a>
          </div>
        </Section>

        <Section id="bandeiras" className="bg-bg-soft/70">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Bandeiras</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Prioridades para uma representação firme, técnica e conectada com quem
            vive a realidade da segurança.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <h3 className="text-xl font-bold text-primary">Segurança</h3>
              <p className="mt-3 text-sm text-slate-700">
                Combate firme ao crime. Tolerância zero com a impunidade.
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-primary">Valorização</h3>
              <p className="mt-3 text-sm text-slate-700">
                Respeito, estrutura e reconhecimento para quem protege a
                sociedade.
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-primary">Família</h3>
              <p className="mt-3 text-sm text-slate-700">
                Defesa da família, da educação com valores e da ordem social.
              </p>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-primary">Ordem</h3>
              <p className="mt-3 text-sm text-slate-700">
                Autoridade, disciplina e compromisso com a lei. O Brasil precisa
                de direção.
              </p>
            </Card>
          </div>
        </Section>

        <Section className="bg-white">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Prova social</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item}>
                <p className="text-base leading-relaxed text-slate-700">&quot;{item}&quot;</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">
                  Apoiador(a)
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section className="bg-bg-soft/50">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Vídeos</h2>
          <div className="mt-10 grid gap-12">
            <div>
              <h3 className="text-2xl font-bold text-primary">Curtos (Reels/Shorts)</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shorts.map((video) => (
                  <a
                    key={video.youtubeUrl}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-primary/20 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <div className="rounded-lg bg-linear-to-br from-white via-primary-soft/45 to-bg-soft p-[1px]">
                      <div className="relative overflow-hidden aspect-[9/16] rounded-[inherit] border border-primary/25 bg-linear-to-b from-white to-bg-soft p-4">
                        <div className="flex h-full items-center justify-center">
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl shadow-[0_0_18px_rgba(11,143,60,0.28)]">
                            &#9654;
                          </span>
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-white/95 via-white/65 to-transparent" />
                        <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-slate-900">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary">Vídeos completos</h3>
              <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {longVideos.map((video) => (
                  <a
                    key={video.youtubeUrl}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-primary/20 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <div className="aspect-video rounded-lg border border-primary/20 bg-linear-to-b from-white to-bg-soft p-4">
                      <div className="flex h-full items-center justify-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg">
                          &#9654;
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800 group-hover:text-primary">
                      {video.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="apoie" className="bg-white">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
                Cadastro de apoiadores
              </h2>
              <p className="mt-4 text-lg text-slate-700">
                Preencha seus dados para receber materiais, agenda e formas de
                participar da campanha.
              </p>
            </div>
            <Card className="border-primary/25 bg-white">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="nome" className="mb-1 block text-sm font-semibold">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, nome: event.target.value }))
                    }
                    className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
                    placeholder="Seu nome"
                  />
                  {errors.nome ? (
                    <p className="mt-1 text-xs text-red-600">{errors.nome}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="mb-1 block text-sm font-semibold"
                  >
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
                    className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
                    placeholder="(62) 99999-9999"
                  />
                  {errors.whatsapp ? (
                    <p className="mt-1 text-xs text-red-600">{errors.whatsapp}</p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="cidade" className="mb-1 block text-sm font-semibold">
                    Cidade
                  </label>
                  <input
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, cidade: event.target.value }))
                    }
                    className="w-full rounded-lg border border-primary/30 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-primary"
                    placeholder="Sua cidade"
                  />
                  {errors.cidade ? (
                    <p className="mt-1 text-xs text-red-600">{errors.cidade}</p>
                  ) : null}
                </div>
                <Button type="submit" className="w-full">
                  Cadastrar apoio
                </Button>
                {feedback ? (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`rounded-md px-3 py-2 text-sm ${
                      feedback.type === "success"
                        ? "bg-primary-soft text-primary"
                        : "bg-secondary-soft text-secondary"
                    }`}
                  >
                    {feedback.message}
                  </p>
                ) : null}
              </form>
            </Card>
          </div>
        </Section>

        <Section id="faq" className="bg-bg-soft/70">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">Perguntas frequentes</h2>
          <div className="mt-10 space-y-4">
            {[
              {
                q: "Quais são as prioridades do mandato?",
                a: "Placeholder: segurança pública, valorização policial, família e ordem social.",
              },
              {
                q: "Como posso apoiar a campanha?",
                a: "Placeholder: cadastro no formulário, compartilhamento e mobilização local.",
              },
              {
                q: "Existe agenda presencial?",
                a: "Placeholder: sim, com divulgação em redes sociais e grupos oficiais.",
              },
              {
                q: "Como enviar demandas da categoria?",
                a: "Placeholder: pelo WhatsApp e pelos canais da equipe.",
              },
              {
                q: "Onde acompanho notícias e posicionamentos?",
                a: "Placeholder: no Instagram oficial e materiais da campanha.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="rounded-lg border border-primary/20 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <footer className="border-t border-primary/30 bg-primary text-white">
          <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">Subtenente Sérgio (PMGO) | Presidente da ASSEGO</p>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                Instagram
              </a>
            </div>
          </Container>
          <Container className="pb-8">
            <p className="text-xs text-white/80">
              Aviso LGPD (placeholder): seus dados serão usados apenas para
              comunicação da campanha.
            </p>
          </Container>
        </footer>
      </div>
    </main>
  );
}
