import React from 'react';

const SEO = ({
  title = 'TUAGENTE.PE - Soluciones Inmobiliarias',
  description = 'Encuentra tu hogar ideal con TUAGENTE.PE. Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias en Lima, Perú.',
  keywords = 'inmobiliaria, propiedades, casas, departamentos, Lima, Perú, alquiler, venta',
  image = '/images/og-image.jpg',
  url = 'https://tuagente.pe',
}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </>
  );
};

export default SEO;
