import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <title>PRO TEC Dedetizadora — Seguro e Eficiente</title>
      <meta
        name="description"
        content="A PRO TEC Dedetizadora garante segurança e eficiência no combate a pragas urbanas. Atendimento rápido, técnicos qualificados e resultados duradouros."
      />
      <link
        rel="icon"
        href="\logo-site\protec.jpg"
      />

      {/* Open Graph */}
      <meta property="og:title" content="PRO TEC Dedetizadora — Seguro e Eficiente" />
      <meta
        property="og:description"
        content="Conheça nosso processo de dedetização eficiente e seguro. Atendimento rápido e produtos aprovados."
      />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/luan-Silva-Dev-0fc/PRO-TEC/main/public/logo/logo.jpg"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://pro-tec.vercel.app/" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="PRO TEC Dedetizadora — Seguro e Eficiente" />
      <meta
        name="twitter:description"
        content="Técnicos qualificados, produtos aprovados e atendimento rápido. Solicite seu orçamento sem compromisso!"
      />
      <meta
        name="twitter:image"
        content="https://raw.githubusercontent.com/luan-Silva-Dev-0fc/PRO-TEC/main/public/logo/logo.jpg"
      />
    </Head>
  );
}
