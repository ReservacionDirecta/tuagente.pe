import React from 'react';
import SEO from '../components/common/SEO';
import HeroSection from '../components/home/HeroSection';
import PropertiesSection from '../components/home/PropertiesSection';
import CTASection from '../components/home/CTASection';
import ServicesSection from '../components/home/ServicesSection';
import BlogSection from '../components/home/BlogSection';

const Home = () => {
  return (
    <>
      <SEO
        title="TUAGENTE.PE - Soluciones Inmobiliarias en Lima"
        description="Encuentra tu hogar ideal con TUAGENTE.PE. Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias en Lima, Perú."
      />

      <main>
        <HeroSection />
        <PropertiesSection />
        <CTASection />
        <ServicesSection />
        <BlogSection />
      </main>
    </>
  );
};

export default Home;
