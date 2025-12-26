"use client";

import Image from "next/image";
import Head from "next/head";
import SEO from "../components/SEO";
import { useState, useEffect } from "react";

function ButtonOrcamento({ text, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-8 py-3 font-extrabold text-black bg-[#beda38] rounded-lg shadow-lg transition hover:scale-105"
    >
      {text}
    </a>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setModalOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = (customText) => {
    const phone = "5585991840247";
    const text = encodeURIComponent(
      customText ||
        "Olá! Gostaria de solicitar um orçamento da PRO TEC Dedetizadora."
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <>
      <Head>
        <title>PRO TEC Dedetizadora em Fortaleza</title>
        <meta
          name="description"
          content="Dedetização profissional, rápida e segura. Atendimento todos os dias."
        />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/logo/navegador.png" />
      </Head>

      <SEO
        title="PRO TEC Dedetizadora em Fortaleza | Dedetização Rápida e Segura"
        description="A PRO TEC Dedetizadora oferece serviços de controle de pragas em Fortaleza com atendimento rápido, produtos certificados e garantia."
        url="https://pro-tec.vercel.app/"
        image="https://pro-tec.vercel.app/logo/logo.jpg"
        robots="index, follow"
      />

      <div className="min-h-screen bg-black text-white">
        <header className="relative w-full overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full max-h-[520px] object-cover"
            >
              <source
                src="https://videos.pexels.com/video-files/4145551/4145551-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
          </div>

          <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-6 pb-20">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 relative rounded-lg overflow-hidden">
                  <Image
                    src="/logo/logo.jpg"
                    alt="Logo PRO TEC"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-extrabold text-lg">
                    PRO TEC — Dedetizadora
                  </div>
                  <div className="text-sm text-gray-300">
                    Segurança · Eficiência · Resultados
                  </div>
                </div>
              </div>

              <ButtonOrcamento
                text="Solicitar Orçamento"
                link={whatsappLink()}
              />
            </div>

            <div className="max-w-xl">
              <div className="inline-block px-3 py-2 rounded-full bg-white/10 text-sm font-bold mb-3">
                DEDETIZADORA
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                Dedetização eficiente e segura para sua casa ou empresa
              </h1>
              <p className="text-gray-300 text-base">
                Proteja seu ambiente com técnicas profissionais e produtos
                aprovados. Atendimento rápido e garantia de resultados.
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-[1100px] mx-auto px-6 mt-12">
          <div className="grid md:grid-cols-[1fr_360px] gap-6 p-7 rounded-lg bg-white/5 border border-white/10">
            <section className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2">Inspeção</h4>
                <p className="text-gray-300 text-sm">
                  Identificação de pragas, pontos críticos e análise detalhada.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2">Aplicação</h4>
                <p className="text-gray-300 text-sm">
                  Técnicas avançadas e produtos certificados contra pragas.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-bold mb-2">Limpeza</h4>
                <p className="text-gray-300 text-sm">
                  Limpeza de caixas d'água, caixa de gordura e caixa de sabão.
                </p>
              </div>
            </section>

            <aside className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="font-extrabold">Atendimento 7 dias</div>
              <div className="text-sm text-gray-300 mt-2">
                Gleison Nascimento — PRO TEC
              </div>
              <div className="text-sm text-gray-300 mt-1">
                Orçamento sem compromisso, resposta rápida no WhatsApp.
              </div>
            </aside>
          </div>

          <section className="mt-12 p-7 rounded-lg bg-white/5 border border-white/10">
            <h2 className="text-2xl font-extrabold mb-4">Sobre a PRO TEC</h2>
            <p className="text-gray-300 mb-3 text-sm md:text-base">
              A PRO TEC Dedetizadora atua com responsabilidade e experiência no combate a pragas urbanas.
            </p>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              Utilizamos produtos aprovados pelos órgãos reguladores e contamos com uma equipe técnica especializada, pronta para oferecer soluções rápidas e eficazes.
            </p>
            <ButtonOrcamento
              text="Solicitar Orçamento"
              link={whatsappLink()}
            />
          </section>

          <section className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-bold mb-2">✔ Técnicos qualificados</h4>
              <p className="text-gray-300 text-sm">
                Profissionais treinados para cada tipo de ambiente.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-bold mb-2">✔ Produtos aprovados</h4>
              <p className="text-gray-300 text-sm">
                Substâncias regulamentadas e seguras.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-bold mb-2">✔ Atendimento rápido</h4>
              <p className="text-gray-300 text-sm">
                Suporte todos os dias com agilidade.
              </p>
            </div>
          </section>
        </main>

        <footer className="max-w-[1100px] mx-auto px-6 mt-12 flex justify-between text-gray-400 text-sm">
          <div>© 2025 PRO TEC — Dedetizadora</div>
          <div>Telefone: (85) 99184-0247</div>
        </footer>

        <a
          href={whatsappLink()}
          target="_blank"
          className="fixed bottom-5 right-5 w-14 h-14"
        >
          <Image
            src="/logo/whatsapp.png"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </a>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-xl max-w-sm w-full border border-white/10">
              <h2 className="text-xl font-bold mb-3">Faça seu orçamento!</h2>
              <p className="text-gray-300 mb-4">
                Fale direto conosco pelo WhatsApp.
              </p>
              <ButtonOrcamento
                text="Enviar no WhatsApp"
                link={whatsappLink()}
              />
              <button
                onClick={() => setModalOpen(false)}
                className="w-full mt-4 py-2 rounded-lg border border-white/10 text-[#beda38] font-bold"
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
