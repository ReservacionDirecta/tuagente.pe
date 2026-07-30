import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoBuild, IoPeople, IoStar, IoAlertCircle } from 'react-icons/io5';
import { api } from '../../api/config';

const Dashboard = () => {
  const [stats, setStats] = useState({ properties: 0, users: 0, featured: 0 });
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [properties, users] = await Promise.all([
          api.get('/properties'),
          api.get('/auth/users').catch(() => []),
        ]);
        setStats({
          properties: properties.length,
          users: users.length || 0,
          featured: properties.filter(p => p.featured).length,
        });
        setRecentProperties(properties.slice(0, 5));
      } catch (err) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { name: 'Propiedades', value: stats.properties, icon: IoBuild, color: 'bg-blue-500' },
    { name: 'Destacadas', value: stats.featured, icon: IoStar, color: 'bg-yellow-500' },
    { name: 'Usuarios', value: stats.users, icon: IoPeople, color: 'bg-green-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
          <IoAlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg flex-shrink-0`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm text-gray-500">{stat.name}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent properties */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 sm:p-6 border-b flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Propiedades Recientes</h2>
          <Link to="/admin/propiedades" className="text-primary hover:text-primary-dark text-xs sm:text-sm font-medium">
            Ver todas →
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Propiedad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {prop.image && (
                        <img src={prop.image} alt="" className="w-10 h-10 rounded-lg object-cover mr-3" />
                      )}
                      <span className="text-sm font-medium text-gray-900">{prop.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prop.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${prop.operation === 'Comprar' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {prop.operation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{prop.priceDisplay}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${prop.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {prop.status === 'available' ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {recentProperties.map((prop) => (
            <div key={prop.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                {prop.image && (
                  <img src={prop.image} alt="" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{prop.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{prop.category} • {prop.operation}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-primary">{prop.priceDisplay}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${prop.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {prop.status === 'available' ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recentProperties.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No hay propiedades registradas
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
