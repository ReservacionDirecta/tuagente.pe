import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { IoHome, IoBuild, IoPeople, IoMenu, IoClose, IoLogOut, IoChevronDown, IoDocumentText, IoCalendar, IoGrid } from 'react-icons/io5';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: IoGrid },
    { name: 'Propiedades', href: '/admin/propiedades', icon: IoBuild },
    { name: 'Citas', href: '/admin/citas', icon: IoCalendar },
    { name: 'Blog', href: '/admin/blog', icon: IoDocumentText },
    ...(isAdmin ? [{ name: 'Usuarios', href: '/admin/usuarios', icon: IoPeople }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (href) => {
    if (href === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <img 
            src="/tuagentepe logo.jpeg" 
            alt="TUAGENTE.PE" 
            className="h-8 w-auto object-contain rounded-md bg-white p-0.5"
          />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white p-1">
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-400 text-xs mt-1">Panel de Administración</p>
      </div>
      <nav className="mt-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center px-3 py-2.5 rounded-lg text-white mb-1 transition-colors ${
              isActive(item.href)
                ? 'bg-white/15 text-white'
                : 'text-gray-300 hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full bg-primary shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:bg-primary lg:flex lg:flex-col">
        <SidebarContent />
      </div>
      <div className="lg:pl-64 min-h-screen flex flex-col">
        <div className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-1"
            >
              <IoMenu className="w-6 h-6" />
            </button>

            <h2 className="text-sm font-medium text-gray-500 lg:hidden">
              {navItems.find(i => isActive(i.href))?.name || 'Admin'}
            </h2>

            <div className="flex items-center space-x-3 ml-auto">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user?.name}</span>
                  <IoChevronDown className="w-4 h-4 hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        <span className="inline-block mt-1.5 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          {user?.role === 'admin' ? 'Administrador' : 'Agente'}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                      >
                        <IoLogOut className="w-4 h-4 mr-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
