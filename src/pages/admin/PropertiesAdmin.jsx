import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoPencil, IoTrash, IoSearch } from 'react-icons/io5';
import { api } from '../../api/config';
import { CATEGORIES } from '../../utils/constants';

const PropertiesAdmin = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: 'all', search: '' });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      let url = '/properties?';
      if (filters.category !== 'all') url += `category=${filters.category}&`;
      if (filters.search) url += `search=${filters.search}&`;
      const data = await api.get(url);
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, [filters]);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta propiedad?')) return;
    try {
      await api.delete(`/properties/${id}`);
      fetchProperties();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Propiedades</h1>
        <Link
          to="/admin/propiedades/nueva"
          className="bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center text-sm"
        >
          <IoAdd className="w-5 h-5 mr-1" />
          Nueva Propiedad
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="all">Todas las categorías</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propiedad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">Cargando...</td></tr>
            ) : properties.length === 0 ? (
              <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">No se encontraron propiedades</td></tr>
            ) : properties.map((prop) => (
              <tr key={prop.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {prop.image && (
                      <img src={prop.image} alt="" className="w-12 h-12 rounded-lg object-cover mr-3" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prop.name}</p>
                      <p className="text-xs text-gray-500">{prop.location?.district}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${prop.operation === 'Comprar' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {prop.operation}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prop.priceDisplay}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${prop.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {prop.status === 'available' ? 'Disponible' : 'Vendido'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/admin/propiedades/${prop.id}/editar`}
                      className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <IoPencil className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <IoTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">Cargando...</div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">No se encontraron propiedades</div>
        ) : properties.map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start space-x-3">
              {prop.image && (
                <img src={prop.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{prop.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{prop.location?.district}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">{prop.category}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${prop.operation === 'Comprar' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {prop.operation}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold text-primary">{prop.priceDisplay}</span>
                  <div className="flex items-center space-x-1">
                    <Link
                      to={`/admin/propiedades/${prop.id}/editar`}
                      className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <IoPencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(prop.id)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <IoTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesAdmin;
