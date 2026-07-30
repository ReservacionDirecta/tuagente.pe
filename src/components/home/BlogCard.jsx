import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const BlogCard = ({ article }) => {
  const { slug, title, excerpt, image, category, date, author } = article;
  
  return (
    <Card hover className="overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary">{category}</Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{date}</span>
          {author && (
            <>
              <span className="mx-2">•</span>
              <span>{author}</span>
            </>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        {excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {excerpt}
          </p>
        )}
        
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center space-x-1 text-primary hover:text-secondary transition-colors font-medium"
        >
          <span>Leer más</span>
          <IoArrowForward className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
};

export default BlogCard;
