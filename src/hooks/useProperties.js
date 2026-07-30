import { useState, useEffect } from 'react';

const useProperties = (filters = {}) => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = '/api/properties?';
    if (filters.category && filters.category !== 'all') url += `category=${filters.category}&`;
    if (filters.operation) url += `operation=${filters.operation}&`;
    if (filters.search) url += `search=${filters.search}&`;
    if (filters.featured) url += `featured=1&`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error('Respuesta inválida del servidor');
        let result = data;

        if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice);
        if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
        if (filters.bedrooms) result = result.filter(p => p.features?.bedrooms >= filters.bedrooms);
        if (filters.bathrooms) result = result.filter(p => p.features?.bathrooms >= filters.bathrooms);

        setAllProperties(data);
        setFilteredProperties(result);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [JSON.stringify(filters)]);

  const getPropertyById = (id) => {
    return allProperties.find(p => p.id === parseInt(id));
  };

  const getFeaturedProperties = () => {
    return allProperties.filter(p => p.featured);
  };

  const getPropertiesByCategory = (category) => {
    return allProperties.filter(p => p.category === category);
  };

  return {
    properties: filteredProperties,
    allProperties,
    loading,
    error,
    getPropertyById,
    getFeaturedProperties,
    getPropertiesByCategory,
  };
};

export default useProperties;
