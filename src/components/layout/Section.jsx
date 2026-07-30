import React from 'react';
import Container from './Container';

const Section = ({ 
  children, 
  className = '',
  withContainer = true 
}) => {
  const content = (
    <section className={`section-padding ${className}`}>
      {children}
    </section>
  );
  
  if (withContainer) {
    return (
      <Container>
        {content}
      </Container>
    );
  }
  
  return content;
};

export default Section;
