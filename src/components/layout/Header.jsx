import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import Container from './Container';
import Button from '../ui/Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);
  
  const navigation = [
    { name: 'Inicio', href: '/' },
    {
      name: 'Propiedades',
      href: '/propiedades',
      children: [
        { name: 'Casas', href: '/propiedades/casas' },
        { name: 'Departamentos', href: '/propiedades/departamentos' },
        { name: 'Oficinas', href: '/propiedades/oficinas' },
        { name: 'Locales', href: '/propiedades/locales' },
        { name: 'Lotes', href: '/propiedades/lotes' },
      ],
    },
    { name: 'Agentes', href: '/agentes' },
    { name: 'Contacto', href: '/contacto' },
  ];
  
  const isActive = (href) => location.pathname === href;
  const isHome = location.pathname === '/';
  const useDarkText = !isHome || isScrolled;
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkText
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${useDarkText ? 'text-primary' : 'text-white'}`}>
              TUAGENTE
              <span className="text-secondary">.PE</span>
            </span>
          </Link>
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-secondary'
                      : useDarkText
                      ? 'text-gray-900 hover:text-primary'
                      : 'text-white hover:text-secondary'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.children && (
                    <IoChevronDown className="w-4 h-4" />
                  )}
                </Link>
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(child.href)
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            <Button variant="secondary" size="sm">
              Agenda tu visita
            </Button>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              useDarkText ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </Container>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <Container className="py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`block py-2 font-medium ${
                        isActive(item.href)
                          ? 'text-secondary'
                          : 'text-gray-900 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                    
                    {item.children && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block py-1 text-sm ${
                              isActive(child.href)
                                ? 'text-secondary'
                                : 'text-gray-600 hover:text-primary'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <Button variant="secondary" className="w-full mt-4">
                  Agenda tu visita
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
