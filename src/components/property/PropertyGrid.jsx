import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ properties, columns = 3 }) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={`grid ${gridClasses[columns]} gap-8`}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
