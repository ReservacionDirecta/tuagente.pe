import React from 'react';
import Container from '../layout/Container';
import Section from '../layout/Section';
import BlogCard from './BlogCard';
import { blogPosts } from '../../utils/constants';

const BlogSection = () => {
  const articles = blogPosts.slice(0, 2);

  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Blog Inmobiliario
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Guías, análisis de zonas y consejos prácticos para tu próxima decisión inmobiliaria.
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
