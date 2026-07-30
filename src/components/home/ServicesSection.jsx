import React from 'react';
import Container from '../layout/Container';
import Section from '../layout/Section';
import StatsCounter from './StatsCounter';

const ServicesSection = () => {
  const stats = [
    { icon: '🏠', target: 150, label: 'PROPIEDADES' },
    { icon: '😊', target: 200, label: 'CLIENTES FELICES' },
    { icon: '📅', target: 10, label: 'AÑOS EXPERIENCIA' },
    { icon: '👨‍💼', target: 25, label: 'AGENTES EXPERTOS' },
  ];
  
  return (
    <Section className="bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Acompañamos cada etapa de tu decisión inmobiliaria, con respaldo y experiencia.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <StatsCounter
            key={index}
            icon={stat.icon}
            target={stat.target}
            label={stat.label}
          />
        ))}
      </div>
    </Section>
  );
};

export default ServicesSection;
