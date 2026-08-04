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
    <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none max-w-full px-2">
      {allCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
            activeCategory === category.id
              ? 'bg-primary text-white shadow-sm'
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
