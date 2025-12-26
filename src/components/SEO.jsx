import Head from "next/head";

export default function SEO({
  title = "Dedetizadora em Fortaleza | PRO TEC Dedetização 24h",
  description = "Dedetizadora em Fortaleza especializada em controle de pragas urbanas. Dedetização contra baratas, ratos e cupins. Atendimento rápido, técnicos qualificados e orçamento grátis pelo WhatsApp.",
  url = "https://pro-tec.vercel.app/",
  image = "https://pro-tec.vercel.app/logo/logo.jpg",
  robots = "index, follow"
}) {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="author" content="PRO TEC Dedetizadora" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href={url} />
      <link rel="icon" href="/logo/navegador.png" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PRO TEC Dedetizadora" />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="geo.region" content="BR-CE" />
      <meta name="geo.placename" content="Fortaleza" />
      <meta name="geo.position" content="-3.7319;-38.5267" />
      <meta name="ICBM" content="-3.7319, -38.5267" />
    </Head>
  );
}
