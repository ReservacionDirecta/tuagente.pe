import React, { useState, useEffect } from 'react';
import { IoTrash, IoCheckmarkCircle, IoTime, IoCloseCircle, IoAdd } from 'react-icons/io5';
import { api } from '../../api/config';
import Modal from '../../components/ui/Modal';

const statusLabels = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: IoTime },
  confirmed: { label: 'Confirmada', color: 'bg-green-100 text-green-800', icon: IoCheckmarkCircle },
  cancelled: { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: IoCloseCircle },
};

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
];

const AppointmentsAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [properties, setProperties] = useState([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    property_id: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
    status: 'confirmed',
  });

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      let url = '/appointments?';
      if (filter !== 'all') url += `status=${filter}`;
      const data = await api.get(url);
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, [filter]);

  const openModal = async () => {
    try {
      const data = await api.get('/properties');
      setProperties(data);
    } catch (err) { /* ignore */ }
    setForm({ property_id: '', name: '', email: '', phone: '', date: '', time: '', message: '', status: 'confirmed' });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/appointments', { ...form, property_id: Number(form.property_id) });
      setShowModal(false);
      fetchAppointments();
    } catch (err) {
      alert(err.message || 'Error al crear la cita');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      alert('Error al actualizar');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta cita?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Citas</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{appointments.length} cita{appointments.length !== 1 ? 's' : ''}</span>
          <button
            onClick={openModal}
            className="bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center text-sm"
          >
            <IoAdd className="w-5 h-5 mr-1" />
            Nueva Cita
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Todas' },
            { value: 'pending', label: 'Pendientes' },
            { value: 'confirmed', label: 'Confirmadas' },
            { value: 'cancelled', label: 'Canceladas' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <IoTime className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hay citas{filter !== 'all' ? ` con estado "${statusLabels[filter]?.label}"` : ''}.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Propiedad</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha / Hora</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt) => {
                  const st = statusLabels[apt.status] || statusLabels.pending;
                  return (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 text-sm">{apt.property_name}</p>
                        <p className="text-xs text-gray-500">{apt.category} - {apt.district}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{apt.name}</p>
                        <p className="text-xs text-gray-500">{apt.email}</p>
                        <p className="text-xs text-gray-500">{apt.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-gray-900">{apt.date}</p>
                        <p className="text-xs text-gray-500">{apt.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${st.color}`}>
                          <st.icon className="w-3 h-3 mr-1" />
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {apt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(apt.id, 'confirmed')}
                                className="text-green-600 hover:text-green-800 text-xs font-medium"
                                title="Confirmar"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => handleStatusChange(apt.id, 'cancelled')}
                                className="text-red-600 hover:text-red-800 text-xs font-medium"
                                title="Cancelar"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'cancelled')}
                              className="text-red-600 hover:text-red-800 text-xs font-medium"
                            >
                              Cancelar
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Eliminar"
                          >
                            <IoTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {appointments.map((apt) => {
              const st = statusLabels[apt.status] || statusLabels.pending;
              return (
                <div key={apt.id} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{apt.property_name}</p>
                      <p className="text-xs text-gray-500">{apt.category} - {apt.district}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${st.color}`}>
                      <st.icon className="w-3 h-3 mr-1" />
                      {st.label}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1 mb-3">
                    <p><span className="font-medium">Cliente:</span> {apt.name}</p>
                    <p><span className="font-medium">Contacto:</span> {apt.email} | {apt.phone}</p>
                    <p><span className="font-medium">Fecha:</span> {apt.date} a las {apt.time}</p>
                    {apt.message && <p><span className="font-medium">Msg:</span> {apt.message}</p>}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    {apt.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(apt.id, 'confirmed')}
                          className="flex-1 text-center bg-green-50 text-green-700 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => handleStatusChange(apt.id, 'cancelled')}
                          className="flex-1 text-center bg-red-50 text-red-700 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100"
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusChange(apt.id, 'cancelled')}
                        className="flex-1 text-center bg-red-50 text-red-700 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5"
                    >
                      <IoTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nueva Cita Manual">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Propiedad *</label>
            <select
              name="property_id"
              value={form.property_id}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              <option value="">Seleccionar propiedad</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name} - {p.district}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del cliente *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="947 859 358"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
              <select
                name="time"
                value={form.time}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              >
                <option value="">Seleccionar hora</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            >
              <option value="confirmed">Confirmada</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nota (opcional)</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleFormChange}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              placeholder="Ej: Contactó por WhatsApp, cliente interesado en..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Crear Cita'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AppointmentsAdmin;
