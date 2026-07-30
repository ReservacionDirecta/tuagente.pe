import React from 'react';
import Container from '../layout/Container';
import Section from '../layout/Section';
import BlogCard from './BlogCard';

const BlogSection = () => {
  const articles = [
    {
      slug: 'santiago-de-surco',
      title: 'Santiago de Surco: El distrito familiar por excelencia en Lima',
      excerpt: 'Descubre por qué Santiago de Surco es el distrito preferido para familias que buscan calidad de vida en Lima.',
      image: '/images/blog/santiago-surco.jpg',
      category: 'Zonas',
      date: '15 Nov 2024',
      author: 'TuAgente',
    },
    {
      slug: 'consejos-comprar-vivienda',
      title: '5 Consejos vitales antes de comprar tu primera vivienda en Lima',
      excerpt: 'Guía completa para primeros compradores de vivienda en la capital peruana.',
      image: '/images/blog/consejos-compra.jpg',
      category: 'Consejos',
      date: '10 Nov 2024',
      author: 'TuAgente',
    },
  ];
  
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Informacion Inmobiliaria
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ofrecemos soluciones integrales para todas tus necesidades inmobiliarias
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <BlogCard key={article.slug} article={article} />
        ))}
      </div>
    </Section>
  );
};

export default BlogSection;
