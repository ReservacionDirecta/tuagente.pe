import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoWhatsapp, IoMail, IoCall, IoLocation } from 'react-icons/io5';
import Container from './Container';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Propiedades', href: '/propiedades' },
    { name: 'Agentes', href: '/agentes' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Blog', href: '/blog' },
  ];
  
  const propertyTypes = [
    { name: 'Casas', href: '/propiedades/casas' },
    { name: 'Departamentos', href: '/propiedades/departamentos' },
    { name: 'Oficinas', href: '/propiedades/oficinas' },
    { name: 'Locales Comerciales', href: '/propiedades/locales' },
    { name: 'Lotes y Terrenos', href: '/propiedades/lotes' },
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: IoLogoFacebook, href: 'https://facebook.com/tuagente.pe' },
    { name: 'Instagram', icon: IoLogoInstagram, href: 'https://instagram.com/tuagente.pe' },
    { name: 'WhatsApp', icon: IoLogoWhatsapp, href: 'https://wa.me/51947859358' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };
  
  return (
    <footer className="bg-primary text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo + About */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold">
                TUAGENTE
                <span className="text-secondary">.PE</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Somos una agencia inmobiliaria líder en Lima, ofreciendo soluciones integrales 
              para todas tus necesidades inmobiliarias. Encuentra tu hogar ideal con nosotros.
            </p>
            
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tipos de Propiedad</h3>
            <ul className="space-y-3">
              {propertyTypes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact + Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <IoLocation className="w-5 h-5 text-secondary mt-0.5" />
                <span className="text-gray-300">
                  Cll. Solidaridad Nro 105, Santiago de Surco, Lima
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <IoCall className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">947 859 358</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <IoMail className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">contacto@tuagente.com.pe</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <form onSubmit={handleSubmit} className="flex">
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" variant="secondary" size="sm" className="ml-2">
                  Suscribir
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Bottom Bar */}
      <div className="border-t border-white border-opacity-10">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TUAGENTE.PE. Todos los derechos reservados.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
