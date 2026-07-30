import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoArrowBack, IoCalendar, IoPerson, IoTime } from 'react-icons/io5';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Badge from '../components/ui/Badge';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
        <Link to="/blog" className="text-primary hover:text-secondary">
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | TUAGENTE.PE`}
        description={post.excerpt}
      />

      <main className="pt-20">
        <section className="relative h-64 md:h-96">
          <img
            src={post.image || '/images/blog/default.jpg'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <Container className="relative z-10 h-full flex items-center">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {post.title}
              </h1>
            </div>
          </Container>
        </section>

        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center">
                <IoPerson className="w-5 h-5 mr-2" />
                <span>{post.author}</span>
              </div>

              <div className="flex items-center">
                <IoCalendar className="w-5 h-5 mr-2" />
                <span>{post.created_at?.split(' ')[0] || post.date}</span>
              </div>

              <div className="flex items-center">
                <IoTime className="w-5 h-5 mr-2" />
                <span>{post.readTime} de lectura</span>
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900
                prose-p:text-gray-600
                prose-a:text-primary
                prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t">
              <Link
                to="/blog"
                className="inline-flex items-center text-primary hover:text-secondary transition-colors"
              >
                <IoArrowBack className="w-5 h-5 mr-2" />
                Volver al blog
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default BlogPost;
