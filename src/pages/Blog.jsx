import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import BlogCard from '../components/home/BlogCard';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]));
  }, []);

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
            {posts.map((post) => (
              <BlogCard key={post.id || post.slug} article={post} />
            ))}
          </div>
          {posts.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hay artículos disponibles.</p>
          )}
        </Section>
      </main>
    </>
  );
};

export default Blog;
