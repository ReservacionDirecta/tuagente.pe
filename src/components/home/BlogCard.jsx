import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const BlogCard = ({ article }) => {
  const { slug, title, excerpt, image, category, date, author } = article;
  
  return (
    <Card hover className="flex flex-col h-full overflow-hidden group border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="shadow-md">{category}</Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <span>{date}</span>
            {author && (
              <>
                <span className="mx-2">•</span>
                <span>{author}</span>
              </>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </div>
        
        <div className="pt-3 border-t border-gray-100 mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Lectura recomendada</span>
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center justify-center space-x-1.5 bg-primary/5 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-full transition-all duration-300 font-medium text-xs sm:text-sm shadow-sm group-hover:bg-primary group-hover:text-white"
          >
            <span>Leer más</span>
            <IoArrowForward className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
