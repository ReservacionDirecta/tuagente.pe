import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoEye, IoArrowForward } from 'react-icons/io5';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const PropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    category,
    operation,
    name,
    priceDisplay,
    image,
    features,
    location,
  } = property;
  
  return (
    <Card
      hover
      className="flex flex-col h-full overflow-hidden group border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100 flex-shrink-0">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="primary">{category}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="shadow-md">{operation}</Badge>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity"
        >
          <Link
            to={`/propiedad/${id}`}
            className="bg-white text-primary px-5 py-2.5 rounded-full font-medium flex items-center space-x-2 hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            <IoEye className="w-4 h-4" />
            <span>Vista Rápida</span>
          </Link>
        </motion.div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            <span>{location.district}</span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {category} - {name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600 mb-4 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <span>{features.bedrooms} Hab</span>
            <span className="text-gray-300">•</span>
            <span>{features.bathrooms} Baños</span>
            <span className="text-gray-300">•</span>
            <span>{features.area} m²</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Precio</span>
            <span className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              {priceDisplay}
            </span>
          </div>
          
          <Link
            to={`/propiedad/${id}`}
            className="inline-flex items-center justify-center space-x-1.5 bg-primary/5 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm shadow-sm group-hover:bg-primary group-hover:text-white"
          >
            <span>Ver más</span>
            <IoArrowForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
