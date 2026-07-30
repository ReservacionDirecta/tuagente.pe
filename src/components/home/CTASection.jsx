import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import Button from '../ui/Button';

const CTASection = () => {
  return (
    <section className="relative py-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/cta-background.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-90" />
      </div>
      
      {/* Content */}
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Estas listo para iniciar la compra de tu inmueble?
          </h2>
          
          <p className="text-xl text-gray-200 mb-8">
            Agenda una visita con nosotros y elige la mejor opción
          </p>
          
          <Link to="/contacto">
            <Button variant="secondary" size="lg">
              Agenda tu visita
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
