import React from 'react';

const PropertyFilter = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  const allCategories = [
    { id: 'all', name: 'Todas' },
    ...categories.map(cat => ({ id: cat, name: cat })),
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default PropertyFilter;
