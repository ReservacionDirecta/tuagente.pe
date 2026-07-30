import React from 'react';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import BlogCard from '../components/home/BlogCard';
import { blogPosts } from '../utils/constants';

const Blog = () => {
  return (
    <>
      <SEO
        title="Blog | TUAGENTE.PE"
        description="Artículos y consejos sobre el mercado inmobiliario en Lima."
      />

      <main className="pt-20">
        <section className="bg-primary py-16">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-gray-200 text-lg">
              Información inmobiliaria y consejos útiles
            </p>
          </Container>
        </section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} article={post} />
            ))}
          </div>
        </Section>
      </main>
    </>
  );
};

export default Blog;
