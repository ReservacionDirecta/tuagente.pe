import React, { useState, useEffect } from 'react';
import { IoAdd, IoTrash, IoClose } from 'react-icons/io5';
import { api } from '../../api/config';

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'agent', phone: '' });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.get('/auth/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'agent', phone: '' });
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Error al crear usuario');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await api.delete(`/auth/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Usuarios</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center text-sm"
        >
          <IoAdd className="w-5 h-5 mr-1" />
          Nuevo Usuario
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">Cargando...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No hay usuarios</td></tr>
            ) : users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                      {u.name?.charAt(0) || '?'}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {u.role === 'admin' ? 'Administrador' : 'Agente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.phone || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <IoTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">Cargando...</div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">No hay usuarios</div>
        ) : users.map((u) => (
          <div key={u.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {u.name?.charAt(0) || '?'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(u.id)}
                className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg"
              >
                <IoTrash className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className={`px-2 py-0.5 text-xs rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                {u.role === 'admin' ? 'Administrador' : 'Agente'}
              </span>
              {u.phone && (
                <span className="text-xs text-gray-500">{u.phone}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Nuevo Usuario</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña *</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    <option value="agent">Agente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark text-sm transition-colors"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersAdmin;
