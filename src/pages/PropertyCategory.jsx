import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import PropertyGrid from '../components/property/PropertyGrid';
import { useProperties } from '../hooks';

const PropertyCategory = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({ category });

  const { properties, loading } = useProperties(filters);

  useEffect(() => {
    setFilters({ category });
  }, [category]);

  const categoryNames = {
    casas: 'Casas',
    departamentos: 'Departamentos',
    oficinas: 'Oficinas',
    locales: 'Locales Comerciales',
    lotes: 'Lotes y Terrenos',
  };

  const displayName = categoryNames[category] || category;

  return (
    <>
      <SEO
        title={`${displayName} | TUAGENTE.PE`}
        description={`Explora nuestra selección de ${displayName.toLowerCase()} en Lima.`}
      />

      <main className="pt-20">
        <section className="bg-primary py-16">
          <Container>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {displayName}
            </h1>
            <p className="text-gray-200 text-lg">
              Encuentra la propiedad perfecta en esta categoría
            </p>
          </Container>
        </section>

        <Section>
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
                No se encontraron {displayName.toLowerCase()} en este momento.
              </p>
            </div>
          )}
        </Section>
      </main>
    </>
  );
};

export default PropertyCategory;
