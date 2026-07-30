import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack, IoTrash } from 'react-icons/io5';
import { api } from '../../api/config';
import { CATEGORIES, OPERATIONS, DISTRICTS } from '../../utils/constants';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    category: 'Casas',
    operation: 'Comprar',
    name: '',
    price: '',
    description: '',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    parking: 0,
    address: '',
    district: '',
    city: 'Lima',
    status: 'available',
    featured: false,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/properties/${id}`)
        .then(data => {
          setForm({
            category: data.category || 'Casas',
            operation: data.operation || 'Comprar',
            name: data.name || '',
            price: data.price || '',
            description: data.description || '',
            bedrooms: data.bedrooms || 0,
            bathrooms: data.bathrooms || 0,
            area: data.area || '',
            parking: data.parking || 0,
            address: data.location?.address || '',
            district: data.location?.district || '',
            city: data.location?.city || 'Lima',
            status: data.status || 'available',
            featured: data.featured === 1 || data.featured === true,
          });
          setExistingImages(data.images || []);
        })
        .catch(err => setError('Error al cargar la propiedad'))
        .finally(() => setFetching(false));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        if (key === 'featured') {
          formData.append(key, form[key] ? '1' : '0');
        } else {
          formData.append(key, form[key]);
        }
      });

      // Send list of images to remove
      if (isEdit && removedImages.length > 0) {
        formData.append('removeImages', JSON.stringify(removedImages));
      }

      // Append new image files
      if (newImages.length > 0) {
        newImages.forEach(img => formData.append('images', img));
      }

      if (isEdit) {
        await api.upload(`/properties/${id}`, formData, 'PUT');
      } else {
        await api.upload('/properties', formData, 'POST');
      }

      navigate('/admin/propiedades');
    } catch (err) {
      setError(err.message || 'Error al guardar la propiedad');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleRemoveExistingImage = (imageUrl) => {
    if (!confirm('¿Eliminar esta imagen?')) return;
    setExistingImages(prev => prev.filter(img => img !== imageUrl));
    setRemovedImages(prev => [...prev, imageUrl]);
  };

  const handleRemoveNewImage = (idx) => {
    setNewImages(prev => prev.filter((_, i) => i !== idx));
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary mb-4">
        <IoArrowBack className="w-5 h-5 mr-1" />
        Volver
      </button>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        {isEdit ? 'Editar Propiedad' : 'Nueva Propiedad'}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="space-y-5">
            <div className="border-b pb-3">
              <h3 className="font-semibold text-gray-900 text-lg">Información Básica</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la propiedad *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Título de la propiedad"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operación *</label>
                <select name="operation" value={form.operation} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  {OPERATIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/) *</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select name="status" value={form.status} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="available">Disponible</option>
                  <option value="sold">Vendido</option>
                  <option value="rented">Alquilado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Indica las características principales de la propiedad"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm font-medium text-gray-700">Marcar como propiedad destacada</span>
            </label>
          </div>
          <div className="space-y-5">
            <div className="border-b pb-3">
              <h3 className="font-semibold text-gray-900 text-lg">Características</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                <input
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baños</label>
                <input
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                <input
                  name="area"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estacionamiento</label>
                <input
                  name="parking"
                  type="number"
                  min="0"
                  value={form.parking}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-b pb-3 pt-2">
              <h3 className="font-semibold text-gray-900 text-lg">Ubicación</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Dirección"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Distrito</label>
                <input
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  list="districts"
                  placeholder="Seleccionar o escribir"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <datalist id="districts">
                  {DISTRICTS.map(d => <option key={d} value={d} />)}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="border-b pb-3 pt-2">
              <h3 className="font-semibold text-gray-900 text-lg">Imágenes</h3>
            </div>
            {existingImages.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Imágenes actuales ({existingImages.length})</p>
                <div className="flex flex-wrap gap-3">
                  {existingImages.map((img, idx) => (
                    <div key={img} className="relative group">
                      <img
                        src={img}
                        alt={`Propiedad ${idx + 1}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(img)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IoTrash className="w-3 h-3" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded">Principal</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {existingImages.length === 0 && removedImages.length > 0 && isEdit && (
              <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                Has eliminado todas las imágenes. Sube al menos una imagen nueva.
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isEdit ? 'Agregar nuevas imágenes' : 'Imágenes de la propiedad'}
              </label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setNewImages(prev => [...prev, ...files]);
                  e.target.value = '';
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">JPEG, PNG o WebP. Máx. 5MB por imagen.</p>
            </div>
            {newImages.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Imágenes a subir ({newImages.length})</p>
                <div className="flex flex-wrap gap-3">
                  {newImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Nueva ${idx + 1}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <IoTrash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 border-t flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 font-medium transition-colors flex items-center justify-center"
          >
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
            {loading ? 'Guardando...' : isEdit ? 'Actualizar Propiedad' : 'Crear Propiedad'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
