
import React from 'react';
import { BookmarkCheck } from 'lucide-react';

export interface BookmarkProps {
  id: string;
  title: string;
  url: string;
  description: string;
  imageUrl?: string;
  category: string;
}

const Bookmark: React.FC<BookmarkProps> = ({ title, url, description, imageUrl, category }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b border-muted last:border-0">
      {imageUrl ? (
        <div className="md:w-1/4 flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-24 object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="md:w-1/4 flex-shrink-0 flex items-center justify-center">
          <BookmarkCheck className="h-12 w-12 text-accent" />
        </div>
      )}
      <div className="md:w-3/4">
        <div className="text-sm text-accent uppercase font-medium mb-1">{category}</div>
        <h3 className="text-lg font-medium mb-1">
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-accent transition-colors"
          >
            {title}
          </a>
        </h3>
        <p className="text-foreground/80 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Bookmark;
