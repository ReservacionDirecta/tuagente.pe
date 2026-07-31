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
      className="overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary">{category}</Badge>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <Link
            to={`/propiedad/${id}`}
            className="bg-white text-primary px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-secondary hover:text-gray-900 transition-colors"
          >
            <IoEye className="w-5 h-5" />
            <span>Quick View</span>
          </Link>
        </motion.div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{operation}</span>
          <span className="text-sm text-gray-500">{location.district}</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {operation} {category} - {name}
        </h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <span>{features.bedrooms} Hab</span>
          <span>•</span>
          <span>{features.bathrooms} Baños</span>
          <span>•</span>
          <span>{features.area} m²</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-2xl font-bold text-primary">
            {priceDisplay}
          </span>
          
          <Link
            to={`/propiedad/${id}`}
            className="flex items-center space-x-1 text-primary hover:text-secondary transition-colors font-medium"
          >
            <span>Ver más</span>
            <IoArrowForward className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
