import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { contactInfo } from '../../utils/constants';

const WhatsAppButton = () => {
  return (
    <a
      href={contactInfo.social.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Contactar por WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <IoLogoWhatsapp className="w-7 h-7 text-white relative z-10" />
      <span className="absolute right-full mr-3 bg-gray-900/90 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-lg">
        Escríbenos por WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
