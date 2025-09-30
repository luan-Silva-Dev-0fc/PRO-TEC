"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = "PRO TEC Dedetizadora — Seguro e Eficiente";

    // Modal automático após 5 segundos
    const timer = setTimeout(() => setModalOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = (customText) => {
    const phone = "5585991840247";
    const text = encodeURIComponent(
      customText || "Olá! Gostaria de saber mais sobre os serviços da PRO TEC Dedetizadora."
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.4 } } };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      {/* SEO e Metadados */}
      <Head>
        {/* Título e descrição */}
        <title>PRO TEC Dedetizadora — Seguro e Eficiente</title>
        <meta
          name="description"
          content="A PRO TEC Dedetizadora garante segurança e eficiência no combate a pragas urbanas. Atendimento rápido, técnicos qualificados e resultados duradouros."
        />

        
        <link rel="icon" href="/logo/logo.jpg" />

       
        <meta property="og:title" content="PRO TEC Dedetizadora — Seguro e Eficiente" />
        <meta
          property="og:description"
          content="Conheça nosso processo de dedetização eficiente e seguro. Atendimento rápido e produtos aprovados."
        />
        <meta property="og:image" content="/logo/logo.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pro-tec.vercel.app/" />

        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PRO TEC Dedetizadora — Seguro e Eficiente" />
        <meta
          name="twitter:description"
          content="Técnicos qualificados, produtos aprovados e atendimento rápido. Solicite seu orçamento sem compromisso!"
        />
        <meta name="twitter:image" content="/logo/logo.jpg" />
      </Head>

      {/* Conteúdo da página */}
      <div className="min-h-screen flex items-start justify-center bg-black text-white p-9 relative">
        <div className="w-full max-w-[1100px]">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
            <a href="#" className="flex items-center gap-3 text-white no-underline">
              <div className="w-14 h-14 relative rounded-lg overflow-hidden">
                <Image
                  src="/logo/logo.jpg"
                  alt="Logo PRO TEC"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <div className="text-lg font-extrabold">PRO TEC — Dedetizadora</div>
                <div className="text-[13px] text-gray-300">
                  Segurança · Eficiência · Resultados
                </div>
              </div>
            </a>
            <nav className="flex gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#beda38] to-[#beda38] px-3 py-2 rounded-lg font-extrabold text-black"
              >
                Faça seu orçamento
              </a>
            </nav>
          </header>

          {/* Hero */}
          <main className="grid md:grid-cols-[1fr_360px] gap-6 items-center p-7 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm">
            <section>
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div
                  variants={item}
                  className="inline-block px-3 py-2 rounded-full bg-[rgba(255,255,255,0.04)] font-bold text-gray-300 mb-3"
                >
                  DEDETIZADORA
                </motion.div>

                <motion.h1
                  variants={item}
                  className="text-3xl md:text-4xl font-extrabold mb-2 leading-snug"
                >
                  Conheça nosso processo de{" "}
                  <strong>dedetização eficiente e seguro</strong>
                </motion.h1>

                <motion.p
                  variants={item}
                  className="text-gray-300 mb-4 text-sm md:text-base"
                >
                  Garantimos resultados duradouros com técnicas profissionais e
                  produtos aprovados — protegendo sua casa ou empresa com
                  responsabilidade.
                </motion.p>
              </motion.div>

              <div className="mt-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 mt-3 bg-gradient-to-r from-[#beda38] to-[#beda38] text-black font-extrabold rounded-lg"
                >
                  Faça seu orçamento
                </button>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Inspeção</h4>
                  <p className="text-gray-300 text-sm">
                    Avaliação completa para identificar focos, pragas e pontos
                    críticos antes do tratamento.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Aplicação</h4>
                  <p className="text-gray-300 text-sm">
                    Produtos seguros e técnicas qualificadas para eliminar
                    pragas com eficiência.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Limpeza de caixas</h4>
                  <p className="text-gray-300 text-sm">
                    Limpeza e higienização de caixas de gordura, com descarte
                    responsável dos resíduos.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-gray-300 font-bold">
                  Técnicos qualificados
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-gray-300 font-bold">
                  Produtos aprovados
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-gray-300 font-bold">
                  Atendimento rápido
                </div>
              </div>
            </section>

            <aside className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
              <div className="flex justify-between items-center">
                <div className="font-extrabold">Atendimento</div>
                <div className="text-[12px] text-gray-300">Disponível 7 dias</div>
              </div>

              <div className="mt-3">
                <div className="text-[13px] text-gray-300">
                  Gleison Nascimento — PRO TEC
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  Orçamento sem compromisso.
                </div>
              </div>

              <div className="mt-3">
                <a
                  className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#beda38] to-[#beda38] text-black font-extrabold block text-center"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </aside>
          </main>

          <footer className="mt-5 flex justify-between text-gray-300 text-[13px]">
            <div>© {new Date().getFullYear()} PRO TEC — Dedetizadora</div>
            <div>Telefone: (85) 99184-0247</div>
          </footer>
        </div>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 w-20 h-20 z-50"
        >
          <Image
            src="/logo/whatsapp.png"
            alt="WhatsApp PRO TEC"
            fill
            style={{ objectFit: "contain" }}
          />
        </a>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-xl max-w-sm w-full border border-[rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold mb-3">Faça seu orçamento!</h2>
              <p className="text-gray-300 mb-4">
                Clique no botão abaixo e envie uma mensagem no WhatsApp para
                solicitar seu orçamento.
              </p>
              <a
                href={whatsappLink(
                  "Olá! Gostaria de solicitar um orçamento da PRO TEC Dedetizadora."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[#beda38] to-[#beda38] text-black font-extrabold rounded-lg mb-3"
              >
                Enviar no WhatsApp
              </a>
              <button
                onClick={() => setModalOpen(false)}
                className="block w-full text-center px-4 py-2 border border-[rgba(255,255,255,0.06)] text-[#beda38] font-bold rounded-lg"
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
