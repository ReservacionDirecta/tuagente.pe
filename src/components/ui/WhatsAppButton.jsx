import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { contactInfo } from '../../utils/constants';

const WhatsAppButton = () => {
  return (
    <a
      href={contactInfo.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <IoLogoWhatsapp className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
