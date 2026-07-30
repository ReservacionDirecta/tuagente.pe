import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import Section from '../layout/Section';
import PropertyGrid from '../property/PropertyGrid';
import Button from '../ui/Button';

const PropertiesSection = ({ properties = [] }) => {
  const [apiProperties, setApiProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (properties.length > 0) {
      setLoading(false);
      return;
    }

    fetch('/api/properties?featured=1&limit=6')
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setApiProperties(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching featured properties:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [properties.length]);

  const displayProperties = properties.length > 0 ? properties : apiProperties;

  return (
    <Section className="bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Propiedades Destacadas
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explora nuestra selección de propiedades exclusivas
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">No se pudieron cargar las propiedades</p>
          <Link to="/propiedades">
            <Button variant="primary">Ver todas las propiedades</Button>
          </Link>
        </div>
      ) : (
        <PropertyGrid properties={displayProperties} columns={3} />
      )}

      <div className="text-center mt-12">
        <Link to="/propiedades">
          <Button variant="primary">
            Ver todas las propiedades
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default PropertiesSection;
