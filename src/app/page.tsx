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
  youtubeId: "dQw4w9WgXcQ",
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
    <main className="relative min-h-screen bg-bg text-fg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='%23ffffff' fill-opacity='0.18'%3E%3Ccircle cx='8' cy='8' r='1'/%3E%3Ccircle cx='40' cy='22' r='1'/%3E%3Ccircle cx='82' cy='16' r='1'/%3E%3Ccircle cx='124' cy='28' r='1'/%3E%3Ccircle cx='20' cy='62' r='1'/%3E%3Ccircle cx='64' cy='54' r='1'/%3E%3Ccircle cx='108' cy='70' r='1'/%3E%3Ccircle cx='36' cy='102' r='1'/%3E%3Ccircle cx='86' cy='116' r='1'/%3E%3Ccircle cx='128' cy='96' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-green/20 bg-[#05070A]/85 backdrop-blur">
          <Container className="py-5">
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
            <nav className="mt-3 flex items-center gap-4 text-sm font-medium">
              <a href="#bandeiras" className="hover:text-green">
                Bandeiras
              </a>
              <a href="#apoie" className="hover:text-green">
                Apoie
              </a>
              <a href="#faq" className="hover:text-green">
                FAQ
              </a>
            </nav>
          </Container>
          <div className="pointer-events-none h-px w-full bg-linear-to-r from-transparent via-green/60 to-transparent" />
        </header>

        <Section className="bg-gradient-to-br from-green-soft via-bg to-bg pb-14 pt-16 md:pb-20 md:pt-24">
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 70% 45%, rgba(15,90,54,0.18), transparent 62%)",
              }}
            />

            <div className="relative space-y-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-10 -top-14 h-72 w-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(15,90,54,0.25), transparent 60%)",
                }}
              />
              <Badge>PMGO | Presidente da ASSEGO</Badge>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow">
                A VOZ DA SEGURANÇA EM BRASÍLIA
              </p>
              <h1
                className="text-5xl font-black leading-[1.08] tracking-tight md:text-6xl"
                style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.35)" }}
              >
                Subtenente Sérgio{" "}
                <span
                  className="text-yellow"
                  style={{ textShadow: "0 1px 6px rgba(244, 195, 22, 0.22)" }}
                >
                  não para.
                </span>
              </h1>
              <div className="h-[2px] w-52 max-w-full bg-linear-to-r from-yellow to-transparent" />
              <p className="max-w-xl text-base text-muted/95 md:text-lg">
                Segurança pública não se faz com discurso. Se faz com coragem,
                experiência e posicionamento firme. É isso que Goiás vai levar
                para Brasília.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
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
            </div>

            <Card className="border-green/30 bg-[#070D11] text-fg shadow-[0_0_0_1px_rgba(15,90,54,0.25)]">
              <h2 className="text-xl font-bold text-green">Autoridade e experiência</h2>
              <p className="mt-3 text-sm text-muted">PMGO | Presidente da ASSEGO</p>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>- Placeholder: anos de serviço e atuação operacional.</li>
                <li>- Placeholder: liderança em pautas da categoria policial.</li>
                <li>- Placeholder: articulação por segurança e ordem pública.</li>
              </ul>
            </Card>
          </div>
        </Section>

        <Section className="bg-card pt-2 md:pt-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{featuredVideo.title}</h2>
            <p className="max-w-2xl text-muted">{featuredVideo.subtitle}</p>
          </div>
          <div className="mx-auto mt-6 w-full max-w-4xl overflow-hidden rounded-xl border border-green/30 bg-bg shadow-sm">
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
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

        <Section id="bandeiras" className="bg-card">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Bandeiras</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Prioridades para uma representação firme, técnica e conectada com quem
            vive a realidade da segurança.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <h3 className="text-lg font-bold text-green">Segurança</h3>
              <p className="mt-2 text-sm text-muted">
                Combate firme ao crime. Tolerância zero com a impunidade.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-bold text-green">Valorização</h3>
              <p className="mt-2 text-sm text-muted">
                Respeito, estrutura e reconhecimento para quem protege a
                sociedade.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-bold text-green">Família</h3>
              <p className="mt-2 text-sm text-muted">
                Defesa da família, da educação com valores e da ordem social.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-bold text-green">Ordem</h3>
              <p className="mt-2 text-sm text-muted">
                Autoridade, disciplina e compromisso com a lei. O Brasil precisa
                de direção.
              </p>
            </Card>
          </div>
        </Section>

        <Section>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Prova social</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item}>
                <p className="text-sm text-muted">&quot;{item}&quot;</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-green">
                  Apoiador(a)
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Vídeos</h2>
          <div className="mt-8 grid gap-10">
            <div>
              <h3 className="text-xl font-bold text-green">Curtos (Reels/Shorts)</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shorts.map((video) => (
                  <a
                    key={video.youtubeUrl}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-green/20 bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:border-green/40"
                  >
                    <div className="rounded-lg bg-linear-to-br from-yellow/35 via-green/35 to-transparent p-[1px]">
                      <div className="relative overflow-hidden aspect-[9/16] rounded-[inherit] border border-green/25 bg-linear-to-b from-green-soft to-bg p-4">
                        <div className="flex h-full items-center justify-center">
                          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-yellow text-fg text-xl shadow-[0_0_18px_rgba(244,195,22,0.28)]">
                            &#9654;
                          </span>
                        </div>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black/85 via-black/45 to-transparent" />
                        <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-fg">
                          {video.title}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-green">Vídeos completos</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {longVideos.map((video) => (
                  <a
                    key={video.youtubeUrl}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-green/20 bg-card p-3 transition-all duration-300 hover:-translate-y-1 hover:border-green/40"
                  >
                    <div className="aspect-video rounded-lg border border-green/20 bg-linear-to-b from-green-soft to-bg p-4">
                      <div className="flex h-full items-center justify-center">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-fg text-lg">
                          &#9654;
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-fg group-hover:text-green">
                      {video.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="apoie" className="bg-card">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Cadastro de apoiadores
              </h2>
              <p className="mt-3 text-muted">
                Preencha seus dados para receber materiais, agenda e formas de
                participar da campanha.
              </p>
            </div>
            <Card>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                    className="w-full rounded-lg border border-green/30 bg-card px-3 py-2 text-sm text-fg outline-none placeholder:text-muted focus:ring-2 focus:ring-green"
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
                    className="w-full rounded-lg border border-green/30 bg-card px-3 py-2 text-sm text-fg outline-none placeholder:text-muted focus:ring-2 focus:ring-green"
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
                    className="w-full rounded-lg border border-green/30 bg-card px-3 py-2 text-sm text-fg outline-none placeholder:text-muted focus:ring-2 focus:ring-green"
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
                        ? "bg-green-soft text-green"
                        : "bg-yellow-soft text-fg"
                    }`}
                  >
                    {feedback.message}
                  </p>
                ) : null}
              </form>
            </Card>
          </div>
        </Section>

        <Section id="faq">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Perguntas frequentes</h2>
          <div className="mt-8 space-y-3">
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
                className="rounded-lg border border-green/20 bg-card p-4"
              >
                <summary className="cursor-pointer list-none font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <footer className="border-t border-green/30 bg-green text-white">
          <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">Subtenente Sérgio (PMGO) | Presidente da ASSEGO</p>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow"
              >
                WhatsApp
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow"
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