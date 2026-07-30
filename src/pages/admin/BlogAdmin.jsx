import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoAdd, IoPencil, IoTrash, IoSearch, IoDocumentText } from 'react-icons/io5';
import { api } from '../../api/config';

const BlogAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.get('/blog');
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este artículo?')) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchPosts();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Blog</h1>
        <Link
          to="/admin/blog/nuevo"
          className="bg-primary text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-dark flex items-center justify-center text-sm"
        >
          <IoAdd className="w-5 h-5 mr-1" />
          Nuevo Artículo
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por título o categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <IoDocumentText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No hay artículos{search ? ' que coincidan' : ''}.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Artículo</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Estado</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {post.image && (
                          <img src={post.image} alt="" className="w-10 h-10 rounded-lg object-cover mr-3 flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{post.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{post.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {post.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{post.created_at?.split(' ')[0]}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/blog/${post.id}/editar`}
                          className="text-primary hover:text-primary-dark p-1"
                          title="Editar"
                        >
                          <IoPencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Eliminar"
                        >
                          <IoTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    {post.image && (
                      <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover mr-3 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{post.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{post.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Link
                    to={`/admin/blog/${post.id}/editar`}
                    className="flex-1 text-center bg-primary/10 text-primary py-1.5 rounded-lg text-sm font-medium hover:bg-primary/20"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 text-center bg-red-50 text-red-700 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogAdmin;
