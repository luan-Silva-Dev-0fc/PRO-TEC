"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Head from "next/head";
import SEO from "../components/SEO";

function ButtonOrcamento({ text, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-flex items-center px-10 py-3 font-extrabold text-black bg-[#beda38] transform skew-x-[-15deg] shadow-[6px_6px_0_#000] transition-all duration-500 hover:shadow-[10px_10px_0_#000] overflow-hidden"
    >
      <span className="block skew-x-[15deg]">{text}</span>
      <span className="ml-6 relative">
        <svg
          width="40"
          height="28"
          viewBox="0 0 66 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <path
              className="one"
              d="M40.154,3.895 L43.976,0.139 65.692,20.785 65.704,22.199 44.677,42.861 43.976,42.861 40.154,39.107 40.148,38.400 56.994,21.857 57.000,21.150 40.154,4.608 40.148,3.901 Z"
              fill="#000"
            />
            <path
              className="two"
              d="M20.154,3.895 L23.976,0.139 45.692,20.785 45.704,22.199 24.677,42.861 23.976,42.861 20.154,39.107 20.148,38.400 36.994,21.857 37.000,21.150 20.154,4.608 20.148,3.901 Z"
              fill="#000"
            />
            <path
              className="three"
              d="M0.154,3.895 L3.976,0.139 25.692,20.785 25.704,22.199 4.677,42.861 3.976,42.861 0.154,39.107 0.148,38.400 16.994,21.857 17.000,21.150 0.154,4.608 0.148,3.901 Z"
              fill="#000"
            />
          </g>
        </svg>
      </span>

      <style jsx>{`
        .one {
          transition: 0.4s;
          transform: translateX(-60%);
        }
        .two {
          transition: 0.5s;
          transform: translateX(-30%);
        }
        .three {
          transition: 0.5s;
        }
        a:hover .one {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.6s;
        }
        a:hover .two {
          transform: translateX(0%);
          animation: color_anim 1s infinite 0.4s;
        }
        a:hover .three {
          animation: color_anim 1s infinite 0.2s;
        }
        @keyframes color_anim {
          0%,
          100% {
            fill: #000;
          }
          50% {
            fill: white;
          }
        }
      `}</style>
    </a>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setModalOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then(() => console.log("✅ Service Worker registrado!"))
          .catch((err) => console.error("Erro ao registrar SW:", err));
      });
    }
  }, []);

  const whatsappLink = (customText) => {
    const phone = "5585991840247";
    const text = encodeURIComponent(
      customText ||
        "Olá! Gostaria de solicitar um orçamento da PRO TEC Dedetizadora."
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.4 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      {/* ✅ Head corrigido com manifest e theme-color */}
      <Head>
        <title>PRO TEC Dedetizadora em Fortaleza | Dedetização Rápida e Segura</title>
        <meta
          name="description"
          content="A PRO TEC Dedetizadora oferece serviços de controle de pragas em Fortaleza: baratas, formigas, cupins, ratos e mais. Atendimento 24h com garantia e produtos certificados. Peça seu orçamento grátis agora!"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#beda38" />
        <link rel="icon" href="/logo/navegador.png" />
        
      </Head>

      {/* ✅ SEO */}
      <SEO
        title="PRO TEC Dedetizadora em Fortaleza | Dedetização Rápida e Segura"
        description="A PRO TEC Dedetizadora oferece serviços de controle de pragas em Fortaleza: baratas, formigas, cupins, ratos e mais. Atendimento 24h com garantia e produtos certificados. Peça seu orçamento grátis agora!"
        url="https://pro-tec.vercel.app/"
        image="https://pro-tec.vercel.app/logo/logo.jpg"
        robots="index, follow"
      />

      <div className="min-h-screen flex items-start justify-center bg-black text-white p-9 relative">
        <div className="w-full max-w-[1100px]">
          {/* ✅ Cabeçalho */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
            <a
              href="#"
              className="flex items-center gap-3 text-white no-underline"
            >
              <div className="w-14 h-14 relative rounded-lg overflow-hidden">
                <Image
                  src="/logo/logo.jpg"
                  alt="Logo PRO TEC"
                  fill
                  sizes="(max-width: 768px) 56px, 56px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <div className="text-lg font-extrabold">
                  PRO TEC — Dedetizadora
                </div>
                <div className="text-[13px] text-gray-300">
                  Segurança · Eficiência · Resultados
                </div>
              </div>
            </a>

            <nav>
              <ButtonOrcamento text="Solicitar Orçamento" link={whatsappLink()} />
            </nav>
          </header>

          <main className="grid md:grid-cols-[1fr_360px] gap-6 items-center p-7 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] backdrop-blur-sm">
            <section>
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item} className="inline-block px-3 py-2 rounded-full bg-[rgba(255,255,255,0.04)] font-bold text-gray-300 mb-3">
                  DEDETIZADORA
                </motion.div>

                <motion.h1 variants={item} className="text-3xl md:text-4xl font-extrabold mb-2 leading-snug">
                  Dedetização <strong>eficiente e segura</strong> para sua casa ou empresa
                </motion.h1>

                <motion.p variants={item} className="text-gray-300 mb-4 text-sm md:text-base">
                  Proteja seu ambiente com técnicas profissionais e produtos aprovados. Atendimento rápido e garantia de resultados.
                </motion.p>
              </motion.div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Inspeção</h4>
                  <p className="text-gray-300 text-sm">Identificação de pragas, pontos críticos e análise detalhada.</p>
                </div>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Aplicação</h4>
                  <p className="text-gray-300 text-sm">Técnicas avançadas e produtos certificados contra pragas.</p>
                </div>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  <h4 className="font-bold mb-2">Limpeza</h4>
                  <p className="text-gray-300 text-sm">Limpeza de caixas d'água, caixa de gordura e caixa de sabão.</p>
                </div>
              </div>
            </section>

            <aside className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
              <div className="font-extrabold">Atendimento 7 dias</div>
              <div className="text-[13px] text-gray-300 mt-2">Gleison Nascimento — PRO TEC</div>
              <div className="text-gray-300 text-sm mt-1">Orçamento sem compromisso, resposta rápida no WhatsApp.</div>
            </aside>
          </main>

          <section className="mt-10 p-7 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
            <h2 className="text-2xl font-extrabold mb-4">Sobre a PRO TEC</h2>
            <p className="text-gray-300 mb-3 text-sm md:text-base">
              A <strong>PRO TEC Dedetizadora</strong> atua com responsabilidade e experiência no combate a pragas urbanas.
            </p>
            <p className="text-gray-300 mb-3 text-sm md:text-base">
              Utilizamos produtos aprovados pelos órgãos reguladores e contamos com uma equipe técnica especializada, pronta para oferecer soluções rápidas e eficazes.
              Nosso objetivo é garantir ambientes mais saudáveis, seguros e livres de pragas, unindo eficiência, qualidade e respeito ao cliente.
            </p>
            <div className="mt-4">
              <ButtonOrcamento text="Solicitar Orçamento" link={whatsappLink()} />
            </div>
          </section>

          <section className="mt-10 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)]">
              <h4 className="font-bold mb-2">✔ Técnicos qualificados</h4>
              <p className="text-gray-300 text-sm">Profissionais treinados para cada tipo de ambiente e necessidade.</p>
            </div>
            <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)]">
              <h4 className="font-bold mb-2">✔ Produtos aprovados</h4>
              <p className="text-gray-300 text-sm">Substâncias regulamentadas e seguras para pessoas e animais.</p>
            </div>
            <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.04)]">
              <h4 className="font-bold mb-2">✔ Atendimento rápido</h4>
              <p className="text-gray-300 text-sm">Suporte disponível todos os dias, com agilidade e eficiência.</p>
            </div>
          </section>

          <footer className="mt-10 flex justify-between text-gray-300 text-[13px]">
            <div>© {new Date().getFullYear()} PRO TEC — Dedetizadora</div>
            <div>Telefone: (85) 99184-0247</div>
          </footer>
        </div>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 w-14 h-14 z-50"
        >
          <Image src="/logo/whatsapp.png" alt="WhatsApp PRO TEC" fill style={{ objectFit: "contain" }} />
        </a>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-black p-6 rounded-xl max-w-sm w-full border border-[rgba(255,255,255,0.06)]">
              <h2 className="text-xl font-bold mb-3">Faça seu orçamento!</h2>
              <p className="text-gray-300 mb-4">
                Clique no botão abaixo e fale direto conosco pelo WhatsApp.
              </p>
              <ButtonOrcamento
                text="Enviar no WhatsApp"
                link={whatsappLink("Olá! Gostaria de solicitar um orçamento da PRO TEC Dedetizadora.")}
              />
              <button
                onClick={() => setModalOpen(false)}
                className="block w-full text-center px-4 py-2 border border-[rgba(255,255,255,0.06)] text-[#beda38] font-bold rounded-lg mt-3"
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
