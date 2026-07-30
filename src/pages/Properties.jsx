import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import PropertyGrid from '../components/property/PropertyGrid';
import PropertyFilter from '../components/property/PropertyFilter';
import { useProperties } from '../hooks';
import { CATEGORIES } from '../utils/constants';

const Properties = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState({ category: 'all' });

  const { properties, loading } = useProperties(filters);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
  };

  return (
    <>
      <SEO
        title="Propiedades | TUAGENTE.PE"
        description="Explora nuestra amplia selección de propiedades en Lima. Casas, departamentos, oficinas y más."
      />

      <main className="pt-20">
        <section className="bg-primary py-16">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Propiedades
            </h1>
            <p className="text-gray-200 text-lg">
              Encuentra la propiedad perfecta para ti
            </p>
          </Container>
        </section>

        <Section>
          <PropertyFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <PropertyGrid properties={properties} columns={3} />
          )}

          {!loading && properties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No se encontraron propiedades con los filtros seleccionados.
              </p>
            </div>
          )}
        </Section>
      </main>
    </>
  );
};

export default Properties;
