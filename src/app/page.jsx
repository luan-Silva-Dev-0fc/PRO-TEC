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
     <Head>
  <title>PRO TEC Dedetizadora — Seguro e Eficiente</title>
  <meta
    name="description"
    content="A PRO TEC Dedetizadora garante segurança e eficiência no combate a pragas urbanas. Atendimento rápido, técnicos qualificados e resultados duradouros."
  />
  <link rel="icon" href="https://pro-tec.vercel.app/logo/logo.jpg" />

  {/* Open Graph */}
  <meta property="og:title" content="PRO TEC Dedetizadora — Seguro e Eficiente" />
  <meta
    property="og:description"
    content="Conheça nosso processo de dedetização eficiente e seguro. Atendimento rápido e produtos aprovados."
  />
  <meta property="og:image" content="https://pro-tec.vercel.app/logo/logo.jpg" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pro-tec.vercel.app/" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="PRO TEC Dedetizadora — Seguro e Eficiente" />
  <meta
    name="twitter:description"
    content="Técnicos qualificados, produtos aprovados e atendimento rápido. Solicite seu orçamento sem compromisso!"
  />
  <meta name="twitter:image" content="https://pro-tec.vercel.app/logo/logo.jpg" />
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
            <nav>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#beda38] to-[#beda38] px-4 py-2 rounded-lg font-extrabold text-black"
              >
                Solicitar Orçamento
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
                  Dedetização <strong>eficiente e segura</strong> para sua casa ou empresa
                </motion.h1>

                <motion.p
                  variants={item}
                  className="text-gray-300 mb-4 text-sm md:text-base"
                >
                  Proteja seu ambiente com técnicas profissionais e produtos
                  aprovados. Atendimento rápido e garantia de resultados.
                </motion.p>
              </motion.div>

              {/* Cards de serviços */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Inspeção</h4>
                  <p className="text-gray-300 text-sm">
                    Identificação de pragas, pontos críticos e análise detalhada.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Aplicação</h4>
                  <p className="text-gray-300 text-sm">
                    Técnicas avançadas e produtos certificados contra pragas.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Limpeza de caixas</h4>
                  <p className="text-gray-300 text-sm">
                    Higienização de caixas de gordura e descarte correto.
                  </p>
                </div>
              </div>
            </section>

            <aside className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
              <div className="font-extrabold">Atendimento 7 dias</div>
              <div className="text-[13px] text-gray-300 mt-2">
                Gleison Nascimento — PRO TEC
              </div>
              <div className="text-gray-300 text-sm mt-1">
                Orçamento sem compromisso, resposta rápida no WhatsApp.
              </div>
            </aside>
          </main>

          {/* Sobre a Empresa */}
          <section className="mt-10 p-7 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
            <h2 className="text-2xl font-extrabold mb-4">Sobre a PRO TEC</h2>
            <p className="text-gray-300 mb-3 text-sm md:text-base">
              A <strong>PRO TEC Dedetizadora</strong> atua com responsabilidade e
              experiência no combate a pragas urbanas. Nosso compromisso é com a
              segurança da sua família e a proteção do seu patrimônio.
            </p>
            <p className="text-gray-300 mb-3 text-sm md:text-base">
              Utilizamos produtos aprovados pelos órgãos reguladores e contamos
              com uma equipe técnica especializada, pronta para oferecer soluções
              rápidas e eficazes.
            </p>
            <div className="mt-4">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#beda38] to-[#beda38] text-black font-extrabold rounded-lg"
              >
                Solicitar Orçamento
              </a>
            </div>
          </section>

          {/* Diferenciais */}
          <section className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)]">
              <h4 className="font-bold mb-2">✔ Técnicos qualificados</h4>
              <p className="text-gray-300 text-sm">
                Profissionais treinados para cada tipo de ambiente e necessidade.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)]">
              <h4 className="font-bold mb-2">✔ Produtos aprovados</h4>
              <p className="text-gray-300 text-sm">
                Substâncias regulamentadas e seguras para pessoas e animais.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)]">
              <h4 className="font-bold mb-2">✔ Atendimento rápido</h4>
              <p className="text-gray-300 text-sm">
                Suporte disponível todos os dias, com agilidade e eficiência.
              </p>
            </div>
          </section>

          {/* Rodapé */}
          <footer className="mt-10 flex justify-between text-gray-300 text-[13px]">
            <div>© {new Date().getFullYear()} PRO TEC — Dedetizadora</div>
            <div>Telefone: (85) 99184-0247</div>
          </footer>
        </div>

        {/* Botão fixo WhatsApp */}
        <a
  href={whatsappLink()}
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 w-14 h-14 z-50"
>
  <Image
    src="/logo/whatsapp.png"
    alt="WhatsApp PRO TEC"
    fill
    style={{ objectFit: "contain" }}
  />
</a>


        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-xl max-w-sm w-full border border-[rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold mb-3">Faça seu orçamento!</h2>
              <p className="text-gray-300 mb-4">
                Clique no botão abaixo e fale direto conosco pelo WhatsApp.
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
